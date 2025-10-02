import { Service } from '@shared/types';
import { getDay } from 'date-fns';
export const services: Service[] = [
  {
    id: 'svc_01',
    name: 'Signature Haircut',
    description: 'A tailored haircut experience including a wash, cut, and style.',
    duration: 60,
    price: 85,
    image: 'https://images.unsplash.com/photo-1599331834183-2c35a5d87f89?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'svc_02',
    name: 'Luminous Balayage',
    description: 'Hand-painted highlights for a natural, sun-kissed look.',
    duration: 180,
    price: 250,
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897f53?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'svc_03',
    name: 'Deep Conditioning Treatment',
    description: 'An intensive treatment to restore moisture and shine to your hair.',
    duration: 45,
    price: 60,
    image: 'https://images.unsplash.com/photo-1560243563-062da202a57c?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'svc_04',
    name: 'Elegant Updo',
    description: 'A beautiful hairstyle for special occasions, from weddings to galas.',
    duration: 75,
    price: 120,
    image: 'https://images.unsplash.com/photo-1616099397099-f277157e4a93?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'svc_05',
    name: 'Gloss & Tone',
    description: 'Refresh your color and add brilliant shine with a custom gloss.',
    duration: 90,
    price: 150,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'svc_06',
    name: 'Luxury Manicure',
    description: 'A pampering manicure including shaping, cuticle care, massage, and polish.',
    duration: 50,
    price: 55,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536374?q=80&w=2070&auto=format&fit=crop',
  },
];
export function getAvailableTimes(date: Date): string[] {
  // Mock function: returns different times for weekends vs weekdays
  // In a real app, this would check a database for actual availability
  const dayOfWeek = getDay(date); // Sunday = 0, Saturday = 6
  if (dayOfWeek === 0) { // Sunday
    return []; // Closed on Sundays
  }
  const times = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM'
  ];
  if (dayOfWeek === 6) { // Saturday
    return times.slice(0, 8); // Shorter hours on Saturday
  }
  return times;
}