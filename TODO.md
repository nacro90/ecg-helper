# Phase 1: MVP - Core Analysis Workflow TODO

**Timeline**: 4-6 weeks
**Goal**: Deliver working stepwise ECG analysis workflow with manual input

---

## Week 1: Foundation & Project Setup

### 1. Project Initialization

- [x] Initialize React Native project with TypeScript template
- [x] Configure project structure (features-based folder organization)
- [x] Set up Git repository with proper .gitignore
- [x] Configure ESLint and Prettier for code quality
- [x] Set up TypeScript strict mode configuration
- [x] Create README.md with setup instructions

### 2. Development Environment

- [x] Configure development environment for iOS
- [x] Configure development environment for Android
- [ ] Set up debugging tools (Reactotron or Flipper)
- [x] Install and configure React Native Developer Tools
- [x] Set up testing framework (Jest + React Native Testing Library)
- [ ] Configure CI/CD pipeline basics (GitHub Actions)

### 3. Core Dependencies Installation

- [x] Install React Navigation v6+
- [x] Install state management library (Redux Toolkit or Zustand)
- [x] Install UI component library (React Native Paper or NativeBase)
- [x] Install form handling library (React Hook Form)
- [x] Install validation library (Yup or Zod)
- [x] Install AsyncStorage for local persistence
- [x] Install SQLite for case storage

### 4. Design System & UI Foundation

- [x] Define color palette and theme configuration
- [x] Create typography system (font families, sizes, weights)
- [x] Set up spacing and layout constants
- [x] Create basic reusable components (Button, Input, Card, etc.)
- [x] Design and implement app header/navigation bar
- [x] Create loading and error state components

---

## Week 2: Navigation & Screen Structure

### 5. Navigation Setup

- [x] Configure React Navigation container
- [x] Create main stack navigator
- [x] Implement 6 core screens (empty shells):
  - [x] Home/Welcome screen
  - [x] ECG Data Entry screen
  - [x] Initial QRS Screening screen
  - [x] Analysis Workflow screen
  - [x] Results screen
  - [x] Case History screen
- [ ] Add navigation transitions and animations
- [ ] Implement navigation guards (prevent navigation with unsaved data)
- [x] Add bottom tab or drawer navigation structure

### 6. State Management Architecture

- [x] Design state management structure
- [x] Create store/context for ECG data
- [x] Create store/context for analysis results
- [x] Create store/context for app settings
- [x] Implement state persistence layer
- [ ] Add state debugging tools

### 7. Data Models & Types

- [x] Define TypeScript interfaces for 12-lead ECG data
- [x] Define interfaces for QRS duration data
- [x] Define interfaces for analysis steps and results
- [x] Define interfaces for anatomical sites and quadrants
- [x] Define interfaces for pattern matching rules
- [x] Define interfaces for saved cases
- [x] Create validation schemas for all data models

---

## Week 3: ECG Image Capture & Data Entry

### 8. Image Capture Integration

- [x] Install Expo Image Picker and Camera dependencies
- [x] Create camera capture screen/modal
- [x] Implement photo library/gallery access
- [x] Add image preview component with zoom capability
- [x] Create image quality validation (resolution, clarity checks)
- [x] Implement image rotation and basic adjustments
- [x] Add retake/reselect functionality
- [x] Store captured/selected images with case data
- [ ] Display attached ECG image in case history
- [x] Handle image permissions (camera, photo library)

### 9. Data Entry UI Components

- [x] Create lead input component (reusable for all 12 leads)
- [x] Build polarity selector (positive/negative/isoelectric)
- [x] Create QRS duration input component with validation (>120 ms)
- [x] Build transition point selector (V1-V6)
- [x] Create bundle branch block pattern selector (RBBB/LBBB)
- [x] Design overall data entry layout (scrollable, organized by lead groups)

### 10. Lead Organization & Display

- [x] Group leads visually (Limb: I, II, III, aVR, aVL, aVF)
- [x] Group precordial leads (V1-V6)
- [x] Add lead labels and descriptions
- [ ] Create visual ECG lead diagram/reference
- [ ] Implement collapsible sections for lead groups
- [x] Add "quick view" summary of entered data

