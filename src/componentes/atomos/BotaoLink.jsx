import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import Icone from './Icone.jsx'

const variantes = {
  oculto: { opacity: 0, y: 18 },
  visivel: { opacity: 1, y: 0 },
}

function Conteudo({ icone, titulo, descricao }) {
  return (
    <>
      <span
        className="grid size-11 shrink-0 place-items-center rounded-xl"
        style={{ background: 'var(--superficie-forte)' }}
      >
        <Icone nome={icone} tamanho={21} />
      </span>

      <span className="flex flex-col text-left leading-tight">
        <span className="font-display text-[0.95rem] font-semibold tracking-tight">
          {titulo}
        </span>
        <span className="text-[0.72rem]" style={{ color: 'var(--suave)' }}>
          {descricao}
        </span>
      </span>

      <span className="ml-auto opacity-40 transition-opacity duration-300 group-hover:opacity-100">
        <Icone nome="seta" tamanho={18} />
      </span>
    </>
  )
}

export default function BotaoLink({ icone, titulo, descricao, href, interno = false }) {
  const classe =
    'group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border px-4 py-3.5'
  const estilo = { borderColor: 'var(--borda)', background: 'var(--superficie)' }
  const conteudo = <Conteudo icone={icone} titulo={titulo} descricao={descricao} />

  const props = {
    variants: variantes,
    whileHover: { y: -3, borderColor: 'var(--borda-forte)' },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 380, damping: 26 },
    className: classe,
    style: estilo,
  }

  if (interno) {
    return (
      <motion.div {...props}>
        <Link to={href} className="absolute inset-0" aria-label={titulo} />
        {conteudo}
      </motion.div>
    )
  }

  return (
    <motion.a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {conteudo}
    </motion.a>
  )
}
