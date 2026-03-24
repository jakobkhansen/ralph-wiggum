import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plant } from '../types/plant';

const PLANTS_KEY = 'plants';

export async function getPlants(): Promise<Plant[]> {
  const json = await AsyncStorage.getItem(PLANTS_KEY);
  return json ? JSON.parse(json) : [];
}

export async function savePlant(plant: Plant): Promise<void> {
  const plants = await getPlants();
  plants.push(plant);
  await AsyncStorage.setItem(PLANTS_KEY, JSON.stringify(plants));
}

export async function getPlantById(id: string): Promise<Plant | undefined> {
  const plants = await getPlants();
  return plants.find((p) => p.id === id);
}
