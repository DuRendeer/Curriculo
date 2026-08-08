import { motion, AnimatePresence } from 'motion/react'
import { useTema } from '../../hooks/useTema.js'
import Icone from './Icone.jsx'

export default function BotaoTema() {
  const { tema, alternarTema } = useTema()
  const escuro = tema === 'escuro'

  return (
    <motion.button
      onClick={alternarTema}
      aria-label={escuro ? 'Ativar tema claro' : 'Ativar tema escuro'}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="relative grid size-11 place-items-center rounded-full border"
      style={{ borderColor: 'var(--borda)', background: 'var(--superficie)' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={tema}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="grid place-items-center"
        >
          <Icone nome={escuro ? 'lua' : 'sol'} tamanho={20} />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
