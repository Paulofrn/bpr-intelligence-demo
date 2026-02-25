# PROMPT — Etapa 2: Pitch Deck PPTX (~25 Slides)

## Contexto
Este é o Pitch Deck do BPR Intelligence — a arma principal de venda para reunião presencial com CEOs de imobiliárias premium. O apresentador é o Paulo. O comprador é um CEO/sócio-diretor, 45-60 anos, patrimônio R$10-50MM, que construiu a empresa na base do relacionamento e precisa de tecnologia mas desconfia dela.

## Entregável
- `bpr-project/outputs/pptx/BPR-Intelligence-Pitch-Deck.pptx`
- `bpr-project/outputs/pptx/BPR-Intelligence-Pitch-Deck.pdf` (backup)

## Setup técnico
```bash
cd bpr-project/src
npm install pptxgenjs react react-dom sharp react-icons
```

## Documentos de referência (LER ANTES DE CRIAR)
- `bpr-project/src/create-book.js` — fonte única de verdade (Blueprint revisado Etapa 1 + 1B)
- `bpr-project/research/DADOS-VERIFICADOS-PITCH-DECK.md` — TODOS os dados com fontes
- `bpr-project/research/RECOMENDACOES-FINAIS-CLAIMS.md` — quais claims usar e como

## Regra absoluta
- NENHUM número no deck sem fonte no arquivo DADOS-VERIFICADOS-PITCH-DECK.md
- Máximo 40 palavras por slide (exceto speaker notes)
- Speaker notes em PORTUGUÊS em todos os slides — são o script do Paulo na reunião
- NUNCA mostrar IP técnico (como funciona) — apenas O QUE faz e QUANTO gera

---

## DESIGN SYSTEM BPR

### Cores (hex SEM #)
| Nome | Hex | Uso |
|------|-----|-----|
| Dark | 0D0D0D | Background slides título/conclusão |
| Charcoal | 1A1A2E | Background slides de conteúdo |
| Gold | C9B037 | Destaques, stat callouts, accent |
| Gold Light | E0C94A | Secondary accent |
| Cyan | 00A3B5 | Dados, links, diferenciadores |
| White | FFFFFF | Texto principal sobre dark |
| Light Gray | F5F5F5 | Background cards sobre dark |
| Medium Gray | 666666 | Texto secundário, captions |

### Fontes
| Uso | Fonte | Tamanho |
|-----|-------|---------|
| Título slide | Georgia Bold | 36-44pt |
| Subtítulo | Calibri | 20-24pt |
| Body | Calibri | 14-16pt |
| Stat callout | Georgia Bold | 60-72pt |
| Caption/fonte | Calibri | 10-12pt, Medium Gray |
| Speaker notes | Calibri | 12pt |

### Regras visuais
- Background DARK (0D0D0D ou 1A1A2E) em TODOS os slides — premium feel
- Zero slides com fundo branco
- Ícones em TODOS os slides (usar react-icons/fa ou /md)
- NUNCA usar linhas de acento sob títulos (hallmark de IA)
- Variar layouts: 2 colunas, stat callouts, grids 2x2, icon+text rows
- 0.5" margens mínimas
- NUNCA repetir o mesmo layout em slides consecutivos

### Slide Masters
Definir 3 masters:
1. **TITLE_DARK** — background 0D0D0D, para title/section/conclusion
2. **CONTENT_CHARCOAL** — background 1A1A2E, para conteúdo
3. **HIGHLIGHT_GOLD** — background 0D0D0D com barra lateral gold, para stat callouts

---

## JORNADA EMOCIONAL DO DECK

```
ATO 1 (slides 1-6):   DESCONFORTO — "Ele entende meu mundo"
ATO 2 (slides 7-12):  POSSIBILIDADE — "Isso não é teoria"
ATO 3 (slides 13-19): PROVA — "Os números fazem sentido"
ATO 4 (slides 20-25): DECISÃO — "Quanto custa e o que eu levo?"
```

---

## ESPECIFICAÇÃO SLIDE-BY-SLIDE

### SLIDE 1 — Cover
- **Layout:** TITLE_DARK, centralizado
- **Conteúdo:**
  - Logo BPR (texto estilizado se não houver imagem)
  - "BPR Intelligence"
  - Subtítulo: "Inteligência Artificial para Imobiliárias de Alto Padrão"
  - "CONFIDENCIAL" em gold, 10pt, canto inferior
  - Data: "Fevereiro 2026"
