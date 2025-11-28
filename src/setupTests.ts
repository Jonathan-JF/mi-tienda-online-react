import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.alert para que no interrumpa tests
vi.stubGlobal('alert', () => {});

// Nota: si necesitas mockear fetch global, puedes hacerlo aquí:
// vi.stubGlobal('fetch', vi.fn());
