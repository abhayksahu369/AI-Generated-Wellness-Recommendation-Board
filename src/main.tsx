import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WellnessProvider } from "./context/WellnessContext.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WellnessProvider>
      <App />
    </WellnessProvider>
  </StrictMode>,
)