- **Speaker note:** "Boa tarde. Antes de começar, este material é confidencial — peço que não compartilhe. O que vou apresentar nos próximos 25 minutos pode mudar a forma como a sua imobiliária opera."

### SLIDE 2 — Agenda
- **Layout:** CONTENT_CHARCOAL, 2 colunas
- **Conteúdo:** Índice visual com ícones
  - Coluna 1: O Mercado Hoje | As Fricções | A Visão BPR
  - Coluna 2: O Ecossistema | Números | O Pacote
- **Speaker note:** "Vou seguir essa estrutura. Primeiro entender o problema, depois a solução, e no final os números e o que você leva."

### SLIDE 3 — O Mercado Hoje
- **Layout:** CONTENT_CHARCOAL, 3 stat callouts em row
- **Conteúdo:**
  - Stat 1: "R$ 1,6 Bi" — "VGV Barra 1º quad/2025 (ABRAINC)"
  - Stat 2: "+75%" — "crescimento luxo RJ (ABRAINC 2025)"
  - Stat 3: "+19%" — "valorização m² Barra 2023-2025 (ABRAINC)"
- **Visual:** 3 cards com ícone de trending-up, número grande em gold, legenda em white
- **Speaker note:** "A Barra movimentou R$1,6 bilhão só no primeiro quadrimestre. O segmento de luxo cresceu 75%. O metro quadrado valorizou 19% em dois anos. Não é um mercado parado — é um mercado explodindo onde quem tem inteligência de dados captura desproporcional."

### SLIDE 4 — As Fricções do CEO
- **Layout:** CONTENT_CHARCOAL, 3 cards verticais
- **Conteúdo (3 fricções quantificadas):**
  - Card 1: ícone relógio + "10+ semanas" — "Tempo médio de busca do comprador (NAR 2025). No luxo, ciclos de 10+ meses (Concierge Auctions 2024)."
  - Card 2: ícone dinheiro + "9-17% sobrepreço" — "Compradores sem representação exclusiva pagam a mais (Ridgestone 2025 / Bright MLS-Drexel 2023)."
  - Card 3: ícone gráfico + "30% fall-through" — "Taxa de transações que caem no mercado geral vs. <10% com buyer's agent dedicado (Black Brick UK)."
- **Speaker note:** "Essas são as dores que seu cliente de R$10 milhões sente. Ele gasta meses procurando, paga mais do que deveria, e 1 em cada 3 negócios cai. Isso tudo tem custo — e com custo-hora executivo entre R$400-600 segundo a Page Executive, cada semana perdida custa R$16-24 mil ao seu cliente."

### SLIDE 5 — O Custo da Inação
- **Layout:** HIGHLIGHT_GOLD, stat callout central
- **Conteúdo:**
  - Número grande: "56%"
  - Subtítulo: "dos compradores dizem que encontrar o imóvel certo é o aspecto mais difícil da aquisição (NAR 2025)"
  - Abaixo: "78% dos executivos do setor imobiliário identificam adoção de tecnologia como prioridade #1 (PwC)"
- **Speaker note:** "Mais da metade dos compradores dizem que o mais difícil é achar o imóvel certo. E 78% dos seus pares no mercado já identificam tecnologia como prioridade número 1. A questão não é SE alguém vai resolver isso — é QUEM vai resolver primeiro na sua região."

### SLIDE 6 — A Visão BPR
- **Layout:** TITLE_DARK, frase central grande
- **Conteúdo:**
  - Frase principal: "Da imobiliária que vende para a imobiliária que pensa."
  - Subtítulo: "5 ferramentas de IA integradas. Uma plataforma de inteligência."
- **Speaker note:** "O BPR Intelligence transforma a imobiliária de um modelo artesanal — dependente de feeling e relacionamento — em uma plataforma de inteligência que usa dados para encontrar, avaliar, negociar e fidelizar. Sem substituir o corretor. Potencializando ele."

### SLIDE 7 — Ecossistema BPR (visão geral)
- **Layout:** CONTENT_CHARCOAL, diagrama central
- **Conteúdo:** Diagrama visual com 5 ferramentas conectadas:
  - Centro: "BPR Intelligence" em gold
  - Ao redor (5 nodes): Digital Twin | Crystal Ball | Negociação IA | Family Office | Alpha Intelligence
  - Linhas conectando ao centro
- **Visual:** Usar shapes (circles + lines) do pptxgenjs. Cada node com ícone + nome + 1 linha de benefício
- **Speaker note:** "São 5 ferramentas que funcionam integradas. Cada uma resolve uma fricção específica que mostrei antes. Vou passar por cada uma rapidamente."

