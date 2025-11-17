# EKG Origin Localization Application - Business Specification

## Executive Summary

A clinical decision support application that helps cardiac electrophysiologists and cardiologists rapidly identify the anatomical origin of idiopathic ventricular arrhythmias using 12-lead electrocardiogram (ECG/EKG) analysis. The app translates complex pattern recognition into a guided, systematic interpretation process, reducing diagnostic time and improving ablation procedure planning.

---

## Business Objectives

### Primary Goals

- **Reduce diagnosis time**: Accelerate the process of determining ventricular arrhythmia origin from ECG patterns
- **Improve accuracy**: Minimize interpretation errors through systematic, step-by-step analysis
- **Enhance procedure planning**: Provide electrophysiologists with precise localization predictions before catheter ablation
- **Standardize interpretation**: Ensure consistent application of established ECG criteria across different practitioners

### Secondary Goals

- Serve as a teaching tool for cardiology fellows and trainees
- Reduce cognitive load during time-sensitive clinical situations
- Create a standardized documentation trail of diagnostic reasoning

---

## Target Users

### Primary Users

- **Cardiac Electrophysiologists**: Specialists performing catheter ablation procedures who need pre-procedure planning
- **Interventional Cardiologists**: Physicians interpreting ECGs to determine treatment approaches
- **Cardiology Fellows**: Trainees learning systematic ECG interpretation

### Secondary Users

- **General Cardiologists**: For initial screening and referral decisions
- **Emergency Medicine Physicians**: For preliminary assessment of ventricular arrhythmias

---

## Clinical Problem Statement

When patients present with idiopathic ventricular arrhythmias (PVCs, VT), determining the precise anatomical origin is critical for:

1. **Planning catheter ablation approach**: Knowing whether the origin is in the RVOT, LVOT, aortic cusps, or other structures
2. **Selecting appropriate access routes**: Determining if endocardial, epicardial, or venous system access is needed
3. **Anticipating procedural challenges**: Identifying proximity to coronary arteries or other critical structures
4. **Optimizing success rates**: Accurate pre-procedure localization improves first-attempt success

**Current Challenge**: ECG interpretation requires memorizing complex pattern combinations and anatomical relationships. Even experienced electrophysiologists may need to reference criteria, particularly for uncommon sites of origin.

---

## Solution Approach

### Core Methodology: Guided Quadrant-Based Analysis

The application implements the stepwise anatomical approach described in the medical literature, organizing the interpretation into a logical sequence:

#### Initial Screening: QRS Duration Assessment

- Evaluate QRS duration for all beats
- Include beats with QRS duration >120 ms in the analysis
- Ensure adequate QRS complexes for interpretation

#### Step 1: Vertical Axis Determination

- Analyze leads II, III, and aVF polarity
- Categorize as **Inferior Axis** (basal/outflow origins) or **Superior Axis** (apical origins)
- Identify discordance patterns (special cases)

#### Step 2: Horizontal Axis Determination

- Analyze lead I polarity
- Determine **Rightward** vs **Leftward** positioning relative to chest midline
- Assess bundle branch block pattern (RBBB vs LBBB)

#### Step 3: Quadrant Assignment

Based on Steps 1-2, assign to one of four anatomical quadrants:

- **Right Upper**: Posterior RVOT, RCC, para-Hisian, superior TV
- **Left Upper**: Anterior RVOT, LCC, AMC, mitral annulus, LV summit
- **Right Lower**: Inferior TV, moderator band, cardiac crux
- **Left Lower**: Inferior MV, papillary muscles, left fascicles

#### Step 4: Refined Localization

Within each quadrant, analyze additional features:

- Precordial transition patterns
- QRS duration and morphology
- Specific lead characteristics (aVL, aVR, V1 patterns)
- Special markers (pseudo-delta waves, pattern breaks)

#### Step 5: Differential Diagnosis

Present the 2-4 most likely anatomical origins with:

- Confidence indicators based on pattern matching
- Key distinguishing features
- Clinical considerations (proximity to coronary arteries, ablation approach)

---

## Business Rules and Clinical Logic

### Pattern Matching Hierarchy

**High Confidence Indicators** (single feature sufficient):

- Narrow QRS (<130ms) + RBBB + right axis → Left anterior fascicle
- Positive concordance + RBBB + inferior axis → Anterolateral MV annulus
- Late transition (≥V4) + superior axis + LBBB → Moderator band
- V2 transition ratio ≤0.6 → LVOT origin

