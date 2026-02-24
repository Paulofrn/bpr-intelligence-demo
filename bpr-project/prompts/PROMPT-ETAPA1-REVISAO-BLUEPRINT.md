# PROMPT AIOS — Etapa 1: Revisão do Blueprint Estratégico

## MISSÃO
Revisar o `create-book.js` (fonte única de verdade do DOCX Blueprint Estratégico) corrigindo inconsistências, calibrando claims, removendo conteúdo de investidor, e unificando o tom para o comprador do pacote (CEO de imobiliária premium). Após as edições, regenerar o DOCX.

## CONTEXTO
O `BPR-Intelligence-Blueprint-Estrategico-v2B.docx` tem 80 páginas e foi gerado pelo `create-book.js` (1.966 linhas). Uma auditoria (`AUDITORIA-DOCX-ETAPA1.md`) identificou 6 inconsistências numéricas e 26 repetições. Além disso, o documento oscila entre falar com investidor e comprador. Esta etapa corrige TUDO.

**IMPORTANTE:** Este é o Bloco A (Base) do plano. Os números que saírem daqui alimentam o Pitch Deck, Financial Model e Executive Summary. Precisam estar corretos.

---

## ARQUIVOS DE REFERÊNCIA (LER ANTES DE EDITAR)

1. `AUDITORIA-DOCX-ETAPA1.md` — Lista completa das 6 inconsistências + 26 repetições
2. `PROMPT-ETAPA2B-ALINHAMENTO-CLAIMS.md` — 7 alterações específicas de claims (linhas exatas no create-book.js)
3. `BPR-SHOWCASE-BLUEPRINT-PRODUCAO.md` — Claims calibrados de referência (Seção "CLAIMS CALIBRADOS")
4. `create-book.js` — ARQUIVO A EDITAR (fonte única de verdade)

---

## TAREFAS (EXECUTAR NESTA ORDEM)

### TAREFA 1: Corrigir as 6 inconsistências numéricas

Referência: `AUDITORIA-DOCX-ETAPA1.md`, seção 2

| ID | Problema | Correção |
|----|----------|----------|
| INC-1 | Break-even pessimista "mês 8" contradiz tabela (base = mês 14) | Remover claim de "mês 8". Usar: "cenário base projeta break-even no mês 14; cenários estressados variam conforme premissas" |
| INC-2 | Infra US$600/mês (Seção IV) vs US$850/mês (Apêndice B) | Unificar para "US$850-2.500/mês" (range escalável). Atualizar Seção IV com os 8 line items completos |
| INC-3 | Custo de oportunidade: R$45k vs R$50k vs R$60k (3 valores diferentes) | Unificar para R$50.000 em todos os locais |
| INC-4 | Receita Ano 3: R$18MM (Exec Summary) vs R$23MM (Seção VI) | Usar R$23MM (projeção detalhada é mais confiável). Atualizar Exec Summary |
| INC-5 | Custo dev VibeCoding inconsistente entre seções | Alinhar: Fase 1 MVP = R$45k. Total implementação completa = R$1,5-2,5MM |
| INC-6 | Toda inconsistência adicional encontrada durante a revisão | Corrigir usando o valor mais conservador e documentado |

### TAREFA 2: Calibrar 7 claims

Referência: `PROMPT-ETAPA2B-ALINHAMENTO-CLAIMS.md` (linhas exatas)

| Claim | De | Para |
|-------|----|------|
| Due Diligence precisão | 99,2% | Remover %. Usar: "flagging automático para revisão jurídica — ciclo de 15-25 dias para 3-5 dias" |
| ROI | 7,4x Ano 1 | 3-4x Ano 1, 7x+ Ano 2 (operação madura) |
| Infraestrutura | US$850/mês fixo | US$850-2.500/mês (MVP → operação plena) |
| MVP R$45k | Parece produto final | Contextualizar como "prova de conceito técnica / Fase 1" |
| LTV/CAC | 25x fixo | 12-18x (cenários conservador a otimista) |
| VibeCoding "2 pessoas" | Promessa de equipe mínima | "Equipe enxuta na Fase 1, escalando conforme operação" |
| Crystal Ball "78% precisão" | Pode ser otimista para dados iniciais | "Projetado 70-85% com 12+ meses de dados regionais" |

### TAREFA 3: Remover/substituir Seção IX (Oportunidade de Investimento)

A Seção IX atual fala de Lean Seed Round (R$1.5MM), investidores, equity, cap table. **Isso é para investidor, não para comprador.**

**Substituir Seção IX por: "O Que Você Recebe"**

Nova Seção IX — conteúdo:
- Título: "O Pacote BPR Intelligence: O Que Está Incluído"
- Subtítulo: "Tudo o que sua operação precisa para se tornar a primeira imobiliária algorítmica da região"
- Lista dos 8 entregáveis:
  1. Executive Summary (1-Pager) — resumo executivo para o board
  2. Pitch Deck (~25 slides) — apresentação completa com speaker notes
  3. Blueprint Estratégico (80+ páginas) — estratégia, mercado, competitivo, governança
  4. Technical Implementation Guide (~60 páginas) — especificação técnica para software house
  5. Financial Model (editável, 8 abas) — projeções customizáveis para sua realidade
  6. Showcase Interativo (web) — demonstração das ferramentas com IA integrada
  7. Sistema Aria (infraestrutura) — chatbot de qualificação + dashboard de leads
  8. Data Room de Referência — pesquisas de mercado, benchmarks, templates
