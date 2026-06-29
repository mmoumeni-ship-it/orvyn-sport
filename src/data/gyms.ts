import { Gym } from '../types';

export const GYMS_DATABASE: Gym[] = [
  {
    id: 'gym-1',
    name: 'ORVYN Lounge - Paris 8 Courcelles',
    address: '82 Rue de Courcelles',
    city: 'Paris (75008)',
    pickupHours: '07:00 - 22:30',
    status: 'active',
    lockerStandCode: 'STAND-ORVYN-ALPHA'
  },
  {
    id: 'gym-2',
    name: 'Boutique L\'Étoile - Lyon Presqu\'île',
    address: '15 Rue de la République',
    city: 'Lyon (69002)',
    pickupHours: '08:00 - 21:00',
    status: 'active',
    lockerStandCode: 'STAND-ORVYN-BETA'
  },
  {
    id: 'gym-3',
    name: 'ORVYN Performance Hub - Marseille Prado',
    address: '142 Avenue du Prado',
    city: 'Marseille (13008)',
    pickupHours: '06:00 - 23:00',
    status: 'active',
    lockerStandCode: 'STAND-ORVYN-GAMMA'
  },
  {
    id: 'gym-4',
    name: 'Concept Space - Toulouse Capitole',
    address: '4 Place du Capitole',
    city: 'Toulouse (31000)',
    pickupHours: '07:30 - 22:00',
    status: 'active',
    lockerStandCode: 'STAND-ORVYN-DELTA'
  }
];
