<p align="center">
  <h1 align="center">BPR Intelligence</h1>
  <p align="center">
    Plataforma de inteligência artificial para o mercado imobiliário premium brasileiro.<br/>
    Geração automatizada de deliverables executivos no padrão McKinsey.
  </p>
</p>

<p align="center">
  <a href="https://github.com/Paulofrn/bpr-intelligence-demo/actions/workflows/ci.yml">
    <img src="https://github.com/Paulofrn/bpr-intelligence-demo/actions/workflows/ci.yml/badge.svg" alt="CI" />
  </a>
  <a href="https://github.com/Paulofrn/bpr-intelligence-demo/releases">
    <img src="https://img.shields.io/github/v/release/Paulofrn/bpr-intelligence-demo?include_prereleases" alt="Release" />
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen" alt="Node.js" />
  <img src="https://img.shields.io/badge/license-proprietary-blue" alt="License" />
</p>

---

## Visao Geral

BPR Intelligence transforma 18+ documentos de pesquisa em deliverables executivos prontos para apresentacao a CEOs de imobiliarias premium. O pipeline gera automaticamente:

- **Blueprint Estrategico** (DOCX, 80+ paginas) — documento consultivo completo
- **Pitch Deck** (PPTX, 25 slides) — apresentacao no formato storytelling
- **Showcase Interativo** (HTML) — experiencia web com animacoes e dados ao vivo
- **ARIA Chatbot** — assistente de vendas com IA integrado ao showcase

## Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    BPR Intelligence                      │
├──────────────┬──────────────┬───────────────────────────┤
│  Generators  │   Outputs    │       ARIA Proxy          │
│              │              │    (Vercel Serverless)     │
│ create-book  │ DOCX (80p+)  │                           │
│ create-pitch │ PPTX (25sl)  │  /api/aria   (AI chat)    │
│              │ HTML (2)      │  /api/track  (analytics)  │
│              │              │  /api/leads  (CRM)        │
├──────────────┴──────────────┴───────────────────────────┤
│                     Research Base                        │
│            18 documentos fonte + prompts                 │
├─────────────────────────────────────────────────────────┤
│                   Infrastructure                         │
│         Node.js 18+ │ Supabase │ Vercel │ GitHub        │
└─────────────────────────────────────────────────────────┘
```

## Stack Tecnologico

| Camada | Tecnologia | Uso |
|--------|-----------|-----|
| Geradores | Node.js + [docx](https://www.npmjs.com/package/docx) | Blueprint DOCX |
| Geradores | Node.js + [pptxgenjs](https://www.npmjs.com/package/pptxgenjs) | Pitch Deck PPTX |
| Frontend | HTML5 + CSS3 + Vanilla JS | Showcase interativo |
| Backend | Vercel Serverless Functions | ARIA proxy API |
| Database | Supabase (PostgreSQL + RLS) | Leads, conversas, eventos |
| AI | OpenRouter (multi-model) | ARIA chatbot |
| CI/CD | GitHub Actions | Testes, lint, releases |
| Framework | Synkra AIOS | Orquestracao de agentes AI |

## Pre-requisitos

- **Node.js** >= 18
- **npm** >= 9
- **Git** >= 2.30

## Instalacao

```bash
# Clonar o repositorio
git clone https://github.com/Paulofrn/bpr-intelligence-demo.git
cd bpr-intelligence-demo

# Instalar dependencias
npm install

# Configurar variaveis de ambiente (opcional, para ARIA proxy)
cp .env.example .env
# Editar .env com suas credenciais
```

## Uso

### Gerar Blueprint Estrategico (DOCX)

```bash
npm run generate:book
```

Saida: `bpr-project/outputs/docx/BPR-Intelligence-Blueprint-Estrategico.docx`

### Gerar Pitch Deck (PPTX)

```bash
npm run generate:deck
```

Saida: `bpr-project/outputs/pptx/BPR-Intelligence-Pitch-Deck.pptx`

### Gerar Todos os Deliverables

```bash
npm run generate
```

### Executar Testes

```bash
npm test
```

### Verificar Codigo

```bash
npm run lint
```

## Estrutura de Pastas

```
bpr-intelligence/
├── .github/              # CI/CD workflows e configuracao
│   └── workflows/        # GitHub Actions (ci.yml, release.yml)
├── .aios-core/           # Synkra AIOS framework
├── bpr-project/
│   ├── src/              # Codigo-fonte dos geradores
│   │   ├── create-book.js      # Gerador do Blueprint DOCX
│   │   └── create-pitch-deck.js # Gerador do Pitch Deck PPTX
│   ├── outputs/          # Deliverables gerados
│   │   ├── docx/         # Documentos Word
│   │   ├── pptx/         # Apresentacoes PowerPoint
│   │   └── html/         # Showcases interativos
│   ├── prompts/          # Prompts de geracao e auditoria
│   ├── research/         # Documentos-fonte de pesquisa
│   └── aria-proxy/       # Backend serverless (Vercel)
│       ├── api/          # Endpoints (/aria, /track, /leads)
│       └── lib/          # Shared utilities (Supabase client)
├── docs/
│   ├── stories/          # Development stories (AIOS)
│   ├── prd/              # Product Requirements Document
│   └── qa/               # QA reports e gate files
├── tests/                # Testes automatizados
├── index.html            # Landing page principal
├── package.json          # Configuracao raiz (scripts, deps)
├── jest.config.js        # Configuracao do Jest
├── CHANGELOG.md          # Historico de versoes
└── CONTRIBUTING.md       # Guia de contribuicao
```

## Deliverables

| Entregavel | Formato | Descricao |
|-----------|---------|-----------|
| Blueprint Estrategico | DOCX | Documento consultivo 80+ paginas, padrao McKinsey |
| Pitch Deck | PPTX | 25 slides com storytelling (Desconforto → Acao) |
| Showcase Interativo | HTML | Experiencia web com SVG, animacoes, dados ao vivo |
| Showcase de Vendas | HTML | Versao focada em conversao com CTA |
| ARIA Chatbot | API | Assistente de vendas integrado via OpenRouter |

## Contribuicao

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para o guia completo de contribuicao, incluindo branch strategy e padroes de commit.

## Licenca

Proprietary - Todos os direitos reservados.

---

*Construido com [Synkra AIOS](https://github.com/synkra) — AI-Orchestrated Development*
