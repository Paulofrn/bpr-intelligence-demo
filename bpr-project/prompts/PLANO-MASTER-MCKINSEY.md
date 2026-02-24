# BPR Intelligence — Plano Master: Pacote Padrão McKinsey
## Execução Sequencial AIOS + Validação Cowork

**Data:** 24/02/2026 (v2 — com separação Venda vs Entrega)
**Objetivo:** Produzir o pacote executivo completo no padrão de grande consultoria (McKinsey/BCG/Bain), separando claramente o material de VENDA (pré-compra) do material de ENTREGA (pós-compra).
**Método:** AIOS executa → Cowork valida → Paulo aprova → próxima etapa

---

## DOIS MOMENTOS, DOIS PROPÓSITOS

```
┌─────────────────────────────────────────────────────────────────┐
│                    ANTES DA VENDA                               │
│              (O que convence o CEO a comprar)                   │
│                                                                 │
│  🌐 Showcase + Aria ─── primeiro contato, qualifica 24/7       │
│  📄 Executive Summary ── 1 página, CEO leva ao sócio           │
│  📊 Pitch Deck ───────── reunião presencial, fecha atenção     │
│  📈 Financial Model ──── abre ao vivo, CEO vê SEU ROI          │
│                                                                 │
│  ⚠️  NENHUM destes entrega IP técnico.                         │
│  ⚠️  Mostram O QUE e QUANTO, nunca COMO.                      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                    DEPOIS DA VENDA                              │
│            (O que o cliente recebe após pagar)                  │
│                                                                 │
│  📘 Blueprint Estratégico ── estratégia completa, 80+ págs     │
│  📗 Technical Implementation Guide ── software house executa   │
│  📈 Financial Model (completo) ── acesso total ao modelo       │
│  🤖 Aria System ─────────── infraestrutura live de leads       │
│  📁 Data Room ───────────── research, templates, referências   │
│                                                                 │
│  ✅  Aqui está todo o IP.                                      │
│  ✅  Comprador tem autonomia total para implementar.           │
└─────────────────────────────────────────────────────────────────┘
```

---

## O QUE O CLIENTE RECEBE (Data Room Final — Pós-Venda)

```
📁 BPR-Intelligence-Executive-Package/
│
├── 📄 00-INDICE.pdf (índice navegável)
│
├── 📄 01-Executive-Summary.pdf
│   └── 1 página A4. Resume tudo em 60 segundos.
│
├── 📊 02-Pitch-Deck.pptx + .pdf
│   └── ~25 slides. O "Blue Book". Speaker notes em todos.
│
├── 📘 03-Blueprint-Estrategico.docx + .pdf
│   └── 80+ páginas. Estratégia, mercado, ferramentas, competitivo, governança.
│
├── 📗 04-Technical-Implementation-Guide.docx + .pdf
│   └── ~60 páginas. APIs, schemas, ML pipelines, runbooks, infra.
│   └── A software house abre e começa a codar.
│
├── 📈 05-Financial-Model.xlsx
│   └── 8 abas editáveis. CEO muda inputs, vê ROI dele.
│
├── 🌐 06-Showcase-Interativo.txt
│   └── URL + HTML backup + documentação da Aria.
│
├── 🤖 07-Aria-System-Docs.pdf
│   └── Documentação técnica: proxy, Supabase, admin dashboard.
│
└── 📁 08-Research-References/
    ├── Análise Estratégica Buyer's Agency UK.pdf
    ├── Análise do Modelo MySide.pdf
    ├── Análise Comparativa MySide vs Matchpoint vs Black Brick.pdf
    ├── Viabilidade e Contexto Imobiliário Local.pdf
    ├── Family Office Imobiliário — Receita Recorrente.pdf
    ├── Matriz de Viabilidade e Recomendações.pdf
    └── Clonagem de Squad e Skills Imobiliárias.pdf
```

---

## INVENTÁRIO ATUAL

| # | Entregável | Momento | Status | Ação |
|---|-----------|---------|--------|------|
| 01 | Executive Summary 1-Pager | VENDA | ❌ Criar | Último (precisa dos números fechados) |
| 02 | Pitch Deck PPTX (~25 slides) | VENDA | ❌ Criar | Prioridade 1 — arma da reunião |
| 03 | Financial Model XLSX (8 abas) | VENDA + ENTREGA | ❌ Criar | Prioridade 2 — fecha venda ao vivo |
| 04 | Blueprint Estratégico DOCX | ENTREGA | ✅ Existe (80p) | Revisar claims, tom, remover seção investidor |
| 05 | Technical Implementation Guide | ENTREGA | ❌ Criar | ~60 páginas — gap mais crítico |
| 06 | Showcase HTML + Aria | VENDA | ✅ Live | Ajustes de consistência |
| 07 | Aria System (Supabase + Admin) | ENTREGA | ⚠️ Parcial | Deploy Supabase, testar e2e |
| 08 | Data Room | ENTREGA | ⚠️ Parcial | Organizar, indexar, versionar |

