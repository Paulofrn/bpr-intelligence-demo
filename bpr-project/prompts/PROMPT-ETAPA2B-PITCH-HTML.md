# PROMPT — Etapa 2B: Pitch Deck HTML Interativo com Aria

## Contexto

A Etapa 2 gerou um PPTX de 25 slides. A análise comparativa com o site (bpr-intelligence.vercel.app) revelou desalinhamentos:
- Pitch era técnico/denso; site é emocional/concreto
- Legal Intelligence sumiu do pitch
- Nomes das ferramentas inconsistentes entre materiais
- Slides de TAM/SAM/SOM, Unit Economics e Competitivo são jargão de VC, não linguagem de CEO
- Faltavam case studies concretos que o site tem
- Preço no pitch tira poder de negociação da reunião

**Decisão:** Substituir o PPTX por uma apresentação HTML interativa que É o produto — CEO vê IA funcionando enquanto aprende sobre IA.

---

## Arquivo de Saída

```
bpr-project/outputs/html/BPR-Intelligence-Pitch.html
```

**Requisito:** Arquivo HTML único, self-contained (CSS + JS inline). Zero dependências externas. Funciona offline abrindo o arquivo local.

---

## 1. Tela de Acesso (Password Gate)

### Comportamento
- Tela escura (fundo #0D0D0D) com logo BPR Intelligence centralizado
- Campo de senha estilizado (borda gold #C9B037 no focus)
- Texto: "Acesso restrito a decisores qualificados"
- Subtexto: "Insira o código fornecido pelo seu consultor BPR"
- Senha padrão hardcoded: `bpr2026` (variável no topo do JS para fácil alteração)
- Ao acertar: fade-out da tela de senha, fade-in da apresentação
- Ao errar: shake animation + texto "Código inválido" em vermelho suave
- Sem limite de tentativas (não é segurança real, é filtro de exclusividade)

### Visual
- Logo: texto "BPR" em Georgia Bold 48pt gold + "Intelligence" em Calibri Light 24pt branco
- Ícone de cadeado sutil acima do campo (SVG inline, gold)
- Fundo com gradiente radial sutil do centro (0D0D0D → 1A1A2E nas bordas)

---

## 2. Design System

### Cores (idênticas ao site)
```css
--bg-primary: #0D0D0D;
--bg-secondary: #1A1A2E;
--bg-card: rgba(26, 26, 46, 0.7);
--gold: #C9B037;
--gold-light: #D4C157;
--cyan: #00A3B5;
--cyan-glow: #00D2FF;
--text-primary: #FFFFFF;
--text-secondary: rgba(255, 255, 255, 0.7);
--text-muted: rgba(255, 255, 255, 0.4);
--danger: #FF4444;
--success: #00C853;
```

### Tipografia
```css
--font-display: 'Georgia', serif;        /* títulos */
--font-body: 'Calibri', 'Segoe UI', sans-serif; /* corpo */
--font-mono: 'SF Mono', 'Fira Code', monospace;  /* dados/stats */
```

### Tamanhos
- Título principal da seção: 44px, Georgia Bold, gold
- Subtítulo: 20px, Calibri, white 70%
- Corpo: 16px, Calibri, white
- Stat callout (números grandes): 64px, Georgia Bold, gold ou cyan
- Label de stat: 14px, Calibri, white 70%

### Componentes Reutilizáveis
- **Glass Card**: background rgba(26,26,46,0.7), border 1px rgba(201,176,55,0.2), border-radius 16px, backdrop-filter blur(10px)
- **Gold Divider**: linha horizontal 60px, 2px, gold, margin auto
- **Icon Circle**: 48px circle, border 2px gold, ícone SVG inline dentro
- **Metric Box**: número grande em gold/cyan + label embaixo em white 70%
- **Case Study Card**: glass card com borda esquerda 3px gold, ícone 📍, texto em itálico

---

## 3. Navegação Dual

### Modo Apresentação (padrão quando tela > 1024px)
- Cada seção ocupa 100vh (viewport height)
- Navegação: setas ← → do teclado, scroll do mouse com snap
- Indicador de progresso: barra fina gold no topo (width proporcional ao progresso)
- Indicador de seção: dots verticais no lado direito (dot ativo = gold, inativo = white 20%)
- Tecla `F` para fullscreen
- Tecla `Esc` para sair do fullscreen
- Transição entre seções: fade + slide sutil (300ms ease-out)

### Modo Scroll (padrão quando tela < 1024px OU toggle manual)
- Seções empilhadas com espaçamento generoso (padding 80px vertical)
- Scroll suave nativo (scroll-behavior: smooth)
- Navegação fixa no topo: logo pequeno + dots horizontais clicáveis
- Animações reveal on scroll (intersection observer, fade-up 30px)

### Toggle
- Ícone discreto no canto superior direito: 📊 (slides) / 📜 (scroll)
- Tooltip: "Alternar modo de visualização"
- Persiste escolha em sessionStorage

---

## 4. Estrutura das Seções (15 seções)

### Seção 1: CAPA
**Layout:** Centralizado vertical, full viewport

```
[Logo BPR Intelligence - gold]
[gold divider 60px]

"Da Imobiliária Que Vende Imóvel
Para a Imobiliária Que Pensa"

[subtexto em white 70%]
"Uma nova geração de Inteligência Artificial que aprende
com cada operação e fica mais inteligente a cada mês"

[seta animada bounce ↓]
"Deslize para começar"

[rodapé discreto]
"Confidencial | Distribuição restrita a decisores qualificados"
```

---

### Seção 2: O DIAGNÓSTICO
**Layout:** Título + grid 3x2 de cards

**Título:** "Seis Problemas Que Nenhuma Tecnologia Resolvia. Até Agora."

**6 Cards (glass cards com ícone + frase do CEO + explicação):**

1. 📉 **"Minha receita é uma montanha-russa"**
   Comissão transacional. Fechou, ganhou. Não fechou, zero. Sem como planejar crescimento.
   `Sem receita recorrente`

2. 🧠 **"Meu melhor corretor é meu maior risco"**
   Conhecimento na cabeça das pessoas. Corretor sai, leva clientes e histórico.
   `Zero dados proprietários`

3. ⏱️ **"80% do tempo da equipe é desperdiçado"**
   Segundo o NAR (2025), compradores visitam em média 6 propriedades ao longo de 10 semanas. No luxo brasileiro, esse número é ainda maior.
   `R$ 45k de custo invisível por deal`

4. 🎯 **"Não tenho diferenciação real"**
   Qualquer corretor com CRECI faz o que você faz. Sem tecnologia proprietária, sem dado exclusivo.
   `Concorrente copia tudo amanhã`

5. ⚖️ **"Perco negócios por lentidão jurídica"**
   Due diligence trava deals por semanas. Outro comprador fecha antes.
   `15-25 dias de ciclo jurídico`

6. 🔄 **"Vendo uma vez e nunca mais vejo o cliente"**
   Fecha R$ 10 MM, ganha R$ 300k. Cliente desaparece. O banco ganha pra sempre. Você ganha uma vez.
   `Zero recorrência`

**Fechamento:** "Esses problemas existem há 30 anos. A tecnologia para resolvê-los, não."

---

### Seção 3: A TRANSFORMAÇÃO
**Layout:** Centralizado, impacto visual

```
[ícone de diamante/cerebro, 80px, gold outline]

"BPR Intelligence"

"A Primeira Buyer's Agency com IA Agêntica
do Mercado Imobiliário de Luxo Brasileiro"

[3 metric boxes em linha]
  "5 Módulos de IA"  |  "1 Ecossistema Integrado"  |  "Aprende a Cada Operação"

[texto complementar]
"Não é um CRM melhor. Não é um portal de busca.
É uma imobiliária que pensa."
```

---

### Seção 4: CRYSTAL BALL
**Layout:** Split — esquerda (descrição) / direita (case study card)

**Título:** "Crystal Ball"
**Subtítulo:** "Seu corretor liga pro proprietário antes do imóvel ser listado"

**Esquerda:**
O Crystal Ball analisa sinais de disponibilidade futura — inventários, mudanças tributárias, padrões de mercado — e identifica imóveis que entrarão no mercado com antecedência.

Sua equipe contata o proprietário antes da listagem pública. Sem concorrência.

**2 Metrics:**
- `45-90 dias` de antecedência
- `Zero` concorrência no deal

**Direita (Case Study Card com borda gold):**
📍 **Península, Barra da Tijuca**

Cobertura de R$ 12 MM. Proprietário em processo de inventário — ninguém sabe ainda. O sistema detecta o padrão em janeiro. Seu consultor liga em fevereiro, oferece assessoria discreta.

Em março, 40 agências disputariam o mesmo imóvel. **Você já fechou sem concorrência.**

**Tag no footer do card:** "E fica mais inteligente a cada operação na sua região."

---

### Seção 5: DIGITAL TWIN
**Layout:** Split — esquerda (case study) / direita (descrição) [invertido]

**Título:** "Digital Twin"
**Subtítulo:** "De 20 visitas frustradas para 3 certeiras"

**Direita:**
Cria um perfil comportamental completo do comprador na primeira reunião. Vai além de metragem e orçamento — analisa padrão de vida, rotina, preferências implícitas.

**2 Metrics:**
- `3-5` visitas qualificadas (vs. 15-20)
- `85%` de assertividade no match

**Esquerda (Case Study Card):**
📍 **Barra da Tijuca, RJ**

Executiva, 38 anos, CFO de multinacional. Diz: "Quero 4 quartos na Barra, até R$ 8 MM."

Corretor tradicional mostra 22 opções. Ela visita 15, odeia todas.

Com Digital Twin: o sistema identifica que o padrão real é proximidade do colégio Eleva + home office com vista + condomínio sem clube social. **3 opções. Compra na segunda visita.**

---

### Seção 6: LEGAL INTELLIGENCE
**Layout:** Split — esquerda (descrição) / direita (case study)

**Título:** "Legal Intelligence"
**Subtítulo:** "Due diligence de 25 dias para 5. Seu advogado agradece."

**Esquerda:**
Coleta automaticamente certidões, cruza dados de matrícula com cartório, verifica IPTU, débitos condominiais, ações judiciais. Monta dossiê estruturado com flags de risco.

O ciclo jurídico cai de semanas para dias.

**2 Metrics:**
- `5 dias` (vs. 15-25 dias)
- `100%` dossiê automatizado

**Direita (Case Study Card):**
📍 **Jardim Oceânico, Barra da Tijuca**

Cobertura de R$ 9 MM. Comprador quer fechar em 30 dias. Modelo tradicional: advogado começa DD no dia 1. Dia 15, descobre cláusula atípica. Dia 25, parecer final. Cliente quase desistiu.

Com Legal Intelligence: dia 1, sistema cruza tudo em 3 horas. Dossiê pronto com flags. Advogado valida em 4 horas. **Dia 5, parecer final. Deal salvo.**

---

### Seção 7: NEGOTIATION ENGINE
**Layout:** Split — esquerda (case study) / direita (descrição)

**Título:** "Negotiation Engine"
**Subtítulo:** "Sua equipe inteira negocia como seu melhor corretor. Sempre."

**Direita:**
Analisa tempo de mercado, perfil do vendedor, comparáveis recentes e pressão de liquidez. Simula cenários e recomenda a estratégia ótima.

O mercado de luxo já negocia 8-12% abaixo do asking — o algoritmo sistematiza a captura desse desconto com TODA a equipe.

**2 Metrics:**
- `R$ 920k` economia média (em imóvel de R$10M)
- `100%` da equipe no nível do melhor corretor

**Esquerda (Case Study Card):**
📍 **Barra da Tijuca, RJ**

Imóvel de R$ 10 MM. Vendedor motivado — divórcio, prazo judicial de 45 dias. Corretor tradicional: oferece R$ 9,5 MM, fecha a R$ 9,8 MM. Economia: R$ 200k.

Com Negotiation Engine: identifica urgência, compara dados reais de m², recomenda oferta rápida com closing acelerado. **Fecha a R$ 9,08 MM. Economia: R$ 920k.**

---

### Seção 8: CLIENT RETENTION & RECURRING REVENUE
**Layout:** Título + 2 colunas (Moradores / Investidores)

**Título:** "Client Retention"
**Subtítulo:** "Seu cliente nunca mais esquece de você"

**Coluna 1 — Glass Card "Clientes Moradores":**
- ✅ Relatório semestral de valorização patrimonial
- ✅ Custo operacional quase zero (gerado pela IA)
- ✅ Cliente indica amigos, volta na próxima transação
- **Resultado:** Fidelização passiva + indicações orgânicas

**Coluna 2 — Glass Card "Clientes Investidores" (borda cyan):**
- ✅ Gestão ativa de portfólio com fee de administração
- ✅ Pricing algorítmico de aluguel
- ✅ Análise de vacância preditiva
- ✅ Timing de saída otimizado
- **Resultado:** Receita recorrente real (fee mensal)

**Case Study (abaixo, centralizado):**
20 clientes HNWI no Ano 1. Cada um recebe relatório semestral personalizado. No Ano 2: 5 indicações, 3 retornos para segunda transação. **Sem o relatório, esses 8 clientes teriam ido para o concorrente.**

---

### Seção 9: IMPACTO MENSURÁVEL
**Layout:** Título + tabela before/after animada

**Título:** "Não acredite em nós. Compare."

**Tabela (estilizada, rows com hover highlight):**

| Métrica | Sem BPR | Com BPR |
|---------|---------|---------|
| Visitas por transação | 15-20 | 3-5 |
| Ciclo de due diligence | 15-25 dias | 3-5 dias |
| Economia na negociação | 2-4% (instinto) | 8-12% (algorítmico) |
| Retenção de cliente | Uma transação | Relacionamento contínuo |
| Dados proprietários | Zero | Acumulam a cada operação |
| Dependência do corretor | Total | Mínima |

**Coluna "Sem BPR":** texto em vermelho suave / **"Com BPR":** texto em cyan

**Nota de rodapé:** "Baseado em dados NAR 2025, ABRAINC 2025, Concierge Auctions 2024"

---

### Seção 10: VANTAGEM COMPETITIVA
**Layout:** Título + 3 cards verticais

**Título:** "Quem Planta Primeiro, Colhe Primeiro"

**Card 1 — 🧠 Inteligência Acumulativa**
Os algoritmos aprendem com cada operação na sua região. 18 meses de dados = vantagem impossível de replicar. O concorrente que chegar depois começa do zero.

**Card 2 — 📍 Exclusividade Territorial**
Um operador por região. Não é escassez artificial — é lógica de negócio. Dois operadores com a mesma inteligência na mesma região se canibalizariam.

**Card 3 — ⏰ Janela de Mercado**
Três forças convergindo: maturidade da IA agêntica, evolução do HNWI brasileiro, saturação do mercado premium. Em 24 meses, bancos e fintechs ocupam esse espaço.

**Fechamento (gold, centralizado):** "E quem colhe primeiro, colhe mais."

---

### Seção 11: ARQUITETURA DO ECOSSISTEMA
**Layout:** Diagrama visual da stack (SVG inline ou divs posicionados)

**Título:** "Arquitetura — Um Ecossistema, Não Uma Ferramenta"

**Diagrama (de cima para baixo):**

```
┌─────────────────────────────────────────────┐
│          CAMADA DE INTELIGÊNCIA              │
│  Crystal Ball │ Digital Twin │ Legal Intel   │
│  Negotiation  │ Client Retention             │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│          MOTOR DE IA AGÊNTICA                │
│  Processamento │ Aprendizado │ Decisão       │
│  de Linguagem  │ Contínuo    │ em Tempo Real │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│          BASE DE DADOS                       │
│  Mercado │ Comportamento │ Jurídico │ Hist.  │
│  Regional│ do Comprador  │ Imobil.  │ Oper.  │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│          INTEGRAÇÕES                         │
│  Portais │ Cartórios │ CRMs │ Fontes Pub.   │
└─────────────────────────────────────────────┘
```

**Implementar como:** Boxes glass-card com bordas gold/cyan, setas animadas entre camadas (CSS animation pulse/glow), hover mostra tooltip com detalhes. Cores: camada de inteligência = borda gold, motor IA = borda cyan, dados = borda white 30%, integrações = borda white 20%.

**Nota lateral (texto pequeno, white 50%):** "Infraestrutura cloud-native. Escalável. Dados da sua operação são exclusivos e nunca compartilhados."

---

### Seção 12: O QUE VOCÊ RECEBE
**Layout:** Título + lista visual de entregáveis em 3 colunas

**Título:** "O Que Você Recebe"
**Subtítulo:** "Entregáveis concretos — não promessas"

**Coluna 1 — 🔧 Tecnologia (glass card, borda cyan)**
- Ecossistema completo: 5 módulos de IA configurados para sua região
- Dashboard executivo com métricas em tempo real
- App de acesso para equipe (mobile + desktop)
- Integrações com seus sistemas atuais (CRM, portais)

**Coluna 2 — 📋 Implementação (glass card, borda gold)**
- Setup completo da infraestrutura (cloud dedicada)
- Treinamento presencial da equipe (2 dias)
- Migração de dados históricos (carteira de clientes)
- Configuração de parâmetros regionais (micro-mercado)

**Coluna 3 — 🤝 Suporte Contínuo (glass card, borda white 50%)**
- Gerente de sucesso dedicado (12 meses)
- Suporte técnico prioritário
- Atualizações trimestrais do algoritmo
- Relatórios de performance mensal
- Recalibração contínua dos modelos

---

### Seção 13: PLANO DE IMPLEMENTAÇÃO
**Layout:** Timeline horizontal (90 dias, 4 fases)

**Título:** "Da Decisão ao Primeiro Resultado: 90 Dias"

**Timeline Visual (barra horizontal com marcos):**

**Semana 1-2: SETUP** (ícone 🔧)
- Infraestrutura cloud dedicada
- Integrações com sistemas existentes
- Configuração de parâmetros regionais

**Semana 3-4: DADOS** (ícone 📊)
- Migração da carteira de clientes
- Alimentação inicial dos modelos
- Calibração Crystal Ball para sua região

**Semana 5-8: TREINAMENTO** (ícone 🎓)
- Capacitação presencial da equipe
- Operação assistida (modo piloto)
- Ajustes finos baseados em uso real

**Semana 9-12: GO-LIVE** (ícone 🚀)
- Operação autônoma
- Primeiros resultados mensuráveis
- Relatório de baseline para ROI

**Marcadores visuais:** Cada fase é um bloco na timeline, cor progride de gold → cyan. Ponto ativo pulsa. Fase atual pode ser destacada com glow.

**Nota:** "Após os 90 dias iniciais, os algoritmos continuam aprendendo. Mês 6: performance otimizada. Mês 18: vantagem competitiva consolidada."

---

### Seção 14: EXCLUSIVIDADE
**Layout:** Centralizado, impacto emocional

```
[fundo com gradiente radial gold sutil]

"Esta Proposta Tem Prazo"

[stat grande: "1" em gold 120px]
"operador por região"

"A exclusividade territorial é o que torna o sistema valioso.
Dois operadores com a mesma inteligência na mesma região
se canibalizariam."

"A questão não é SE essa tecnologia chegará ao seu mercado.
É QUEM vai operá-la."

[gold divider]

"Sua região ainda está disponível."
```

---

### Seção 15: PRÓXIMO PASSO
**Layout:** Centralizado + CTA para Aria

```
[ícone Aria - gold]

"Tem Perguntas?"

"Converse com a Aria — nossa assistente de inteligência.
Ela conhece cada detalhe do ecossistema BPR."

[Botão gold grande: "Conversar com a Aria →"]
(ao clicar, abre o chat da Aria)

[texto menor]
"Ou, se preferir, fale diretamente com nossa equipe:
contato@bpr-intelligence.com"

[rodapé]
"BPR Intelligence | Brasil | Confidencial"
"© 2026 BPR Intelligence. Todos os direitos reservados."
```

---

## 5. Aria — Chatbot Contextual Embutido

### Interface
- **Posição:** Botão flutuante canto inferior direito (60px circle, gold border, ícone 💬)
- **Estado fechado:** Ícone + badge "Aria" + pulse animation sutil
- **Estado aberto:** Panel 380px width × 520px height, glass-card style, canto inferior direito
- **Header do chat:** "Aria" em gold + "Assistente BPR Intelligence" em white 70% + botão fechar ✕
- **Input:** Campo texto com placeholder "Pergunte sobre o ecossistema BPR..." + botão enviar (gold)
- **Mensagens:** Bolhas — Aria (fundo glass, alinhado esquerda) / Usuário (fundo gold 20%, alinhado direita)
- **Typing indicator:** 3 dots animados quando "pensando"

### Mensagem Inicial (automática ao abrir)
"Olá! Sou a Aria, assistente de inteligência da BPR. Posso responder suas dúvidas sobre o ecossistema, os módulos de IA, o processo de implementação, ou qualquer aspecto da proposta. O que gostaria de saber?"

### Base de Conhecimento (respostas pré-programadas)
**Implementar com keyword matching + fuzzy logic simples em JS.**

**Sobre preço/investimento/custo/valor/quanto custa:**
"O investimento é personalizado com base na região, no tamanho da operação e no escopo de implementação. É uma conversa que fazemos diretamente com o decisor — posso agendar essa conversa se tiver interesse. Quer que eu anote seu contato?"

**Sobre Crystal Ball/previsão/antecipação:**
"O Crystal Ball analisa sinais de disponibilidade futura — inventários, mudanças tributárias, padrões sazonais — e identifica imóveis antes da listagem pública. Em testes, conseguimos antecipação de 45 a 90 dias. O diferencial é que ele aprende com cada operação na sua região, ficando mais preciso com o tempo."

**Sobre Digital Twin/perfil/comportamento:**
"O Digital Twin cria um perfil comportamental completo do comprador já na primeira reunião. Vai além de metragem e orçamento — analisa padrão de vida, rotina, preferências implícitas. Resultado: sua equipe apresenta 3-5 opções certeiras em vez de 20 genéricas."

**Sobre Legal Intelligence/jurídico/due diligence:**
"O Legal Intelligence automatiza a coleta de certidões, cruza dados de matrícula com cartórios, verifica débitos e ações judiciais. Monta um dossiê estruturado com flags de risco. O ciclo jurídico cai de 15-25 dias para 3-5 dias."

**Sobre Negotiation Engine/negociação:**
"O Negotiation Engine analisa tempo de mercado, perfil do vendedor, comparáveis recentes e pressão de liquidez. Simula cenários e recomenda a estratégia ótima. O mercado de luxo negocia 8-12% abaixo do asking — o algoritmo sistematiza essa captura com TODA a equipe, não só com o melhor corretor."

**Sobre Client Retention/retenção/recorrência:**
"Após a aquisição, o sistema gera relatórios periódicos de valorização patrimonial para cada cliente. Moradores recebem fidelização passiva. Investidores recebem gestão ativa de portfólio com fee de administração — receita recorrente real para sua empresa."

**Sobre implementação/prazo/timeline/quanto tempo:**
"O processo completo leva 90 dias: setup de infraestrutura (semanas 1-2), migração de dados (semanas 3-4), treinamento da equipe (semanas 5-8), e go-live com operação autônoma (semanas 9-12). Após o go-live, os algoritmos continuam aprendendo e melhorando."

**Sobre exclusividade/território/região:**
"Trabalhamos com exclusividade territorial — um operador por região. Não é escassez artificial, é lógica de negócio. A inteligência acumulada de 18 meses na sua região cria uma vantagem impossível de replicar. Por isso a janela de oportunidade é importante."

**Sobre dados/segurança/privacidade:**
"Infraestrutura cloud-native com dados isolados por operador. Seus dados são exclusivos e nunca compartilhados. Compliance com LGPD nativo. Backups automáticos e criptografia end-to-end."

**Sobre equipe/treinamento/capacitação:**
"O treinamento é presencial, 2 dias com a equipe. Inclui uso de cada módulo, interpretação de dashboards, e fluxo operacional. Após o go-live, você tem um gerente de sucesso dedicado por 12 meses e suporte técnico prioritário."

**Sobre ROI/retorno/resultado:**
"O retorno depende do seu volume de operações e ticket médio. Posso dar um exemplo: com 15 transações/ano de ticket R$ 8M, a economia na negociação algorítmica sozinha pode representar vários múltiplos do investimento no primeiro ano. Quer que a gente faça essa conta juntos com seus números reais?"

**Sobre concorrência/mercado/outras soluções:**
"A BPR Intelligence é a primeira buyer's agency com IA agêntica do mercado de luxo brasileiro. Existem CRMs, portais e ferramentas isoladas — mas nenhum ecossistema integrado que aprende com cada operação. A diferença é a inteligência acumulativa: quanto mais você opera, mais inteligente o sistema fica."

**Sobre contato/agendar/reunião:**
"Posso anotar seus dados para que nossa equipe entre em contato. Qual seu nome, empresa e a melhor forma de contato?"

**Fallback (nenhum keyword match):**
"Boa pergunta! Esse é um ponto que vale aprofundar com nossa equipe técnica. Posso agendar uma conversa? Qual a melhor forma de contato?"

### Coleta de Dados
Quando o usuário fornecer nome, empresa, email ou WhatsApp, armazenar em variável JS e exibir confirmação:
"Anotado! [Nome], da [Empresa]. Nossa equipe entrará em contato por [canal]. Enquanto isso, posso ajudar com mais alguma dúvida?"

---

## 6. Animações e Microinterações

### Entrada de Seção (reveal on scroll / on navigate)
- Título: fade-in + slide-up 20px, delay 0ms, duration 600ms
- Subtítulo: fade-in + slide-up 20px, delay 200ms
- Cards/Conteúdo: fade-in + slide-up 30px, delay 400ms (staggered 100ms entre cards)
- Métricas numéricas: counter animation de 0 ao valor final, duration 1500ms, easing ease-out

### Hover Effects
- Cards: translate-y -4px + box-shadow intensifica
- Botões: background-color transition 200ms
- Links: underline slide-in da esquerda

### Transições entre Seções (Modo Apresentação)
- Seção saindo: fade-out 200ms + slide ligeiro na direção da navegação
- Seção entrando: fade-in 300ms + slide da direção oposta
- CSS: transform + opacity com will-change para performance

### Progress Bar
- Barra no topo: 3px height, gold, width transiciona de 0% a 100% conforme progresso
- Smooth transition: width 300ms ease-out

---

## 7. Responsividade

### Desktop (>1024px)
- Modo apresentação padrão
- Layouts split 50/50
- Cards em grid 3 colunas
- Aria panel 380x520px

### Tablet (768-1024px)
- Modo scroll padrão
- Layouts split viram stack vertical
- Cards em grid 2 colunas
- Aria panel full-width bottom sheet

### Mobile (<768px)
- Modo scroll apenas
- Tudo stack vertical
- Cards 1 coluna
- Aria panel fullscreen modal
- Font sizes reduzidos (título 32px, corpo 14px, stats 48px)

---

## 8. Requisitos Técnicos

### Performance
- Arquivo HTML < 500KB (incluindo todo CSS/JS inline)
- First paint < 1s em conexão local (arquivo aberto direto)
- Smooth 60fps em animações
- Sem dependências externas (zero CDN, zero fontes externas)

### Compatibilidade
- Chrome 90+, Safari 15+, Firefox 90+, Edge 90+
- Funciona abrindo o arquivo .html direto (protocolo file://)
- Funciona servido via HTTP/HTTPS

### Acessibilidade Básica
- Navegação por teclado funcional (Tab, Enter, setas)
- Contraste adequado (WCAG AA no mínimo)
- Focus visible nos elementos interativos

---

## 9. Código — Estrutura Esperada

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BPR Intelligence | Apresentação Executiva</title>
    <style>
        /* === RESET + VARIABLES === */
        /* === TYPOGRAPHY === */
        /* === LAYOUT === */
        /* === COMPONENTS (glass-card, metric-box, case-study, etc.) === */
        /* === PASSWORD GATE === */
        /* === SECTIONS === */
        /* === NAVIGATION === */
        /* === ARIA CHATBOT === */
        /* === ANIMATIONS === */
        /* === RESPONSIVE === */
    </style>
</head>
<body>
    <!-- PASSWORD GATE -->
    <div id="password-gate">...</div>

    <!-- PRESENTATION WRAPPER -->
    <div id="presentation" style="display:none;">
        <!-- PROGRESS BAR -->
        <div id="progress-bar"></div>

        <!-- NAVIGATION DOTS -->
        <nav id="section-nav">...</nav>

        <!-- MODE TOGGLE -->
        <button id="mode-toggle">...</button>

        <!-- SECTIONS -->
        <section id="s1" class="slide">...</section>
        <!-- ... sections 2-15 ... -->
        <section id="s15" class="slide">...</section>
    </div>

    <!-- ARIA CHATBOT -->
    <div id="aria-widget">
        <button id="aria-toggle">...</button>
        <div id="aria-panel" style="display:none;">...</div>
    </div>

    <script>
        // === CONFIG ===
        const PASSWORD = 'bpr2026';

        // === PASSWORD GATE ===
        // === NAVIGATION (keyboard + scroll snap) ===
        // === MODE TOGGLE ===
        // === SCROLL ANIMATIONS (IntersectionObserver) ===
        // === COUNTER ANIMATIONS ===
        // === ARIA CHATBOT (keyword matching + responses) ===
        // === ARIA DATA COLLECTION ===
    </script>
</body>
</html>
```

---

## 10. Critérios de Aprovação

### Conteúdo ✓
- [ ] 15 seções conforme especificado
- [ ] Zero menção a preço/investimento/valor monetário da proposta
- [ ] Legal Intelligence presente como módulo (não pode faltar)
- [ ] Nomes das ferramentas consistentes: Crystal Ball, Digital Twin, Legal Intelligence, Negotiation Engine, Client Retention
- [ ] Todos os case studies presentes (Península, CFO/Eleva, Jardim Oceânico, Divórcio, HNWI Ano 1)
- [ ] Seção "O Que Você Recebe" com entregáveis concretos
- [ ] Seção "Plano de Implementação" com timeline 90 dias
- [ ] Seção "Arquitetura" com diagrama visual da stack
- [ ] Textos em português brasileiro (sem anglicismos desnecessários, termos técnicos de produto podem ficar em inglês)

### Funcional ✓
- [ ] Password gate funciona (bpr2026 libera, senha errada mostra erro)
- [ ] Navegação por teclado (← → ou ↑ ↓) funciona no modo apresentação
- [ ] Scroll suave funciona no modo scroll
- [ ] Toggle entre modos funciona
- [ ] Progress bar atualiza ao navegar
- [ ] Section dots navegáveis (clicar leva à seção)
- [ ] Aria abre/fecha corretamente
- [ ] Aria responde a pelo menos 12 tópicos diferentes
- [ ] Aria tem fallback para perguntas não mapeadas
- [ ] Animações de entrada funcionam (fade + slide)
- [ ] Counter animations nos números funcionam
- [ ] Funciona abrindo o .html direto do Finder/Explorer (protocolo file://)

### Visual ✓
- [ ] Fundo dark #0D0D0D consistente
- [ ] Cores gold e cyan conforme design system
- [ ] Glass cards com backdrop-filter
- [ ] Tipografia Georgia (títulos) + Calibri/sans-serif (corpo)
- [ ] Responsivo em 3 breakpoints (desktop, tablet, mobile)
- [ ] Tabela before/after estilizada com cores (vermelho sem BPR, cyan com BPR)
- [ ] Diagrama de arquitetura visual (não texto puro)
- [ ] Timeline de implementação visual (não lista)

### QA ✓
- [ ] Abrir o HTML em Chrome e verificar todas as 15 seções
- [ ] Testar password gate (senha certa e errada)
- [ ] Testar navegação teclado em todas as seções
- [ ] Testar Aria com 5+ perguntas diferentes
- [ ] Testar responsividade (resize para tablet e mobile widths)
- [ ] Verificar que nenhum texto menciona preço/investimento

---

## 11. Execução

1. Criar arquivo: `bpr-project/outputs/html/BPR-Intelligence-Pitch.html`
2. Implementar todas as 15 seções conforme layout especificado
3. Implementar password gate
4. Implementar navegação dual (slides + scroll)
5. Implementar Aria chatbot com base de conhecimento
6. Implementar animações e microinterações
7. Testar: abrir o arquivo em Chrome, verificar todos os critérios
8. Se houver issues, corrigir e re-testar
9. Copiar arquivo final para outputs/html/

**IMPORTANTE:** Este é um arquivo HTML ÚNICO. Todo CSS e JS devem estar inline. Nenhuma dependência externa. O arquivo deve funcionar abrindo direto do Finder.
