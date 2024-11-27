import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdministratorsTable from './Administrators.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <App />
        <AdministratorsTable />
  </StrictMode>,
)