### 11. Input Validation & Quality Checks

- [x] Implement real-time validation for each field
- [x] Add completeness indicator (X/12 leads entered)
- [x] Create validation rules for QRS duration ranges
- [x] Add QRS duration >120 ms requirement check
- [x] Add warnings for unusual/suspicious values
- [x] Implement "required fields" highlighting
- [x] Create validation error messages and tooltips

### 12. Data Entry Features

- [x] Implement save draft functionality
- [x] Add clear/reset form capability
- [x] Create auto-save mechanism (save to local storage)
- [x] Add confirmation dialog for data clearing
- [x] Implement data export for backup (JSON)
- [x] Add data import from backup file

---

## Week 4: Pattern Matching Engine

### 13. Clinical Rules Implementation

- [ ] Research and document 15-20 most common anatomical sites
- [ ] Create data structure for pattern matching rules
- [ ] Implement QRS duration screening logic (>120 ms filter)
- [ ] Implement vertical axis determination logic (leads II, III & aVF)
- [ ] Implement horizontal axis determination logic (lead I)
- [ ] Create quadrant assignment algorithm
- [ ] Implement bundle branch block pattern recognition

### 14. Anatomical Site Patterns

- [ ] Define patterns for RVOT sites (anterior, posterior)
- [ ] Define patterns for LVOT sites
- [ ] Define patterns for aortic cusp origins (RCC, LCC, NCC)
- [ ] Define patterns for tricuspid annulus sites
- [ ] Define patterns for mitral annulus sites
- [ ] Define patterns for fascicular origins
- [ ] Define patterns for papillary muscle origins
- [ ] Define patterns for special sites (LV summit, moderator band, etc.)

### 14. Scoring & Confidence Algorithm

- [ ] Implement pattern matching scoring system
- [ ] Create confidence level calculation (High/Moderate/Low)
- [ ] Implement weighted criteria (high confidence indicators)
- [ ] Add support for pattern combinations
- [ ] Create differential diagnosis ranking algorithm
- [ ] Implement special case detection (discordance patterns)

### 15. Advanced Pattern Features

- [ ] Implement precordial transition analysis
- [ ] Add V2 transition ratio calculation
- [ ] Implement QRS duration analysis rules
- [ ] Add epicardial marker detection (pseudo-delta wave)
- [ ] Create pattern break detection logic
- [ ] Add R/S wave ratio calculations

---

## Week 5: Analysis Workflow Screens

### 16. Initial Screening: QRS Duration Assessment

- [ ] Design initial screening UI layout
- [ ] Display QRS duration input/validation
- [ ] Implement QRS >120 ms check
- [ ] Add visual indicator for qualifying beats
- [ ] Show clear messaging about QRS requirements
- [ ] Add "Proceed to Analysis" button with validation
- [ ] Implement error handling for insufficient QRS duration

### 17. Step 1: Vertical Axis Screen

- [ ] Design Step 1 UI layout
- [ ] Display leads II, III, and aVF prominently
- [ ] Highlight polarity of leads II, III, and aVF
- [ ] Implement inferior vs superior axis determination
- [ ] Add visual explanation of axis determination
- [ ] Show progress indicator (Step 1 of 4)
- [ ] Add "Next" button with validation

### 18. Step 2: Horizontal Axis Screen

- [ ] Design Step 2 UI layout
- [ ] Display lead I polarity
- [ ] Show bundle branch block pattern
- [ ] Implement leftward vs rightward determination
- [ ] Add RBBB vs LBBB pattern display
- [ ] Create visual guide for BBB patterns
- [ ] Add navigation (Back/Next buttons)

### 19. Step 3: Quadrant Assignment Screen

- [ ] Design quadrant visualization (4-quadrant diagram)
- [ ] Implement quadrant highlighting based on Steps 1 & 2
- [ ] Show quadrant labels:
  - [ ] Right Upper (Posterior RVOT, RCC, para-Hisian)
  - [ ] Left Upper (Anterior RVOT, LCC, AMC, LV summit)
  - [ ] Right Lower (Inferior TV, moderator band)
  - [ ] Left Lower (Inferior MV, papillary muscles, fascicles)
