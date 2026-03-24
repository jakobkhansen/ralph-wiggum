import * as Notifications from 'expo-notifications';
import { Plant } from '../types/plant';
import { getPlants } from '../storage/plants';
import { getSettings } from '../storage/settings';
import { daysUntilNext } from './schedule';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestPermissions(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleAllNotifications(): Promise<void> {
  const settings = await getSettings();
  if (!settings.notificationsEnabled) {
    await Notifications.cancelAllScheduledNotificationsAsync();
    return;
  }

  await Notifications.cancelAllScheduledNotificationsAsync();

  const plants = await getPlants();
  const { reminderHour, reminderMinute } = settings;

  for (const plant of plants) {
    await scheduleForPlant(plant, reminderHour, reminderMinute);
  }
}

async function scheduleForPlant(
  plant: Plant,
  hour: number,
  minute: number
): Promise<void> {
  const waterDays = daysUntilNext(plant.lastWatered, plant.wateringFrequencyDays);
  if (waterDays !== null) {
    const triggerDays = Math.max(waterDays, 0);
    const trigger = getTriggerDate(triggerDays, hour, minute);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `💧 ${plant.name} needs water`,
        body: `Time to water your ${plant.species || 'plant'}!`,
        data: { plantId: plant.id },
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: trigger },
    });
  }

  const fertDays = daysUntilNext(plant.lastFertilized, plant.fertilizingFrequencyDays);
  if (fertDays !== null) {
    const triggerDays = Math.max(fertDays, 0);
    const trigger = getTriggerDate(triggerDays, hour, minute);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `🌿 ${plant.name} needs fertilizer`,
        body: `Time to fertilize your ${plant.species || 'plant'}!`,
        data: { plantId: plant.id },
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: trigger },
    });
  }
}

function getTriggerDate(daysFromNow: number, hour: number, minute: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, minute, 0, 0);

  // If the trigger time is in the past, schedule for tomorrow
  if (date.getTime() <= Date.now()) {
    date.setDate(date.getDate() + 1);
  }

  return date;
}
