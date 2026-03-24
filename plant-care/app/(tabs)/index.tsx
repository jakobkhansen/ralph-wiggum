import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';

export default function MyPlantsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Plants</Text>
      <Text style={styles.subtitle}>Your plant collection will appear here.</Text>
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
