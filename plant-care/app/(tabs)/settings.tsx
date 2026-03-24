import { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Colors } from '../../constants/colors';
import { getSettings, saveSettings, AppSettings } from '../../storage/settings';
import { scheduleAllNotifications } from '../../utils/notifications';

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => i);

export default function SettingsScreen() {
  const [settings, setSettings] = useState<AppSettings | null>(null);

  useFocusEffect(
    useCallback(() => {
      getSettings().then(setSettings);
    }, [])
  );

  async function updateSettings(patch: Partial<AppSettings>) {
    if (!settings) return;
    const updated = { ...settings, ...patch };
    setSettings(updated);
    await saveSettings(updated);
    await scheduleAllNotifications();
  }

  if (!settings) return null;

  const timeString = `${settings.reminderHour.toString().padStart(2, '0')}:${settings.reminderMinute.toString().padStart(2, '0')}`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Notifications</Text>

      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingLabel}>Enable Notifications</Text>
          <Text style={styles.settingDescription}>
            Get reminders when plants need care
          </Text>
        </View>
        <Switch
          value={settings.notificationsEnabled}
          onValueChange={(value) =>
            updateSettings({ notificationsEnabled: value })
          }
          trackColor={{ false: Colors.border, true: Colors.primaryLight }}
          thumbColor={Colors.white}
        />
      </View>

      {settings.notificationsEnabled && (
        <>
          <Text style={styles.settingLabel}>Reminder Time</Text>
          <Text style={styles.settingDescription}>
            Current: {timeString}
          </Text>
          <View style={styles.timeGrid}>
            {HOUR_OPTIONS.map((hour) => {
              const isSelected = hour === settings.reminderHour;
              return (
                <TouchableOpacity
                  key={hour}
                  style={[styles.timeChip, isSelected && styles.timeChipSelected]}
                  onPress={() => updateSettings({ reminderHour: hour, reminderMinute: 0 })}
                >
                  <Text
                    style={[
                      styles.timeChipText,
                      isSelected && styles.timeChipTextSelected,
                    ]}
                  >
                    {hour.toString().padStart(2, '0')}:00
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  timeChip: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timeChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timeChipText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  timeChipTextSelected: {
    color: Colors.white,
  },
});
