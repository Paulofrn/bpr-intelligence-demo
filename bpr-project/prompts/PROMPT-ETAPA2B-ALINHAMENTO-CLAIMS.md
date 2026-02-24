# PROMPT AIOS — Etapa 2B: Alinhamento de Claims no create-book.js

## CONTEXTO
O `create-book.js` (1.966 linhas) gera o DOCX Blueprint de 80 páginas. Após auditoria de realidade, 7 claims específicos precisam ser ajustados para eliminar promessas infladas. O documento de referência com todos os claims calibrados está em `BPR-SHOWCASE-BLUEPRINT-PRODUCAO.md`.

## REGRA FUNDAMENTAL
- **NÃO reescrever seções inteiras** — apenas ajustar os claims específicos listados abaixo
- **NÃO alterar estrutura, design, formatação ou tamanho** do documento
- **NÃO adicionar nem remover parágrafos** — apenas editar texto dentro dos existentes
- Manter ≥80 páginas no Word após as alterações
- Regenerar o DOCX ao final e verificar

---

## ALTERAÇÃO 1: Due Diligence — Remover "99,2%"

### Onde está:
- **Linha ~760**: menção a 99,2% na seção de Due Diligence
- **Linha ~770**: `'Acurácia: ', '99,2% na detecção de cláusulas atípicas, com zero falsos negativos em testes'`

### O que fazer:
Substituir claims de precisão numérica por posicionamento como **Paralegal Algorítmico** — ferramenta de apoio ao corpo jurídico.

- Linha ~770: trocar `'Acurácia: ', '99,2% na detecção de cláusulas atípicas, com zero falsos negativos em testes'` por algo como `'Cobertura: ', 'Flagging automático de inconsistências documentais para revisão pelo corpo jurídico — reduz ciclo de DD de 15-25 dias para 3-5 dias'`
- Em qualquer outro local que mencione 99,2%, substituir por linguagem de velocidade e organização, não precisão numérica
- Reforçar que a ferramenta **apoia** o advogado, não substitui

---

## ALTERAÇÃO 2: ROI 7,4x Ano 1 → 3-4x Ano 1, 7x+ Ano 2

### Onde está:
- **Linha ~1584**: `'retorno de 7,4x no primeiro ano'`
- **Linha ~1596**: `'ROI sobre R$ 450k', '—', '7,4x'`

### O que fazer:
- Linha ~1584: trocar para `'retorno projetado de 3-4x no primeiro ano, escalando para 7x+ no segundo ano com operação madura'`
- Linha ~1596: trocar `'7,4x'` para `'3-4x (Ano 1) / 7x+ (Ano 2)'`
- Se houver outras menções a ROI 7.4x, ajustar consistentemente

---

## ALTERAÇÃO 3: Infraestrutura US$850/mês → Range escalável

### Onde está:
- **Linha ~819**: tabela com `'~US$ 850/mês'`
- **Linha ~850**: highlight box com `'US$ 850/mês'`
- **Linha ~1695**: tabela com `'~US$ 850/mês'`

### O que fazer:
- Linha ~819: trocar para `'~US$ 850-2.500/mês'` (manter na tabela)
- Linha ~850: ajustar highlight para `'US$ 850/mês em fase inicial, escalando para US$ 2.000-4.000 em operação plena — ainda assim inferior ao custo de um analista júnior'`
- Linha ~1695: trocar para `'~US$ 850-2.500/mês'` com nota `'Fase MVP → Operação plena'`

---

## ALTERAÇÃO 4: MVP R$45k → Contextualizar como prova de conceito

### Onde está:
- **Linha ~827**: `'R$ 45.000 vs. R$ 300.000-500.000 no modelo convencional'`
- **Linha ~888**: tabela fase 1 com `'R$ 45k'`
- **Linha ~922**: total fase 1 `'R$ 45.000'`
- **Linha ~948**: highlight box com `'Com R$ 45.000 e 90 dias de VibeCoding'`

### O que fazer:
- Em todas as ocorrências, contextualizar que R$45k é a **prova de conceito técnica / Fase 1 MVP**, não o produto final completo
- Linha ~827: trocar para `'R$ 45.000 para a prova de conceito técnica (Fase 1), vs. R$ 300.000-500.000 para um MVP equivalente no modelo convencional. O ecossistema completo é desenvolvido como parte do investimento de implementação (R$ 1,5-2,5 MM).'`
- Linha ~948: ajustar para `'Com R$ 45.000 e 90 dias de VibeCoding, a Fase 1 da BPR entrega Crystal Ball + Due Diligence MVP — validação técnica com infraestrutura real. As fases subsequentes escalam dentro do investimento de implementação.'`

