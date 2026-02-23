# BPR Intelligence — Product Requirements Document (PRD)

## Goals

- Produzir um **DOCX Consulting Book** (80-120 páginas) nível McKinsey/BCG consolidando os 18 documentos-fonte do projeto BPR Intelligence
- Criar um **HTML Executive Showcase** interativo com gráficos SVG, animações CSS e layout responsivo para apresentação a investidores
- Integrar **Pricing Tiers** (Seed R$150K, Growth R$500K, Scale R$2M) com ROI projetado em ambos os entregáveis
- Garantir acessibilidade **WCAG 2.1 AA** no HTML Showcase
- Consolidar todo o trabalho em estrutura AIOS com rastreabilidade completa (PRD → Epic → Stories → Entregáveis)

## Background Context

BPR Intelligence é a primeira **Family Office Imobiliária Algorítmica do Brasil**, fundada por Paulo Gomes. O projeto combina inteligência artificial, dados algorítmicos e expertise imobiliária para criar um modelo de advisory aumentado (Augmented Advisory) que oferece liquidez inteligente no mercado imobiliário brasileiro.

O material-fonte consiste em 18 documentos (9 PDFs + 1 Markdown + 8 HTMLs parciais) que cobrem desde o Executive Summary até a arquitetura de inteligência, diagnóstico estratégico, KPIs e oportunidade de investimento Lean Seed. O desafio é consolidar esse material fragmentado em dois entregáveis profissionais de alto impacto: um book impresso/digital (DOCX) e um showcase interativo (HTML).

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-22 | 1.0 | Criação retroativa — integração do projeto BPR ao AIOS | @pm (retroativo) |

---

## Requirements

### Functional

