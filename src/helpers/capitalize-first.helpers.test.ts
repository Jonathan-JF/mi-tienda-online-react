import { describe, it, expect } from 'vitest';
import { capitalizeFirst } from './capitalize-first.helpers';

describe('capitalizeFirst', () => {
  it('returns empty string for falsy input', () => {
    expect(capitalizeFirst('' as any)).toBe('');
  });

  it('capitalizes the first letter and lowercases the rest', () => {
    expect(capitalizeFirst('hola')).toBe('Hola');
    expect(capitalizeFirst('HOLA')).toBe('Hola');
    expect(capitalizeFirst('mIx')).toBe('Mix');
  });

  it('works with single character', () => {
    expect(capitalizeFirst('a')).toBe('A');
  });
});
