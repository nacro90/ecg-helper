/**
 * Validation Schema Tests
 */

import {
  ecgDataSchema,
  qrsScreeningSchema,
  validateECGCompleteness,
  polaritySchema,
  bbbPatternSchema,
} from '../validation';

describe('Validation Schemas', () => {
  describe('polaritySchema', () => {
    it('should accept valid polarity values', () => {
      expect(() => polaritySchema.parse('positive')).not.toThrow();
      expect(() => polaritySchema.parse('negative')).not.toThrow();
      expect(() => polaritySchema.parse('isoelectric')).not.toThrow();
    });

    it('should reject invalid polarity values', () => {
      expect(() => polaritySchema.parse('invalid')).toThrow();
      expect(() => polaritySchema.parse('')).toThrow();
    });
  });

  describe('bbbPatternSchema', () => {
    it('should accept valid BBB patterns', () => {
      expect(() => bbbPatternSchema.parse('RBBB')).not.toThrow();
      expect(() => bbbPatternSchema.parse('LBBB')).not.toThrow();
      expect(() => bbbPatternSchema.parse('none')).not.toThrow();
    });

    it('should reject invalid BBB patterns', () => {
      expect(() => bbbPatternSchema.parse('invalid')).toThrow();
    });
  });

  describe('qrsScreeningSchema', () => {
    it('should accept QRS duration greater than 120 ms', () => {
      const result = qrsScreeningSchema.parse({ qrsDuration: 121 });
      expect(result.qrsDuration).toBe(121);
    });

    it('should accept QRS duration of exactly 120 ms', () => {
      const result = qrsScreeningSchema.parse({ qrsDuration: 120 });
      expect(result.qrsDuration).toBe(120);
    });

    it('should reject QRS duration less than 120 ms', () => {
      expect(() => qrsScreeningSchema.parse({ qrsDuration: 119 })).toThrow(
        'QRS duration must be greater than 120 ms'
      );
    });

    it('should reject QRS duration greater than 300 ms', () => {
      expect(() => qrsScreeningSchema.parse({ qrsDuration: 301 })).toThrow();
    });
  });

  describe('validateECGCompleteness', () => {
    const validECGData = {
      leads: {
        I: { lead: 'I', polarity: 'positive' },
        II: { lead: 'II', polarity: 'positive' },
        III: { lead: 'III', polarity: 'negative' },
        aVR: { lead: 'aVR', polarity: 'negative' },
        aVL: { lead: 'aVL', polarity: 'positive' },
        aVF: { lead: 'aVF', polarity: 'positive' },
        V1: { lead: 'V1', polarity: 'negative' },
        V2: { lead: 'V2', polarity: 'negative' },
        V3: { lead: 'V3', polarity: 'isoelectric' },
        V4: { lead: 'V4', polarity: 'positive' },
        V5: { lead: 'V5', polarity: 'positive' },
        V6: { lead: 'V6', polarity: 'positive' },
      },
      qrsDuration: 140,
      bbbPattern: 'LBBB',
    };

    it('should return 100% completeness for fully filled ECG data', () => {
      const result = validateECGCompleteness(validECGData);
      expect(result.isComplete).toBe(true);
      expect(result.percentage).toBe(100);
      expect(result.missingFields).toEqual([]);
    });

    it('should detect missing leads', () => {
      const incompleteData = {
        ...validECGData,
        leads: {
          ...validECGData.leads,
          V6: { lead: 'V6', polarity: undefined },
        },
      };
      const result = validateECGCompleteness(incompleteData);
      expect(result.isComplete).toBe(false);
      expect(result.missingFields).toContain('Lead V6');
    });

    it('should detect missing QRS duration', () => {
      const incompleteData = {
        ...validECGData,
        qrsDuration: 0,
      };
      const result = validateECGCompleteness(incompleteData);
      expect(result.isComplete).toBe(false);
      expect(result.missingFields).toContain('QRS Duration');
    });

    it('should calculate correct percentage for partial data', () => {
      const partialData = {
        leads: {
          I: { lead: 'I', polarity: 'positive' },
          II: { lead: 'II', polarity: 'positive' },
          III: { lead: 'III', polarity: undefined },
          aVR: { lead: 'aVR', polarity: undefined },
          aVL: { lead: 'aVL', polarity: undefined },
          aVF: { lead: 'aVF', polarity: undefined },
          V1: { lead: 'V1', polarity: undefined },
          V2: { lead: 'V2', polarity: undefined },
          V3: { lead: 'V3', polarity: undefined },
          V4: { lead: 'V4', polarity: undefined },
          V5: { lead: 'V5', polarity: undefined },
          V6: { lead: 'V6', polarity: undefined },
        },
        qrsDuration: 0,
        bbbPattern: 'none',
      };
      const result = validateECGCompleteness(partialData);
      expect(result.percentage).toBeGreaterThan(0);
      expect(result.percentage).toBeLessThan(100);
    });
  });
});
