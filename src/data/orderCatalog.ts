export const DISH_CATALOG: Record<string, { name: string; price: number }> = {
  'bowl-chicken': { name: 'Power Chicken Bowl', price: 12.9 },
  'bowl-beef': { name: 'Beef Performance Bowl', price: 12.9 },
  'bowl-salmon': { name: 'Salmon Recovery Bowl', price: 12.9 },
  'bowl-veggie': { name: 'Veggie Protein Bowl', price: 12.9 },
  'shake-vanille': { name: 'Whey Vanille', price: 4.9 },
  'shake-chocolat': { name: 'Whey Chocolat', price: 4.9 },
  'shake-matcha': { name: 'Matcha Protein Signature', price: 4.9 },
  'shake-coffee': { name: 'Café Protein Boost', price: 4.9 },
  'snack-brownie': { name: 'Brownie Protéiné', price: 3.9 },
  'snack-cookie': { name: 'Cookie Protéiné', price: 3.9 },
  'snack-balls': { name: 'Energy Balls', price: 3.9 },
};

export const SUBSCRIPTION_CATALOG: Record<string, { name: string; price: number; plan: string }> = {
  'start': { name: 'Abonnement Start', price: 49, plan: 'start' },
  'pro': { name: 'Abonnement Pro', price: 129, plan: 'pro' },
  'elite': { name: 'Abonnement Élite', price: 239, plan: 'elite' },
};

export function getCatalogItem(item: { id: string; type: 'dish' | 'subscription'; slug?: string; plan?: string }) {
  if (item.type === 'dish') {
    const key = item.slug || item.id;
    return DISH_CATALOG[key];
  }
  const key = item.plan || item.id.replace('subscription-', '');
  return SUBSCRIPTION_CATALOG[key];
}
