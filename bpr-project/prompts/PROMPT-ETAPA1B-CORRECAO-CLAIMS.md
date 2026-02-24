# PROMPT — Etapa 1B: Correção de Claims com Dados Verificados

## Contexto
A Etapa 1 revisou o Blueprint (create-book.js) para tom e estrutura. Agora precisamos corrigir TODOS os claims que não têm lastro verificável. O público-alvo são CEOs de imobiliárias premium — qualquer número que não sobreviva à pergunta "de onde vem isso?" é uma vulnerabilidade.

## Arquivo a editar
`bpr-project/src/create-book.js`

## Documento de referência (LER ANTES DE EDITAR)
`bpr-project/research/DADOS-VERIFICADOS-PITCH-DECK.md`
`bpr-project/research/RECOMENDACOES-FINAIS-CLAIMS.md`

## Regra absoluta
Nenhum número no Blueprint pode existir sem fonte verificável. Cada alteração abaixo tem a fonte e o texto exato de substituição.

---

## ALTERAÇÃO 1: "120 horas executivas" → Dados NAR + Concierge Auctions

**Buscar no arquivo:** Todas as ocorrências de "120 horas executivas" e "120 horas" (exceto as 120 horas de acompanhamento de implementação do pacote, que são um dado interno do projeto e devem ser mantidas)

**Substituir por (contexto da frase de highlight box, ~linha 392):**
Onde diz: "o comprador de elite desperdiça, em média, 120 horas executivas (equivalente a R$ 50 mil em custo de oportunidade)"
Colocar: "o comprador de elite enfrenta ciclos de busca de 10+ semanas (NAR 2025), com imóveis de luxo permanecendo em média 319 dias no mercado (Concierge Auctions 2024) — consumindo tempo executivo avaliado entre R$ 400-600/hora (Page Executive 2024)"

**Onde mais aparecer "120 horas" como tempo de busca do comprador:**
Substituir por "10+ semanas de busca (NAR 2025)" ou "ciclos superiores a 10 meses no segmento premium (Concierge Auctions 2024)"

**MANTER INTACTO:** "120 horas de acompanhamento de implementação" (linha ~1418) — este é um dado do pacote BPR, não um claim de mercado.

**Fontes:**
- NAR 2025 Profile of Home Buyers and Sellers: 10 semanas mediana
- Concierge Auctions 2025 Luxury Homes Index: 319 dias média luxo
- Page Executive 2024: CEO R$40-80k+/mês fixo

---

## ALTERAÇÃO 2: "R$ 50 mil em custo de oportunidade" → Fórmula aberta

**Buscar:** "R$ 50 mil em custo de oportunidade" e "R$ 50k" (contexto de custo do comprador)

**Na highlight box (~linha 392), já vai ser coberto pela Alteração 1.**

**Na tabela de fricções (~linha 471):**
Onde diz: `['Assimetria Informacional', 'Compradores visitam 15-30 imóveis; R$ 50k+ em tempo executivo perdido', 'Decisões subótimas, fadiga decisória']`
Colocar: `['Assimetria Informacional', 'Ciclos de busca de 10+ semanas (NAR 2025); custo-hora executivo de R$ 400-600 (Page Executive 2024)', 'Decisões subótimas, fadiga decisória, custo de oportunidade acumulado']`

**Na tabela comparativa (~linha 1036):**
Onde diz: `['Custo de oportunidade (tempo)', '120 horas executivas (R$ 50k)', '15 horas (R$ 6,3k)']`
Colocar: `['Custo de oportunidade (tempo)', '10+ semanas de busca (NAR 2025)', '1-2 semanas com curadoria IA']`

**Nas demais ocorrências de "R$ 50k" em contexto de custo do comprador:**
Substituir por "custo-hora de R$ 400-600/h (Page Executive 2024) acumulado ao longo de semanas"

**Fonte:** Page Executive — Pesquisa de Remuneração C-Level 2024/2025

---

## ALTERAÇÃO 3: "40% de erro na curadoria" → Dados NAR 2025

**Buscar:** "taxa de erro de 40%" e "40% na curadoria"

