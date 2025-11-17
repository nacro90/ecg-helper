# EKG Helper - ECG Origin Localization Application

A clinical decision support application for cardiac electrophysiologists to identify the anatomical origin of idiopathic ventricular arrhythmias using 12-lead ECG analysis.

## Overview

EKG Helper provides a systematic, step-by-step workflow to analyze ECG patterns and predict the anatomical origin of ventricular arrhythmias. The app guides clinicians through:

1. **QRS Duration Screening**: Initial assessment (>120 ms requirement)
2. **Vertical Axis Determination**: Analysis of leads II, III, and aVF
3. **Horizontal Axis Determination**: Analysis of lead I and BBB pattern
4. **Quadrant Assignment**: Localization to one of four anatomical quadrants
5. **Refined Localization**: Detailed site prediction with confidence levels
6. **Results & Differential Diagnosis**: Primary site with alternatives

## Features

### Phase 1 (MVP - Current)

- ✅ Manual 12-lead ECG data entry
- ✅ Step-by-step guided analysis workflow
- ✅ Pattern matching for 15-20 common anatomical sites
- ✅ Confidence level indicators (High/Moderate/Low)
- ✅ Differential diagnoses with supporting evidence
- ✅ Case saving and history management
- ✅ Clinical implications and ablation approach recommendations

### Phase 2 (Planned)

- 📋 Image and PDF upload with OCR
- 📋 Teaching mode with educational content
- 📋 Enhanced 3D anatomical visualizations
- 📋 Advanced reporting and export features

### Phase 3 (Future)

- 📋 EMR system integration
- 📋 Outcome tracking
- 📋 Multi-institutional case sharing

## Tech Stack

- **Framework**: React Native 0.81 + Expo
- **Language**: TypeScript (strict mode)
- **Navigation**: React Navigation v7 + Expo Router
- **State Management**: Zustand
- **UI Library**: React Native Paper
- **Forms**: React Hook Form
- **Validation**: Zod
- **Database**: Expo SQLite
- **Storage**: AsyncStorage

## Prerequisites

- Node.js >= 20.16.0 (recommended: 20.19.4+)
- npm >= 10.2.4
- iOS Simulator (for iOS development)
- Android Studio + Android Emulator (for Android development)
- Expo CLI

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ekg-helper
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on a platform**
   - iOS: `npm run ios`
   - Android: `npm run android`
   - Web: `npm run web`

## Development Scripts

```bash
# Start Expo development server
npm start

# Run on specific platforms
npm run ios
npm run android
npm run web

# Code quality
npm run lint              # Run ESLint
npm run format            # Format code with Prettier
npm run format:check      # Check code formatting
npm run type-check        # Run TypeScript type checking

# Testing
npm test                  # Run Jest tests

# Reset project (remove example code)
npm run reset-project
```

## Project Structure

```
ekg-helper/
├── app/                          # Expo Router screens (file-based routing)
│   ├── (tabs)/                   # Tab-based navigation
│   └── _layout.tsx               # Root layout
├── src/
│   ├── features/                 # Feature-based modules
│   │   ├── ecg-data-entry/       # ECG data input screens & components
│   │   ├── analysis-workflow/    # Step-by-step analysis screens
│   │   ├── results/              # Results display & visualization
│   │   └── case-history/         # Case management & history
│   ├── shared/                   # Shared resources
│   │   ├── components/           # Reusable UI components
│   │   ├── hooks/                # Custom React hooks
│   │   ├── types/                # TypeScript type definitions
│   │   ├── theme/                # Design system (colors, typography, spacing)
│   │   ├── utils/                # Utility functions
│   │   └── constants/            # App constants
│   ├── store/                    # Zustand state management
│   └── services/                 # Business logic services
│       ├── database/             # SQLite database operations
│       ├── pattern-matching/     # ECG pattern matching algorithms
│       └── validation/           # Data validation logic
├── assets/                       # Images, fonts, icons
└── components/                   # Legacy components (to be migrated)
```

## Core Data Models

### ECG Data

- 12-lead ECG with polarity data (I, II, III, aVR, aVL, aVF, V1-V6)
- QRS duration measurements
- Bundle branch block patterns
- Precordial transition points

### Analysis Results

- QRS screening results
- Vertical/horizontal axis determinations
- Quadrant assignments
- Refined localization predictions
- Confidence levels and supporting evidence

### Anatomical Sites

- 15-20 common ventricular arrhythmia origins
- Organized by quadrants (Right/Left Upper/Lower)
- Clinical implications for each site

## Design System

The app uses a consistent design system defined in `src/shared/theme/`:

- **Colors**: Medical-focused color palette with confidence level indicators
- **Typography**: Clear, accessible text styles
- **Spacing**: 4px grid-based spacing system
- **Shadows**: Elevation levels for depth perception

## Contributing

1. Follow the existing code style (enforced by ESLint + Prettier)
2. Write TypeScript with strict mode enabled
3. Add unit tests for business logic
4. Update documentation for significant changes

## Clinical Validation

This application is a **clinical decision support tool** and should not replace clinical judgment. All predictions include confidence levels and should be validated against actual clinical findings.

## License

[To be determined]

## Contact

For questions, issues, or feedback, please contact the development team.

## Acknowledgments

Based on published ECG criteria for ventricular arrhythmia localization from the electrophysiology literature.
