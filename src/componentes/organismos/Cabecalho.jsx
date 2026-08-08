import { motion } from 'motion/react'
import Logo from '../atomos/Logo.jsx'

const surgir = {
  oculto: { opacity: 0, y: 16 },
  visivel: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
}

export default function Cabecalho() {
  return (
    <motion.header variants={surgir} className="flex flex-col items-center text-center">
      <motion.div
        variants={surgir}
        whileHover={{ scale: 1.05, rotate: 2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="relative grid size-24 place-items-center"
      >
        <Logo tamanho={96} />
      </motion.div>

      <motion.h1
        variants={surgir}
        className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl"
      >
        Eduardo Sochodolak
      </motion.h1>

      <motion.p
        variants={surgir}
        className="mt-2 text-sm font-medium"
        style={{ color: 'var(--suave)' }}
      >
        Engenheiro de Software Full Stack
      </motion.p>
    </motion.header>
  )
}
