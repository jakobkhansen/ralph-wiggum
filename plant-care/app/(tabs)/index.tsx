import { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Colors } from '../../constants/colors';
import { getPlants } from '../../storage/plants';
import { Plant } from '../../types/plant';
import { needsWater, needsFertilizer } from '../../utils/schedule';

export default function MyPlantsScreen() {
  const router = useRouter();
  const [plants, setPlants] = useState<Plant[]>([]);

  useFocusEffect(
    useCallback(() => {
      getPlants().then(setPlants);
    }, [])
  );

  const plantsNeedingWater = plants.filter(needsWater).length;
  const plantsNeedingFertilizer = plants.filter(needsFertilizer).length;
  const totalTasks = plantsNeedingWater + plantsNeedingFertilizer;

  if (plants.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🌱</Text>
        <Text style={styles.emptyTitle}>No plants yet</Text>
        <Text style={styles.emptySubtitle}>
          Add your first plant to get started!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={plants}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      style={styles.container}
      ListHeaderComponent={
        totalTasks > 0 ? (
          <View style={styles.tasksSummary}>
            <Text style={styles.tasksSummaryTitle}>Today's Tasks</Text>
            {plantsNeedingWater > 0 && (
              <Text style={styles.tasksSummaryItem}>
                💧 {plantsNeedingWater} plant{plantsNeedingWater !== 1 ? 's' : ''} need watering
              </Text>
            )}
            {plantsNeedingFertilizer > 0 && (
              <Text style={styles.tasksSummaryItem}>
                🌿 {plantsNeedingFertilizer} plant{plantsNeedingFertilizer !== 1 ? 's' : ''} need fertilizing
              </Text>
            )}
          </View>
        ) : null
      }
      renderItem={({ item }) => {
        const water = needsWater(item);
        const fertilizer = needsFertilizer(item);

        return (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/plant/${item.id}`)}
          >
            {item.photoUri ? (
              <Image source={{ uri: item.photoUri }} style={styles.cardPhoto} />
            ) : (
              <View style={styles.cardPhotoPlaceholder}>
                <Text style={styles.cardPhotoPlaceholderText}>🌿</Text>
              </View>
            )}
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{item.name}</Text>
              {item.species ? (
                <Text style={styles.cardSpecies}>{item.species}</Text>
              ) : null}
              {item.location ? (
                <Text style={styles.cardLocation}>{item.location}</Text>
              ) : null}
              {(water || fertilizer) && (
                <View style={styles.badgeRow}>
                  {water && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>💧 Needs Water</Text>
                    </View>
                  )}
                  {fertilizer && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>🌿 Needs Fertilizer</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  list: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  tasksSummary: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  tasksSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  tasksSummaryItem: {
    fontSize: 15,
    color: Colors.text,
    marginTop: 4,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardPhoto: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  cardPhotoPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPhotoPlaceholderText: {
    fontSize: 28,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  cardName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  cardSpecies: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  cardLocation: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    gap: 6,
  },
  badge: {
    backgroundColor: '#FFF3E0',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 12,
    color: '#E65100',
    fontWeight: '600',
  },
});
