import { Stack } from 'expo-router';
import { Colors } from '../constants/colors';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="plant/[id]"
        options={{ title: 'Plant Detail' }}
      />
    </Stack>
  );
}
