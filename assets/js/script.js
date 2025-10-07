class GerenciadorTema {
    constructor() {
        this.temaAtual = 'escuro';
        this.botaoTema = null;
        this.chaveArmazenamento = 'eduardo-linktree-tema';
        this.inicializar();
    }

    inicializar() {
        this.botaoTema = document.getElementById('botaoTema');
        this.carregarTemaArmazenado();
        this.configurarEventos();
        this.detectarPreferenciaUsuario();
    }

    carregarTemaArmazenado() {
        try {
            const temaSalvo = localStorage.getItem(this.chaveArmazenamento);
            if (temaSalvo && (temaSalvo === 'claro' || temaSalvo === 'escuro')) {
                this.aplicarTema(temaSalvo);
            }
        } catch (erro) {
            console.warn('Não foi possível carregar tema do localStorage:', erro);
        }
    }

    detectarPreferenciaUsuario() {
        try {
            const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (!localStorage.getItem(this.chaveArmazenamento) && prefereEscuro) {
                this.aplicarTema('escuro');
            }
        } catch (erro) {
            console.warn('Não foi possível detectar preferência do usuário:', erro);
        }
    }

    alternarTema() {
        const novoTema = this.temaAtual === 'claro' ? 'escuro' : 'claro';
        this.aplicarTema(novoTema);
        this.salvarTema(novoTema);
    }

    aplicarTema(tema) {
        if (tema === 'claro' || tema === 'escuro') {
            document.body.setAttribute('data-tema', tema);
            this.temaAtual = tema;
        }
    }

    salvarTema(tema) {
        try {
            localStorage.setItem(this.chaveArmazenamento, tema);
        } catch (erro) {
            console.warn('Não foi possível salvar tema:', erro);
        }
    }

    configurarEventos() {
        if (this.botaoTema) {
            this.botaoTema.addEventListener('click', () => {
                this.alternarTema();
            });
        }

        try {
            window.matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', (evento) => {
                    if (!localStorage.getItem(this.chaveArmazenamento)) {
                        this.aplicarTema(evento.matches ? 'escuro' : 'claro');
                    }
                });
        } catch (erro) {
            console.warn('Não foi possível configurar listener de preferência:', erro);
        }
    }
}

class GerenciadorAnimacoes {
    constructor() {
        this.configuracaoEngrenagens = {
            intervaloGeracao: 8000,
            tempoVidaMaximo: 30000,
            limiteMaximoEngrenagens: 6
        };
        this.engrenagensDinamicas = [];
        this.inicializar();
    }

    inicializar() {
        this.iniciarSistemaEngrenagens();
    }

    iniciarSistemaEngrenagens() {
        if (this.verificarPreferenciaMovimento()) {
            return;
        }

        setInterval(() => {
            this.gerarEngrenagemDinamica();
        }, this.configuracaoEngrenagens.intervaloGeracao);
    }

    gerarEngrenagemDinamica() {
        if (this.engrenagensDinamicas.length >= this.configuracaoEngrenagens.limiteMaximoEngrenagens) {
            this.removerEngrenagemMaisAntiga();
        }

        const containerPrincipal = document.querySelector('.container-principal');
        if (!containerPrincipal) return;

        const novaEngrenagem = this.criarElementoEngrenagem();
        containerPrincipal.appendChild(novaEngrenagem);
        this.engrenagensDinamicas.push(novaEngrenagem);

        setTimeout(() => {
            this.removerEngrenagem(novaEngrenagem);
        }, this.configuracaoEngrenagens.tempoVidaMaximo);
    }

    criarElementoEngrenagem() {
        const engrenagem = document.createElement('div');
        engrenagem.classList.add('engrenagem', 'engrenagem-dinamica');

        const tamanho = this.gerarNumeroAleatorio(25, 50);
        const posicaoX = this.gerarNumeroAleatorio(5, 90);
        const posicaoY = this.gerarNumeroAleatorio(10, 80);
        const velocidadeRotacao = this.gerarNumeroAleatorio(15, 30);
        const direcao = Math.random() > 0.5 ? 'normal' : 'reverse';

        engrenagem.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${tamanho}" height="${tamanho}" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z"/>
            </svg>
        `;

        engrenagem.style.cssText = `
            left: ${posicaoX}%;
            top: ${posicaoY}%;
            animation: rotacionarEngrenagem ${velocidadeRotacao}s linear infinite ${direcao};
            opacity: 0;
            transition: opacity 1s ease-in-out;
        `;

        setTimeout(() => {
            engrenagem.style.opacity = '1';
        }, 100);

        return engrenagem;
    }

    removerEngrenagemMaisAntiga() {
        if (this.engrenagensDinamicas.length > 0) {
            const engrenagemAntiga = this.engrenagensDinamicas.shift();
            this.removerEngrenagem(engrenagemAntiga);
        }
    }

    removerEngrenagem(engrenagem) {
        if (engrenagem && engrenagem.parentNode) {
            engrenagem.style.opacity = '0';
            setTimeout(() => {
                if (engrenagem.parentNode) {
                    engrenagem.parentNode.removeChild(engrenagem);
                }
                const indice = this.engrenagensDinamicas.indexOf(engrenagem);
                if (indice > -1) {
                    this.engrenagensDinamicas.splice(indice, 1);
                }
            }, 1000);
        }
    }

    gerarNumeroAleatorio(minimo, maximo) {
        return Math.random() * (maximo - minimo) + minimo;
    }

    verificarPreferenciaMovimento() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
}

function iniciarSistema() {
    try {
        setTimeout(() => {
            const gerenciadorTema = new GerenciadorTema();
            const gerenciadorAnimacoes = new GerenciadorAnimacoes();
        }, 100);
    } catch (erro) {
        console.error('Erro na inicialização:', erro);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarSistema);
} else {
    iniciarSistema();
}