- Para cada entregável: 2-3 linhas descrevendo o valor para o comprador
- Subtítulo final: "120 Horas de Advisory" — acompanhamento de implementação incluído
- Frase de fechamento: "O comprador recebe não apenas a estratégia, mas o projeto pronto para execução. A software house ou agência de IA contratada pode iniciar a implementação na semana seguinte à entrega."

### TAREFA 4: Eliminar linguagem de investidor em TODO o documento

Buscar e remover/substituir em TODAS as seções:
- "seed" → remover ou contextualizar como investimento de implementação
- "round" → remover
- "valuation" → remover
- "cap table" → remover
- "equity" → remover
- "investidor" → substituir por "comprador" ou "operador" conforme contexto
- "captable" → remover
- "diluição" → remover
- "pre-money" / "post-money" → remover
- "Lean Seed" → remover

O Blueprint fala com o CEO da imobiliária que vai COMPRAR o pacote por R$350k-600k e IMPLEMENTAR na operação dele. Ele NÃO é investidor.

### TAREFA 5: Eliminar repetições

Referência: `AUDITORIA-DOCX-ETAPA1.md`, seção 3

Há 26 repetições major e 5 minor identificadas. O AIOS deve:
1. Ler a lista completa de repetições na auditoria
2. Em cada caso, manter a versão mais detalhada/precisa e remover ou condensar as demais
3. Se uma repetição serve como reforço intencional (ex: mesma métrica em contextos diferentes), manter mas garantir que os números são idênticos
4. Não perder páginas — se remover parágrafos, compensar com aprofundamento onde o conteúdo é raso

### TAREFA 6: Verificar acentuação

Todo o texto deve ter acentuação 100% correta em português brasileiro:
- Reunião (não Reuniao)
- Negociação (não Negociacao)
- Você (não Voce)
- Imóvel, imóveis
- Jurídico, jurídica
- Algorítmica, algorítmico
- Exclusão, retenção, fidelização

### TAREFA 7: Regenerar DOCX

1. Salvar `create-book.js` com todas as alterações
2. Executar `node create-book.js` para gerar o novo DOCX
3. Verificar resultado:
   - ≥80 páginas
   - Formatação visual coerente (sem quebras entre seções editadas e originais)
   - Acentuação correta em todo o texto
   - Nova Seção IX aparece corretamente
   - Zero menção a termos de investidor

---

## NÚMEROS CANÔNICOS (Referência para todo o pacote)

Estes são os números OFICIAIS que devem estar consistentes em TODO o Blueprint:

| Métrica | Valor Canônico |
|---------|---------------|
| TAM (Barra da Tijuca) | R$ 4.2 bilhões |
| SAM | R$ 840 milhões |
| SOM | R$ 180 milhões |
| Receita Ano 1 | R$ 4.2 MM (base) |
| Receita Ano 2 | R$ 12.8 MM (run rate) |
| Receita Ano 3 | R$ 23 MM |
| Break-even | Mês 14 (base) |
| CAC | R$ 18k |
| LTV | R$ 450k |
| LTV/CAC | 12-18x (cenários), NÃO usar 25x |
| ROI comprador | 3-4x Ano 1, 7x+ Ano 2 |
| Custo infra | US$ 850-2.500/mês |
| MVP Fase 1 | R$ 45k (prova de conceito) |
| Investimento total | R$ 1.5-2.5 MM (implementação completa) |
| Crystal Ball antecedência | 60-90 dias |
| Crystal Ball precisão | 70-85% (com 12+ meses de dados) |
| Digital Twin redução visitas | 70-80% (de 20 para 3-5) |
| Due Diligence ciclo | De 15-25 dias para 3-5 dias |
| Negociação economia | 9,2% por transação |
| Custo de oportunidade (120h) | R$ 50.000 |
| Preço do pacote | R$ 350k / R$ 450k / R$ 600k |

Qualquer número no Blueprint que divergir desta tabela deve ser corrigido para o valor canônico.

---

## CRITÉRIOS DE APROVAÇÃO

Após executar todas as tarefas:

- [ ] Zero inconsistências numéricas entre seções
- [ ] Seção IX substituída: agora é "O Que Você Recebe" (8 entregáveis)
- [ ] Tom 100% comprador — zero linguagem de investidor (seed, round, valuation, cap table, equity)
- [ ] 7 claims calibrados conforme tabela acima
- [ ] Repetições eliminadas ou unificadas
- [ ] Acentuação 100% correta em português brasileiro
- [ ] DOCX regenerado via `node create-book.js`
- [ ] ≥80 páginas no Word
- [ ] Formatação visual coerente

---

## ARQUIVOS DE SAÍDA

1. `create-book.js` — Atualizado com todas as correções
2. `BPR-Intelligence-Blueprint-Estrategico.docx` — Regenerado
3. `CHANGELOG-ETAPA1.md` — Lista de todas as alterações feitas (para auditoria)

---

## NÃO FAZER

- ❌ NÃO reescrever seções inteiras — fazer edições cirúrgicas
- ❌ NÃO alterar o design system (cores, fontes, espaçamentos)
- ❌ NÃO adicionar novas seções além da substituição da IX
- ❌ NÃO reduzir abaixo de 80 páginas
- ❌ NÃO usar claims inflados que não estão na tabela canônica
