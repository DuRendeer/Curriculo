/* ==========================================
   SISTEMA DE GERENCIAMENTO DE TEMA
   ========================================== */

class GerenciadorTema {
    constructor() {
        this.temaAtual = 'escuro'; // Começa no modo escuro
        this.botaoTema = null;
        this.chaveArmazenamento = 'eduardo-curriculo-tema';
        this.inicializar();
    }

    inicializar() {
        this.botaoTema = document.getElementById('botaoTema');
        this.carregarTemaArmazenado();
        this.configurarEventos();
        this.detectarPreferenciaUsuario();
        console.log('🌙 Sistema de tema inicializado');
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
        console.log(`🎨 Tema alterado para: ${novoTema}`);
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
            console.log('✅ Evento do botão tema configurado');
        } else {
            console.error('❌ Botão de tema não encontrado!');
        }

        // Escuta mudanças na preferência do sistema
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

/* ==========================================
   SISTEMA DE NAVEGAÇÃO ENTRE SEÇÕES
   ========================================== */

class GerenciadorNavegacao {
    constructor() {
        this.secaoAtual = 'curriculo';
        this.botoesNavegacao = [];
        this.secoes = {};
        this.inicializar();
    }

    inicializar() {
        this.buscarElementos();
        this.configurarEventos();
        this.mostrarSecaoInicial();
        console.log('🧭 Sistema de navegação inicializado');
    }

    buscarElementos() {
        this.botoesNavegacao = document.querySelectorAll('.botao-navegacao');
        this.secoes = {
            curriculo: document.getElementById('secao-curriculo'),
            projetos: document.getElementById('secao-projetos')
        };
        
        console.log('📍 Elementos encontrados:');
        console.log('- Botões:', this.botoesNavegacao.length);
        console.log('- Seção currículo:', !!this.secoes.curriculo);
        console.log('- Seção projetos:', !!this.secoes.projetos);
    }

    configurarEventos() {
        this.botoesNavegacao.forEach((botao, indice) => {
            const secaoDestino = botao.getAttribute('data-secao');
            console.log(`🔗 Configurando botão ${indice + 1} para seção: ${secaoDestino}`);
            
            botao.addEventListener('click', (evento) => {
                evento.preventDefault();
                console.log(`🖱️ Clique detectado para seção: ${secaoDestino}`);
                this.navegarPara(secaoDestino);
            });
        });
    }

    navegarPara(nomeSecao) {
        console.log(`🎯 Tentando navegar para: ${nomeSecao}`);
        
        if (nomeSecao === this.secaoAtual) {
            console.log('ℹ️ Já está na seção atual');
            return;
        }

        if (!this.secoes[nomeSecao]) {
            console.error(`❌ Seção "${nomeSecao}" não encontrada!`);
            return;
        }

        // Remove classe ativa do botão atual
        this.removerClasseAtiva();
        
        // Oculta seção atual
        this.ocultarSecaoAtual();
        
        // Atualiza seção atual
        this.secaoAtual = nomeSecao;
        
        // Mostra nova seção
        this.mostrarSecao(nomeSecao);
        
        // Ativa novo botão
        this.ativarBotao(nomeSecao);

        console.log(`✅ Navegação concluída para: ${nomeSecao}`);
    }

    mostrarSecaoInicial() {
        this.mostrarSecao(this.secaoAtual);
        this.ativarBotao(this.secaoAtual);
        console.log(`📄 Seção inicial mostrada: ${this.secaoAtual}`);
    }

    ocultarSecaoAtual() {
        const secaoAtual = this.secoes[this.secaoAtual];
        if (secaoAtual) {
            secaoAtual.classList.add('oculto');
            console.log(`👁️ Seção ocultada: ${this.secaoAtual}`);
        }
    }

    mostrarSecao(nomeSecao) {
        const secao = this.secoes[nomeSecao];
        if (secao) {
            secao.classList.remove('oculto');
            this.animarEntradaSecao(secao);
            console.log(`👁️ Seção mostrada: ${nomeSecao}`);
        }
    }

    animarEntradaSecao(secao) {
        secao.style.opacity = '0';
        secao.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            secao.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            secao.style.opacity = '1';
            secao.style.transform = 'translateY(0)';
        }, 50);
    }

    removerClasseAtiva() {
        this.botoesNavegacao.forEach(botao => {
            botao.classList.remove('ativo');
        });
    }

    ativarBotao(nomeSecao) {
        const botao = document.querySelector(`[data-secao="${nomeSecao}"]`);
        if (botao) {
            botao.classList.add('ativo');
            console.log(`🔘 Botão ativado para: ${nomeSecao}`);
        } else {
            console.error(`❌ Botão não encontrado para seção: ${nomeSecao}`);
        }
    }
}

/* ==========================================
   SISTEMA DE ANIMAÇÕES PROFISSIONAIS
   ========================================== */

class GerenciadorAnimacoes {
    constructor() {
        this.configuracaoEngrenagens = {
            intervaloGeracao: 8000,
            tempoVidaMaximo: 30000,
            limiteMinimoEngrenagens: 3,
            limiteMaximoEngrenagens: 6
        };
        this.engrenagensDinamicas = [];
        this.inicializar();
    }

    inicializar() {
        this.configurarAnimacoesEntrada();
        this.iniciarSistemaEngrenagens();
        this.configurarEfeitosHover();
        console.log('⚙️ Sistema de animações inicializado');
    }

