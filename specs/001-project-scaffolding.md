# Spec 001: Project Scaffolding

## Status: COMPLETE

## Summary

Initialize the React Native + Expo project with TypeScript, set up navigation structure with Expo Router, and create the basic app shell with tab navigation.

## Motivation

Before building any features, we need a solid project foundation with navigation, basic theming, and the core screen structure in place.

## Requirements

1. Initialize Expo project with TypeScript template
2. Set up Expo Router with tab-based navigation
3. Create placeholder screens: Home (My Plants), Add Plant, Plant Detail, Settings
4. Set up a simple green-themed color palette
5. Add app icon placeholder and splash screen config

## Acceptance Criteria

- [x] Running `npx expo start` launches the app without errors
- [x] Tab navigation shows "My Plants", "Add Plant", and "Settings" tabs
- [x] Tapping each tab navigates to its respective screen
- [x] Each screen displays its name as a title
- [x] TypeScript is configured and compiles without errors
- [x] Project uses Expo SDK 52+

## Out of Scope

- Actual plant data or functionality
- Backend/API integration
- Authentication

## Completion Signal

When all acceptance criteria above are met, mark this spec as complete.

<!-- NR_OF_TRIES: 1 -->
