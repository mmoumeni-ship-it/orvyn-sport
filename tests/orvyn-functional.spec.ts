import { test, expect, type Page } from '@playwright/test';

const PUBLIC_ROUTES = [
  '/',
  '/repas',
  '/abonnements',
  '/blog',
  '/a-propos',
  '/contact',
  '/faq',
  '/bowls-proteines',
  '/shakes-proteines',
  '/snacks-healthy',
  '/repas-prise-de-masse',
  '/repas-seche',
  '/repas-post-entrainement',
];

const CART_BUTTON = 'button[aria-label^="Ouvrir le panier"]';

function trackConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

test.describe('Routes publiques', () => {
  for (const route of PUBLIC_ROUTES) {
    test(`${route} se charge, rend du contenu et sans erreur console`, async ({ page }) => {
      const errors = trackConsoleErrors(page);
      await page.goto(route, { waitUntil: 'networkidle' });
      await expect(page.locator('body')).not.toBeEmpty();
      const text = (await page.locator('body').innerText()).trim();
      expect(text.length).toBeGreaterThan(40);
      expect(errors).toEqual([]);
    });
  }
});

test.describe('Navigation & fiches produits', () => {
  test('Le bouton Commander du Hero mène au menu', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Commander mon repas/ }).click();
    await expect(page).toHaveURL(/\/repas$/);
    await expect(page.locator('h1')).toContainText('Nos repas sportifs');
  });

  test('Clic sur une carte du menu → fiche produit (plus de page blanche)', async ({ page }) => {
    await page.goto('/repas');
    const card = page.locator('h3', { hasText: 'Power Chicken Bowl' }).first();
    await card.click();
    await expect(page).toHaveURL(/\/repas\/bowl-chicken$/);
    await expect(page.locator('h1')).toContainText('Power Chicken Bowl');
    await expect(page.locator('#detail-add-to-cart')).toBeVisible();
  });

  test('Fiche produit accessible en navigation directe (rewrite Vercel)', async ({ page }) => {
    await page.goto('/repas/bowl-chicken');
    await expect(page.locator('h1')).toContainText('Power Chicken Bowl');
    await expect(page.locator('h1')).not.toBeEmpty();
  });

  test('Fiche produit introuvable → message + retour au menu', async ({ page }) => {
    await page.goto('/repas/plat-inexistant');
    await expect(page.locator('h1')).toContainText('Plat introuvable');
    await page.getByRole('link', { name: /Retour au menu/ }).click();
    await expect(page).toHaveURL(/\/repas$/);
  });

  test('Article de blog accessible en navigation directe', async ({ page }) => {
    await page.goto('/blog');
    const href = await page.locator('a[href^="/blog/"]').first().getAttribute('href');
    expect(href).toBeTruthy();
    await page.goto(href!);
    await expect(page.locator('h1')).not.toBeEmpty();
  });
});

test.describe('Parcours panier', () => {
  test('Ajout d\'un plat depuis sa fiche : quantité, compteur, panier', async ({ page }) => {
    await page.goto('/repas/bowl-chicken');

    await page.locator('#detail-qty-plus').click();
    await expect(page.locator('#detail-qty-value')).toHaveText('2');

    await page.locator('#detail-add-to-cart').click();
    await expect(page.locator('#detail-add-to-cart')).toContainText('Ajouté au panier');
    await expect(page.locator(CART_BUTTON)).toContainText('2');

    await page.locator(CART_BUTTON).click();
    await expect(page.locator('#cart-item-bowl-chicken')).toBeVisible();
    await expect(page.locator('#cart-item-bowl-chicken')).toContainText('Power Chicken Bowl');
    await expect(page.locator('#cart-item-bowl-chicken')).toContainText('2');
  });

  test('Ajout d\'un abonnement avec quantité depuis la page Abonnements', async ({ page }) => {
    await page.goto('/abonnements');

    await page.locator('#plan-qty-plus-Pro').click();
    await expect(page.locator('#plan-qty-value-Pro')).toHaveText('2');

    await page.locator('#plan-add-cart-Pro').click();
    await expect(page.locator('#plan-add-cart-Pro')).toContainText('Ajouté au panier');
    await expect(page.locator(CART_BUTTON)).toContainText('2');

    await page.locator(CART_BUTTON).click();
    await expect(page.locator('#cart-item-abonnement-pro')).toBeVisible();
    await expect(page.locator('#cart-item-abonnement-pro')).toContainText('Abonnement Pro');
  });

  test('Modification des quantités et suppression dans le panier', async ({ page }) => {
    await page.goto('/repas/shake-vanille');
    await page.locator('#detail-add-to-cart').click();
    await page.locator(CART_BUTTON).click();

    await expect(page.locator('#cart-item-shake-vanille')).toBeVisible();
    await page.locator('#cart-plus-btn-shake-vanille').click();
    await expect(page.locator('#cart-item-shake-vanille')).toContainText('2');

    await page.locator('#cart-minus-btn-shake-vanille').click();
    await expect(page.locator('#cart-item-shake-vanille')).toContainText('1');

    await page.locator('#cart-remove-btn-shake-vanille').click();
    await expect(page.locator('#cart-item-shake-vanille')).toHaveCount(0);
    await expect(page.locator('text=Votre panier est vide')).toBeVisible();
  });

  test('Le compteur du panier persiste après rechargement (localStorage)', async ({ page }) => {
    await page.goto('/repas/bowl-chicken');
    await page.locator('#detail-add-to-cart').click();
    await expect(page.locator(CART_BUTTON)).toContainText('1');
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.locator(CART_BUTTON)).toContainText('1');
  });
});

