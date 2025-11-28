import { describe, it, expect } from 'vitest';
import { updateArray } from './update-array.helpers';

describe('updateArray', () => {
  it('returns same array when first element equals item', () => {
    const prev = ['a', 'b', 'c'];
    const result = updateArray(prev, 'a');
    expect(result).toEqual(prev);
  });

  it('moves item to front and removes duplicates', () => {
    const prev = ['b', 'a', 'c'];
    const result = updateArray(prev, 'a');
    expect(result[0]).toBe('a');
    expect(result).toContain('b');
    // Asegurarnos que 'a' aparece solo una vez
    expect(result.filter(x => x === 'a').length).toBe(1);
  });

  it('limits the length to 7 items', () => {
    const prev = ['1','2','3','4','5','6','7'];
    const result = updateArray(prev, '8');
    expect(result.length).toBeLessThanOrEqual(7);
    expect(result[0]).toBe('8');
  });
});
