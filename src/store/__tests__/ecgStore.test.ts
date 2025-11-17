/**
 * ECG Store Tests
 */

import { renderHook, act } from '@testing-library/react-native';
import { useECGStore } from '../ecgStore';

describe('ECG Store', () => {
  beforeEach(() => {
    // Clear the store before each test
    const { result } = renderHook(() => useECGStore());
    act(() => {
      result.current.clearECGData();
    });
  });

  it('should initialize with null ECG data', () => {
    const { result } = renderHook(() => useECGStore());
    expect(result.current.ecgData).toBeNull();
  });

  it('should set lead polarity', () => {
    const { result } = renderHook(() => useECGStore());

    act(() => {
      result.current.setLeadPolarity('I', 'positive');
    });

    expect(result.current.ecgData?.leads?.I).toEqual({
      lead: 'I',
      polarity: 'positive',
    });
  });

  it('should set multiple lead polarities', () => {
    const { result } = renderHook(() => useECGStore());

    act(() => {
      result.current.setLeadPolarity('I', 'positive');
      result.current.setLeadPolarity('II', 'negative');
      result.current.setLeadPolarity('III', 'isoelectric');
    });

    expect(result.current.ecgData?.leads?.I?.polarity).toBe('positive');
    expect(result.current.ecgData?.leads?.II?.polarity).toBe('negative');
    expect(result.current.ecgData?.leads?.III?.polarity).toBe('isoelectric');
  });

  it('should set QRS duration', () => {
    const { result } = renderHook(() => useECGStore());

    act(() => {
      result.current.setQRSDuration(140);
    });

    expect(result.current.ecgData?.qrsDuration).toBe(140);
  });

  it('should set BBB pattern', () => {
    const { result } = renderHook(() => useECGStore());

    act(() => {
      result.current.setBBBPattern('LBBB');
    });

    expect(result.current.ecgData?.bbbPattern).toBe('LBBB');
  });

  it('should set transition point', () => {
    const { result } = renderHook(() => useECGStore());

    act(() => {
      result.current.setTransitionPoint('V3');
    });

    expect(result.current.ecgData?.transitionPoint).toBe('V3');
  });

  it('should set notes', () => {
    const { result } = renderHook(() => useECGStore());

    act(() => {
      result.current.setNotes('Patient has history of VT');
    });

    expect(result.current.ecgData?.notes).toBe('Patient has history of VT');
  });

  it('should clear ECG data', () => {
    const { result } = renderHook(() => useECGStore());

    act(() => {
      result.current.setLeadPolarity('I', 'positive');
      result.current.setQRSDuration(140);
      result.current.setBBBPattern('RBBB');
    });

    expect(result.current.ecgData).not.toBeNull();

    act(() => {
      result.current.clearECGData();
    });

    expect(result.current.ecgData).toBeNull();
  });

  it('should preserve data across multiple updates', () => {
    const { result } = renderHook(() => useECGStore());

    act(() => {
      result.current.setLeadPolarity('I', 'positive');
      result.current.setQRSDuration(140);
    });

    expect(result.current.ecgData?.leads?.I?.polarity).toBe('positive');
    expect(result.current.ecgData?.qrsDuration).toBe(140);

    act(() => {
      result.current.setBBBPattern('LBBB');
    });

    // Previous data should still be there
    expect(result.current.ecgData?.leads?.I?.polarity).toBe('positive');
    expect(result.current.ecgData?.qrsDuration).toBe(140);
    expect(result.current.ecgData?.bbbPattern).toBe('LBBB');
  });
});