### SLIDE 8 — Digital Twin
- **Layout:** CONTENT_CHARCOAL, 2 colunas (texto esquerda, visual direita)
- **Conteúdo:**
  - Título: "Digital Twin do Comprador"
  - O que faz: "Cria um perfil completo de preferências, comportamentos e restrições do cliente"
  - Benefício: "Curadoria precisa — zero visitas desnecessárias"
  - Dado: "56% dos compradores dizem que o mais difícil é achar o certo (NAR 2025)"
  - Visual: ícone de user-profile grande
- **Speaker note:** "Em vez do corretor perguntar 'o que você procura?' e anotar num papel, o Digital Twin mapeia 47 dimensões do comprador. Desde o óbvio — metragem, bairro — até o implícito: tolerância a ruído, padrão de luminosidade, proximidade de escola. Isso elimina as visitas que desperdiçam tempo."

### SLIDE 9 — Crystal Ball Engine
- **Layout:** CONTENT_CHARCOAL, 2 colunas
- **Conteúdo:**
  - Título: "Crystal Ball — IA Preditiva"
  - O que faz: "Prevê disponibilidade de imóveis antes de chegarem ao mercado"
  - Benefício: "Acesso a até 30% do inventário que nunca é listado publicamente"
  - Dado: "Até 30% das transações de luxo são off-market (Pacific Union/Redfin 2024)"
  - Dado: "Precisão de 70-85% (modelos XGBoost/RF: 88-98% na literatura — MDPI 2024)"
- **Speaker note:** "Esta é a ferramenta mais diferenciadora. Até 30% dos imóveis premium nunca chegam ao mercado aberto — são vendidos por inventário, divórcio, partilha. O Crystal Ball monitora sinais públicos e prevê com 70-85% de precisão quais imóveis estarão disponíveis em 45-90 dias. Quem acessa antes, negocia 10-17% melhor."

### SLIDE 10 — Negociação IA
- **Layout:** CONTENT_CHARCOAL, 2 colunas
- **Conteúdo:**
  - Título: "Motor de Negociação Inteligente"
  - O que faz: "Analisa histórico, perfil do vendedor e mercado para otimizar ofertas"
  - Benefício: "Economia média de 9-10% sobre valor de compra"
  - Dado: "Buyer's agents internacionais geram economia de 9-9,5% (Ridgestone UK 2025 / Black Brick)"
- **Speaker note:** "Buyer's agents no mercado britânico — o mais maduro do mundo — geram em média 9-10% de economia. Num imóvel de R$10 milhões, são R$900 mil a R$1 milhão. No Brasil, onde esse serviço não existe de forma estruturada, a assimetria é ainda maior."

### SLIDE 11 — Family Office + Alpha
- **Layout:** CONTENT_CHARCOAL, 2 colunas lado a lado (2 ferramentas menores)
- **Conteúdo:**
  - Coluna 1: "Family Office Imobiliário"
    - "Gestão de portfólio: patrimônio, manutenção, valorização"
    - "Receita recorrente: R$5-15k/mês por família (retainer)"
  - Coluna 2: "Alpha Intelligence"
    - "Inteligência de mercado para decisões de investimento"
    - "Dashboard B2B: assinatura R$5-20k/mês"
- **Speaker note:** "Family Office transforma cliente de uma transação em cliente para a vida. Em vez de ganhar na venda e nunca mais ver o cliente, você gerencia o patrimônio dele e cobra retainer mensal. Alpha Intelligence é o braço B2B — dados de mercado vendidos como serviço para fundos, family offices, incorporadoras."

### SLIDE 12 — Moat de 18 Meses
- **Layout:** HIGHLIGHT_GOLD, stat callout + timeline
- **Conteúdo:**
  - Número: "18 meses"
  - Subtítulo: "Inteligência acumulativa — vantagem que não se compra depois"
  - Visual: timeline simples (mês 1 → 6 → 12 → 18) com marcos
  - Dado: "42% de crescimento anual em proptech de IA vs. 24% em proptech convencional (PitchBook/CRETI 2025)"
- **Speaker note:** "Cada transação alimenta o modelo. Cada dado de comportamento treina o Digital Twin. Em 18 meses, sua base de inteligência é tão profunda que nenhum concorrente consegue replicar — mesmo copiando a tecnologia. Os dados são o moat."