**Na highlight box (~linha 392), substituir o trecho:**
Onde diz: "e tolera uma taxa de erro de 40% na curadoria de ativos, resultando em aquisições subótimas ou desistência por exaustão"
Colocar: "— sendo que 56% dos compradores identificam encontrar o imóvel certo como o aspecto mais difícil da aquisição (NAR 2025), e transações sem representação exclusiva resultam em sobrepreço médio de 9-17% (Ridgestone Property 2025 / Bright MLS-Drexel University 2023)"

**Fonte:**
- NAR 2025 Profile: 56% most difficult step
- Ridgestone Property UK 2025: 9,5% economia média com buyer's agent
- Bright MLS / Drexel University 2023: 17,5% diferença on-MLS vs off-market

---

## ALTERAÇÃO 4: "15-30 imóveis visitados" → Dados NAR 2025

**Buscar:** "15-30 imóveis" e "visita.*imóve"

**Na tabela de fricções (~linha 471) já coberto pela Alteração 2.**

**Em qualquer outro contexto:**
Onde diz "15-30 imóveis" → Substituir por "múltiplas visitas ao longo de meses no segmento premium"
Onde diz "visitam 15-30" → Substituir por "enfrentam ciclos de busca que se estendem por meses"

**Contexto narrativo (~linha 462):**
Verificar se há menção a número de visitas e substituir por: "o comprador médio visita 6 imóveis antes de decidir (NAR 2025); no segmento de alto padrão, onde cada propriedade é única e ciclos de venda ultrapassam 10 meses, o processo se multiplica"

**Fonte:** NAR 2025 Profile: mediana de 6 imóveis visitados

---

## ALTERAÇÃO 5: "LTV/CAC 12-18x" → Range 5-8x com benchmark

**Buscar:** "LTV/CAC" e "12-18" e "25x" e "8-18"

**Na tabela de métricas (~linha 424):**
Onde diz: `['LTV/CAC Ratio', '8-18:1 (cenário base-otimista)', '15-24:1']`
Colocar: `['LTV/CAC Ratio', '5-8:1 (benchmark setor: 3-4:1, Phoenix Strategy Group 2025)', '8-12:1']`

**Na tabela comparativa (~linha 520):**
Onde diz: `['LTV/CAC', '3:1', '8-18:1 (conforme maturidade)']`
Colocar: `['LTV/CAC', '3:1', '5-8:1 (acima do benchmark 3-4:1 do setor)']`

**Em qualquer outra ocorrência de "12-18" ou "25x" em contexto de LTV/CAC:**
Substituir por "5-8x" com nota "(benchmark setor: 3-4x, Phoenix Strategy Group 2025)"

**Fonte:** Phoenix Strategy Group — LTV:CAC mediana 3,2:1 (612 empresas), best-in-class 4-7:1

---

## ALTERAÇÃO 6: "Off-market 33-50%" → "Até 30%"

**Buscar:** "33-50%" em contexto de off-market

**Em qualquer ocorrência:**
Onde diz "33-50% de imóveis premium vendidos off-market" ou similar
Colocar: "até 30% das transações em mercados de luxo ocorrem off-market (Pacific Union International / Redfin 2024), com compradores off-market pagando 1,5-17,5% menos pela assimetria informacional (Zillow Research 2024 / Bright MLS-Drexel 2023)"

**Fonte:**
- Pacific Union International / Redfin: até 30% em luxury markets
- Zillow Research: -1,5% off-market (2,72MM casas analisadas)
- Bright MLS / Drexel University: -17,5% off-market

---

## ALTERAÇÃO 7: "R$ 4,2 bilhões" mercado Barra → Dado ABRAINC

**Buscar:** "R$ 4,2" e "4,2 bilhões" e "4,2 Bilhões"

**No stat callout (~linha 323):**
Onde diz: `new TextRun({ text: 'R$ 4,2 Bilhões', ...`
Colocar: `new TextRun({ text: 'R$ 1,6 Bi / quadrimestre', ...`

**No texto narrativo (~linha 388):**
Onde diz: "ecossistema que movimenta anualmente mais de R$ 4,2 bilhões em transações residenciais acima de R$ 5 milhões"
Colocar: "ecossistema que movimentou R$ 1,6 bilhão apenas no primeiro quadrimestre de 2025 — cerca de um terço de todo o mercado carioca (ABRAINC 2025), com o segmento de luxo crescendo 75% em VGV"