- **FR1**: Consolidar 18 documentos-fonte (9 PDFs, 1 MD, 8 HTMLs) em estrutura narrativa coerente, eliminando redundâncias e conectando seções com transições profissionais
- **FR2**: Gerar DOCX com design system profissional (paleta navy #1B2A4A / gold #C9A84C / white, tipografia Calibri/Cambria, headers/footers com logo e numeração)
- **FR3**: Criar HTML Executive Showcase com layout responsivo, gráficos SVG interativos e animações CSS suaves
- **FR4**: Incluir seções obrigatórias no DOCX: Cover Page, Table of Contents, Executive Summary, Diagnóstico Estratégico, Arquitetura Augmented Advisory, Liquidez Inteligente, Arquitetura de Inteligência, KPIs, Oportunidade de Investimento, Apêndices
- **FR5**: Incluir no HTML: Hero Section com animação, Dashboard de métricas, seções interativas por capítulo, CTA de contato
- **FR6**: Integrar 3 Pricing Tiers com métricas de ROI: Seed (R$150K, ROI 340%), Growth (R$500K, ROI 280%), Scale (R$2M, ROI 220%)
- **FR7**: Implementar navegação sticky no HTML com smooth scroll para todas as seções
- **FR8**: Gerar Table of Contents automática no DOCX via heading styles (Heading 1, 2, 3)
- **FR9**: Incluir CTA de WhatsApp no HTML para contato direto com Paulo Gomes
- **FR10**: Implementar sistema de verificação de qualidade com checklist de 43 pontos cobrindo ambos os entregáveis

### Non Functional

- **NFR1**: DOCX deve ter no mínimo 80 páginas quando renderizado no Microsoft Word (target: 80-120 páginas)
- **NFR2**: HTML deve atingir conformidade WCAG 2.1 AA (ARIA labels em SVGs, contraste mínimo 4.5:1, navegação por teclado)
- **NFR3**: HTML Showcase deve carregar em < 3 segundos em conexão 3G (sem dependências externas, tudo inline)
- **NFR4**: DOCX deve ser gerado programaticamente via Node.js (package `docx`) para reprodutibilidade
- **NFR5**: Todos os arquivos de saída devem ser armazenados no Dropbox em `/BOT INVEST/Paulo Gomes/`

---

## User Interface Design Goals

### Overall UX Vision

O HTML Executive Showcase deve transmitir sofisticação institucional — visual McKinsey/BCG com interatividade moderna. A experiência deve guiar o investidor por uma narrativa progressiva: do diagnóstico de mercado à oportunidade de investimento, terminando com CTA claro.

### Key Interaction Paradigms

- Scroll-driven storytelling com animações fade-in por seção
- Gráficos SVG interativos com tooltips em hover
- Navegação sticky com highlight da seção ativa
- Cards de pricing com comparação visual lado a lado

### Core Screens and Views

- Hero Section (landing com animação)
- Dashboard de Métricas (KPIs principais em cards)
- Seções de Conteúdo (1 por capítulo, com gráficos)
- Pricing Tiers (comparação de planos)
- CTA / Contato (WhatsApp + informações)

### Accessibility: WCAG 2.1 AA

- ARIA labels em todos os SVGs e elementos interativos
- Contraste mínimo 4.5:1 em todo o texto
- Navegação completa por teclado
- Texto alternativo em todas as imagens/gráficos

### Branding

- Paleta: Navy (#1B2A4A), Gold (#C9A84C), White (#FFFFFF), Light Gray (#F5F5F5)
- Tipografia: System fonts (sans-serif stack para web, Calibri/Cambria para DOCX)
- Tom: institucional, premium, data-driven

### Target Device and Platforms: Web Responsive

- Desktop-first com responsive breakpoints para tablet e mobile
- Print-friendly para DOCX (A4, margens profissionais)

---

## Technical Assumptions

### Repository Structure: Monorepo

Projeto único em `/Users/mac/code1/` com AIOS framework. Artefatos gerados no Dropbox.

### Service Architecture

Não há backend/server. O projeto consiste em:
- Scripts Node.js para geração de DOCX (package `docx`)
- HTML/CSS/JS estático inline (zero dependências externas)
- Dropbox como storage dos entregáveis

### Testing Requirements

- Verificação manual de page count no Microsoft Word (DOCX)
- Checklist de 43 pontos para qualidade (FR10)
- Validação WCAG 2.1 AA via inspeção manual e ferramentas de acessibilidade
- Sem testes automatizados unitários (projeto de geração de documentos)

### Additional Technical Assumptions and Requests

- Node.js 18+ para geração de DOCX
- Package `docx` (npm) para criação programática de DOCX
- Sem framework frontend — HTML/CSS/JS puro inline
- Armazenamento no Dropbox: `/Users/mac/Library/CloudStorage/Dropbox/BOT INVEST/Paulo Gomes/`
- Documentos-fonte em subpasta `Projeto/` do mesmo Dropbox

---

## Epic List

- **Epic 1: BPR Intelligence Deliverables** — Produzir os entregáveis profissionais (DOCX + HTML) consolidando toda a inteligência do projeto BPR, desde setup do ambiente até verificação final de qualidade

---

## Epic 1: BPR Intelligence Deliverables

Consolidar os 18 documentos-fonte do projeto BPR Intelligence em dois entregáveis profissionais de alto impacto: um Consulting Book em DOCX (80-120 páginas, nível McKinsey/BCG) e um Executive Showcase em HTML interativo. O epic cobre todo o ciclo: desde preparação do ambiente, extração de conteúdo, geração dos entregáveis, integração de pricing, até verificação final de qualidade e correções de acessibilidade.

### Story 1.1: Environment Setup

**As a** developer,
**I want** to set up the Node.js project with the `docx` package and configure access to source documents,
**so that** I have a working development environment for generating the DOCX deliverable.

**Acceptance Criteria:**
1. Node.js project initialized with `package.json`
2. `docx` package installed as dependency
3. Source documents (18 files) accessible and catalogued
4. Project structure documented

### Story 1.2: Source Document Extraction

**As a** content architect,
**I want** to extract and organize content from all 18 source documents into a structured outline,
**so that** the content is ready for assembly into the final deliverables without redundancies.

**Acceptance Criteria:**
1. Content extracted from all 9 PDFs, 1 MD, and 8 HTML files
2. Master outline created mapping content to DOCX chapters
3. Redundancies identified and resolution strategy documented
4. Key metrics and data points catalogued for reuse in both deliverables

### Story 1.3: DOCX Consulting Book Generation

**As a** project stakeholder,
**I want** a professionally designed DOCX Consulting Book with all consolidated content,
**so that** I have a print-ready document for investor presentations.

**Acceptance Criteria:**
1. DOCX generated with cover page, TOC, and all content sections (FR4)
2. Design system applied (navy/gold palette, Calibri/Cambria, headers/footers) (FR2)
3. Auto-generated Table of Contents via heading styles (FR8)
4. Professional formatting with consistent spacing, margins, and page breaks
5. File saved to Dropbox at designated path (NFR5)

### Story 1.4: HTML Executive Showcase

**As a** project stakeholder,
**I want** an interactive HTML Executive Showcase with SVG graphics and responsive layout,
**so that** I can present the project digitally to potential investors with maximum impact.

**Acceptance Criteria:**
1. HTML page with hero section, dashboard metrics, content sections, and CTA (FR3, FR5)
2. SVG interactive graphics with hover tooltips
3. Sticky navigation with smooth scroll (FR7)
4. Responsive layout (desktop-first with tablet/mobile breakpoints)
5. All content inline (zero external dependencies) (NFR3)
6. File saved to Dropbox at designated path (NFR5)

### Story 1.5: DOCX Expansion to 80+ Pages

**As a** project stakeholder,
**I want** the DOCX book expanded to at least 80 pages with deeper analysis and additional content,
**so that** the deliverable meets the professional standard expected for consulting books.

**Acceptance Criteria:**
1. DOCX content expanded with deeper analysis, case studies, and market data
2. Page count reaches minimum 80 pages in Microsoft Word (NFR1)
3. Narrative flow maintained — no filler content, all additions add value
4. Updated DOCX saved to Dropbox

### Story 1.6: Pricing Tiers Integration

**As a** project stakeholder,
**I want** the 3 pricing tiers (Seed/Growth/Scale) integrated into both DOCX and HTML,
**so that** investors can see clear investment options with projected ROI.

**Acceptance Criteria:**
1. Pricing tiers in DOCX: Seed R$150K (ROI 340%), Growth R$500K (ROI 280%), Scale R$2M (ROI 220%) (FR6)
2. Pricing tiers in HTML with visual comparison cards (FR6)
3. ROI projections with supporting data from source documents
4. Consistent pricing information across both deliverables

### Story 1.7: Quality Verification (43-Point Checklist)

**As a** QA lead,
**I want** both deliverables verified against a comprehensive 43-point quality checklist,
**so that** we can confirm professional quality before final delivery.

**Acceptance Criteria:**
1. 43-point checklist executed covering both DOCX and HTML (FR10)
2. All CRITICAL and HIGH issues resolved
3. Quality report generated with pass/fail per item
4. Both deliverables confirmed ready for presentation

### Story 1.8: HTML Accessibility Fixes

**As a** user with accessibility needs,
**I want** the HTML Showcase to meet WCAG 2.1 AA standards,
**so that** the content is accessible to all potential investors regardless of ability.

**Acceptance Criteria:**
1. WhatsApp CTA updated with real phone number (currently placeholder) (FR9)
2. ARIA labels added to all 11 SVG graphics (NFR2)
3. Keyboard navigation functional for all interactive elements (NFR2)
4. Color contrast verified at minimum 4.5:1 ratio (NFR2)
5. Updated HTML saved to Dropbox

### Story 1.9: DOCX Page Count Verification

**As a** project stakeholder,
**I want** final verification that the DOCX meets the 80-page minimum,
**so that** the deliverable is confirmed complete and ready for printing/distribution.

**Acceptance Criteria:**
1. DOCX opened in Microsoft Word and page count verified
2. Page count confirmed >= 80 pages (NFR1)
3. If under 80 pages, content expanded to meet minimum
4. Final DOCX saved to Dropbox with version tag

---

## Checklist Results Report

> Retroactive integration — checklist executed informally during pre-AIOS development.

---

## Next Steps

### UX Expert Prompt

N/A — HTML Showcase design was completed during pre-AIOS development. Future accessibility fixes tracked in Story 1.8.

### Architect Prompt

N/A — Technical architecture (Node.js + docx package, inline HTML) was established during pre-AIOS development. No additional architectural decisions required for remaining stories.
