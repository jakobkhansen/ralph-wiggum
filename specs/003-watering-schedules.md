# Spec 003: Watering & Care Schedules

## Status: COMPLETE

## Summary

Add watering and fertilizing schedules to each plant. Show which plants need attention today on the home screen.

## Motivation

The main value proposition — users shouldn't have to remember when to water each plant. The app tells them.

## Requirements

1. When adding/editing a plant, set watering frequency (every N days) and fertilizing frequency (every N days)
2. Track last watered/fertilized date per plant
3. Home screen shows a "Needs Water" badge on plants due for watering today
4. Plant detail screen shows: days until next watering, days until next fertilizing, "Water Now" and "Fertilize Now" buttons
5. Tapping "Water Now" records today as the last watered date and resets the countdown
6. A "Today's Tasks" summary section at the top of home screen showing count of plants needing water/fertilizer

## Acceptance Criteria

- [x] User can set watering frequency (days) when adding a plant
- [x] User can set fertilizing frequency (days) when adding a plant
- [x] Home screen shows badge/indicator on plants that need watering today
- [x] Plant detail shows accurate countdown to next watering and fertilizing
- [x] "Water Now" button resets the watering countdown
- [x] "Fertilize Now" button resets the fertilizing countdown
- [x] "Today's Tasks" section shows correct count of plants needing attention
- [x] Schedule data persists across app restarts

<!-- NR_OF_TRIES: 1 -->
