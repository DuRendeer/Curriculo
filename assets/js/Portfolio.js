const toggleAudio = document.querySelector('#audio');
const audio = document.querySelector('.ambience');

audio.volume = 0.5;

toggleAudio.addEventListener('input', () => {
  audio.muted = !audio.muted;
  audio.play();
});

window.addEventListener('DOMContentLoaded', () => {
  inicializarTerminal('terminal-output-main', 'terminal-input[data-terminal="main"]');
  inicializarASCIIArt();
});

function inicializarASCIIArt() {
  const asciiContainer = document.getElementById('ascii-art-portrait');
  if (!asciiContainer) return;

  const art = `
  ____        ____                 __
 / __ \\__  __/ __ \\___  ____  ____/ /__  ___  _____
/ / / / / / / /_/ / _ \\/ __ \\/ __  / _ \\/ _ \\/ ___/
/ /_/ / /_/ / _, _/  __/ / / / /_/ /  __/  __/ /
/_____/\\__,_/_/ |_|\\___/_/ /_/\\__,_/\\___/\\___/_/


╔════════════════════════════╗
║   Eduardo Sochodolak      ║
║   Co-fundador @ Codduo    ║
╚════════════════════════════╝

> Automação de Processos
> IoT & Smart Home
> Machine Learning & NLP

┌────────────────────────────┐
│ GitHub:  DuRendeer         │
│ WhatsApp: (42) 99870-8313  │
└────────────────────────────┘

   [SYSTEM ONLINE]
   [ALL SYSTEMS GO]
`;

  asciiContainer.textContent = art;
}

function inicializarTerminal(outputId, inputSelector) {
const terminalOutput = document.getElementById(outputId);
const terminalInput = typeof inputSelector === 'string' && inputSelector.startsWith('#')
  ? document.getElementById(inputSelector.slice(1))
  : document.querySelector(inputSelector);

if (!terminalOutput || !terminalInput) {
  console.log(`Terminal ${outputId} não encontrado, pulando...`);
  return;
}

console.log(`Terminal inicializado: ${outputId}`);

const comandos = {
  help: {
    descricao: 'Lista todos os comandos disponíveis',
    executar: () => {
      return `Comandos disponíveis:
  help       - Lista todos os comandos
  about      - Informações sobre Eduardo Sochodolak
  skills     - Habilidades técnicas
  projects   - Projetos desenvolvidos
  contact    - Informações de contato
  github     - Abre o GitHub do DuRendeer
  linkedin   - Abre o LinkedIn
  clear      - Limpa o terminal`;
    }
  },
  about: {
    descricao: 'Informações sobre Eduardo Sochodolak',
    executar: () => {
      return `Eduardo Sochodolak - DuRendeer
Co-fundador da Codduo
Engenheiro de Software em Automação

Especializado em:
- Automação de Processos
- Internet das Coisas (IoT)
- Machine Learning & NLP`;
    }
  },
  skills: {
    descricao: 'Habilidades técnicas',
    executar: () => {
      return `Habilidades Técnicas:
  JavaScript  ████████████████████ 90%
  PHP         █████████████████░░░ 85%
  Python      ████████████████░░░░ 80%

Especialidades:
- Automação de Processos Jurídicos
- Integração de Sistemas
- Dashboards Analíticos
- IoT e Smart Home`;
    }
  },
  projects: {
    descricao: 'Projetos desenvolvidos',
    executar: () => {
      return `Projetos Principais:
- Sistemas de automação jurídica
- Dashboards analíticos para tribunais
- Integração com órgãos governamentais
- Soluções IoT e casas inteligentes
- Processamento de linguagem natural`;
    }
  },
  contact: {
    descricao: 'Informações de contato',
    executar: () => {
      return `Contato:
  WhatsApp: (42) 99870-8313
  GitHub: github.com/DuRendeer
  LinkedIn: linkedin.com/in/eduardo-sochodolak
  Email: Disponível no LinkedIn`;
    }
  },
  github: {
    descricao: 'Abre o GitHub',
    executar: () => {
      window.open('https://github.com/DuRendeer', '_blank');
      return 'Abrindo GitHub...';
    }
  },
  linkedin: {
    descricao: 'Abre o LinkedIn',
    executar: () => {
      window.open('https://www.linkedin.com/in/eduardo-sochodolak/', '_blank');
      return 'Abrindo LinkedIn...';
    }
  },
  clear: {
    descricao: 'Limpa o terminal',
    executar: () => {
      terminalOutput.innerHTML = '';
      return '';
    }
  }
};

function adicionarLinha(texto) {
  const linha = document.createElement('p');
  linha.className = 'line';
  linha.textContent = texto;
  terminalOutput.appendChild(linha);
}

function processarComando(comando) {
  const cmd = comando.trim().toLowerCase();

  adicionarLinha(`visitor@durendeer:~$ ${comando}`);

  if (cmd === '') {
    return;
  }

  if (comandos[cmd]) {
    const resultado = comandos[cmd].executar();
    if (resultado) {
      adicionarLinha(resultado);
    }
  } else {
    adicionarLinha(`Comando não encontrado: ${cmd}`);
    adicionarLinha('Digite "help" para ver os comandos disponíveis');
  }

  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    processarComando(terminalInput.value);
    terminalInput.value = '';
  }
});

// Auto-focus no input quando clicar no terminal
const terminalContainer = terminalOutput.parentElement;
if (terminalContainer) {
  terminalContainer.addEventListener('click', () => {
    terminalInput.focus();
  });
}

// Focus automático ao carregar
setTimeout(() => {
  terminalInput.focus();
}, 100);

adicionarLinha('Bem-vindo ao terminal DuRendeer!');
adicionarLinha('Digite "help" para ver os comandos disponíveis.');
adicionarLinha('');
}