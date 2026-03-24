import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import { getPlantById, updatePlant } from '../../storage/plants';
import { Plant, PlantPhoto } from '../../types/plant';
import { daysUntilNext } from '../../utils/schedule';
import { scheduleAllNotifications } from '../../utils/notifications';

export default function PlantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPlantById(id).then((p) => {
        setPlant(p ?? null);
        setLoading(false);
      });
    }
  }, [id]);

  async function handleWaterNow() {
    if (!plant) return;
    const updated = { ...plant, lastWatered: new Date().toISOString() };
    await updatePlant(updated);
    setPlant(updated);
    await scheduleAllNotifications();
  }

  async function handleFertilizeNow() {
    if (!plant) return;
    const updated = { ...plant, lastFertilized: new Date().toISOString() };
    await updatePlant(updated);
    setPlant(updated);
    await scheduleAllNotifications();
  }

  async function handleAddPhoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0] || !plant) return;

    const newPhoto: PlantPhoto = {
      id: Date.now().toString(),
      uri: result.assets[0].uri,
      takenAt: new Date().toISOString(),
    };

    const photos = [...(plant.photos || []), newPhoto];
    const updated = { ...plant, photos };
    await updatePlant(updated);
    setPlant(updated);
  }

  function handleDeletePhoto(photoId: string) {
    if (!plant) return;
    Alert.alert('Delete Photo', 'Are you sure you want to delete this photo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const photos = (plant.photos || []).filter((p) => p.id !== photoId);
          const updated = { ...plant, photos };
          await updatePlant(updated);
          setPlant(updated);
        },
      },
    ]);
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!plant) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Plant not found.</Text>
      </View>
    );
  }

  const waterDays = daysUntilNext(plant.lastWatered, plant.wateringFrequencyDays);
  const fertDays = daysUntilNext(plant.lastFertilized, plant.fertilizingFrequencyDays);
  const photos = [...(plant.photos || [])].sort(
    (a, b) => new Date(a.takenAt).getTime() - new Date(b.takenAt).getTime()
  );

  function formatCountdown(days: number | null): string {
    if (days === null) return 'Not set';
    if (days <= 0) return 'Now!';
    if (days === 1) return 'Tomorrow';
    return `In ${days} days`;
  }

  return (
    <>
      <Stack.Screen options={{ title: plant.name }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {plant.photoUri ? (
          <Image source={{ uri: plant.photoUri }} style={styles.photo} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoPlaceholderText}>🌿</Text>
          </View>
        )}

        <Text style={styles.name}>{plant.name}</Text>

        {plant.species ? (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Species</Text>
            <Text style={styles.infoValue}>{plant.species}</Text>
          </View>
        ) : null}

        {plant.location ? (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>{plant.location}</Text>
          </View>
        ) : null}

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Added</Text>
          <Text style={styles.infoValue}>
            {new Date(plant.createdAt).toLocaleDateString()}
          </Text>
        </View>

        {plant.wateringFrequencyDays != null && (
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleHeader}>
              <Text style={styles.scheduleIcon}>💧</Text>
              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleTitle}>Next Watering</Text>
                <Text
                  style={[
                    styles.scheduleCountdown,
                    waterDays !== null && waterDays <= 0 && styles.overdue,
                  ]}
                >
                  {formatCountdown(waterDays)}
                </Text>
                <Text style={styles.scheduleFrequency}>
                  Every {plant.wateringFrequencyDays} days
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={handleWaterNow}>
              <Text style={styles.actionButtonText}>💧 Water Now</Text>
            </TouchableOpacity>
          </View>
        )}

        {plant.fertilizingFrequencyDays != null && (
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleHeader}>
              <Text style={styles.scheduleIcon}>🌿</Text>
              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleTitle}>Next Fertilizing</Text>
                <Text
                  style={[
                    styles.scheduleCountdown,
                    fertDays !== null && fertDays <= 0 && styles.overdue,
                  ]}
                >
                  {formatCountdown(fertDays)}
                </Text>
                <Text style={styles.scheduleFrequency}>
                  Every {plant.fertilizingFrequencyDays} days
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={handleFertilizeNow}>
              <Text style={styles.actionButtonText}>🌿 Fertilize Now</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Photo Journal */}
        <View style={styles.journalSection}>
          <View style={styles.journalHeader}>
            <Text style={styles.journalTitle}>Photo Journal</Text>
            <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
              <Text style={styles.addPhotoButtonText}>+ Add Photo</Text>
            </TouchableOpacity>
          </View>

          {photos.length === 0 ? (
            <Text style={styles.journalEmpty}>
              No photos yet. Add your first photo to track growth!
            </Text>
          ) : (
            photos.map((photo) => (
              <View key={photo.id} style={styles.journalEntry}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/photo-viewer',
                      params: { uri: photo.uri, date: photo.takenAt },
                    })
                  }
                >
                  <Image source={{ uri: photo.uri }} style={styles.journalPhoto} />
                </TouchableOpacity>
                <View style={styles.journalEntryFooter}>
                  <Text style={styles.journalDate}>
                    {new Date(photo.takenAt).toLocaleDateString()}
                  </Text>
                  <TouchableOpacity onPress={() => handleDeletePhoto(photo.id)}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  photoPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  photoPlaceholderText: {
    fontSize: 64,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '600',
  },
  scheduleCard: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleIcon: {
    fontSize: 32,
    marginRight: 14,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  scheduleCountdown: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 2,
  },
  overdue: {
    color: '#E65100',
  },
  scheduleFrequency: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  actionButton: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  journalSection: {
    width: '100%',
    marginTop: 24,
  },
  journalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  journalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  addPhotoButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  addPhotoButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  journalEmpty: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 20,
  },
  journalEntry: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 14,
  },
  journalPhoto: {
    width: '100%',
    height: 250,
  },
  journalEntryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  journalDate: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  deleteText: {
    fontSize: 14,
    color: '#E53935',
    fontWeight: '600',
  },
});
