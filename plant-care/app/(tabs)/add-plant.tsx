import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { savePlant } from '../../storage/plants';
import { Plant } from '../../types/plant';

export default function AddPlantScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [location, setLocation] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [wateringDays, setWateringDays] = useState('');
  const [fertilizingDays, setFertilizingDays] = useState('');

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  async function handleSave() {
    if (!name.trim()) {
      Alert.alert('Missing name', 'Please enter a name for your plant.');
      return;
    }

    const now = new Date().toISOString();
    const waterFreq = wateringDays ? parseInt(wateringDays, 10) : null;
    const fertFreq = fertilizingDays ? parseInt(fertilizingDays, 10) : null;

    const plant: Plant = {
      id: Date.now().toString(),
      name: name.trim(),
      species: species.trim(),
      location: location.trim(),
      photoUri,
      createdAt: now,
      wateringFrequencyDays: waterFreq && waterFreq > 0 ? waterFreq : null,
      fertilizingFrequencyDays: fertFreq && fertFreq > 0 ? fertFreq : null,
      lastWatered: waterFreq && waterFreq > 0 ? now : null,
      lastFertilized: fertFreq && fertFreq > 0 ? now : null,
    };

    await savePlant(plant);
    setName('');
    setSpecies('');
    setLocation('');
    setPhotoUri(null);
    setWateringDays('');
    setFertilizingDays('');
    Alert.alert('Plant added!', `${plant.name} has been added to your collection.`);
    router.navigate('/(tabs)');
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoPlaceholderText}>+ Add Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Plant Name *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. My Monstera"
          placeholderTextColor={Colors.textSecondary}
        />

        <Text style={styles.label}>Species</Text>
        <TextInput
          style={styles.input}
          value={species}
          onChangeText={setSpecies}
          placeholder="e.g. Monstera deliciosa"
          placeholderTextColor={Colors.textSecondary}
        />

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="e.g. Living room"
          placeholderTextColor={Colors.textSecondary}
        />

        <Text style={styles.sectionHeader}>Care Schedule</Text>

        <Text style={styles.label}>Water every (days)</Text>
        <TextInput
          style={styles.input}
          value={wateringDays}
          onChangeText={setWateringDays}
          placeholder="e.g. 7"
          placeholderTextColor={Colors.textSecondary}
          keyboardType="number-pad"
        />

        <Text style={styles.label}>Fertilize every (days)</Text>
        <TextInput
          style={styles.input}
          value={fertilizingDays}
          onChangeText={setFertilizingDays}
          placeholder="e.g. 30"
          placeholderTextColor={Colors.textSecondary}
          keyboardType="number-pad"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Plant</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
  },
  photoButton: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  photoPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholderText: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 6,
    marginTop: 12,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 24,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: Colors.text,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
