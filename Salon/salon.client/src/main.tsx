import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdministratorsTable from './Administrators.tsx'
import AdministratorsTableWithAdd from './AddAdministrator.tsx'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AdministratorsTableWithAdd/>
        <AdministratorsTable />
  </StrictMode>,
)
