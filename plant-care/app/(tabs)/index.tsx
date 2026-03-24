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

export default function MyPlantsScreen() {
  const router = useRouter();
  const [plants, setPlants] = useState<Plant[]>([]);

  useFocusEffect(
    useCallback(() => {
      getPlants().then(setPlants);
    }, [])
  );

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
      renderItem={({ item }) => (
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
          </View>
        </TouchableOpacity>
      )}
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
});