test.describe('Checkout & suivi de commande', () => {
  test('Validation complète : promo, paiement, confirmation et alerte de suivi', async ({ page }) => {
    await page.goto('/repas/bowl-chicken');
    await page.locator('#detail-add-to-cart').click();
    await page.locator(CART_BUTTON).click();

    await page.locator('#cart-promo-input').fill('ORVYN20');
    await page.locator('#cart-promo-apply-btn').click();
    await expect(page.locator('#cart-promo-input')).toBeVisible();
    await expect(page.locator('body')).toContainText('Code ORVYN20 appliqué');

    await page.locator('#cart-proceed-checkout-btn').click();
    await page.locator('#card-number').fill('4000 1234 5678 9010');
    await page.locator('#card-expiry').fill('12/28');
    await page.locator('#card-cvv').fill('123');
    await page.locator('#checkout-confirm-payment-btn').click();

    await expect(page.locator('text=Commande validée avec succès')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('body')).toContainText(/ORD-\d{5}/);

    await page.locator('#success-close-btn').click();

    const alert = page.locator('#order-alert');
    await expect(alert).toBeVisible({ timeout: 4000 });
    await expect(alert).toContainText('Commande confirmée');
    await expect(alert).toContainText('en préparation');
  });
});

test.describe('Couverture complète en production', () => {
  const ALL_MEALS: Array<[string, string]> = [
    ['bowl-chicken', 'Power Chicken Bowl'],
    ['bowl-beef', 'Beef Performance Bowl'],
    ['bowl-salmon', 'Salmon Recovery Bowl'],
    ['bowl-veggie', 'Veggie Protein Bowl'],
    ['shake-vanille', 'Whey Vanille'],
    ['shake-chocolat', 'Whey Chocolat'],
    ['shake-matcha', 'Matcha Protein Signature'],
    ['shake-coffee', 'Café Protein Boost'],
    ['snack-brownie', 'Brownie Protéiné'],
    ['snack-cookie', 'Cookie Protéiné'],
    ['snack-balls', 'Energy Balls'],
  ];

  test('Chaque plat de la carte s\'ouvre sur sa fiche sans erreur console', async ({ page }) => {
    for (const [id, name] of ALL_MEALS) {
      const errors = trackConsoleErrors(page);
      await page.goto(`/repas/${id}`, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('h1')).toHaveText(name, { timeout: 15000 });
      await expect(page.locator('#detail-add-to-cart')).toBeVisible();
      expect(errors, `erreurs console sur /repas/${id}`).toEqual([]);
    }
  });

  test('Chaque abonnement s\'ajoute au panier et le total est exact', async ({ page }) => {
    await page.goto('/abonnements', { waitUntil: 'domcontentloaded' });

    const plans: Array<[string, string, string, number]> = [
      ['Start', 'plan-add-cart-Start', 'cart-item-abonnement-start', 49],
      ['Pro', 'plan-add-cart-Pro', 'cart-item-abonnement-pro', 129],
      ['Élite', 'plan-add-cart-Elite', 'cart-item-abonnement-elite', 239],
    ];

    for (let i = 0; i < plans.length; i++) {
      const [, addBtn, , price] = plans[i];
      await page.locator(`#${addBtn}`).click();
      await expect(page.locator(`#${addBtn}`)).toContainText('Ajouté au panier');
      await expect(page.locator(CART_BUTTON)).toContainText(String(i + 1));
      expect(price).toBeGreaterThan(0);
    }

    await page.locator(CART_BUTTON).click();
    for (const [planName, , itemId] of plans) {
      await expect(page.locator(`#${itemId}`)).toBeVisible();
      await expect(page.locator(`#${itemId}`)).toContainText(`Abonnement ${planName}`);
      await expect(page.locator(`#${itemId}`)).toContainText('1');
    }

    const expectedTotal = (49 + 129 + 239).toFixed(2);
    await expect(page.locator('body')).toContainText(`${expectedTotal} €`);
  });
});
