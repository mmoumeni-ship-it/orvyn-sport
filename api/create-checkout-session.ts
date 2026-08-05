import type { IncomingMessage, ServerResponse } from 'http';
import { DISH_CATALOG, SUBSCRIPTION_CATALOG } from '../src/data/orderCatalog';

type BodyItem = {
  id: string;
  type: 'dish' | 'subscription';
  name: string;
  price: number;
  quantity: number;
  slug?: string;
  plan?: string;
  billingPeriod?: 'monthly';
};

async function readJsonBody(req: IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

function buildLineItems(items: BodyItem[]) {
  return items.map((item, index) => {
    const catalogItem = item.type === 'dish'
      ? DISH_CATALOG[item.slug || item.id]
      : SUBSCRIPTION_CATALOG[item.plan || item.id.replace('subscription-', '')];

    if (!catalogItem) {
      throw new Error(`Article inconnu: ${item.id}`);
    }

    const price = Number(catalogItem.price);
    if (!Number.isFinite(price)) {
      throw new Error(`Prix invalide pour ${item.id}`);
    }

    return {
      [`line_items[${index}][price_data][currency]`]: 'eur',
      [`line_items[${index}][price_data][product_data][name]`]: catalogItem.name,
      [`line_items[${index}][price_data][unit_amount]`]: Math.round(price * 100).toString(),
      [`line_items[${index}][quantity]`]: Math.max(1, Math.floor(item.quantity || 1)).toString(),
    };
  });
}

async function createStripeSession(req: IncomingMessage, res: ServerResponse) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'STRIPE_SECRET_KEY manquante. Ajoutez-la dans Vercel > Project > Settings > Environment Variables (Production, Preview et Development).' }));
      return;
    }

    const body = await readJsonBody(req) as { items?: BodyItem[]; customer?: { email?: string } };
    const items = Array.isArray(body.items) ? body.items : [];
    if (items.length === 0) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Panier vide' }));
      return;
    }

    const origin = (req.headers.origin as string) || `https://${req.headers.host}`;
    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.append('payment_method_types[]', 'card');
    params.set('success_url', `${origin}/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`);
    params.set('cancel_url', `${origin}/panier`);
    if (body.customer?.email) params.set('customer_email', body.customer.email);

    buildLineItems(items).forEach((entry) => {
      Object.entries(entry).forEach(([key, value]) => params.append(key, value));
    });

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const stripeJson = await stripeResponse.json() as { url?: string; error?: { message?: string } };
    if (!stripeResponse.ok || !stripeJson.url) {
      throw new Error(stripeJson.error?.message || 'Impossible de créer la session Stripe');
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ url: stripeJson.url }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Erreur Stripe' }));
  }
}

export default createStripeSession;
