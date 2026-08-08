import { motion } from 'motion/react'
import BotaoLink from '../atomos/BotaoLink.jsx'

const lista = {
  oculto: {},
  visivel: { transition: { staggerChildren: 0.07 } },
}

const links = [
  {
    icone: 'curriculo',
    titulo: 'Currículo',
    descricao: 'Meu currículo completo',
    href: 'https://docs.google.com/document/d/1SwYS9NWltx3rEXPykn2SIyLA96b7bqMxJkR6VN1hOJM/edit?usp=sharing',
  },
  {
    icone: 'whatsapp',
    titulo: 'WhatsApp',
    descricao: 'Fale comigo direto',
    href: 'https://api.whatsapp.com/send/?phone=5542998708313&text&type=phone_number&app_absent=0',
  },
  {
    icone: 'github',
    titulo: 'GitHub',
    descricao: 'Meus repositórios',
    href: 'https://github.com/DuRendeer',
  },
  {
    icone: 'linkedin',
    titulo: 'LinkedIn',
    descricao: 'Minha rede profissional',
    href: 'https://www.linkedin.com/in/dusochodolak/',
  },
  {
    icone: 'instagram',
    titulo: 'Instagram',
    descricao: 'Meu dia a dia',
    href: 'https://www.instagram.com/du_sochodolak/',
  },
  {
    icone: 'portfolio',
    titulo: 'Portfólio',
    descricao: 'Projetos e trabalhos',
    href: '/portfolio',
    interno: true,
  },
]

export default function ListaLinks() {
  return (
    <motion.nav variants={lista} className="flex w-full flex-col gap-3">
      {links.map(item => (
        <BotaoLink key={item.titulo} {...item} />
      ))}
    </motion.nav>
  )
}
