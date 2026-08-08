const tracos = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const desenhos = {
  curriculo: (
    <g {...tracos}>
      <path d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4" />
      <path d="M8.5 12.5h7" />
      <path d="M8.5 16h7" />
      <path d="M8.5 9h3" />
    </g>
  ),
  whatsapp: (
    <g {...tracos}>
      <path d="M4 20l1.3-3.9a7.5 7.5 0 1 1 2.8 2.7L4 20Z" />
      <path d="M9 9.2c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.6 1.4c.1.2 0 .4-.1.6l-.4.5c-.1.2-.2.3 0 .6a5 5 0 0 0 2.4 2.1c.3.1.4 0 .6-.1l.5-.6c.2-.2.3-.2.6-.1l1.4.7c.3.1.4.2.4.4v.6c0 .5-.6 1-1.1 1.1-.5.1-1.1.2-3.4-.8a8 8 0 0 1-3.8-3.9c-.9-1.8-.8-2.6-.5-3Z" />
    </g>
  ),
  github: (
    <g {...tracos}>
      <path d="M9 19c-4 1.4-4-2.1-5.5-2.5M15 21v-3.3a2.9 2.9 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6 2.1 5 2.4 5 2.4a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.5 9c0 4.6 2.8 5.6 5.5 6a2.9 2.9 0 0 0-.8 2.1V21" />
    </g>
  ),
  linkedin: (
    <g {...tracos}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7" />
      <path d="M7 7.01v.01" />
      <path d="M11 17v-4a2 2 0 0 1 4 0v4" />
      <path d="M11 10v7" />
    </g>
  ),
  instagram: (
    <g {...tracos}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M16.5 7.5v.01" />
    </g>
  ),
  portfolio: (
    <g {...tracos}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
      <path d="M12 12v2" />
    </g>
  ),
  sol: (
    <g {...tracos}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </g>
  ),
  lua: (
    <g {...tracos}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </g>
  ),
  seta: (
    <g {...tracos}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </g>
  ),
  construcao: (
    <g {...tracos}>
      <path d="M3 21h18" />
      <path d="M5 21V8l7-4 7 4v13" />
      <path d="M9 21v-5h6v5" />
      <path d="M9 11h.01M12 11h.01M15 11h.01" />
    </g>
  ),
}

export default function Icone({ nome, tamanho = 22, className = '' }) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      {desenhos[nome]}
    </svg>
  )
}
