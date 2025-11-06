import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import './styles.css'; // Importa tus estilos personales

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
)
