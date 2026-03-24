import { StyleSheet, Image, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function PhotoViewerScreen() {
  const { uri, date } = useLocalSearchParams<{ uri: string; date: string }>();
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: date ? new Date(date).toLocaleDateString() : 'Photo',
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <ScrollView
          maximumZoomScale={5}
          minimumZoomScale={1}
          centerContent
          contentContainerStyle={styles.scrollContent}
        >
          {uri ? (
            <Image
              source={{ uri }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : null}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.8,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
