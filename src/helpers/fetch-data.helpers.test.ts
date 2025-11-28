import { describe, it, expect, vi } from 'vitest';
import * as actions from '../actions';
import { fetchData } from './fetch-data.helpers';

describe('fetchData', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('devuelve productos cuando getProducts está disponible', async () => {
    const productos = [{ id: 1, nombre: 'P1' }];
    vi.spyOn(actions, 'getProducts').mockReturnValue(productos as any);

    const result = await fetchData();
    expect(result).toEqual(productos);
  });

  it('maneja errores y devuelve un objeto vacío', async () => {
    vi.spyOn(actions, 'getProducts').mockImplementation(() => { throw new Error('fail'); });
    const result = await fetchData();
    expect(result).toEqual({});
  });
});
