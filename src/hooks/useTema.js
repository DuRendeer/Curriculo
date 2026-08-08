import { createElement, createContext, useContext, useState, useLayoutEffect, useCallback } from 'react'

const ContextoTema = createContext(null)

function temaInicial() {
  try {
    const salvo = localStorage.getItem('tema')
    if (salvo === 'claro' || salvo === 'escuro') return salvo
  } catch {}
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'claro' : 'escuro'
}

export function ProvedorTema({ children }) {
  const [tema, definirTema] = useState(temaInicial)

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-tema', tema)
    try { localStorage.setItem('tema', tema) } catch {}
  }, [tema])

  const alternarTema = useCallback(() => {
    definirTema(anterior => (anterior === 'escuro' ? 'claro' : 'escuro'))
  }, [])

  return createElement(ContextoTema.Provider, { value: { tema, alternarTema } }, children)
}

export function useTema() {
  return useContext(ContextoTema)
}
