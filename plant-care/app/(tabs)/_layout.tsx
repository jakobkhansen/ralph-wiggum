import { Tabs } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tabBarActive,
        tabBarInactiveTintColor: Colors.tabBarInactive,
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: Colors.white },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Plants',
          tabBarLabel: 'My Plants',
        }}
      />
      <Tabs.Screen
        name="add-plant"
        options={{
          title: 'Add Plant',
          tabBarLabel: 'Add Plant',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
        }}
      />
    </Tabs>
  );
}