**Fonte:** ABRAINC — Dados mercado imobiliário RJ 2025

---

## ALTERAÇÃO 8: Adicionar seção de fontes no rodapé do documento

**No final do documento (após a última seção, antes do fechamento):**
Adicionar uma nova seção "Fontes e Referências" com:

```
SEÇÃO — FONTES E REFERÊNCIAS

Dados de mercado e projeções neste documento são baseados nas seguintes fontes:

• NAR — National Association of Realtors, 2025 Profile of Home Buyers and Sellers
• ABRAINC — Associação Brasileira de Incorporadoras Imobiliárias, dados 2024-2025
• Page Executive (PageGroup) — Pesquisa de Remuneração C-Level Brasil 2024/2025
• Concierge Auctions — 2025 Luxury Homes Index
• Sotheby's International Realty — Mid-Year Luxury Report 2025
• PwC — 29th Global CEO Survey
• CRETI — Center for Real Estate Technology & Innovation, PropTech Investment 2025
• PitchBook — PropTech AI Investment Data 2025
• MDPI Journal — Machine Learning em Real Estate (2024)
• Ridgestone Property UK — Buyer's Agency Negotiation Savings (2025)
• Black Brick London — Buyer's Agency Case Studies
• Bright MLS / Drexel University — Off-Market Price Impact Study (2023)
• Zillow Research — Off-Market vs On-MLS Analysis (2024, 2,72MM transações)
• Phoenix Strategy Group — SaaS LTV/CAC Benchmarks (2025, 612 empresas)
• McKinsey & Company — GenAI in Real Estate Estimates

Projeções financeiras (ROI, receita, break-even) são estimativas baseadas em cenários modelados internamente. Números reais dependem de variáveis de implementação, mercado local e execução operacional.
```

---

## ALTERAÇÃO 9: Dados novos para incluir

**Adicionar no contexto apropriado do documento:**

Na seção de mercado/tendências, incluir:
- "88% das transações de luxo globais são realizadas em cash (Sotheby's International Realty 2025)"
- "Investimentos em proptech atingiram US$ 16,7 bilhões em 2025 (+68% YoY), com IA crescendo 42% ao ano vs. 24% em proptech convencional (CRETI/PitchBook 2025)"
- "78% dos executivos do setor imobiliário identificam adoção de tecnologia como prioridade número 1 (PwC)"
- "Valorização do m² residencial na Barra: +19% entre janeiro/2023 e junho/2025 (ABRAINC)"

---

## VERIFICAÇÃO APÓS EDIÇÃO

Após todas as alterações, executar:

1. `grep -n "120 horas" create-book.js` — deve retornar APENAS a linha de "120 horas de acompanhamento"
2. `grep -n "R\$ 50" create-book.js` — verificar que "R$ 50k" em contexto de custo-comprador foi removido
3. `grep -n "40%" create-book.js` — verificar que "taxa de erro de 40%" não existe mais
4. `grep -n "15-30" create-book.js` — deve retornar zero resultados
5. `grep -n "12-18" create-book.js` — deve retornar zero resultados
6. `grep -n "33-50" create-book.js` — deve retornar zero resultados
7. `grep -n "4,2 Bilh" create-book.js` — deve retornar zero resultados
8. `grep -n "NAR 2025\|ABRAINC\|Page Executive\|Concierge Auctions\|Ridgestone\|Phoenix Strategy" create-book.js` — deve retornar múltiplas ocorrências (fontes inseridas)
9. `node create-book.js` — deve gerar DOCX sem erros
10. Contar palavras do DOCX gerado — deve ser ≥26.000

---

## CRITÉRIOS DE APROVAÇÃO

- [ ] Zero claims sem fonte verificável
- [ ] Todas as 7 alterações numéricas aplicadas
- [ ] Seção de Fontes e Referências adicionada ao final
- [ ] 9 dados novos incluídos
- [ ] DOCX regenerado com sucesso
- [ ] Todos os 10 greps de verificação passam
- [ ] ≥26.000 palavras no DOCX final