- [ ] Add anatomical diagram for selected quadrant
- [ ] Display potential sites within quadrant
- [ ] Add educational tooltips

### 20. Step 4: Refined Localization Screen

- [ ] Design refined analysis UI
- [ ] Display precordial transition analysis
- [ ] Show QRS duration measurements
- [ ] Highlight specific lead characteristics
- [ ] Display special markers (if present)
- [ ] Add progress indicator for analysis completion
- [ ] Implement "Calculate Results" button

### 21. Workflow Navigation & State

- [ ] Implement step-by-step progression logic (Screening → Step 1 → Step 2 → Step 3 → Step 4)
- [ ] Add ability to navigate back to previous steps
- [ ] Maintain state across all workflow steps
- [ ] Add step completion validation
- [ ] Create workflow progress bar/stepper
- [ ] Implement "Skip to Results" option (if all data entered)

---

## Week 6: Results Screen & Case Management

### 22. Results Display - Primary Localization

- [ ] Design results screen layout
- [ ] Display primary anatomical site prediction
- [ ] Show confidence level (High/Moderate/Low) with visual indicator
- [ ] Create confidence level color coding (green/yellow/orange)
- [ ] Add percentage or score display
- [ ] Highlight key supporting evidence

### 23. Results Display - Differential Diagnoses

- [ ] Display 2-3 alternative anatomical sites
- [ ] Show distinguishing features for each alternative
- [ ] Rank alternatives by likelihood
- [ ] Add "Why this site?" explanatory text
- [ ] Create comparison view (primary vs alternatives)
- [ ] Add expandable details for each diagnosis

### 24. Supporting Evidence Display

- [ ] Show which ECG criteria matched
- [ ] Display relevant lead morphologies (II, III, aVF, I, V1-V6)
- [ ] Highlight high-confidence indicators used
- [ ] Show QRS duration screening results
- [ ] Create checklist of criteria met
- [ ] Add color coding for strength of evidence
- [ ] Show pattern match score breakdown

### 25. Anatomical Visualization

- [ ] Create basic 2D heart diagram
- [ ] Implement site highlighting on diagram
- [ ] Add anatomical labels
- [ ] Create multiple views (anterior, posterior, septal)
- [ ] Add zoom/pan functionality
- [ ] Show predicted location marker

### 26. Clinical Implications

- [ ] Display recommended ablation approach (endocardial/epicardial)
- [ ] Show proximity warnings (coronary arteries, conduction system)
- [ ] Add success rate expectations (if available)
- [ ] Display procedural considerations
- [ ] Add references to relevant literature
- [ ] Include disclaimer text

### 27. Case Saving & Documentation

- [ ] Implement save case functionality
- [ ] Generate case ID and timestamp
- [ ] Create case summary report
- [ ] Add ability to name/tag cases
- [ ] Implement case notes/comments field
- [ ] Save to SQLite database

### 28. Case History Screen

- [ ] Design case history list UI
- [ ] Display saved cases with key info (date, site, confidence)
- [ ] Implement case search functionality
- [ ] Add sort options (date, confidence, site)
- [ ] Create case detail view
- [ ] Implement delete case functionality
- [ ] Add case export option

### 29. Report Generation

- [ ] Create simple text report template
- [ ] Include QRS screening results in report
- [ ] Include all analysis steps in report (II/III/aVF → I/BBB → Quadrant → Site)
- [ ] Add interpretation summary
- [ ] Include timestamp and case ID
- [ ] Format for readability
- [ ] Implement copy to clipboard functionality

---

## Testing & Quality Assurance

### 30. Unit Testing

- [ ] Write tests for QRS duration screening logic
- [ ] Write tests for pattern matching algorithms
- [ ] Test vertical axis determination (II, III, aVF)
- [ ] Test confidence calculation logic
- [ ] Test quadrant assignment rules
- [ ] Test validation functions
- [ ] Test data transformation utilities
- [ ] Achieve >80% code coverage for business logic

### 31. Component Testing

