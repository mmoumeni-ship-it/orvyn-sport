const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

function isProduction() {
  return import.meta.env.PROD;
}

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
  window.gtag?.(...args);
}

export function trackPageView(path: string, title: string) {
  if (!GA_MEASUREMENT_ID) return;
  if (!isProduction()) return;
  if (typeof window === 'undefined') return;

  gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    send_to: GA_MEASUREMENT_ID,
  });
}

export function trackGAEvent(eventName: string, params?: Record<string, unknown>) {
  if (!GA_MEASUREMENT_ID) return;
  if (!isProduction()) return;
  if (typeof window === 'undefined') return;

  gtag('event', eventName, {
    send_to: GA_MEASUREMENT_ID,
    ...params,
  });
}

export function trackViewItem(item: {
  item_id: string;
  item_name: string;
  price: number;
  item_category?: string;
}) {
  trackGAEvent('view_item', {
    currency: 'EUR',
    value: item.price,
    items: [{ ...item }],
  });
}

export function trackAddToCart(item: {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
  item_category?: string;
}) {
  trackGAEvent('add_to_cart', {
    currency: 'EUR',
    value: item.price * item.quantity,
    items: [{ ...item }],
  });
}

export function trackViewCart(items: { item_id: string; item_name: string; price: number; quantity: number }[]) {
  const value = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  trackGAEvent('view_cart', {
    currency: 'EUR',
    value,
    items,
  });
}

export function trackBeginCheckout(items: { item_id: string; item_name: string; price: number; quantity: number }[]) {
  const value = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  trackGAEvent('begin_checkout', {
    currency: 'EUR',
    value,
    items,
  });
}

export function trackPurchase(transactionId: string, items: { item_id: string; item_name: string; price: number; quantity: number }[]) {
  const value = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  trackGAEvent('purchase', {
    transaction_id: transactionId,
    currency: 'EUR',
    value,
    items,
  });
}
