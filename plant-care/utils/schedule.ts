import { Plant } from '../types/plant';

export function daysUntilNext(lastDate: string | null, frequencyDays: number | null): number | null {
  if (!lastDate || !frequencyDays) return null;
  const last = new Date(lastDate);
  const next = new Date(last);
  next.setDate(next.getDate() + frequencyDays);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  next.setHours(0, 0, 0, 0);
  return Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function needsWater(plant: Plant): boolean {
  const days = daysUntilNext(plant.lastWatered, plant.wateringFrequencyDays);
  return days !== null && days <= 0;
}

export function needsFertilizer(plant: Plant): boolean {
  const days = daysUntilNext(plant.lastFertilized, plant.fertilizingFrequencyDays);
  return days !== null && days <= 0;
}