    configurarAnimacoesEntrada() {
        const elementosParaAnimar = document.querySelectorAll(
            '.secao-conteudo, .cabecalho-principal, .navegacao-principal'
        );

        const observadorIntersecao = new IntersectionObserver(
            (entradas) => {
                entradas.forEach(entrada => {
                    if (entrada.isIntersecting) {
                        this.animarEntradaElemento(entrada.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        elementosParaAnimar.forEach(elemento => {
            elemento.style.opacity = '0';
            elemento.style.transform = 'translateY(30px)';
            observadorIntersecao.observe(elemento);
        });
    }

    animarEntradaElemento(elemento) {
        elemento.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        elemento.style.opacity = '1';
        elemento.style.transform = 'translateY(0)';
    }

    iniciarSistemaEngrenagens() {
        if (this.verificarPreferenciaMovimento()) {
            console.log('🚫 Animações desabilitadas por preferência do usuário');
            return;
        }

        setInterval(() => {
            this.gerarEngrenagemDinamica();
        }, this.configuracaoEngrenagens.intervaloGeracao);

        console.log('⚙️ Sistema de engrenagens dinâmicas iniciado');
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

        // Programa remoção automática
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

        // Fade in suave
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

    configurarEfeitosHover() {
        // Efeito hover para cards de projeto
        const cardsProjetoo = document.querySelectorAll('.card-projeto');
        cardsProjetoo.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.aplicarEfeitoMagnificacao(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removerEfeitoMagnificacao(card);
            });
        });

        // Efeito hover para tags de habilidades
        const tagsHabilidades = document.querySelectorAll('.tag-habilidade');
        tagsHabilidades.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                this.aplicarEfeitoBrilho(tag);
            });
        });
    }

    aplicarEfeitoMagnificacao(elemento) {
        elemento.style.transform = 'translateY(-10px) scale(1.02)';
        elemento.style.zIndex = '10';
    }

    removerEfeitoMagnificacao(elemento) {
        elemento.style.transform = 'translateY(0) scale(1)';
        elemento.style.zIndex = '1';
    }

    aplicarEfeitoBrilho(elemento) {
        elemento.style.boxShadow = '0 0 20px rgba(58, 110, 165, 0.6)';
    }

    gerarNumeroAleatorio(minimo, maximo) {
        return Math.random() * (maximo - minimo) + minimo;
    }

    verificarPreferenciaMovimento() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
}

/* ==========================================
   SISTEMA DE PROJETOS
   ========================================== */

class GerenciadorProjetos {
    constructor() {
        this.inicializar();
    }

    inicializar() {
        this.configurarEventosProjettos();
        console.log('📂 Sistema de projetos inicializado');
    }

    configurarEventosProjettos() {
        // Botões com data-url (todos os projetos)
        const botoesComUrl = document.querySelectorAll('.botao-projeto[data-url]');
        botoesComUrl.forEach(botao => {
            botao.addEventListener('click', (evento) => {
                const url = evento.currentTarget.getAttribute('data-url');
                if (botao.classList.contains('botao-demo')) {
                    this.abrirLinkExterno(url, 'Demo');
                } else {
                    this.abrirLinkExterno(url, 'GitHub');
                }
                evento.preventDefault();
            });
        });

        console.log(`📂 Configurados ${botoesComUrl.length} botões de projetos`);
    }

    abrirLinkExterno(url, tipo) {
        console.log(`🔗 Abrindo ${tipo}: ${url}`);
        window.open(url, '_blank');
    }

    mostrarNotificacao(mensagem) {
        const notificacao = document.createElement('div');
        notificacao.className = 'notificacao-temporaria';
        notificacao.textContent = mensagem;
        notificacao.style.cssText = `
            position: fixed;
            top: 100px;
            right: 2rem;
            background: var(--cor-destaque);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: var(--sombra-padrao);
            z-index: 1000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(notificacao);

        // Animação de entrada
        setTimeout(() => {
            notificacao.style.opacity = '1';
            notificacao.style.transform = 'translateX(0)';
        }, 100);

        // Remoção automática
        setTimeout(() => {
            notificacao.style.opacity = '0';
            notificacao.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notificacao.parentNode) {
                    notificacao.parentNode.removeChild(notificacao);
                }
            }, 300);
        }, 3000);
    }
}

/* ==========================================
   INICIALIZAÇÃO PRINCIPAL DO SISTEMA
   ========================================== */

function iniciarSistemaCurriculo() {
    console.log('🚀 Iniciando Sistema do Currículo Eduardo Sochodolak...');
    
    try {
        // Aguarda um pouco para garantir que todos os elementos estão no DOM
        setTimeout(() => {
            const gerenciadorTema = new GerenciadorTema();
            const gerenciadorNavegacao = new GerenciadorNavegacao();
            const gerenciadorAnimacoes = new GerenciadorAnimacoes();
            const gerenciadorProjetos = new GerenciadorProjetos();
            
            console.log('✅ Todos os sistemas inicializados com sucesso!');
            
            // Exposição para debug
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                window.curriculoDebug = {
                    tema: gerenciadorTema,
                    navegacao: gerenciadorNavegacao,
                    animacoes: gerenciadorAnimacoes,
                    projetos: gerenciadorProjetos
                };
                console.log('🛠️ Modo debug ativo: window.curriculoDebug');
            }
        }, 100);
        
    } catch (erro) {
        console.error('❌ Erro na inicialização:', erro);
    }
}

/* ==========================================
   INICIALIZAÇÃO AUTOMÁTICA
   ========================================== */

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarSistemaCurriculo);
} else {
    iniciarSistemaCurriculo();
}