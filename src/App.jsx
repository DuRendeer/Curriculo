import { Routes, Route } from 'react-router-dom'
import Inicio from './paginas/Inicio.jsx'
import EmConstrucao from './paginas/EmConstrucao.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/portfolio" element={<EmConstrucao />} />
    </Routes>
  )
}
