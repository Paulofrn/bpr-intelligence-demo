# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-01

### Added

- **Blueprint Estrategico DOCX** — documento consultivo 80+ paginas, padrao McKinsey
  - 10 secoes + apendices (Executive Summary ate Call-to-Action)
  - Design system (Georgia/Calibri, paleta gold/charcoal)
  - Claims calibrados com dados verificados (ROI 3-4x, LTV/CAC 12-18x)
  - Linguagem focada no comprador (zero terminologia de investidor)
- **Pitch Deck PPTX** — 25 slides com storytelling em 4 atos
  - Ato 1: Desconforto (slides 1-6)
  - Ato 2: Possibilidade (slides 7-12)
  - Ato 3: Prova (slides 13-19)
  - Ato 4: Decisao (slides 20-25)
- **Showcase Interativo HTML** — experiencia web com animacoes CSS e SVG
- **Showcase de Vendas HTML** — versao focada em conversao com CTA
- **ARIA Chatbot Proxy** — backend serverless (Vercel) com AI via OpenRouter
  - Endpoints: /api/aria (chat), /api/track (analytics), /api/leads (CRM)
  - Integracao Supabase com RLS e scoring automatico
- **Landing Page** — pagina principal com integracoes
- **Base de Pesquisa** — 18 documentos-fonte consolidados
- **Prompts de Geracao** — 8 prompts especializados para cada entregavel
- **Synkra AIOS Framework** — orquestracao de agentes AI para desenvolvimento
- **9 Stories Completas** (Epic BPR Deliverables)
  - 1.1 Environment Setup
  - 1.2 Source Document Extraction
  - 1.3 DOCX Consulting Book
  - 1.4 HTML Executive Showcase
  - 1.5 DOCX Expansion (80+ pages)
  - 1.6 Pricing Tiers Integration
  - 1.7 Quality Verification (43-point)
  - 1.8 HTML Accessibility Fixes
  - 1.9 DOCX Page Count Verification

### Changed

- **McKinsey Pipeline (Etapa 1)** — revisao completa do Blueprint Estrategico
  - Correcao de 6 inconsistencias numericas
  - Calibracao de 7 claims com dados verificados
  - Remocao de linguagem de investidor
  - Substituicao da Secao IX (investidor → Pacote BPR)
- **McKinsey Pipeline (Etapa 1B)** — correcao de claims com dados verificados
- **McKinsey Pipeline (Etapa 2B)** — Pitch HTML interativo + security hardening

### Infrastructure

- README.md profissional com arquitetura e badges
- Test suite (Jest): 31 testes (integracao + validacao + integridade)
- ESLint configurado para Node.js/ES2022
- CI/CD: GitHub Actions (lint + test matrix Node 18/20)
- Release workflow automatico via tags
- Branch protection na main (CI obrigatorio)
- CONTRIBUTING.md com branch strategy e convencoes
- .gitignore, .env.example, PR template
