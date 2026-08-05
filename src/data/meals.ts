import { Meal, Goal } from '../types';

// Import newly generated high-end campaign images
import chickenBowlImg from '../assets/images/orvyn_chicken_bowl_1782735030457.jpg';
import beefBowlImg from '../assets/images/orvyn_beef_bowl_1782735043470.jpg';
import salmonBowlImg from '../assets/images/orvyn_salmon_bowl_1782735057049.jpg';
import veggieBowlImg from '../assets/images/orvyn_veggie_bowl_1782735070777.jpg';
import vanillaShakerImg from '../assets/images/orvyn_vanilla_shaker_1782735083859.jpg';
import chocolateShakerImg from '../assets/images/orvyn_chocolate_shaker_1782735097707.jpg';
import matchaShakerImg from '../assets/images/orvyn_matcha_shaker_1782735114575.jpg';
import coffeeShakerImg from '../assets/images/orvyn_coffee_shaker_1782735128236.jpg';
import brownieImg from '../assets/images/orvyn_brownie_pack_1782735143468.jpg';
import cookieImg from '../assets/images/orvyn_cookie_pack_1782735156183.jpg';
import energyBallsImg from '../assets/images/orvyn_energy_balls_1782735171114.jpg';

export const GOALS_DATABASE: Goal[] = [
  {
    id: 'Prise de masse',
    name: 'Prise de Masse',
    description: 'Surplus calorique sain et contrôlé pour optimiser l\'hypertrophie musculaire.',
    iconName: 'Dumbbell',
    caloriesTarget: '2800 - 3500 kcal',
    macrosRatio: { proteins: 30, carbs: 50, lipids: 20 }
  },
  {
    id: 'Perte de poids',
    name: 'Perte de Poids',
    description: 'Déficit énergétique en maintenant un apport élevé en protéines pour préserver les muscles.',
    iconName: 'TrendingDown',
    caloriesTarget: '1400 - 1800 kcal',
    macrosRatio: { proteins: 40, carbs: 30, lipids: 30 }
  },
  {
    id: 'Sèche',
    name: 'Sèche',
    description: 'Optimisation de la définition musculaire et élimination de la rétention d\'eau.',
    iconName: 'Flame',
    caloriesTarget: '1700 - 2100 kcal',
    macrosRatio: { proteins: 45, carbs: 20, lipids: 35 }
  },
  {
    id: 'Maintien',
    name: 'Maintien Équilibré',
    description: 'Stabilisation du poids corporel en optimisant la vitalité et l\'équilibre métabolique.',
    iconName: 'Scale',
    caloriesTarget: '2000 - 2400 kcal',
    macrosRatio: { proteins: 30, carbs: 40, lipids: 30 }
  },
  {
    id: 'Performance',
    name: 'Performance Force',
    description: 'Carburant d\'élite pour maximiser votre explosivité, force maximale et endurance.',
    iconName: 'Zap',
    caloriesTarget: '2500 - 3000 kcal',
    macrosRatio: { proteins: 35, carbs: 45, lipids: 20 }
  },
  {
    id: 'Récupération',
    name: 'Récupération Musculaire',
    description: 'Reconstruction rapide des fibres musculaires et réapprovisionnement en glycogène.',
    iconName: 'Activity',
    caloriesTarget: '2200 - 2600 kcal',
    macrosRatio: { proteins: 40, carbs: 40, lipids: 20 }
  }
];