- [ ] Test QRS screening component
- [ ] Test ECG data entry components
- [ ] Test workflow navigation components
- [ ] Test results display components
- [ ] Test form validation behavior
- [ ] Test state management
- [ ] Test error handling

### 32. Integration Testing

- [ ] Test complete workflow from QRS screening to results
- [ ] Test complete workflow from entry to results
- [ ] Test case save and load functionality
- [ ] Test navigation flow
- [ ] Test data persistence
- [ ] Test edge cases and error scenarios
- [ ] Test on different screen sizes

### 33. Clinical Validation Testing

- [ ] Test with sample ECG cases provided by doctor
- [ ] Validate QRS >120 ms filtering works correctly
- [ ] Validate leads II, III, aVF analysis is accurate
- [ ] Test pattern matching against known cases
- [ ] Verify confidence levels are appropriate
- [ ] Document any discrepancies for review

### 34. User Acceptance Testing Prep

- [ ] Create test cases for clinical scenarios
- [ ] Prepare sample ECG data sets
- [ ] Document known limitations
- [ ] Create user testing guide
- [ ] Set up feedback collection mechanism
- [ ] Prepare demo/walkthrough

---

## Documentation & Deployment

### 35. Code Documentation

- [ ] Add JSDoc comments to all functions
- [ ] Document component props with TypeScript
- [ ] Create architecture documentation
- [ ] Document state management flow
- [ ] Add inline comments for complex logic
- [ ] Document QRS screening algorithm
- [ ] Document vertical axis determination (II/III/aVF) logic
- [ ] Create API reference for key functions

### 36. User Documentation

- [ ] Create in-app help/tutorial
- [ ] Write user guide for QRS screening step
- [ ] Write user guide for data entry
- [ ] Document interpretation workflow
- [ ] Add tooltips and contextual help
- [ ] Create FAQ section
- [ ] Prepare training materials

### 37. MVP Release Preparation

- [ ] Perform final testing on iOS
- [ ] Perform final testing on Android
- [ ] Fix critical bugs
- [ ] Optimize performance
- [ ] Create app icons and splash screen
- [ ] Prepare for TestFlight/Internal Testing distribution

---

## Success Criteria Checklist

- [ ] User can enter QRS duration and app validates >120 ms requirement
- [ ] User can manually enter ECG data for all 12 leads
- [ ] App guides user through initial screening + 4-step analysis workflow
- [ ] Vertical axis determination uses leads II, III, and aVF
- [ ] Pattern matching correctly identifies quadrant for test cases
- [ ] Results screen displays primary site with confidence level
- [ ] Results include 2-3 differential diagnoses
- [ ] Cases can be saved and retrieved from history
- [ ] App runs smoothly on iOS and Android
- [ ] Analysis completes in < 3 minutes
- [ ] No critical bugs or crashes
- [ ] Code coverage > 80%
- [ ] Doctor validates clinical accuracy of algorithm

---

## Clinical Review Notes

**Doctor's Feedback Incorporated:**

1. ✅ Step 1 now analyzes leads II, III, **and aVF** (not just II and III)
2. ✅ Added initial screening step for QRS duration >120 ms

**Next Steps for Clinical Validation:**

- Share algorithm logic with doctor for review
- Test with real ECG cases
- Validate pattern matching accuracy
- Adjust confidence thresholds based on feedback

---

## Notes & Decisions Log

**Key Technical Decisions:**

- State Management: [TBD - Redux Toolkit or Zustand]
- UI Library: [TBD - React Native Paper or NativeBase]
- Database: SQLite confirmed
- Navigation: React Navigation confirmed

**Clinical Requirements Confirmed:**

- QRS duration screening: Include beats >120 ms
- Vertical axis: Analyze leads II, III, AND aVF
- All 12 leads required for complete analysis

**Deferred to Phase 2:**

- Image/PDF upload
- OCR functionality
- Teaching mode
- Advanced visualizations
- Cloud sync

**Pending Doctor Review:**

- Pattern matching rules for each anatomical site
- Confidence level thresholds
- Differential diagnosis ranking criteria
- Clinical implications text
