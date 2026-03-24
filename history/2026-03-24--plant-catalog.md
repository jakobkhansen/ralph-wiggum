# Spec 002: Plant Catalog — Completion Notes

**Date:** 2026-03-24

## What was done
- Installed `expo-image-picker` and `@react-native-async-storage/async-storage`
- Created `types/plant.ts` with Plant interface (id, name, species, location, photoUri, createdAt)
- Created `storage/plants.ts` with getPlants, savePlant, getPlantById functions
- Built Add Plant form with image picker, text inputs, and validation
- Built Home screen with FlatList of plant cards + empty state
- Built Plant Detail screen loading plant data by ID with dynamic header title
- Added `.npmrc` with `legacy-peer-deps=true` to work around peer dep conflicts

## Decisions
- Used `Date.now().toString()` for plant IDs (simple, unique enough for local storage)
- Used `useFocusEffect` to refresh plant list when navigating back to home

## Issues
- Peer dependency conflict between react 19.2.0 and react-dom 19.2.4 — resolved with `--legacy-peer-deps`
