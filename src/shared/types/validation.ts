/**
 * Validation Schemas
 * Zod schemas for runtime validation of ECG data and analysis inputs
 */

import { z } from 'zod';

/**
 * Lead name validation
 */
export const leadNameSchema = z.enum([
  'I',
  'II',
  'III',
  'aVR',
  'aVL',
  'aVF',
  'V1',
  'V2',
  'V3',
  'V4',
  'V5',
  'V6',
]);

/**
 * Polarity validation
 */
export const polaritySchema = z.enum(['positive', 'negative', 'isoelectric']);

/**
 * Bundle branch block pattern validation
 */
export const bbbPatternSchema = z.enum(['RBBB', 'LBBB', 'none']);

/**
 * Lead data validation
 */
export const leadDataSchema = z.object({
  lead: leadNameSchema,
  polarity: polaritySchema,
  notes: z.string().optional(),
});

/**
 * Transition point validation
 */
export const transitionPointSchema = z.enum(['V1', 'V2', 'V3', 'V4', 'V5', 'V6']);

/**
 * ECG data validation schema
 */
export const ecgDataSchema = z.object({
  leads: z.object({
    I: leadDataSchema,
    II: leadDataSchema,
    III: leadDataSchema,
    aVR: leadDataSchema,
    aVL: leadDataSchema,
    aVF: leadDataSchema,
    V1: leadDataSchema,
    V2: leadDataSchema,
    V3: leadDataSchema,
    V4: leadDataSchema,
    V5: leadDataSchema,
    V6: leadDataSchema,
  }),
  qrsDuration: z
    .number()
    .min(0, 'QRS duration must be positive')
    .max(300, 'QRS duration seems too high'),
  transitionPoint: transitionPointSchema.optional(),
  bbbPattern: bbbPatternSchema,
  measurements: z
    .object({
      v2TransitionRatio: z.number().min(0).max(1).optional(),
      maxDeflectionIndex: z.number().min(0).max(1).optional(),
    })
    .optional(),
  patientId: z.string().optional(),
  recordingDate: z.date().optional(),
  notes: z.string().optional(),
});

/**
 * QRS screening validation
 * Validates that QRS duration is greater than 120 ms
 */
export const qrsScreeningSchema = z.object({
  qrsDuration: z
    .number()
    .min(120, 'QRS duration must be greater than 120 ms for this analysis')
    .max(300, 'QRS duration seems too high'),
});

/**
 * Case name validation
 */
export const caseNameSchema = z
  .string()
  .min(1, 'Case name cannot be empty')
  .max(100, 'Case name is too long');

/**
 * Tag validation
 */
export const tagSchema = z.string().min(1).max(50);

/**
 * Case notes validation
 */
export const caseNotesSchema = z.string().max(1000, 'Notes are too long');

/**
 * Helper function to validate ECG data completeness
 */
export const validateECGCompleteness = (
  data: unknown
): {
  isComplete: boolean;
  missingFields: string[];
  percentage: number;
} => {
  const requiredLeads: Array<keyof typeof leadNameSchema.enum> = [
    'I',
    'II',
    'III',
    'aVR',
    'aVL',
    'aVF',
    'V1',
    'V2',
    'V3',
    'V4',
    'V5',
    'V6',
  ];

  const missingFields: string[] = [];
  let completedCount = 0;

  try {
    const parsed = ecgDataSchema.parse(data);

    // Check each lead
    requiredLeads.forEach(lead => {
      if (parsed.leads[lead]?.polarity) {
        completedCount++;
      } else {
        missingFields.push(`Lead ${lead}`);
      }
    });

    // Check QRS duration
    if (!parsed.qrsDuration || parsed.qrsDuration === 0) {
      missingFields.push('QRS Duration');
    } else {
      completedCount++;
    }

    // Check BBB pattern
    if (!parsed.bbbPattern) {
      missingFields.push('Bundle Branch Block Pattern');
    } else {
      completedCount++;
    }

    const totalFields = requiredLeads.length + 2; // 12 leads + QRS + BBB
    const percentage = Math.round((completedCount / totalFields) * 100);

    return {
      isComplete: missingFields.length === 0,
      missingFields,
      percentage,
    };
  } catch (error) {
    return {
      isComplete: false,
      missingFields: ['Invalid data format'],
      percentage: 0,
    };
  }
};