### SLIDE 13 — Mercado Endereçável
- **Layout:** CONTENT_CHARCOAL, diagrama concêntrico (TAM/SAM/SOM)
- **Conteúdo:**
  - TAM: "Mercado imobiliário RJ — R$28,8 bi em 9 meses (ABRAINC 2024)"
  - SAM: "Barra da Tijuca luxo — R$1,6 bi/quadrimestre (ABRAINC 2025)"
  - SOM: "4 condomínios premium — Mansões, Península, Malibu, Golf Olímpico"
- **Visual:** 3 círculos concêntricos com valores
- **Speaker note:** "O mercado total do Rio nos primeiros 9 meses de 2024 foi R$28,8 bilhões. A Barra sozinha representa um terço. Nosso foco são os 4 condomínios de ultra-alto padrão — um mercado concentrado onde dados fazem mais diferença."

### SLIDE 14 — Modelo de Receita
- **Layout:** CONTENT_CHARCOAL, 4 cards em grid 2x2
- **Conteúdo:**
  - Card 1: "Buyer's Fee" — "3-5% success fee (R$150-500k/transação)"
  - Card 2: "Family Office" — "Retainer R$5-15k/mês (0,5-1% AUM anual)"
  - Card 3: "Alpha Intelligence" — "Assinatura B2B R$5-20k/mês"
  - Card 4: "Repositioning" — "Advisory R$30-100k + 20% do ágio"
- **Speaker note:** "São 4 fontes de receita, sendo que 2 delas são recorrentes — Family Office e Alpha. Isso reduz a dependência do modelo transacional e cria previsibilidade. O benchmark de mercado para buyer's agent é 3-5% de success fee."

### SLIDE 15 — Unit Economics
- **Layout:** CONTENT_CHARCOAL, tabela clean
- **Conteúdo:**
  - "LTV/CAC: 5-8x (benchmark setor: 3-4x — Phoenix Strategy Group 2025)"
  - "CAC payback: ~14 meses"
  - "Receita recorrente: 35%+ do total (Family Office + Alpha)"
  - "Cash buyers: 88% no luxo global (Sotheby's 2025)"
  - Dado complementar: "Investimento global em proptech: US$16,7 bi em 2025 (+68% YoY — CRETI)"
- **Speaker note:** "O LTV/CAC de 5-8x está acima do benchmark de mercado que é 3-4x para best-in-class. Isso acontece porque o modelo combina transação com recorrência. E um dado importante: 88% dos compradores de luxo pagam em cash — sem dependência de crédito."

### SLIDE 16 — Projeção Financeira
- **Layout:** CONTENT_CHARCOAL, chart de barras (18 meses)
- **Conteúdo:** Gráfico de barras com receita mensal (cenário base)
  - Break-even: mês 14
  - Ano 1: ROI 3-4x (projeção cenário base)
  - Ano 2: ROI 7x+ (projeção)
  - Nota: "Inputs: 3-5 corretores, ticket R$7MM, 12 transações/ano"
  - Nota: "Modelo editável na planilha financeira"
- **Speaker note:** "Esta é a projeção do cenário base — 3 a 5 corretores, ticket médio de R$7 milhões, 12 transações por ano. Break-even no mês 14. ROI de 3-4x no primeiro ano. Esses números são editáveis — na planilha financeira, você coloca os SEUS números e vê o SEU retorno."

### SLIDE 17 — Cenário Competitivo
- **Layout:** CONTENT_CHARCOAL, tabela comparativa (checkmark grid)
- **Conteúdo:** Tabela com 5 colunas:
  - Headers: Capacidade | BPR | MySide | Matchpoint | Black Brick
  - Rows: IA Preditiva | Digital Twin | Receita Recorrente | Off-Market Access | 100% Buyer-Side | Operação BR
  - BPR: todos ✓ | Outros: ✓ parciais
- **Speaker note:** "MySide é o mais próximo no Brasil — 100% buyer-side, 9% de economia. Mas não tem IA preditiva. Black Brick em Londres cobra 2-2,5% e gera economia consistente, mas não opera no Brasil. Matchpoint tem 500+ clientes mas modelo diferente. O BPR é o único que combina buyer's agency com IA preditiva no mercado brasileiro."