**Moderate Confidence** (multiple features required):

- Transition at V3 + positive lead I + QS in V1 → Posterior RVOT vs RCC (requires V2 transition ratio)
- Superior axis + RBBB + R<S in V5 → PPM vs left posterior fascicle (requires QRS duration analysis)

**Pattern Combinations**:
Each anatomical site has 3-6 defining characteristics. The app scores pattern matches and presents likelihood rankings.

### Anatomical Relationship Rules

The app incorporates spatial anatomy understanding:

- RVOT wraps around LVOT (anterior RVOT is leftward structure)
- Aortic cusps: RCC is anterior/rightward, LCC is posterior/leftward, NCC is posterior/inferior
- Precordial transition reflects anterior-posterior positioning
- Bundle branch pattern reflects septal vs free wall origins

### Special Cases and Exceptions

**Inferior Lead Discordance**:

- Positive II / Negative III (30° to -30°) → Lateral TV, moderator band, para-Hisian
- Negative II / Positive III (150° to 210°) → Lateral MV, anterolateral papillary muscle

**Epicardial Markers**:

- Pseudo-delta wave presence → Consider LV summit or cardiac crux
- Maximum deflection index greater than 0.55 → Epicardial origin likely
- V2 "pattern break" → Proximity to anterior interventricular sulcus

---

## Input Requirements

### Minimum Required ECG Data

- **All 12 standard leads**: I, II, III, aVR, aVL, aVF, V1-V6
- **Arrhythmia morphology**: At least one clear PVC or VT complex per lead
- **Quality standards**: Readable QRS complexes without excessive artifact

### Preferred Additional Data

- Sinus rhythm ECG for comparison (enables transition ratio calculations)
- Multiple arrhythmia complexes for pattern consistency verification
- Patient positioning information (if non-standard)
- Clinical context (symptoms, structural heart disease presence)

### Input Formats (in order of preference)

1. **Digital structured data**: Direct device output with amplitude/duration measurements
2. **PDF with embedded data**: Hospital system exports that retain measurement metadata
3. **High-quality images**: Scanned ECGs with clear grid lines and waveforms
4. **Manual entry**: User-guided input of key measurements for each lead

---

## Workflow and User Journey

### Pre-Procedure Planning Workflow

**Step 1: Case Initiation**

- User uploads/inputs ECG showing ventricular arrhythmia
- System validates ECG quality and completeness
- User provides minimal clinical context (if relevant to interpretation)

**Step 2: Guided Analysis**

- System performs initial QRS duration screening
  - Validates QRS duration greater than 120 ms for beats to be analyzed
- System presents Step 1 determination (Inferior vs Superior axis)
  - Shows leads II, III, and aVF with polarity highlighted
  - Asks user to confirm or provides automatic determination
- System presents Step 2 determination (Lead I polarity + BBB pattern)
  - Displays relevant lead morphologies
  - Assigns to appropriate quadrant

**Step 3: Quadrant-Specific Analysis**

- System analyzes all relevant criteria for that quadrant
- Measures precordial transitions, QRS durations, specific morphologies
- Applies quadrant-specific decision rules

**Step 4: Results Presentation**

- **Primary localization**: Most likely anatomical site (with confidence level)
- **Differential diagnoses**: 2-3 alternative locations with distinguishing features
- **Key supporting evidence**: Which ECG criteria led to this conclusion
- **Anatomical visualization**: Diagram showing predicted location
- **Clinical implications**:
  - Recommended ablation approach (endocardial vs epicardial)
  - Proximity warnings (coronary arteries, conduction system)
  - Success rate expectations for this location

**Step 5: Documentation**

- Generate interpretation report
- Save case for procedure reference
- Export findings to medical record system

### Teaching/Learning Workflow

**Educational Mode Features**:

- Show full stepwise reasoning for each determination
- Highlight which specific ECG features drove each conclusion
- Provide links to reference criteria and literature
- Quiz mode: Present cases and allow learners to work through steps before revealing answers
- Comparative cases: Show ECGs from similar but distinct anatomical sites

---

## Success Metrics

### Clinical Effectiveness

- **Accuracy**: Agreement with actual ablation site (gold standard)
  - Target: >85% correct quadrant assignment
  - Target: >70% correct specific anatomical structure