---

## SEQUÊNCIA DE EXECUÇÃO — 7 ETAPAS

### Lógica da ordem:
1. **Blueprint primeiro** — calibra os números que alimentam TUDO (deck, model, summary)
2. **Pitch Deck** — arma de venda #1 (reunião presencial)
3. **Financial Model** — arma de venda #2 (fecha ao vivo)
4. **Executive Summary** — arma de venda #3 (1-pager para enviar)
5. **Aria System** — completa a máquina de leads 24/7
6. **Technical Implementation Guide** — entrega pós-venda de maior valor
7. **Data Room + QA** — empacotamento final

```
═══════════════════════════════════════════════════════════
  BLOCO A — BASE (calibrar números)
═══════════════════════════════════════════════════════════
  ETAPA 1 → Revisão Blueprint DOCX
             AIOS executa → Cowork valida → Paulo aprova

═══════════════════════════════════════════════════════════
  BLOCO B — MATERIAL DE VENDA (o que você precisa para
            marcar e fechar a primeira reunião)
═══════════════════════════════════════════════════════════
  ETAPA 2 → Pitch Deck PPTX (~25 slides)
             AIOS executa → Cowork valida → Paulo aprova

  ETAPA 3 → Financial Model XLSX (8 abas)
             AIOS executa → Cowork valida → Paulo aprova

  ETAPA 4 → Executive Summary 1-Pager PDF
             AIOS executa → Cowork valida → Paulo aprova

═══════════════════════════════════════════════════════════
  BLOCO C — INFRAESTRUTURA (suporte à venda)
═══════════════════════════════════════════════════════════
  ETAPA 5 → Aria System completa (Supabase + Admin)
             AIOS executa → Cowork valida → Paulo aprova

═══════════════════════════════════════════════════════════
  BLOCO D — MATERIAL DE ENTREGA PÓS-VENDA
═══════════════════════════════════════════════════════════
  ETAPA 6 → Technical Implementation Guide (~60 págs DOCX)
             AIOS executa → Cowork valida → Paulo aprova

═══════════════════════════════════════════════════════════
  BLOCO E — EMPACOTAMENTO FINAL
═══════════════════════════════════════════════════════════
  ETAPA 7 → Data Room + Revisão Cruzada
             AIOS + Cowork juntos → Paulo aprova final
```

---

## DETALHAMENTO POR ETAPA

---

### ETAPA 1 — REVISÃO DO BLUEPRINT ESTRATÉGICO (DOCX)
**Bloco:** A (Base) | **Estimativa:** 1 sessão AIOS (~2h)

**Objetivo:** Calibrar o documento base para que todos os números sejam consistentes e o tom seja 100% direcionado ao comprador.

**O que já existe:**
- `BPR-Intelligence-Blueprint-Estrategico-v2B.docx` — 80 páginas
- `create-book.js` — gerador (1.966 linhas), fonte única de verdade
- `AUDITORIA-DOCX-ETAPA1.md` — 6 inconsistências, 26 repetições identificadas

**Tarefas AIOS:**
1. Calibrar claims: ROI 7.4x → 3-4x Ano 1 / 7x+ Ano 2; LTV/CAC 25x → 12-18x (cenários)
2. Remover Seção IX (Oportunidade de Investimento) — pertence a deck de investidor, não ao comprador
3. Substituir Seção IX por "O Que Você Recebe" — descrição do pacote completo (8 entregáveis)
4. Unificar tom: zero linguagem de investidor (seed, round, valuation, cap table)
5. Corrigir 6 inconsistências numéricas da auditoria
6. Eliminar 26 repetições major + 5 minor
7. Verificar acentuação 100% correta
8. Regenerar DOCX via create-book.js atualizado
9. Resultado: ≥80 páginas, formatação coerente

**Critérios de aprovação:**
- [ ] Zero inconsistências numéricas entre seções
- [ ] Seção IX substituída (investidor → comprador)
- [ ] Tom 100% comprador
- [ ] Claims calibrados
- [ ] ≥80 páginas
- [ ] Acentuação correta

**Prompt:** `PROMPT-ETAPA1-REVISAO-BLUEPRINT.md`

---

### ETAPA 2 — PITCH DECK (PPTX, ~25 SLIDES)
**Bloco:** B (Venda) | **Estimativa:** 1 sessão AIOS (~2h)

**Objetivo:** Criar a arma principal de venda — a apresentação que o Paulo usa na reunião presencial com o CEO.

**Estrutura (~25 slides):**

