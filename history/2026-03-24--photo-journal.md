# Spec 005: Photo Journal — Completion Notes

**Date:** 2026-03-24

## What was done
- Added `PlantPhoto` type and optional `photos` array to Plant interface
- Added "Add Photo" button to plant detail with image picker
- Built chronological photo timeline on plant detail (sorted by date)
- Each entry shows photo, date, and delete button
- Created `/photo-viewer` screen with pinch-to-zoom via gesture-handler ScrollView
- Delete with confirmation dialog, updates stored plant

## Decisions
- Photos stored as URIs in the Plant's `photos` array (simple, co-located with plant data)
- Used `react-native-gesture-handler` ScrollView with `maximumZoomScale` for pinch-to-zoom
- Photo viewer is a separate stack screen (not modal) for simplicity
