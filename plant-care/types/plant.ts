export interface PlantPhoto {
  id: string;
  uri: string;
  takenAt: string;
}

export interface Plant {
  id: string;
  name: string;
  species: string;
  location: string;
  photoUri: string | null;
  createdAt: string;
  wateringFrequencyDays: number | null;
  fertilizingFrequencyDays: number | null;
  lastWatered: string | null;
  lastFertilized: string | null;
  photos?: PlantPhoto[];
}