### SLIDE 18 — Case Simulado 1
- **Layout:** CONTENT_CHARCOAL, narrativa visual com timeline
- **Conteúdo:**
  - Título: "Cenário Ilustrativo — Família Executiva, Península"
  - Timeline: Digital Twin (semana 1) → Crystal Ball detecta (semana 3) → Negociação (semana 5) → Fechamento (semana 6)
  - Resultado: "Imóvel R$9,5MM → comprado a R$8,6MM (-9,5%)"
  - "Economia: R$900k | Tempo: 6 semanas vs. 4+ meses tradicional"
  - Nota: "Cenário ilustrativo baseado em dados de mercado"
- **Speaker note:** "Cenário ilustrativo baseado nos dados reais: família executiva busca no Península, ticket R$9-10 milhões. Digital Twin mapeia o perfil em 1 semana. Crystal Ball identifica unidade em pré-partilha na semana 3 — antes de chegar ao mercado. Negociação IA fecha com 9,5% de desconto. Economia de R$900 mil em 6 semanas. No modelo tradicional, seriam 4 meses e provavelmente pelo asking price."

### SLIDE 19 — Case Simulado 2
- **Layout:** CONTENT_CHARCOAL, antes/depois
- **Conteúdo:**
  - Título: "Cenário Ilustrativo — Investidor, Golf Olímpico"
  - Antes (tradicional): "8-12 unidades vistas em portais | 4 meses | Asking price R$15MM"
  - Depois (BPR): "Shortlist de 5 imóveis ranqueados por score | 6 semanas | R$13,2MM (-12%)"
  - Dado: "Imóveis off-market vendidos por 1,5-17,5% menos (Zillow/Bright MLS-Drexel)"
  - Nota: "Cenário ilustrativo baseado em dados de mercado"
- **Speaker note:** "Segundo caso: investidor buscando no Golf Olímpico, o mais exclusivo. No modelo tradicional, veria 8-12 unidades dos portais, gastaria 4 meses, pagaria o preço pedido. Com BPR, o Crystal Ball traz 5 imóveis ranqueados por score — incluindo off-market. Economia de 12%. Dados de Zillow e Drexel University confirmam que off-market vende por 1,5-17,5% menos."

### SLIDE 20 — ROI do Comprador
- **Layout:** HIGHLIGHT_GOLD, stat callout central
- **Conteúdo:**
  - Número grande: "3-4x"
  - Subtítulo: "ROI projetado no primeiro ano (cenário base)"
  - Abaixo: "7x+ a partir do segundo ano"
  - Nota: "Projeção baseada em 3-5 corretores, ticket R$7MM — editável no Financial Model"
  - Dado: "30% dos CEOs reportam aumento de receita atribuível a IA (PwC 2025)"
- **Speaker note:** "O retorno projetado é de 3 a 4 vezes o investimento no primeiro ano, escalando para 7x no segundo. Isso é uma projeção baseada em cenário, não uma promessa — os inputs são editáveis na planilha. Mas para contextualizar: 30% dos CEOs globais já reportam aumento de receita atribuível a IA, segundo a PwC."

### SLIDE 21 — O Que Você Recebe
- **Layout:** CONTENT_CHARCOAL, checklist visual com 8 items
- **Conteúdo:**
  - ✓ Blueprint Estratégico (80+ páginas)
  - ✓ Guia Técnico de Implementação (60+ páginas)
  - ✓ Planilha Financeira (8 abas editáveis)
  - ✓ Aria Intelligence (leads 24/7)
  - ✓ Research Pack (7 estudos de mercado)
  - ✓ 120 horas de advisory nos primeiros 6 meses
  - ✓ Código-fonte completo — propriedade total do comprador
  - ✓ Zero dependência de fornecedor
- **Speaker note:** "São 8 entregáveis. Destaco dois pontos: código-fonte completo — é seu, você pode trocar de software house amanhã e continuar operando. E 120 horas de advisory nos primeiros 6 meses para garantir que a implementação saia do papel."

### SLIDE 22 — Pricing
- **Layout:** CONTENT_CHARCOAL, 3 colunas (tiers)
- **Conteúdo:**
  - Tier 1: "Essencial — R$350k"
    - Blueprint + Financial Model + Research + 40h advisory
  - Tier 2: "Profissional — R$450k" (DESTAQUE em gold border)
    - Tudo do Essencial + TIG + Aria + 80h advisory
  - Tier 3: "Enterprise — R$600k"
    - Tudo do Profissional + implementação assistida + 120h advisory + suporte 6 meses
- **Speaker note:** "Três opções. O Essencial entrega a estratégia e os números. O Profissional — que é o que recomendo — entrega tudo: estratégia, guia técnico, Aria de leads, e 80 horas de acompanhamento. O Enterprise inclui assistência na implementação com a software house."

