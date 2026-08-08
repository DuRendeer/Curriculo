import { motion } from 'motion/react'
import BotaoTema from '../componentes/atomos/BotaoTema.jsx'
import Cabecalho from '../componentes/organismos/Cabecalho.jsx'
import ListaLinks from '../componentes/organismos/ListaLinks.jsx'
import Rodape from '../componentes/organismos/Rodape.jsx'

const container = {
  oculto: { opacity: 1 },
  visivel: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export default function Inicio() {
  return (
    <div className="relative flex min-h-svh w-full flex-col items-center px-5 py-10">
      <div className="fixed right-5 top-5 z-10">
        <BotaoTema />
      </div>

      <motion.main
        variants={container}
        initial="oculto"
        animate="visivel"
        className="flex w-full max-w-md flex-1 flex-col justify-center gap-10 py-8"
      >
        <Cabecalho />
        <ListaLinks />
        <Rodape />
      </motion.main>
    </div>
  )
}
