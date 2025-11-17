/**
 * Analysis Store Tests
 */

import { renderHook, act } from '@testing-library/react-native';
import { useAnalysisStore } from '../analysisStore';

describe('Analysis Store', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useAnalysisStore());
    act(() => {
      result.current.resetAnalysis();
    });
  });

  it('should initialize with null analysis and step 0', () => {
    const { result } = renderHook(() => useAnalysisStore());
    expect(result.current.currentAnalysis).toBeNull();
    expect(result.current.currentStep).toBe(0);
    expect(result.current.totalSteps).toBe(5);
  });

  it('should set current step', () => {
    const { result } = renderHook(() => useAnalysisStore());

    act(() => {
      result.current.setCurrentStep(2);
    });

    expect(result.current.currentStep).toBe(2);
  });

  it('should move to next step', () => {
    const { result } = renderHook(() => useAnalysisStore());

    act(() => {
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(1);

    act(() => {
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(2);
  });

  it('should move to previous step', () => {
    const { result } = renderHook(() => useAnalysisStore());

    act(() => {
      result.current.setCurrentStep(3);
      result.current.previousStep();
    });

    expect(result.current.currentStep).toBe(2);
  });

  it('should not go below step 0', () => {
    const { result } = renderHook(() => useAnalysisStore());

    act(() => {
      result.current.previousStep();
    });

    expect(result.current.currentStep).toBe(0);
  });

  it('should not go beyond total steps', () => {
    const { result } = renderHook(() => useAnalysisStore());

    act(() => {
      result.current.setCurrentStep(4); // Last step (0-indexed, 5 total)
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(4);
  });

  it('should reset analysis', () => {
    const { result } = renderHook(() => useAnalysisStore());

    const mockAnalysis = {
      id: 'test-123',
      timestamp: new Date(),
    } as any;

    act(() => {
      result.current.setAnalysisResult(mockAnalysis);
      result.current.setCurrentStep(3);
    });

    expect(result.current.currentAnalysis).toBe(mockAnalysis);
    expect(result.current.currentStep).toBe(3);

    act(() => {
      result.current.resetAnalysis();
    });

    expect(result.current.currentAnalysis).toBeNull();
    expect(result.current.currentStep).toBe(0);
  });
});
