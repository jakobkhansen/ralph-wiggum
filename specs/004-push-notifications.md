# Spec 004: Push Notifications

## Summary

Send local push notifications to remind users when plants need watering or fertilizing.

## Motivation

Users won't open the app every day. Notifications are what make this app actually useful — proactive reminders.

## Requirements

1. Use expo-notifications for local push notifications
2. Schedule notifications based on each plant's watering/fertilizing schedule
3. Notification shows plant name and what it needs (water/fertilizer)
4. Tapping a notification opens the app to that plant's detail screen
5. Settings screen: toggle notifications on/off, set preferred reminder time (e.g., 8:00 AM)
6. Reschedule notifications when user waters/fertilizes a plant or changes frequency

## Acceptance Criteria

- [ ] App requests notification permissions on first launch
- [ ] Notifications fire at the correct time for plants needing water
- [ ] Notifications fire at the correct time for plants needing fertilizer
- [ ] Tapping a notification navigates to the correct plant detail screen
- [ ] Settings screen allows toggling notifications on/off
- [ ] Settings screen allows setting preferred reminder time
- [ ] Notifications are rescheduled when "Water Now" or "Fertilize Now" is tapped
