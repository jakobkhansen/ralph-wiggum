# Spec 003: Watering & Care Schedules — Completion Notes

**Date:** 2026-03-24

## What was done
- Extended Plant type with `wateringFrequencyDays`, `fertilizingFrequencyDays`, `lastWatered`, `lastFertilized`
- Added `updatePlant` to storage layer
- Created `utils/schedule.ts` with `daysUntilNext`, `needsWater`, `needsFertilizer`
- Added watering/fertilizing frequency inputs to Add Plant form
- Added "Needs Water" / "Needs Fertilizer" badges to home screen cards
- Added "Today's Tasks" summary header to home screen FlatList
- Added schedule cards with countdown and "Water Now" / "Fertilize Now" buttons to Plant Detail

## Decisions
- When a plant is first added with a schedule, `lastWatered`/`lastFertilized` defaults to creation time
- Badge shows when `daysUntilNext <= 0` (due today or overdue)
