# Spec 002: Plant Catalog & Add Plant

## Status: COMPLETE

## Summary

Allow users to add plants to their collection with name, species, photo, and location. Display all plants on the home screen as a grid/list.

## Motivation

The core value of the app starts with being able to catalog your plants. Users need to add, view, and manage their plant collection.

## Requirements

1. "Add Plant" screen with form: plant name, species (text input), location (e.g., "Living room"), photo (camera or gallery via expo-image-picker)
2. Store plants locally using AsyncStorage
3. Home screen displays all plants as cards in a scrollable list
4. Each card shows: photo thumbnail, plant name, species, location
5. Tapping a plant card navigates to Plant Detail screen

## Acceptance Criteria

- [x] User can fill out the Add Plant form and save a new plant
- [x] Saved plants persist across app restarts (AsyncStorage)
- [x] Home screen shows all saved plants as cards with photo, name, species
- [x] Tapping a plant card opens the detail screen for that plant
- [x] Form validates that plant name is not empty before saving
- [x] Empty state shown on home screen when no plants exist

## Out of Scope

- Watering schedules (next spec)
- Plant species database/autocomplete
- Cloud sync

<!-- NR_OF_TRIES: 1 -->
