import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ProvedorTema } from './hooks/useTema.js'
import './css/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProvedorTema>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProvedorTema>
  </StrictMode>,
)
