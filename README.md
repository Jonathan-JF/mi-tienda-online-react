# Mi Tienda Online (React + TypeScript + Vite)

Este repositorio contiene una tienda online de ejemplo creada con React, TypeScript y Vite. Está pensada como una base para aprender y desarrollar una SPA (Single Page Application) con rutas, contextos (Auth y Cart), componentes reutilizables y una pequeña suite de tests.

## Contenido principal

- `src/` : código fuente de la aplicación (componentes, páginas, context, helpers, datos de ejemplo).
- `public/` : assets públicos (imágenes, favicon, etc.).

## Características implementadas

- Rutas con `react-router-dom`.
- `AuthContext` y `CartContext` para manejar sesión y carrito.
- Componentes: `NavBar`, `Header`, `Footer`, `ProductoCard`, layouts y páginas.
- Helpers y datos de ejemplo en `src/helpers` y `src/data`.
- Suite de pruebas con `vitest` y `@testing-library/react`

## Instalación y uso

1. Instalar dependencias:

```cmd
cd c:\Workspace\mi-tienda-online-react
npm install --legacy-peer-deps
```

2. Ejecutar en modo desarrollo (Vite):

```cmd
npm run dev
```

3. Construir para producción:

```cmd
npm run build
```

## Pruebas (unitarias y UI)

- Ejecutar tests (modo no interactivo):

```cmd
npx vitest run
```

- Abrir la interfaz visual de Vitest (UI) — muestra tests en tiempo real y permite re-ejecutarlos rápidamente:

```cmd
npm run test:ui
# Abrir la URL que muestre la terminal (ej. http://localhost:51204/__vitest__/)
```

- Generar cobertura:

```cmd
npm run test:coverage
```

## Notas sobre las pruebas

- Las pruebas incluidas cubren helpers, contextos y componentes principales.