- **Time efficiency**: Reduction in ECG interpretation time
  - Target: <3 minutes for complete analysis vs 10-15 minutes manual
- **Ablation success**: Correlation between predicted and actual successful ablation sites

### User Adoption

- **Usage frequency**: Cases analyzed per electrophysiologist per month
- **User satisfaction**: Rated usefulness for procedure planning
- **Educational value**: Trainee confidence improvement scores

### Clinical Impact

- **Procedure time reduction**: Decreased catheter mapping time due to better pre-procedure planning
- **First-attempt success**: Increased rate of successful ablation on first catheterization
- **Complication reduction**: Fewer complications from prolonged procedures or incorrect initial approach

---

## Limitations and Constraints

### Clinical Limitations

- **Patient variability**: Body habitus affects ECG appearance beyond standard patterns
- **Lead placement variation**: Non-standard lead positions can alter morphologies
- **Overlapping patterns**: Some anatomical sites produce nearly identical ECG patterns
- **Structural heart disease**: Patterns validated primarily for structurally normal hearts
- **Rhythm quality**: Requires clear, artifact-free arrhythmia complexes

### Application Boundaries

**What the App Does**:

- Systematic application of published ECG criteria
- Pattern matching against established diagnostic rules
- Probabilistic localization with confidence levels
- Educational guidance on interpretation methodology

**What the App Does NOT Do**:

- Replace electrophysiologist clinical judgment
- Guarantee ablation success
- Account for unusual anatomy or rare variants
- Interpret ECGs with poor quality or incomplete leads
- Make treatment decisions (only provides localization information)

### Data Quality Requirements

- Minimum signal clarity standards
- All 12 leads must be present
- At least one representative arrhythmia complex per lead
- Standardized calibration (25mm/s, 10mm/mV preferred)

---

## Risk Mitigation

### Clinical Risk Management

- **Always present confidence levels**: Never give definitive answers without qualification
- **Show supporting evidence**: Allow clinicians to verify the reasoning
- **Differential diagnoses**: Always provide alternatives when patterns are ambiguous
- **Explicit limitations**: Flag when patient factors may affect accuracy
- **No automated treatment**: App provides information only, never directs therapy

### Quality Assurance

- **Validation dataset**: Test against cases with known ablation outcomes
- **Expert review**: Regular audit by electrophysiologists of app predictions
- **False positive tracking**: Monitor cases where app prediction was incorrect
- **Continuous improvement**: Update pattern rules based on new literature and clinical feedback

---

## Future Enhancements (Out of Scope for Initial Version)

### Advanced Pattern Recognition

- Integration of body habitus corrections
- Machine learning refinement of probability scoring
- Detection of rare anatomical variants

### Intra-Procedural Integration

- Real-time integration with catheter mapping systems
- Comparison of predicted vs actual activation mapping
- Automatic feedback loop for pattern rule refinement

### Data Collection Platform

- Anonymous case repository for research
- Pattern discovery for novel anatomical sites
- Outcome tracking database linking ECG patterns to ablation success

---

## Implementation Priorities

### Phase 1: Core Functionality (MVP)

- Quadrant-based stepwise analysis workflow
- Pattern matching for the 15-20 most common sites of origin
- Basic results presentation with anatomical diagrams
- Manual ECG data entry interface

### Phase 2: Enhanced Usability

- Image upload with automated measurement extraction
- PDF import with data parsing
- Enhanced visualization and reporting
- Teaching mode with case library

### Phase 3: Integration and Expansion

- EMR system integration
- Expanded site library (rare anatomical variants)
- Outcome tracking and validation dashboard
- Multi-institutional case sharing

---

## Glossary of Key Terms

- **Idiopathic VAs**: Ventricular arrhythmias in structurally normal hearts
- **RVOT/LVOT**: Right/Left Ventricular Outflow Tract
- **RCC/LCC/NCC**: Right/Left/Non-Coronary Cusps of aortic valve
- **AMC**: Aortomitral Continuity
- **RBBB/LBBB**: Right/Left Bundle Branch Block pattern
- **Precordial Transition**: First V lead where R/S wave pattern changes
- **Inferior/Superior Axis**: Electrical axis direction based on leads II, III, and aVF
- **Catheter Ablation**: Procedure to heat and eliminate arrhythmia source tissue
