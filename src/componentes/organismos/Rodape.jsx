import { motion } from 'motion/react'

export default function Rodape() {
  return (
    <motion.footer
      variants={{ oculto: { opacity: 0, y: 12 }, visivel: { opacity: 1, y: 0 } }}
      className="flex items-center justify-center gap-1.5 pt-2 text-[0.72rem] tracking-wide"
      style={{ color: 'var(--suave)' }}
    >
      <span className="font-display font-medium">Eduardo Sochodolak</span>
      <span aria-hidden="true">™</span>
    </motion.footer>
  )
}