export const MEALS_DATABASE: Meal[] = [
  // --- SIGNATURE BOWLS (12.90 €) ---
  {
    id: 'bowl-chicken',
    slug: 'bowl-chicken',
    name: 'Power Chicken Bowl',
    category: 'Bowls',
    subCategory: 'Déjeuner',
    description: 'Suprême de poulet fermier grillé au thym, servi dans notre bowl noir mat signature. Riz basmati sauvage bio, avocat fondant, patates douces dorées au four, pousses d\'épinards et graines de sésame noir torréfiées.',
    image: chickenBowlImg,
    proteins: 52,
    carbs: 60,
    lipids: 14,
    calories: 574,
    price: 12.90,
    goals: ['Prise de masse', 'Performance', 'Maintien', 'Récupération'],
    tags: ['Halal', 'Sans gluten', 'Sans lactose', 'Riches en protéines'],
    ingredients: ['Blanc de poulet fermier d\'origine France', 'Riz sauvage bio', 'Patate douce rôtie', 'Avocat Haas frais', 'Pousses d\'épinards bio', 'Sésame noir'],
    allergens: ['Sésame']
  },
  {
    id: 'bowl-beef',
    slug: 'bowl-beef',
    name: 'Beef Performance Bowl',
    category: 'Bowls',
    subCategory: 'Dîner',
    description: 'Émincé de bœuf grillé d\'exception mariné au tamari et servi dans le bowl noir mat ORVYN. Accompagné de quinoa rouge et blanc, têtes de brocolis vapeur croquantes, graines de courge et un filet d\'huile de lin.',
    image: beefBowlImg,
    proteins: 55,
    carbs: 58,
    lipids: 16,
    calories: 596,
    price: 12.90,
    goals: ['Prise de masse', 'Performance', 'Récupération'],
    tags: ['Halal', 'Riches en protéines', 'Sans lactose'],
    ingredients: ['Bœuf haché bio 5% MG d\'origine française', 'Quinoa rouge et blanc premium', 'Têtes de brocoli vapeur', 'Graines de courge bio', 'Huile de lin pressée à froid'],
    allergens: ['Soja']
  },
  {
    id: 'bowl-salmon',
    slug: 'bowl-salmon',
    name: 'Salmon Recovery Bowl',
    category: 'Bowls',
    subCategory: 'Déjeuner',
    description: 'Pavé de saumon frais rôti à basse température dans son écrin noir mat ORVYN. Asperges vertes rôties, lentilles corail parfumées au curcuma, dés de mangue fraîche pour une recharge optimale en antioxydants et jus de citron vert.',
    image: salmonBowlImg,
    proteins: 45,
    carbs: 42,
    lipids: 22,
    calories: 546,
    price: 12.90,
    goals: ['Récupération', 'Performance', 'Maintien', 'Sèche'],
    tags: ['Sans gluten', 'Sans lactose', 'Riches en protéines'],
    ingredients: ['Pavé de saumon Atlantique Label Rouge', 'Lentilles corail bio', 'Asperges vertes fraîches', 'Mangue fraîche', 'Huile d\'olive vierge extra', 'Citron vert'],
    allergens: ['Poisson']
  },
  {
    id: 'bowl-veggie',
    slug: 'bowl-veggie',
    name: 'Veggie Protein Bowl',
    category: 'Bowls',
    subCategory: 'Dîner',
    description: 'Dés de tempeh bio grillés et marinés au gingembre frais, pois chiches rôtis croustillants, quinoa bio tricolore et cubes de butternut rôtis, sublimés par une sauce tahini-citron artisanale.',
    image: veggieBowlImg,
    proteins: 38,
    carbs: 52,
    lipids: 12,
    calories: 468,
    price: 12.90,
    goals: ['Perte de poids', 'Sèche', 'Maintien', 'Récupération'],
    tags: ['Vegan', 'Végétarien', 'Sans gluten', 'Sans lactose', 'Faibles calories'],
    ingredients: ['Tempeh de soja fermenté bio', 'Quinoa tricolore bio', 'Pois chiches rôtis', 'Butternut rôtie au four', 'Tahini (pâte de sésame)', 'Jus de citron'],
    allergens: ['Soja', 'Sésame']
  },

  // --- SIGNATURE PROTEIN SHAKERS (4.90 €) ---
  {
    id: 'shake-vanille',
    slug: 'shake-vanille',
    name: 'Whey Vanille',
    category: 'Shakers',
    subCategory: 'Suppléments',
    description: 'Isolat de protéine de lactosérum natif filtré à froid, infusé à la véritable vanille Bourbon de Madagascar. Servi onctueux et glacé dans le Shaker ORVYN noir mat thermo-régulé pour une assimilation immédiate post-workout.',
    image: vanillaShakerImg,
    proteins: 32,
    carbs: 2,
    lipids: 1,
    calories: 145,
    price: 4.90,
    goals: ['Sèche', 'Perte de poids', 'Récupération', 'Maintien', 'Performance'],
    tags: ['Végétarien', 'Sans gluten', 'Riches en protéines', 'Faibles calories'],
    ingredients: ['Isolat de protéine de lactosérum natif 90%', 'Arôme naturel de vanille Bourbon', 'Stevia bio', 'Lécithine de tournesol'],
    allergens: ['Lait']
  },
  {
    id: 'shake-chocolat',
    slug: 'shake-chocolat',
    name: 'Whey Chocolat',
    category: 'Shakers',
    subCategory: 'Suppléments',
    description: 'Whey Isolate d\'élite mélangée à du cacao pur d\'Équateur (85%) pour une onctuosité absolue. Servie glacée avec condensation dans le Shaker ORVYN noir mat. Idéal pour stimuler la synthèse protéique musculaire.',
    image: chocolateShakerImg,
    proteins: 32,
    carbs: 3,
    lipids: 1.5,
    calories: 153,
    price: 4.90,
    goals: ['Prise de masse', 'Performance', 'Récupération', 'Maintien'],
    tags: ['Végétarien', 'Sans gluten', 'Riches en protéines', 'Faibles calories'],
    ingredients: ['Isolat de protéine de lactosérum de lait de pâturage', 'Poudre de cacao brut bio de l\'Équateur 85%', 'Graines de chia moulues', 'Stévia bio'],
    allergens: ['Lait']
  },
  {
    id: 'shake-matcha',
    slug: 'shake-matcha',
    name: 'Matcha Protein Signature',
    category: 'Shakers',
    subCategory: 'Suppléments',
    description: 'Thé Matcha japonais de cérémonie grade A+, isolat de protéine végétale bio et lait d\'amande crémeux. Présenté glacé dans le Shaker noir ORVYN pour un puissant boost métabolique et antioxydant.',
    image: matchaShakerImg,
    proteins: 28,
    carbs: 4,
    lipids: 2,
    calories: 146,
    price: 4.90,
    goals: ['Performance', 'Sèche', 'Récupération', 'Perte de poids'],
    tags: ['Vegan', 'Végétarien', 'Sans gluten', 'Sans lactose', 'Riches en protéines', 'Faibles calories'],
    ingredients: ['Thé vert Matcha cérémoniel du Japon', 'Isolat de protéine de pois jaune bio', 'Protéine de riz brun bio', 'Lait d\'amande sans sucre'],
    allergens: ['Fruits à coque']
  },
  {
    id: 'shake-coffee',
    slug: 'shake-coffee',
    name: 'Café Protein Boost',
    category: 'Shakers',
    subCategory: 'Petit-déjeuner',
    description: 'Double shot de véritable Espresso Arabica d\'Éthiopie infusé à froid (Cold Brew), protéine de pois bio et lait d\'avoine. L\'alliance ultime d\'une énergie caféinée et d\'acides aminés servie glacée dans le Shaker noir mat ORVYN.',
    image: coffeeShakerImg,
    proteins: 26,
    carbs: 8,
    lipids: 2.5,
    calories: 158,
    price: 4.90,
    goals: ['Performance', 'Maintien', 'Sèche', 'Perte de poids'],
    tags: ['Vegan', 'Végétarien', 'Sans lactose', 'Sans gluten', 'Riches en protéines', 'Faibles calories'],
    ingredients: ['Café de spécialité arabica éthiopien', 'Protéine de pois jaune bio fermentée', 'Lait d\'avoine sans gluten', 'Extrait naturel de café', 'Stévia'],
    allergens: []
  },

  // --- SIGNATURE HEALTHY SNACKS (3.90 €) ---
  {
    id: 'snack-brownie',
    slug: 'snack-brownie',
    name: 'Brownie Protéiné',
    category: 'Snacks',
    subCategory: 'Desserts protéinés',
    description: 'Un brownie artisanal dense et fondant élaboré à base de patate douce bio, de beurre d\'amande et de chocolat noir intense (85%). Enrichi en isolat de whey d\'élevage nourri à l\'herbe. Zéro emballage industriel.',
    image: brownieImg,
    proteins: 18,
    carbs: 16,
    lipids: 5,
    calories: 181,
    price: 3.90,
    goals: ['Prise de masse', 'Maintien', 'Récupération', 'Performance'],
    tags: ['Végétarien', 'Sans gluten', 'Riches en protéines'],
    ingredients: ['Patate douce cuite à la vapeur', 'Chocolat de couverture 85% de cacao', 'Beurre d\'amande brut', 'Blanc d\'œuf fermier déshydraté', 'Whey isolate', 'Amandes en poudre'],
    allergens: ['Lait', 'Œufs', 'Fruits à coque']
  },
  {
    id: 'snack-cookie',
    slug: 'snack-cookie',
    name: 'Cookie Protéiné',
    category: 'Snacks',
    subCategory: 'Desserts protéinés',
    description: 'Le cookie d\'athlète par excellence : flocons d\'avoine bio complets, beurre de cacahuète crémeux 100% naturel et pépites de chocolat noir bio sans sucre ajouté, enrichi en protéines végétales bio.',
    image: cookieImg,
    proteins: 20,
    carbs: 22,
    lipids: 9,
    calories: 249,
    price: 3.90,
    goals: ['Prise de masse', 'Performance', 'Récupération'],
    tags: ['Vegan', 'Végétarien', 'Sans lactose', 'Riches en protéines'],
    ingredients: ['Beurre de cacahuète maison 100%', 'Avoine sans gluten premium', 'Isolat de soja bio', 'Pépites de chocolat de cacao pur', 'Sirop d\'érable bio'],
    allergens: ['Arachides', 'Soja']
  },
  {
    id: 'snack-balls',
    slug: 'snack-balls',
    name: 'Energy Balls',
    category: 'Snacks',
    subCategory: 'Desserts protéinés',
    description: 'Bouchées énergétiques haut de gamme faites à la main. Dattes Medjool bio, beurre d\'amande pure, graines de chia et d\'un soupçon d\'isolat de riz brun, enrobées de fins éclats de coco râpée.',
    image: energyBallsImg,
    proteins: 12,
    carbs: 18,
    lipids: 6,
    calories: 174,
    price: 3.90,
    goals: ['Performance', 'Prise de masse', 'Récupération'],
    tags: ['Vegan', 'Végétarien', 'Sans gluten', 'Sans lactose', 'Faibles calories'],
    ingredients: ['Dattes Medjool bio', 'Amandes brutes d\'Espagne', 'Graines de chia bio', 'Beurre d\'amande bio', 'Isolat de riz brun bio', 'Noix de coco râpée sauvage', 'Sel de Guérande'],
    allergens: ['Fruits à coque']
  }
];