| # | Slide | Tipo |
|---|-------|------|
| 1 | Cover | BPR Intelligence + "Confidencial" + data |
| 2 | Agenda | Índice visual |
| 3 | O Mercado Hoje | 3 dados de oportunidade |
| 4 | As 6 Fricções | Dores quantificadas do CEO |
| 5 | A Visão | "Da imobiliária que vende para a que pensa" |
| 6 | O Ecossistema BPR | Diagrama visual das 5 ferramentas |
| 7-11 | Uma ferramenta por slide | Benefício + dado + caso simulado |
| 12 | Inteligência Acumulativa | Moat de 18 meses |
| 13 | Mercado Endereçável | TAM/SAM/SOM concêntrico |
| 14 | Modelo de Receita | 4 fontes em visual |
| 15 | Unit Economics | CAC, LTV, payback |
| 16 | Projeção Financeira | 18 meses + break-even |
| 17 | Cenário Competitivo | BPR vs MySide vs Matchpoint vs Black Brick |
| 18-19 | Cases Simulados | 2 mini-narrativas com números |
| 20 | O Que Você Recebe | Checklist dos 8 entregáveis |
| 21 | Pricing | 3 tiers com feature comparison |
| 22 | ROI do Comprador | "Investimento → Retorno" |
| 23 | Timeline | 6 meses até go-live |
| 24 | Por Que Agora | 3 forças + custo da inação |
| 25 | Próximo Passo | CTA + contato |

**Design:** Dark #0d0d0d + gold #C9B037 + cyan #00D2FF. Máx 40 palavras/slide. Speaker notes.

**Critérios de aprovação:**
- [ ] ~25 slides completos
- [ ] Máx 40 palavras por slide
- [ ] Speaker notes em todos
- [ ] Design system BPR consistente
- [ ] Dados = Blueprint revisado (Etapa 1)
- [ ] Abre no PowerPoint e Keynote
- [ ] PDF backup

**Prompt:** `PROMPT-ETAPA2-PITCH-DECK.md`

---

### ETAPA 3 — FINANCIAL MODEL (XLSX, 8 ABAS)
**Bloco:** B (Venda) | **Estimativa:** 1 sessão AIOS (~2h)

**Objetivo:** Criar a ferramenta que fecha vendas — o CEO muda inputs e vê o ROI calculado para a realidade dele. Na reunião, o Paulo abre ao vivo.

**Estrutura (8 abas):**
1. **Dashboard** — P&L resumo, break-even, KPIs, gráficos (auto-update)
2. **Inputs** — 15-20 variáveis editáveis em amarelo
3. **Receita Buyer's** — Transações × ticket × fee, sazonalidade
4. **Receita AUM** — Clientes × AUM × fee anual + growth
5. **Receita Cross+Alpha** — Cross-matching + B2B subs
6. **Custos** — Fixos + variáveis + CAPEX
7. **P&L Consolidado** — 18 meses mensal + 5 anos anual, EBITDA, cash
8. **Cenários** — Conservador / Base / Otimista (dropdown)

**Números default = Blueprint revisado (Etapa 1)**

**Critérios de aprovação:**
- [ ] Todas as fórmulas funcionam (zero erros)
- [ ] Mudar 1 input propaga corretamente
- [ ] 3 cenários funcionam
- [ ] Dashboard premium
- [ ] Abre no Excel e Google Sheets
- [ ] Print-ready

**Prompt:** `PROMPT-ETAPA3-FINANCIAL-MODEL.md`

---

### ETAPA 4 — EXECUTIVE SUMMARY (1-PAGER PDF)
**Bloco:** B (Venda) | **Estimativa:** 0.5 sessão AIOS (~1h)

**Objetivo:** Uma página A4 que o CEO imprime e leva ao board. Resume tudo em 60 segundos.

**Conteúdo:**
- O que é o BPR Intelligence (2 frases)
- As 5 ferramentas (1 linha cada com dado-chave)
- ROI projetado (headline number)
- O que o comprador recebe (8 entregáveis em visual)
- Próximo passo (CTA)

**Design:** Gold/dark/cyan, logo BPR, "CONFIDENCIAL", imprimível.

**Critérios de aprovação:**
- [ ] 1 página A4 exata
- [ ] Dados consistentes com todos os documentos
- [ ] Visual premium imprimível
- [ ] PDF exportado

**Prompt:** `PROMPT-ETAPA4-EXECUTIVE-SUMMARY.md`

---

### ETAPA 5 — ARIA INTELLIGENCE SYSTEM (Completar)
**Bloco:** C (Infraestrutura) | **Estimativa:** 1 sessão AIOS (~2h)

**Objetivo:** Completar o sistema de captura de leads para que a Aria trabalhe 24/7.

