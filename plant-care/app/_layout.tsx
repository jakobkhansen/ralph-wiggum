import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { Colors } from '../constants/colors';
import { requestPermissions, scheduleAllNotifications } from '../utils/notifications';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    requestPermissions().then(() => {
      scheduleAllNotifications();
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const plantId = response.notification.request.content.data?.plantId;
        if (plantId) {
          router.push(`/plant/${plantId}`);
        }
      }
    );

    return () => subscription.remove();
  }, []);

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
      <Stack.Screen
        name="photo-viewer"
        options={{
          title: 'Photo',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}