---

## ALTERAÇÃO 5: LTV/CAC → Apresentar em cenários

### Onde está:
- **Linha ~424**: `'LTV/CAC Ratio', '18:1', '24:1'`
- **Linha ~520**: `'LTV/CAC', '3:1', '18:1'`
- **Linha ~1022**: `'LTV/CAC RATIO', '18:1'`
- **Linha ~1111**: `'LTV/CAC Ratio', '12:1', '18:1'`
- **Linha ~1795**: `'LTV/CAC', '15x (MySide, BR)', '18x', '25x'`

### O que fazer:
- **NÃO alterar a linha ~1795** (tabela comparativa de mercado — contexto correto)
- Linha ~1022 (key metric): trocar `'18:1'` para `'12-18x'` e o benchmark para `'Cenário conservador 8x, base 12x, otimista 18x — com modelo de retenção ativa'`
- Linhas ~424 e ~520: onde mostra BPR vs tradicional, usar `'12-18x'` para BPR em vez de valores fixos
- Linha ~1111: trocar para `'8-18x'` com nota `'Varia com retenção'`

---

## ALTERAÇÃO 6: AUM/Gestão Patrimonial → Reposicionar

### Onde está:
- **Linha ~408**: `'D. Gestão Patrimonial (AUM)', '0,8–1,2% a.a. sobre valor do ativo', '90%'`
- **Linha ~576**: parágrafo sobre AUM como oportunidade de cross-selling
- **Linha ~599**: parágrafo sobre gestão patrimonial e alpha
- **Linha ~960+**: menções a receita AUM
- **Linha ~1261+**: menções em personas/cases
- **Linha ~1549**: tabela de tiers com `'Gestão Patrimonial (AUM)'`

### O que fazer:
- **Linha ~408**: trocar descrição de fee para diferenciar: `'Gestão Patrimonial Inteligente', 'Fee de administração para investidores (8-10% do aluguel) + Relatório de posicionamento para moradores (fidelização inclusa)', '85%'`
- **Linha ~576**: ajustar para mencionar que moradores recebem relatório como serviço de fidelização (não cobram fee) e investidores sim pagam fee de gestão
- **Linha ~599**: manter o conceito de alpha para investidores, mas esclarecer que a gestão com fee é para quem tem imóvel como investimento
- **Linha ~1549**: trocar para `'Relatório Patrimonial (moradores)', '—', 'Anual', 'Semestral + Gestão ativa (investidores)'`
- Em receita de AUM: ajustar para refletir que a base de receita recorrente vem de investidores com portfólio de locação, não de moradores

---

## ALTERAÇÃO 7: Crystal Ball 67 dias → 60-90 dias

### Onde está:
- **Linha ~492**: `'67 dias de antecedência'`
- **Linha ~728**: `'67 dias'`

### O que fazer:
- Trocar todas as ocorrências de `'67 dias'` para `'60-90 dias'`
- Se houver menção a precisão de 78% como fato, adicionar qualificador: `'precisão projetada de 78% com base em benchmarks de XGBoost aplicados a mercados imobiliários'` ou simplesmente remover o percentual e manter apenas o benefício temporal

---

## VERIFICAÇÃO FINAL

Após todas as alterações:

1. `grep -n "99,2\|99.2" create-book.js` → deve retornar zero
2. `grep -n "7,4x\|7.4x" create-book.js` → deve retornar zero
3. `grep -n "67 dias" create-book.js` → deve retornar zero (agora é 60-90)
4. `node create-book.js` → deve gerar DOCX sem erros
5. Verificar no Word: ≥80 páginas (usar AppleScript)
6. Verificar que nenhuma seção ficou com frase quebrada ou sem sentido

---

## IMPORTANTE
- Estas são alterações **cirúrgicas** — não reescrever parágrafos inteiros a menos que a frase fique sem sentido com a substituição
- Manter o tom "comprador do blueprint" em todas as alterações
- Se uma frase ao redor do claim alterado ficar inconsistente, ajustar o mínimo necessário
- NÃO alterar nada que não esteja listado acima
