import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.alert para que no interrumpa tests
vi.stubGlobal('alert', () => {});

// Mock simple de localStorage para tests (jsdom en vitest a veces no implementa todo)
const createLocalStorageMock = () => {
	let store: Record<string, string> = {};
	return {
		getItem: (key: string) => (key in store ? store[key] : null),
		setItem: (key: string, value: string) => { store[key] = value.toString(); },
		removeItem: (key: string) => { delete store[key]; },
		clear: () => { store = {}; },
		// útil para debug si se accede a las claves
		_getStore: () => store
	};
};

vi.stubGlobal('localStorage', createLocalStorageMock());

// Nota: si necesitas mockear fetch global, puedes hacerlo aquí:
// vi.stubGlobal('fetch', vi.fn());
