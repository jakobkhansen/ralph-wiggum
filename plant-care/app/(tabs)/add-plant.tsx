import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';

export default function AddPlantScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Plant</Text>
      <Text style={styles.subtitle}>Add a new plant to your collection.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
