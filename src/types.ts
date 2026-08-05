export interface Meal {
  id: string;
  slug: string;
  name: string;
  category: 'Bowls' | 'Shakers' | 'Snacks' | 'Abonnements';
  subCategory?: string; // 'Petit-déjeuner' | 'Déjeuner' | 'Dîner' | 'Desserts protéinés' | 'Suppléments'
  name_en?: string;
  description: string;
  image: string;
  proteins: number;
  carbs: number;
  lipids: number;
  calories: number;
  price: number;
  goals: string[]; // ['Prise de masse', 'Sèche', 'Perte de poids', 'Maintien', 'Performance', 'Récupération']
  tags: string[];  // ['Halal', 'Vegan', 'Végétarien', 'Sans gluten', 'Sans lactose', 'Sans porc', 'Riches en protéines', 'Faibles calories']
  ingredients: string[];
  allergens: string[];
}

export interface CartItem {
  id: string;
  type: 'dish' | 'subscription';
  name: string;
  price: number;
  quantity: number;
  slug?: string;
  plan?: string;
  billingPeriod?: 'monthly';
  meal?: Meal;
}

export interface Goal {
  id: string;
  name: string;
  description: string;
  iconName: string; // lucide icon name
  caloriesTarget: string;
  macrosRatio: {
    proteins: number;
    carbs: number;
    lipids: number;
  };
}

export interface Gym {
  id: string;
  name: string;
  address: string;
  city: string;
  pickupHours: string;
  status: 'active' | 'maintenance';
  lockerStandCode: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'promo' | 'system';
}

export interface UserProfile {
  name: string;
  email: string;
  role: 'user' | 'admin';
  goal: string;
  weight: number;
  height: number;
  partnerGymId: string;
  favorites: string[]; // list of mealIds
  notifications: NotificationItem[];
}

export interface Order {
  id: string;
  reference: string;
  date: string;
  gymName: string;
  pickupTime: string;
  status?: 'pending' | 'preparing' | 'ready' | 'collected';
  pickupCode?: string;
  items: CartItem[];
  total: number;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  description: string;
}