### SLIDE 23 — Timeline de Implementação
- **Layout:** CONTENT_CHARCOAL, timeline horizontal (6 meses)
- **Conteúdo:**
  - Mês 1-2: "Setup — Infraestrutura, Digital Twin, integração de dados"
  - Mês 3: "Crystal Ball — Modelo preditivo treinado com dados locais"
  - Mês 4: "Negociação + Family Office — Módulos operacionais"
  - Mês 5: "Alpha Intelligence — Dashboard B2B"
  - Mês 6: "Go-Live completo — todas as 5 ferramentas operacionais"
- **Speaker note:** "Em 6 meses, tudo está rodando. No mês 2, o Digital Twin já está operacional — você já pode começar a usar com clientes. No mês 3, o Crystal Ball começa a prever. Não é um projeto de 2 anos — em 90 dias você já tem resultado."

### SLIDE 24 — Por Que Agora
- **Layout:** CONTENT_CHARCOAL, 3 stat callouts verticais
- **Conteúdo:**
  - Stat 1: "US$ 16,7 Bi" — "investidos em proptech em 2025 (+68% YoY — CRETI)"
  - Stat 2: "42%" — "crescimento anual em IA imobiliária vs. 24% em proptech convencional (PitchBook)"
  - Stat 3: "78%" — "dos executivos RE: tecnologia é prioridade #1 (PwC)"
  - Linha final: "Quem implementar primeiro captura o moat de dados. Quem esperar, compra tecnologia defasada."
- **Speaker note:** "Três forças convergindo: o investimento em proptech explodiu 68% em um ano. IA imobiliária cresce o dobro da proptech convencional. E 78% dos seus pares já priorizaram tecnologia. A janela de vantagem competitiva é de 18 meses — depois, será tabela de preço."

### SLIDE 25 — Próximo Passo
- **Layout:** TITLE_DARK, centralizado, clean
- **Conteúdo:**
  - "Próximo Passo"
  - "Agenda uma sessão de 45 minutos para modelar o cenário da SUA imobiliária."
  - Contato: "Paulo Gomes"
  - Email + telefone (placeholder para Paulo preencher)
  - Logo BPR
  - "CONFIDENCIAL" em gold, 10pt
- **Speaker note:** "Obrigado pelo tempo. O próximo passo é uma sessão de 45 minutos onde eu abro a planilha financeira com os SEUS números — seus corretores, seu ticket médio, sua região. Você vê o ROI calculado para a sua realidade. Sem compromisso."

---

## VERIFICAÇÃO / QA

### Passo 1: Gerar o PPTX
```bash
node create-pitch-deck.js
```

### Passo 2: Content QA
```bash
python3 -m markitdown BPR-Intelligence-Pitch-Deck.pptx
```
Verificar: conteúdo completo, ordem correta, zero placeholder.

### Passo 3: Visual QA (OBRIGATÓRIO)
Converter para imagens e inspecionar:
```bash
python3 scripts/office/soffice.py --headless --convert-to pdf BPR-Intelligence-Pitch-Deck.pptx
pdftoppm -jpeg -r 150 BPR-Intelligence-Pitch-Deck.pdf slide
```
Inspecionar CADA slide como imagem. Verificar:
- Overlap de texto/shapes
- Texto cortado nas bordas
- Contraste insuficiente
- Espaçamento irregular
- Ícones visíveis sobre background dark

### Passo 4: Fix & Re-verify
Se encontrar problemas, corrigir e repetir Passos 2-3.

### Passo 5: Gerar PDF backup
```bash
python3 scripts/office/soffice.py --headless --convert-to pdf BPR-Intelligence-Pitch-Deck.pptx
```

---

## CRITÉRIOS DE APROVAÇÃO

- [ ] ~25 slides completos (±2)
- [ ] Máx 40 palavras por slide (body, excluindo speaker notes)
- [ ] Speaker notes em português em TODOS os slides
- [ ] Design system BPR consistente (dark bg, gold accent, Georgia+Calibri)
- [ ] Dados = DADOS-VERIFICADOS-PITCH-DECK.md (zero claims sem fonte)
- [ ] Ícones em todos os slides
- [ ] 3+ layouts diferentes utilizados
- [ ] QA visual executado (slides convertidos para imagem e inspecionados)
- [ ] PPTX abre corretamente
- [ ] PDF backup gerado
- [ ] Arquivo em bpr-project/outputs/pptx/