**Já existe:**
- `api/aria.js` v2 — System prompt 5 fases + Supabase persistence ✅
- `api/leads.js` — CRUD de leads ✅
- `api/track.js` — Tracking comportamental ✅
- `admin/index.html` + `login.html` — Dashboard admin ✅
- `lib/supabase.js` — Client Supabase ✅
- `supabase-schema.sql` — Schema completo ✅

**Falta:**
1. Criar projeto Supabase + executar schema SQL
2. Configurar env vars no Vercel (SUPABASE_URL, SUPABASE_SERVICE_KEY)
3. Atualizar showcase HTML para enviar sessionId + fields ao proxy
4. Testar e2e: chat → Supabase → admin dashboard
5. Relatório de abordagem por lead (resumo para SDR)
6. Notificação quando lead score ≥ 60

**Critérios de aprovação:**
- [ ] Supabase live e schema executado
- [ ] Chat gera lead no banco
- [ ] Admin dashboard mostra leads com score
- [ ] Relatório de abordagem funcional
- [ ] Auth protege o admin

**Prompt:** `PROMPT-ETAPA5-ARIA-SYSTEM.md`

---

### ETAPA 6 — TECHNICAL IMPLEMENTATION GUIDE (DOCX, ~60 PÁGINAS)
**Bloco:** D (Entrega pós-venda) | **Estimativa:** 2 sessões AIOS (~4h)

**Objetivo:** O documento que justifica o preço de R$350-600k. A software house abre e começa a codar.

**Estrutura:**
1. **Visão Geral da Arquitetura** (5 págs) — diagrama, fluxo e2e, trade-offs, stack
2. **Especificação de APIs** (12 págs) — endpoints completos com JSON schema para as 5 ferramentas
3. **Schema de Banco** (8 págs) — ERD, DDL executável, pgvector, migrations
4. **Pipeline de ML** (10 págs) — features, treino, validação, deploy, retraining
5. **Data Acquisition & ETL** (8 págs) — fontes, parsing, scheduling, quality checks
6. **Infraestrutura & DevOps** (6 págs) — Docker, CI/CD, monitoring, custos
7. **Segurança & Compliance** (5 págs) — JWT, LGPD, CRECI, audit logging
8. **Runbooks Operacionais** (6 págs) — 5+ runbooks com decision trees

**Critérios de aprovação:**
- [ ] ≥50 páginas
- [ ] Todos endpoints com JSON schema
- [ ] DDL executável
- [ ] Pipeline ML especificado
- [ ] 5+ runbooks
- [ ] Software house pode iniciar em 1 semana
- [ ] Stack consistente com Blueprint

**Prompt:** `PROMPT-ETAPA6-TIG.md`

---

### ETAPA 7 — DATA ROOM + REVISÃO CRUZADA
**Bloco:** E (Final) | **Estimativa:** 1 sessão AIOS (~1.5h)

**Objetivo:** Empacotar tudo e garantir consistência absoluta.

**Parte A — Data Room:**
Organizar todos os arquivos na estrutura profissional definida acima.

**Parte B — Revisão Cruzada:**
- [ ] Métricas iguais em todos os documentos
- [ ] Pricing consistente
- [ ] Tom de voz uniforme
- [ ] Design system consistente
- [ ] Zero placeholders
- [ ] Zero erros de acentuação
- [ ] Todos os arquivos abrem corretamente

**Prompt:** `PROMPT-ETAPA7-DATA-ROOM-QA.md`

---

## RESUMO EXECUTIVO

| Etapa | Entregável | Bloco | Sessões AIOS | Para quê |
|-------|-----------|-------|-------------|----------|
| 1 | Blueprint DOCX (revisão) | A — Base | 1 | Calibrar números-base |
| 2 | Pitch Deck PPTX | B — Venda | 1 | Reunião presencial |
| 3 | Financial Model XLSX | B — Venda | 1 | Fechar venda ao vivo |
| 4 | Executive Summary PDF | B — Venda | 0.5 | Enviar ao CEO/sócio |
| 5 | Aria System (completar) | C — Infra | 1 | Leads 24/7 |
| 6 | Tech Implementation Guide | D — Entrega | 2 | Software house executar |
| 7 | Data Room + QA | E — Final | 1 | Empacotamento |
| **TOTAL** | | | **7.5 sessões** | **~16-18 horas** |

**Com as Etapas 1-4 prontas, Paulo pode marcar a primeira reunião com um CEO.**
**Com a Etapa 5, a Aria qualifica leads 24/7 no showcase.**
**Com as Etapas 6-7, o pacote está completo para entrega pós-venda.**

---

## PRÓXIMO PASSO

Etapa 1 aprovada. Prompt `PROMPT-ETAPA1-REVISAO-BLUEPRINT.md` pronto.
Paulo cola no AIOS → AIOS executa → Cowork valida → Etapa 2.
