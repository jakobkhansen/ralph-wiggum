# Spec 004: Push Notifications — Completion Notes

**Date:** 2026-03-24

## What was done
- Installed `expo-notifications`
- Created `utils/notifications.ts` with permission request, scheduling logic
- Created `storage/settings.ts` for notification toggle + reminder time
- Updated root layout to request permissions on launch + handle notification taps
- Built Settings screen with notification toggle and hourly time picker grid
- Notifications reschedule on: Water Now, Fertilize Now, Add Plant, settings change
- Added `expo-notifications` plugin to app.json

## Decisions
- Used date-based trigger scheduling (not repeating) since schedules change dynamically
- Cancel all + re-schedule all approach for simplicity
- Hour-only time picker (no minute granularity) for simplicity

## Issues
- expo-notifications SDK 55 requires `shouldShowBanner` and `shouldShowList` in handler
