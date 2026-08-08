import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import Icone from '../componentes/atomos/Icone.jsx'
import BotaoTema from '../componentes/atomos/BotaoTema.jsx'

export default function EmConstrucao() {
  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center px-5 py-10 text-center">
      <div className="fixed right-5 top-5 z-10">
        <BotaoTema />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="grid size-20 place-items-center rounded-2xl border"
          style={{ borderColor: 'var(--borda-forte)', background: 'var(--superficie)' }}
        >
          <Icone nome="construcao" tamanho={34} />
        </motion.div>

        <div className="flex flex-col gap-2">
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Em construção
          </h1>
          <p className="text-sm" style={{ color: 'var(--suave)' }}>
            Meu portfólio está sendo preparado. Volte em breve.
          </p>
        </div>

        <motion.div whileHover={{ x: -4 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium"
            style={{ borderColor: 'var(--borda)', background: 'var(--superficie)' }}
          >
            <span className="rotate-180">
              <Icone nome="seta" tamanho={16} />
            </span>
            Voltar
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 flex items-center gap-1.5 text-[0.72rem]" style={{ color: 'var(--suave)' }}>
        <span className="font-display font-medium">Eduardo Sochodolak</span>
        <span aria-hidden="true">™</span>
      </div>
    </div>
  )
}
