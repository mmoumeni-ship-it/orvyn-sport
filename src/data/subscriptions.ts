import { Meal } from '../types';
import abonnementOrvyn from '../assets/images/abonnement-orvyn.svg';

export const SUBSCRIPTIONS: Meal[] = [
  {
    id: 'abonnement-start',
    slug: 'abonnement-start',
    name: 'Abonnement Start',
    category: 'Abonnements',
    subCategory: 'Membre',
    description: 'Idéal pour les athlètes s\'entraînant 1 à 2 fois par semaine : 5 crédits repas gastronomiques par mois et accès illimité aux casiers connectés.',
    image: abonnementOrvyn,
    proteins: 0,
    carbs: 0,
    lipids: 0,
    calories: 0,
    price: 49,
    goals: ['Maintien'],
    tags: ['Abonnement'],
    ingredients: ['5 crédits repas / mois', 'Accès illimité aux casiers connectés', 'Fiches macros nutritionnelles', 'Support client standard par e-mail'],
    allergens: []
  },
  {
    id: 'abonnement-pro',
    slug: 'abonnement-pro',
    name: 'Abonnement Pro',
    category: 'Abonnements',
    subCategory: 'Membre',
    description: 'Le plan ultime pour les sportifs réguliers : 15 crédits repas gastronomiques par mois, support diététique par chat et personnalisation légère des ingrédients.',
    image: abonnementOrvyn,
    proteins: 0,
    carbs: 0,
    lipids: 0,
    calories: 0,
    price: 129,
    goals: ['Performance'],
    tags: ['Abonnement'],
    ingredients: ['15 crédits repas / mois', 'Accès illimité aux casiers connectés', 'Fiches macros nutritionnelles', 'Support diététique par chat intégré', 'Personnalisation légère des ingrédients', 'Badge membre Prioritaire'],
    allergens: []
  },
  {
    id: 'abonnement-elite',
    slug: 'abonnement-elite',
    name: 'Abonnement Élite',
    category: 'Abonnements',
    subCategory: 'Membre',
    description: 'Destiné aux athlètes exigeants : 30 crédits repas par mois, suivi hebdomadaire avec un coach nutritionniste dédié et personnalisation complète sur-mesure.',
    image: abonnementOrvyn,
    proteins: 0,
    carbs: 0,
    lipids: 0,
    calories: 0,
    price: 239,
    goals: ['Performance', 'Récupération'],
    tags: ['Abonnement'],
    ingredients: ['30 crédits repas / mois', 'Réservation garantie des casiers aux heures de pointe', 'Suivi hebdomadaire avec un coach nutritionniste dédié', 'Personnalisation complète sur-mesure', 'Accès prioritaire aux nouvelles recettes', 'Invitations exclusives aux masterclasses ORVYN'],
    allergens: []
  }
];

export function findSubscription(planName: string): Meal | undefined {
  const key = planName.toLowerCase();
  return SUBSCRIPTIONS.find((sub) => sub.id.includes(key));
}
