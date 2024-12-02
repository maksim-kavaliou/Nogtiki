import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdministratorsTableV2 from './AdminsWithPopups.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AdministratorsTableV2/>
  </StrictMode>,
)
