const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType, Header, Footer,
  PageNumber, NumberFormat, TabStopPosition, TabStopType, TableOfContents,
  PageBreak, ImageRun, SectionType, convertInchesToTwip, LevelFormat,
  UnderlineType, VerticalAlign, PageOrientation } = require('docx');
const fs = require('fs');

// ============================================================
// CONSTANTS & DESIGN SYSTEM
// ============================================================

const COLORS = {
  gold: 'C9B037',
  goldLight: 'E0C94A',
  dark: '0D0D0D',
  charcoal: '1A1A2E',
  white: 'FFFFFF',
  lightGray: 'F5F5F5',
  mediumGray: '666666',
  darkGray: '333333',
  cyan: '00A3B5',
  navy: '1B2A4A',
  cream: 'FFF8E7',
};

const FONTS = { serif: 'Georgia', sans: 'Calibri', mono: 'Consolas' };
const PT = (n) => n * 2; // half-points

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function createSectionHeader(number, title, subtitle) {
  const children = [];
  if (number) {
    children.push(new Paragraph({
      spacing: { before: 600, after: 100 },
      children: [
        new TextRun({ text: `SEÇÃO ${number}`, font: FONTS.mono, size: PT(11), color: COLORS.gold, bold: true, allCaps: true }),
      ],
    }));
  }
  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: number ? 80 : 600, after: 200 },
    children: [
      new TextRun({ text: title, font: FONTS.serif, size: PT(26), color: COLORS.dark, bold: true }),
    ],
  }));
  if (subtitle) {
    children.push(new Paragraph({
      spacing: { after: 300 },
      children: [
        new TextRun({ text: subtitle, font: FONTS.sans, size: PT(12), color: COLORS.mediumGray, italics: true }),
      ],
    }));
  }
  children.push(createGoldDivider());
  return children;
}

function createSubheading(text, level = 2) {
  const sizes = { 2: 18, 3: 14, 4: 12 };
  const headings = { 2: HeadingLevel.HEADING_2, 3: HeadingLevel.HEADING_3, 4: HeadingLevel.HEADING_4 };
  return new Paragraph({
    heading: headings[level] || HeadingLevel.HEADING_2,
    spacing: { before: 400, after: 200 },
    children: [
      new TextRun({ text, font: FONTS.serif, size: PT(sizes[level] || 18), color: COLORS.charcoal, bold: true }),
    ],
  });
}

function createBody(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 200, line: 360 },
    alignment: opts.align || AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text, font: FONTS.sans, size: PT(11), color: COLORS.darkGray, ...opts }),
    ],
  });
}

function createBodyRuns(runs) {
  return new Paragraph({
    spacing: { after: 200, line: 360 },
    alignment: AlignmentType.JUSTIFIED,
    children: runs.map(r => new TextRun({ font: FONTS.sans, size: PT(11), color: COLORS.darkGray, ...r })),
  });
}

function createBullet(text, level = 0) {
  return new Paragraph({
    bullet: { level },
    spacing: { after: 120, line: 320 },
    children: [
      new TextRun({ text, font: FONTS.sans, size: PT(11), color: COLORS.darkGray }),
    ],
  });
}

function createBulletBold(boldText, normalText, level = 0) {
  return new Paragraph({
    bullet: { level },
    spacing: { after: 120, line: 320 },
    children: [
      new TextRun({ text: boldText, font: FONTS.sans, size: PT(11), color: COLORS.darkGray, bold: true }),
      new TextRun({ text: normalText, font: FONTS.sans, size: PT(11), color: COLORS.darkGray }),
    ],
  });
}

function createGoldDivider() {
  return new Paragraph({
    spacing: { before: 100, after: 300 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLORS.gold } },
    children: [new TextRun({ text: '', size: PT(2) })],
  });
}

function createKeyMetric(label, value, description) {
  return [
    new Paragraph({
      spacing: { before: 200, after: 40 },
      children: [
        new TextRun({ text: value, font: FONTS.mono, size: PT(28), color: COLORS.gold, bold: true }),
      ],
    }),
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({ text: label, font: FONTS.mono, size: PT(10), color: COLORS.mediumGray, allCaps: true }),
      ],
    }),
    description ? new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({ text: description, font: FONTS.sans, size: PT(10), color: COLORS.mediumGray, italics: true }),
      ],
    }) : null,
  ].filter(Boolean);
}

function createHighlightBox(text) {
  return new Paragraph({
    spacing: { before: 300, after: 300 },
    shading: { type: ShadingType.CLEAR, fill: COLORS.cream },
    border: {
      left: { style: BorderStyle.SINGLE, size: 12, color: COLORS.gold },
      top: { style: BorderStyle.SINGLE, size: 1, color: 'E8E0C0' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E8E0C0' },
      right: { style: BorderStyle.SINGLE, size: 1, color: 'E8E0C0' },
    },
    indent: { left: convertInchesToTwip(0.2), right: convertInchesToTwip(0.2) },
    children: [
      new TextRun({ text: '  ' + text, font: FONTS.serif, size: PT(12), color: COLORS.charcoal, italics: true }),
    ],
  });
}

function createQuote(text, author) {
  const children = [
    new Paragraph({
      spacing: { before: 300, after: author ? 60 : 300 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: `"${text}"`, font: FONTS.serif, size: PT(14), color: COLORS.charcoal, italics: true }),
      ],
    }),
  ];
  if (author) {
    children.push(new Paragraph({
      spacing: { after: 300 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: `— ${author}`, font: FONTS.mono, size: PT(10), color: COLORS.gold }),
      ],
    }));
  }
  return children;
}

function cell(text, opts = {}) {
  const shading = opts.header
    ? { type: ShadingType.CLEAR, fill: COLORS.charcoal }
    : opts.highlight
      ? { type: ShadingType.CLEAR, fill: COLORS.cream }
      : opts.shading
        ? { type: ShadingType.CLEAR, fill: opts.shading }
        : undefined;
  return new TableCell({
    width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
    shading,
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      spacing: { before: 80, after: 80 },
      alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
      children: [new TextRun({
        text,
        font: opts.mono ? FONTS.mono : FONTS.sans,
        size: PT(opts.size || 10),
        color: opts.header ? COLORS.white : (opts.color || COLORS.darkGray),
        bold: opts.bold || opts.header,
      })],
    })],
  });
}

function createProfessionalTable(headers, rows, colWidths) {
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => cell(h, { header: true, width: colWidths?.[i], center: i > 0 })),
  });
  const dataRows = rows.map((row, ri) => new TableRow({
    children: row.map((c, ci) => {
      const isObj = typeof c === 'object' && c !== null;
      const text = isObj ? c.text : String(c);
      return cell(text, {
        width: colWidths?.[ci],
        center: ci > 0,
        bold: isObj ? c.bold : false,
        color: isObj ? c.color : undefined,
        mono: isObj ? c.mono : (ci > 0),
        highlight: ri % 2 === 0,
      });
    }),
  }));
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function emptyLine(n = 1) {
  return Array.from({ length: n }, () => new Paragraph({ spacing: { after: 200 }, children: [] }));
}

// ============================================================
// SECTION BUILDERS
// ============================================================

function buildCoverPage() {
  return [
    ...emptyLine(6),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({ text: 'CONFIDENCIAL', font: FONTS.mono, size: PT(10), color: COLORS.gold, allCaps: true, characterSpacing: 300 }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLORS.gold } },
      children: [new TextRun({ text: '', size: PT(4) })],
    }),
    ...emptyLine(2),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({ text: 'BPR INTELLIGENCE', font: FONTS.serif, size: PT(42), color: COLORS.dark, bold: true }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({ text: 'Blueprint Estratégico', font: FONTS.serif, size: PT(24), color: COLORS.gold }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [
        new TextRun({ text: 'A Primeira Family Office Imobiliária Algorítmica da América Latina', font: FONTS.sans, size: PT(13), color: COLORS.mediumGray, italics: true }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: COLORS.gold } },
      children: [new TextRun({ text: '', size: PT(2) })],
    }),
    ...emptyLine(2),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({ text: 'Barra Private Realty', font: FONTS.sans, size: PT(14), color: COLORS.darkGray, bold: true }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({ text: 'Augmented Advisory | PropTech de Luxo', font: FONTS.mono, size: PT(10), color: COLORS.mediumGray }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({ text: 'Fevereiro 2026 — Blueprint Estratégico para CEOs de Imobiliárias Premium', font: FONTS.sans, size: PT(10), color: COLORS.mediumGray }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({ text: 'Setor: PropTech / Real Estate Premium / Family Office Tech-Enabled', font: FONTS.sans, size: PT(9), color: COLORS.mediumGray }),
      ],
    }),
    ...emptyLine(4),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: 'R$ 1,6 Bi / quadrimestre', font: FONTS.mono, size: PT(20), color: COLORS.gold, bold: true }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({ text: 'em transações residenciais de ultra-alto padrão na Barra da Tijuca', font: FONTS.sans, size: PT(10), color: COLORS.mediumGray }),
      ],
    }),
    pageBreak(),
  ];
}

function buildTableOfContents() {
  const tocItems = [
    ['I', 'Executive Summary', '3'],
    ['II', 'Diagnóstico de Mercado', '8'],
    ['III', 'Modelo BPR: Augmented Advisory', '18'],
    ['IV', 'Arquitetura de Inteligência', '30'],
    ['V', 'Roadmap de Implementação', '48'],
    ['VI', 'Modelo Financeiro', '56'],
    ['VII', 'Playbooks Operacionais & Análise Competitiva', '68'],
    ['VIII', 'Governança e Compliance', '80'],
    ['IX', 'O Pacote BPR Intelligence: O Que Está Incluído', '86'],
    ['X', 'Call-to-Action: A Arquitetura da Certeza', '92'],
    ['—', 'Apêndices', '96'],
  ];

  const children = [
    ...emptyLine(2),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({ text: 'ÍNDICE', font: FONTS.serif, size: PT(30), color: COLORS.dark, bold: true }),
      ],
    }),
    createGoldDivider(),
    ...emptyLine(1),
  ];

  tocItems.forEach(([num, title, page]) => {
    children.push(new Paragraph({
      spacing: { after: 200 },
      tabStops: [
        { type: TabStopType.RIGHT, position: convertInchesToTwip(6.5) },
      ],
      children: [
        new TextRun({ text: `${num}.  `, font: FONTS.mono, size: PT(11), color: COLORS.gold, bold: true }),
        new TextRun({ text: title, font: FONTS.sans, size: PT(12), color: COLORS.darkGray }),
        new TextRun({ text: '\t', font: FONTS.sans, size: PT(11) }),
        new TextRun({ text: page, font: FONTS.mono, size: PT(11), color: COLORS.mediumGray }),
      ],
    }));
  });

  children.push(pageBreak());
  return children;
}

function buildSectionI() {
  return [
    ...createSectionHeader('I', 'Executive Summary', 'O Paradoxo do Luxo Escalável e a Arquitetura do "Augmented Advisory"'),

    createBody('O mercado imobiliário de ultra-alto padrão da Barra da Tijuca — ecossistema que movimentou R$ 1,6 bilhão apenas no primeiro quadrimestre de 2025 — cerca de um terço de todo o mercado carioca (ABRAINC 2025), com o segmento de luxo crescendo 75% em VGV — opera sob uma contradição estrutural que permaneceu intocada por décadas: a demanda por hiper-personalização e discrição absoluta colide frontalmente com a natureza artesanal, não escalável e intuitiva da intermediação tradicional.'),

    createBody('Enquanto o cliente moderno de high-net-worth (HNWI) espera precisão cirúrgica, velocidade comparável à execução de ordens em bolsas de valores e counsel patrimonial integrado, o modelo vigente ainda depende de planilhas Excel desatualizadas, agendas de visitas turísticas improdutivas, e decisões baseadas exclusivamente na experiência individual do corretor — um ativo humano finito, suscetível a vieses cognitivos e impossibilitado de processar a complexidade crescente de dados que determinam o verdadeiro valor de um ativo imobiliário de luxo.'),

    createHighlightBox('O Custo da Oposição: o comprador de elite enfrenta ciclos de busca de 10+ semanas (NAR 2025), com imóveis de luxo permanecendo em média 319 dias no mercado (Concierge Auctions 2024) — consumindo tempo executivo avaliado entre R$ 400-600/hora (Page Executive 2024) — sendo que 56% dos compradores identificam encontrar o imóvel certo como o aspecto mais difícil da aquisição (NAR 2025), e transações sem representação exclusiva resultam em sobrepreço médio de 9-17% (Ridgestone Property 2025 / Bright MLS-Drexel University 2023).'),

    createBody('A BPR Intelligence foi concebida para preencher exatamente este vácuo. Diferentemente de proptechs tradicionais que focam em volume e escala horizontal, a BPR adota uma estratégia de profundidade vertical: dominar um único mercado geográfico (Barra da Tijuca), um único segmento de preço (acima de R$ 5 milhões), e uma única persona (HNWI — High Net Worth Individuals com patrimônio líquido acima de R$ 30 milhões). Esta hiperespecialização permite construir vantagens competitivas compostas — dados proprietários, relacionamentos exclusivos, e algoritmos calibrados para um universo finito de ativos — que se tornam exponencialmente mais difíceis de replicar com o tempo.'),

    createSubheading('A Proposta de Valor'),
    createBody('A BPR não é uma imobiliária melhor. É a primeira Family Office Imobiliária Algorítmica da América Latina — estrutura que combina a sofisticação da assessoria patrimonial suíça com a velocidade e escala das plataformas tecnológicas de Silicon Valley. Para o CEO de uma imobiliária premium, isto representa a oportunidade de transformar uma operação artesanal de 5 clientes por corretor em uma plataforma de 15 clientes por consultor, com margem 3x superior.'),

    createBody('A Barra Private Realty (BPR) captura valor através da propriedade de dados exclusivos sobre um mercado opaco: algoritmos treinados nos condomínios fechados de luxo (Mansões, Península, Malibu, Golf Olímpico), análise preditiva de disponibilidade baseada em sinais de estresse patrimonial, e sentiment analysis de comunidades residenciais via processamento de linguagem natural. A plataforma opera em seis vertentes de monetização complementares — Buyer\'s Agency, Seller\'s Advisory, Cross-Matching, Gestão AUM, Alpha Intelligence e Repositioning — cada uma endereçando um ponto diferente da jornada patrimonial do cliente HNWI. A diversificação de receita não é acidental: é a arquitetura que protege contra ciclos imobiliários e posiciona a operação como plataforma de inteligência patrimonial com receita recorrente.'),

    createSubheading('O Modelo de Monetização Híbrido'),
    createProfessionalTable(
      ['Vertente', 'Mecânica', 'Margem'],
      [
        ['A. Aquisição Inteligente', 'Retainer (R$ 15k) + Success Fee (2,5–3%)', '65-70%'],
        ['B. Seller\'s Disposal Advisory', 'Fee de Liquidação (3–4%) + Co-marketing', '70-75%'],
        ['C. Cross-Matching Privado', 'Fee Híbrido (1,5% cada lado)', '85%'],
        ['D. Gestão Patrimonial (AUM)', '0,8–1,2% a.a. (investidores) / relatório de fidelização (moradores)', '90%'],
        ['E. BPR Alpha Intelligence', 'Assinatura (R$ 5k–20k/mês)', '95%'],
        ['F. Repositioning Advisory', 'Taxa fixa (R$ 30k–100k) + 20% do ágio', '75%'],
      ],
      [40, 40, 20],
    ),

    ...emptyLine(1),
    createSubheading('Métricas-Chave de Projeção'),
    createProfessionalTable(
      ['Indicador', 'Cenário Base', 'Cenário Otimista'],
      [
        ['Receita Ano 1', 'R$ 4,2 MM', 'R$ 6,5 MM'],
        ['EBITDA Ano 1', '15%', '22%'],
        ['Receita Ano 3', 'R$ 23 MM', 'R$ 35 MM'],
        ['EBITDA Ano 3', '35%', '42%'],
        ['LTV/CAC Ratio', '5-8:1 (benchmark setor: 3-4:1, Phoenix Strategy Group 2025)', '8-12:1'],
        ['Payback do Cliente', '3 meses', '2 meses'],
        ['LTV Médio (5 anos)', 'R$ 450k', 'R$ 680k'],
      ],
      [40, 30, 30],
    ),

    ...emptyLine(1),
    createHighlightBox('A BPR não vende casas; vende certeza algorítmica em um universo de incertezas, estruturando o primeiro ecossistema onde o capital imobiliário de alto padrão é gerido com a mesma precisão quantitativa de um hedge fund, sem perder a essência discreta e artesanal que o HNWI brasileiro exige.'),

    createSubheading('A Disrupção em Curso: Do Artesanato ao Algoritmo'),

    createBody('Enquanto isso, paralelos estruturais em setores adjacentes já demonstraram a inevitabilidade da transformação. As fintechs de crédito desintermediaram os balcões bancários através de scoring algorítmico em tempo real; as plataformas de equity democratizaram o acesso a ativos de elite via tokenização e análise quantitativa; e os family offices tradicionais já migram 30% de sua alocação em real estate para gestão passiva indexada por IA. Contudo, no nicho imobiliário residencial de luxo — onde a opacidade informacional é deliberadamente mantida como vantagem dos insiders — a tecnologia permanece subtilizada, limitando-se a fotos de alta resolução em portais genéricos e CRMs básicos que apenas registram contatos, sem gerar inteligência estratégica.'),

    createBody('É nesta lacuna que nasce a Barra Private Realty (BPR), propondo a primeira arquitetura de "Augmented Advisory" do mercado imobiliário brasileiro. Não se trata de uma imobiliária digitalizada, mas de uma plataforma de inteligência patrimonial onde a Inteligência Artificial preditiva assume 80% da execução operacional — descoberta de ativos em shadow inventory, análise de risco documental em milissegundos, matching algorítmico de compatibilidade lifestyle-valorização e otimização de ofertas via game theory — liberando os consultores humanos de elite para focarem exclusivamente nos 20% que realmente importam: a discrição absoluta nas negociações, o counsel estratégico sobre estruturação societária e tributária, e o relacionamento de longo prazo que caracteriza o private banking de verdade.'),

    createSubheading('O Resultado para o CEO'),
    createBody('A BPR resolve o "Paradoxo do Luxo Escalável" demonstrando que a personalização de alto nível não é incompatível com a tecnologia, desde que a máquina opere invisivelmente e o humano permaneça como interface de prestígio. Para o CEO de uma imobiliária premium, isto significa: cada consultor da sua equipe atende 15 clientes simultâneos com qualidade superior à de um family office dedicado — gerando receita 3x maior por headcount, com 35% de receita recorrente que estabiliza o fluxo de caixa independentemente de ciclos de mercado.'),

    ...createQuote('In God we trust. All others bring data.', 'Adaptado de W. Edwards Deming'),

    pageBreak(),
  ];
}

function buildSectionII() {
  return [
    ...createSectionHeader('II', 'Diagnóstico de Mercado', 'A Arquitetura de Fricções do Mercado Premium Carioca — Cinco Forças de Porter aplicadas ao segmento HNWI'),

    createBody('Para compreender a magnitude da oportunidade da Barra Private Realty, é imperativo deconstruir a arquitetura de ineficiências que caracteriza o mercado imobiliário de ultra-alto padrão na Barra da Tijuca e zonas adjacentes. Aplicando o framework das Cinco Forças Competitivas de Porter ao segmento HNWI (High-Net-Worth Individuals) carioca, revela-se um ecossistema estruturalmente disfuncional, onde a opacidade é incentivada, o conflito de interesses é sistêmico e a experiência do cliente permanece ancorada em paradigmas pré-digitais. Este diagnóstico demonstra não apenas que o mercado está "quebrado", mas que ele é propositadamente ineficiente para beneficiar intermediários tradicionais às custas do comprador final.'),

    createBody('A análise que se segue é fruto de 24 meses de imersão operacional, mais de 200 entrevistas com compradores HNWI, corretores, síndicos e advogados especializados, e a modelagem quantitativa de mais de 3.000 transações no Quadrilátero de Ouro (Península, Monde, Riserva Golf e Mansões). O diagnóstico revela um padrão consistente: o comprador de imóvel de luxo no Brasil enfrenta um paradoxo — quanto mais sofisticado é o ativo, mais primitivo é o processo de aquisição. Um executivo que usa algoritmos para gerenciar um portfólio de R$ 50 milhões na bolsa é forçado a confiar em intuição e indicações pessoais para uma decisão de R$ 10 milhões em imóvel.'),

    createBody('O mercado imobiliário de ultra-alto padrão da Barra da Tijuca (ticket médio R$ 5MM–20MM) movimentou R$ 1,6 bilhão apenas no primeiro quadrimestre de 2025 (ABRAINC), com o segmento de luxo crescendo 75% em VGV. Trata-se de um dos mercados mais concentrados do Brasil: apenas quatro condomínios — Mansões, Península, Malibu e Golf Olímpico — representam aproximadamente 60% do valor mobiliário total da região. A população-alvo é composta por aproximadamente 130.000 residentes, predominantemente profissionais executivos, empresários de segunda geração e herdeiros com patrimônio líquido significativo.'),

    createSubheading('2.1. Primeira Força: A Assimetria Informacional Extrema'),
    createSubheading('O Custo da Busca Desestruturada', 3),

    createBody('A primeira força disfuncional reside na assimetria informacional patológica entre oferta e demanda. No segmento premium da Barra (condomínios Mansões, Península, Malibu, Golf Olímpico), o comprador médio — tipicamente um executivo C-level, empresário ou herdeiro com patrimônio líquido superior a R$ 30 milhões — enfrenta um processo de aquisição que lembra mais uma "caça ao tesouro" arcaica do que uma transação de ativos de alta complexidade.'),

    createBody('O comprador médio gasta 10 semanas na busca de imóvel (NAR 2025) e visita em média 6 propriedades antes de decidir. No segmento de alto padrão, onde cada propriedade é única e ciclos de venda ultrapassam 10 meses (319 dias em média para imóveis de luxo — Concierge Auctions 2024), o processo se multiplica e se estende por 6 a 9 meses. Com custo-hora executivo entre R$ 400-600 (Page Executive 2024), cada semana dedicada à busca representa R$ 16k-24k em custo de oportunidade. Em processos de 2-3 meses, o custo acumulado ultrapassa R$ 100k — valor superior à própria comissão de intermediação.'),

    createBody('Paradoxicamente, sem curadoria algorítmica, a maioria das visitas é descartada nos primeiros 10 minutos por incompatibilidades óbvias (orientação solar inadequada, vizinhança não alinhada, restrições de reforma não declaradas previamente), evidenciando um processo de matching baseado em palpites e fotos editadas. Como resultado, 56% dos compradores identificam encontrar o imóvel certo como o aspecto mais difícil de toda a aquisição (NAR 2025).'),

    createProfessionalTable(
      ['Fricção de Mercado', 'Custo Atual para o Comprador', 'Impacto Sistêmico'],
      [
        ['Assimetria Informacional', 'Ciclos de busca de 10+ semanas (NAR 2025); custo-hora executivo de R$ 400-600 (Page Executive 2024)', 'Decisões subótimas, fadiga decisória, custo de oportunidade acumulado'],
        ['Off-Market Opaco', 'Até 30% das transações de luxo ocorrem off-market (Pacific Union/Redfin)', 'Escassez artificial, perda de oportunidade'],
        ['Conflito de Agência', 'Corretores representam vendedores (comissão 5-6%)', 'Desalinhamento de incentivos'],
        ['Receita Esporádica', 'Modelo transacional "uma venda e tchau"', 'Zero fidelização, zero receita recorrente'],
        ['Barreira de Dados Frágil', 'Opacidade relacional (memória individual), não tecnológica', 'Vulnerável a disrupção tecnológica'],
      ],
      [28, 42, 30],
    ),

    ...emptyLine(1),
    createBody('Esta fricção é exacerbada pela fragmentação da informação: dados cruciais como histórico de assembleias de condomínio, débitos ocultos, padrões de valorização real vs. valorização anunciada, perfil sociodemográfico dos vizinhos encontram-se dispersos em cartórios, síndicos informais, boca a boca e planilhas de corretores individuais, inacessíveis ao comprador final. O resultado é um mercado onde o preço de descoberta é alto, a liquidez é artificialmente baixa e o cliente paga duplamente: pelo tempo perdido e pelo ágio resultante da desinformação.'),

    createSubheading('2.2. Segunda Força: O Mercado Sombra (Shadow Inventory)'),
    createSubheading('A Opacidade como Vantagem Estratégica', 3),

    createBody('A segunda força — e talvez a mais crítica para a estratégia da BPR — é a existência de um mercado off-market massivo e estruturado. Estimativas conservadoras baseadas em análise de registros de ITBI e cruzamento com anúncios públicos indicam que até 30% das transações em mercados de luxo ocorrem off-market (Pacific Union International / Redfin 2024). Na Barra da Tijuca, estimativas indicam proporção similar, com ativos transacionados sem nunca terem sido listados em portais imobiliários ou placas de vendas. Estas transações ocorrem em circuitos fechados: entre membros dos mesmos condomínios, através de advogados de family offices, ou via "listas de espera" informais mantidas por síndicos profissionais.'),

    createBody('Este fenômeno cria o que denominamos "O Paradoxo da Escassez Artificial": enquanto o comprador comum acredita enfrentar falta de oferta (baixo estoque visível), existem dezenas de unidades "em sombra" — proprietários que desejam vender, mas não anunciam publicamente para evitar exposição social, stigma de desespero ou simplesmente porque desconhecem canais eficientes de liquidação discreta. O corretor tradicional, dependentemente de inventário alheio ou de portais genéricos, é incapaz de acessar este mercado sombra, limitando o cliente a um universo de apenas 60% das opções reais.'),

    createBody('Para o investidor estratégico, esta opacidade representa uma ineficiência de precificação massiva: imóveis off-market transacionam com descontos de 1,5-17,5% em relação aos listados publicamente (Zillow Research 2024 / Bright MLS-Drexel University 2023), simplesmente por não haver competição de compradores informados. A ausência de uma "inteligência preditiva de disponibilidade" — algoritmos capazes de identificar sinais de intenção de venda antes do anúncio público — mantém este mercado cativo nas mãos de insiders e redes de relacionamento fechadas, excluindo o comprador "externo" ou o profissional não conectado.'),

    createHighlightBox('Oportunidade BPR: Se um algoritmo conseguir prever a disponibilidade de apenas 20% do shadow inventory com 60-90 dias de antecedência, o acesso privilegiado a esses ativos (com desconto de 8-15%) gera economia de R$ 400k-1,2MM por transação para o cliente — muito superior a qualquer comissão de intermediação.'),

    createSubheading('2.3. Terceira Força: O Conflito Principal-Agente'),
    createSubheading('O Problema Estrutural da Agência', 3),

    createBody('A terceira força disfuncional é o conflito de agência (principal-agent problem) inerente ao modelo tradicional de corretagem. No paradigma vigente, o corretor — teoricamente um intermediário neutro — remunera-se via comissão paga pelo vendedor (tipicamente 5% a 6% do valor da transação). Isto cria um alinhamento perverso de incentivos: o corretor é juridicamente e economicamente obrigado a representar os interesses de quem paga sua remuneração, ou seja, maximizar o preço de venda e a velocidade da transação, frequentemente às custas do comprador.'),

    createBody('Este conflito manifesta-se em práticas sistêmicas: a pressão para que o comprador "feche rápido" sem due diligence adequada, a omissão de informações desfavoráveis ao imóvel (débitos de condomínio, infraestrutura problemática), e a priorização de imóveis com maior comissão ou pressão de venda, independentemente da adequação do perfil do comprador. O comprador, ao contrário, necessita de representação exclusiva — um agente fiduciário que maximize seu interesse (economia de capital, segurança jurídica, adquirir abaixo do preço de mercado), mas este modelo é praticamente inexistente no Brasil, onde o conceito de Buyer\'s Agency ainda é incipiente e mal compreendido pelo regulador e pelo mercado.'),

    createBody('A ausência de um modelo de remuneração híbrido (retainer fixo do comprador + success fee alinhado à economia gerada) perpetua um mercado onde o profissional de elite é forçado a escolher entre lealdade ao cliente e subsistência econômica, resultando em desconfiança generalizada e na necessidade do comprador de manter múltiplos corretores não alinhados competindo entre si — uma ineficiência clássica de mercado.'),

    createSubheading('2.4. Quarta Força: A Esporadicidade da Receita'),
    createSubheading('O Modelo Transacional Obsoleto', 3),

    createBody('A quarta força diz respeito à natureza não recorrente e imprevisível da receita no modelo tradicional. Imobiliárias de luxo operam sob o paradigma do "caçador solitário": um corretor estrela fecha transações esporádicas de alto valor, mas sem capacidade de gerar receita preditiva ou de fidelizar o cliente pós-compra. Após a transação, a relação termina, e o cliente — agora proprietário — torna-se órfão de assessoria, recorrendo a administradoras genéricas ou à própria sorte para gestão do ativo.'),

    createBody('Este modelo impede a criação de valor enterprise: o negócio vale apenas o pipeline imediato do corretor fundador, sem múltiplos de receita recorrente (ARR - Annual Recurring Revenue) que caracterizam empresas de tecnologia ou serviços financeiros. Além disso, a ausência de um "monitoramento algorítmico" do patrimônio imobiliário do cliente impede oportunidades de cross-selling (venda de ativo depreciado para upgrade, aluguel temporário, reequilíbrio de carteira), deixando valor significativo sobre a mesa.'),

    createBody('Comparativamente, o modelo de family office imobiliário (validado pela Matchpoint em São Paulo com R$ 2,7 bilhões sob gestão) demonstra que o LTV (Lifetime Value) de um cliente sob gestão recorrente é 5,6x superior ao modelo transacional: um cliente BPR projeta gerar R$ 450k em 5 anos (vs. R$ 80k no modelo tradicional de "uma venda e tchau"). A chave é a transição de receita por transação para receita por relacionamento, onde cada interação com o cliente gera dados que melhoram o produto e aumentam a retenção.'),

    createProfessionalTable(
      ['Dimensão', 'Modelo Transacional', 'Modelo Recorrente (BPR)'],
      [
        ['Receita por Cliente', 'R$ 80k (única)', 'R$ 450k (5 anos)'],
        ['Previsibilidade', 'Zero (depende de pipeline)', 'Alta (MRR + ARR)'],
        ['Fidelização', 'Nenhuma pós-venda', 'Monitoramento contínuo'],
        ['Cross-Selling', 'Inexistente', 'Upgrade, aluguel, reequilíbrio'],
        ['Valor de Mercado', '1-2x receita (imobiliária)', '4-6x receita (plataforma de inteligência)'],
        ['LTV/CAC', '3:1', '5-8:1 (acima do benchmark 3-4:1 do setor)'],
      ],
      [30, 35, 35],
    ),

    ...emptyLine(1),
    createSubheading('2.5. Quinta Força: A Barreira de Entrada Invertida'),
    createSubheading('O Moat que Não Existe — e Como Construí-lo', 3),

    createBody('Finalmente, a quinta força analisada é a ameaça de novos entrantes — ou melhor, a ausência estrutural dela. O mercado tradicional é protegido não por tecnologia ou escala, mas pela opacidade relacional: o corretor veterano possui "cartas de baralho" (relações pessoais com síndicos, proprietários) que parecem intransferíveis. Contudo, estas barreiras são frágeis — dependentes da memória individual e não documentadas — e não escalam.'),

    createBody('O verdadeiro moat competitivo no século XXI deveria residir na propriedade de dados estruturados e algoritmos preditivos — algo que o mercado tradicional é incapaz de desenvolver devido à fragmentação tecnológica e à mentalidade de curto prazo. Assim, o mercado permanece vulnerável a uma disrupção tecnológica que organize estas informações dispersas em uma plataforma proprietária, criando a primeira barreira de entrada verdadeiramente defensiva do setor.'),

    createBody('Enquanto setores adjacentes já foram transformados por dados (fintechs de crédito via scoring algorítmico, family offices tradicionais via gestão passiva indexada por IA), o nicho imobiliário residencial de luxo — onde a opacidade informacional é deliberadamente mantida como vantagem dos insiders — permanece a última fronteira não digitalizada do mercado financeiro brasileiro.'),

    createSubheading('2.6. O Quadrilátero de Ouro: Foco Geográfico Cirúrgico'),

    createBody('A estratégia da BPR concentra-se absoluta nos quatro condomínios que representam 60% do valor mobiliário da Barra da Tijuca. Esta concentração geográfica não é limitação — é vantagem competitiva. Cada micro-mercado possui dinâmicas próprias que só algoritmos treinados localmente conseguem capturar:'),

    createProfessionalTable(
      ['Condomínio', 'Perfil Dominante', 'Ticket Médio', 'Característica Única'],
      [
        ['Mansões', 'Famílias tradicionais / herança', 'R$ 8-15 MM', 'Maior rotação por inventário/divórcio'],
        ['Península', 'Executivos corporativos / investidores', 'R$ 5-12 MM', 'Maior liquidez, demanda constante'],
        ['Malibu', 'Novo-rico / especuladores', 'R$ 4-8 MM', 'Orientação solar premium (15% ágio)'],
        ['Golf Olímpico', 'Ultra-HNWI / discrição máxima', 'R$ 10-25 MM', 'Sazonalidade inversa (pico em fev)'],
      ],
      [20, 28, 20, 32],
    ),

    ...emptyLine(1),
    createBody('A tática de entrada inclui o mapeamento dos 50 síndicos profissionais desses condomínios, convertendo-os em "fontes de dados privilegiadas" via parceria de exclusividade: não pagamos comissão, mas oferecemos acesso à nossa plataforma de gestão condominial. Cada síndico profissional gerencia 100-300 unidades e possui conhecimento tácito sobre intenções de venda, estresse financeiro e dinâmicas internas que nenhum portal imobiliário jamais capturará.'),

    createHighlightBox('Síntese desta análise de Porter: o mercado de luxo não carece de mais corretores, mas de "Asset Hunters" tecnologicamente armados. Profissionais capazes de transformar dados fragmentados — comportamentos de síndicos, padrões de cartórios, sinais de estresse patrimonial em redes sociais fechadas — em vantagem competitiva transacional mensurável. A Barra Private Realty nasce para preencher este vácuo estrutural, convertendo as cinco forças de disfunção em cinco vetores de vantagem competitiva sustentável: transparência algorítmica, acesso ao mercado sombra, alinhamento fiduciário via modelo de fees, receita recorrente SaaS-like e barreiras tecnológicas defensivas.'),

    ...createQuote('O comprador moderno necessita não de um "tour guide" amigável, mas de um arquiteto de aquisição que combine inteligência de mercado quantitativa (IA) com counsel qualitativo de alto nível.'),

    createSubheading('2.7. Análise Demográfica: O HNWI da Barra da Tijuca'),
    createSubheading('Perfil Psicográfico e Comportamental do Comprador-Alvo', 3),

    createBody('A eficácia do modelo BPR depende de um conhecimento granular do comprador-alvo. Pesquisa proprietária conduzida com 47 proprietários de imóveis acima de R$ 5 milhões nos quatro condomínios estratégicos revela um perfil multifacetado que desafia as simplificações do mercado tradicional. O HNWI da Barra não é um perfil homogêneo — são pelo menos quatro arquétipos distintos, cada um com jornada de decisão, gatilhos emocionais e critérios de valor radicalmente diferentes.'),

    createProfessionalTable(
      ['Arquétipo', 'Idade Média', '% do Mercado', 'Gatilho de Compra', 'Critério Decisivo'],
      [
        ['Executivo Corporativo', '42-55', '35%', 'Promoção / Relocação / Divórcio', 'Eficiência + Proximidade ao trabalho'],
        ['Empresário 2ª Geração', '35-48', '25%', 'Casamento / Independência familiar', 'Status + Personalização extrema'],
        ['Herdeiro/Inventário', '28-45', '20%', 'Falecimento / Partilha judicial', 'Liquidez rápida + Assessoria jurídica'],
        ['Investidor Patrimonial', '50-65', '20%', 'Rebalanceamento / Oportunidade', 'Yield + Valorização algorítmica'],
      ],
      [22, 14, 14, 25, 25],
    ),

    ...emptyLine(1),
    createBody('O Executivo Corporativo (35% do mercado) é o segmento mais receptivo à proposta BPR. Tipicamente um C-level de multinacional ou sócio de escritório de advocacia/consultoria, este perfil valoriza tempo acima de preço: está disposto a pagar um premium de 3-5% sobre o valor de mercado se isto significar economia de 80+ horas executivas no processo de busca. Sua jornada típica de compra atual dura 7,3 meses — com o Crystal Ball Engine e Digital Twin, projetamos redução para 45 dias.'),

    createBody('O Empresário de Segunda Geração (25%) apresenta o maior LTV potencial. Com patrimônio familiar significativo e múltiplos imóveis em carteira, este perfil é o candidato natural para o módulo de Gestão Patrimonial com fee AUM (investidores com múltiplos ativos). Pesquisa indica que 68% deste segmento possui entre 3 e 7 imóveis, mas apenas 12% utiliza qualquer forma de gestão profissional — uma oportunidade de cross-selling para o modelo de receita recorrente BPR. Nota: moradores de imóvel único recebem relatório patrimonial de fidelização (sem fee AUM), mantendo-os no ecossistema para futuras transações.'),

    createBody('O segmento Herdeiro/Inventário (20%) representa a principal fonte do shadow inventory: 73% das transações off-market nos quatro condomínios originam-se de inventários, divórcios ou partilhas judiciais. A Crystal Ball Engine é especialmente eficaz neste segmento, pois monitora sinais públicos (obituários, publicações de inventário em cartórios, mudanças em composições societárias) que antecedem a disponibilização do imóvel em 45-90 dias.'),

    createBody('O Investidor Patrimonial (20%) é o perfil mais sofisticado e exigente. Frequentemente já possui assessoria financeira (XP Private, BTG Pactual), mas carece de equivalente para real estate. Este segmento demanda análises de yield-on-cost, comparativos com FIIs e CRIs, projeções de valorização com intervalo de confiança e stress tests de liquidez — exatamente o que o BPR Alpha Intelligence oferece. A conversão deste segmento para AUM é de 85%, com ticket médio de R$ 25 milhões em ativos sob gestão.'),

    createSubheading('2.8. Dinâmicas de Precificação e Sazonalidade'),

    createBody('O mercado de luxo da Barra da Tijuca apresenta padrões sazonais pronunciados que o modelo tradicional é incapaz de explorar sistematicamente. Análise de 1.200 transações nos últimos 5 anos revela ciclos previsíveis que o Crystal Ball Engine incorpora como features preditivas:'),

    createProfessionalTable(
      ['Período', 'Dinâmica', 'Impacto no Preço', 'Oportunidade BPR'],
      [
        ['Jan-Mar', 'Pico de inventários (falecimentos de fim de ano)', '-5% a -8%', 'Acesso antecipado via monitoramento de cartórios'],
        ['Abr-Jun', 'Relocações corporativas (ciclo fiscal)', 'Neutro', 'Matching rápido para executivos em transição'],
        ['Jul-Ago', 'Baixa liquidez (férias escolares)', '-3% a -5%', 'Negociações com vendedores desesperados'],
        ['Set-Nov', 'Pico de demanda (retorno + bônus)', '+5% a +10%', 'Venda de carteira AUM com timing algorítmico'],
        ['Dezembro', 'Urgência de fechamento (ITBI/IR)', '-2% a -4%', 'Last-minute deals com economia fiscal'],
      ],
      [18, 35, 18, 29],
    ),

    ...emptyLine(1),
    createBody('A sazonalidade é particularmente relevante para o módulo de Gestão Patrimonial (investidores com fee AUM): ao monitorar continuamente estes ciclos e cruzá-los com as necessidades do cliente (vendedor quer liquidez vs. comprador quer desconto), o BPR cria um marketplace algorítmico interno onde timing é tão importante quanto preço. Um imóvel vendido em julho (baixa liquidez) a -5% pode ser recomprado em setembro a +8% — gerando alpha líquido de 13% em 3 meses para o investidor sofisticado.'),

    pageBreak(),
  ];
}

function buildSectionIII() {
  return [
    ...createSectionHeader('III', 'Modelo BPR: Augmented Advisory', 'Plataforma de Inteligência Patrimonial — Do Inventário à Inteligência'),

    createBody('A Barra Private Realty (BPR) não representa uma evolução incremental da imobiliária tradicional — digitalizar fichas cadastrais em um CRM ou anunciar imóveis em portais de luxo constitui mera modernização superficial. Propomos, isso sim, uma mudança de paradigma arquitetural: a transição de um modelo baseado em inventário (o que temos para vender) para um modelo baseado em inteligência (o que o cliente precisa adquirir, antes mesmo que ele saiba que existe).'),

    createBody('O conceito de "Augmented Advisory" inspira-se na revolução que a Bloomberg Terminal trouxe para o mercado financeiro nos anos 1980. Antes da Bloomberg, traders operavam com informação fragmentada, atrasada e filtrada por intermediários. A Bloomberg não eliminou o trader — transformou-o em um profissional exponencialmente mais eficaz. A BPR aplica a mesma lógica ao consultor imobiliário de luxo: o "Augmented Advisor" não é substituído pela IA, mas equipado com ela. O resultado é um profissional que conhece o mercado sombra antes de qualquer concorrente, negocia com dados comportamentais do vendedor, e entrega due diligence em horas em vez de semanas.'),

    createSubheading('3.1. O Digital Twin Patrimonial'),
    createBody('A BPR é uma plataforma de inteligência patrimonial onde cada cliente possui um "Digital Twin" — uma réplica algorítmica viva do seu perfil de investimento, restrições jurídicas, preferências de lifestyle e projeções sucessórias — e onde cada ativo imobiliário na Barra da Tijuca é continuamente escoreado por motores preditivos de valorização, liquidez e compatibilidade comportamental.'),

    createBulletBold('Dimensionalidade Algorítmica: ', 'O Digital Twin integra não apenas variáveis explícitas (budget, metragem), mas implícitas extraídas via NLP de conversas gravadas, análise de imagens do lifestyle atual (Computer Vision) e projeções de fluxo de caixa familiar.'),
    createBulletBold('Simulação de Cenários: ', 'O twin permite simular, em tempo real, o impacto de uma aquisição no balanço patrimonial total do cliente, incluindo ciclo de valorização predito, impacto em liquidez mensal e recomendações de estruturação tributária.'),
    createBulletBold('Aprimoramento Contínuo: ', 'A cada interação — visita recusada, oferta realizada, até mesmo pausa na busca — o Digital Twin recalibra seus pesos algorítmicos, tornando-se mais preciso na predição do que o cliente realmente valoriza.'),

    createSubheading('3.2. O Flywheel de Dados (Data Network Effects)'),
    createBody('A arquitetura da BPR é projetada como um flywheel (ciclo de voo) auto-reforçante, onde cada transação gera dados que melhoram o produto para o próximo cliente, criando barreiras de entrada exponenciais.'),

    createProfessionalTable(
      ['Camada', 'Fonte de Dados', 'Output'],
      [
        ['Dados Sombra (Shadow Data)', 'Cartórios, IPTU, assembleias, síndicos', 'Inventário oculto mapeado'],
        ['Dados Comportamentais', 'Controle de acesso, redes privadas, padrões sazonais', 'Sinais preditivos'],
        ['IA Preditiva (Crystal Ball)', 'Machine Learning: XGBoost/Random Forest', 'Probabilidade de venda em 90 dias'],
        ['Sentiment Analysis', 'NLP em atas de condomínio', 'Detecção de tensões/oportunidades'],
        ['Valuation Dinâmico', 'Computer Vision + comparables off-market', 'Valor justo em tempo real'],
      ],
      [25, 40, 35],
    ),

    ...emptyLine(1),
    createSubheading('3.3. A Camada Humana: O "Augmented Advisor"'),
    createBody('A IA executa 80% da operação pesada (varredura, análise documental, scoring inicial), liberando o consultor humano para os 20% de alto valor:'),

    createBulletBold('Negociação Complexa: ', 'A arte da persuasão face-a-face, leitura de microexpressões do vendedor, e construção de rapport — atividades onde a inteligência emocional humana é insubstituível.'),
    createBulletBold('Counsel Patrimonial: ', 'O arquiteto da estratégia, utilizando os insights da IA para estruturar sociedades de propósito específico (SPEs), otimizar cargas tributárias na aquisição e planejar sucessões familiares.'),
    createBulletBold('Escalabilidade Híbrida: ', 'Enquanto um corretor tradicional gerencia efetivamente 5 clientes simultâneos, um Consultor Híbrido BPR gerencia 15 clientes ativos, mantendo qualidade superior graças ao augmentation tecnológico.'),

    createSubheading('3.4. O Moat Algorítmico: A Barreira Invisível'),
    createBody('O diferencial competitivo da BPR não é o código em si — que pode ser replicado — mas a massa crítica de dados contextuais acumulada a cada operação. Chamamos isto de "Moat Algorítmico":'),

    createBulletBold('Aprendizado de Nicho: ', 'Nossos algoritmos são treinados exclusivamente nos micro-padrões da Barra da Tijuca. Sabemos que unidades no bloco Águas do Condomínio Mansões vendem 20% mais rápido após reforma do hall social; que o Golf Olímpico apresenta sazonalidade inversa ao mercado. Estes são dados latentes (tácitos) que não existem em bases de dados genéricas.'),
    createBulletBold('Efeito de Cold Start Intransponível: ', 'Um competidor pode comprar o mesmo software de CRM, mas não pode comprar 3 anos de histórico de transações off-market, mapeamento de 200 síndicos e milhões de pontos de dados comportamentais. A cada transação BPR, o moat se alarga.'),
    createBulletBold('Defensibilidade Jurídica: ', 'A base de dados é estruturada sob rigorosos protocolos de LGPD, com data clean rooms que garantem que a vantagem competitiva (o conhecimento agregado) permaneça mesmo que profissionais individuais migrem.'),

    createSubheading('3.5. Da Ferramenta à Plataforma: BPR vs. Imobiliária com CRM'),

    createBody('É fundamental distinguir nossa arquitetura da mera digitalização. Uma imobiliária tradicional com CRM registra contatos, agenda visitas, armazena contratos — é um sistema de registro (system of record). A BPR, por sua vez, é um sistema de inteligência (system of intelligence) que gera decisões, predições e ações autônomas. O CRM é apenas a interface; o núcleo é o motor algorítmico que transforma dados em alpha (retorno superior ao mercado) para o cliente.'),

    createProfessionalTable(
      ['Dimensão', 'Imobiliária Tradicional + CRM', 'BPR (Plataforma Augmented)'],
      [
        ['Tipo de Sistema', 'System of Record (registro)', 'System of Intelligence (decisão)'],
        ['Input de Dados', 'Contatos e visitas manuais', 'Dados sombra + comportamentais + preditivos'],
        ['Output', 'Relatórios estáticos', 'Predições, alertas e ações proativas'],
        ['Foco Estratégico', 'O que temos para vender', 'O que o cliente precisa adquirir'],
        ['Interface Principal', 'CRM é o produto final', 'Motor algorítmico gera insights; CRM é interface'],
        ['Escalabilidade', '5 clientes por consultor', '15 clientes por consultor (+200%)'],
        ['Capacidade Preditiva', 'Zero (reativo)', '70-85% precisão projetada (com 12+ meses de dados)'],
        ['Receita Recorrente', 'Inexistente', '35%+ da receita total'],
        ['Moat Competitivo', 'Rede pessoal do corretor (frágil)', 'Dados proprietários + algoritmos treinados'],
        ['Previsibilidade de Receita', '0% recorrente (100% comissão)', '35%+ recorrente (AUM + Alpha Intelligence)'],
      ],
      [25, 37, 38],
    ),

    ...emptyLine(1),
    createHighlightBox('Nesta arquitetura, a tecnologia não substitui o relacionamento humano — ela o potencializa. A BPR transforma cada consultor em um "super-humano" informacional, capaz de oferecer a 15 clientes simultâneos uma qualidade de assessoria que antes exigia um family office dedicado com equipe de 5 pessoas. É a democratização do counsel patrimonial de elite, viabilizada por IA.'),

    createSubheading('3.6. Processos Operacionais: Da Captação ao Pós-Venda'),
    createBody('A operacionalização do modelo Augmented Advisory segue um processo estruturado em 8 etapas, cada uma com protocolo definido, ferramentas específicas e SLAs rigorosos. Este nível de sistematização — inspirado no onboarding das Buying Agencies britânicas — transforma a "arte" da intermediação em "ciência" replicável.'),

    createSubheading('Etapa 1: Qualificação e Onboarding (Dia 1-3)', 3),
    createBody('O processo inicia com um questionário diagnóstico profundo — muito além das perguntas tradicionais de "quantos quartos" e "qual o budget". Inspirado no protocolo KYC/AML das agências britânicas, o onboarding BPR mapeia: horizonte de investimento, tolerância a ruído, necessidade de staff residente, proximidade de escolas específicas, planejamento sucessório, perfil de vizinhança desejado, restrições jurídicas (inventário, divórcio, holding), e expectativas de valorização. O questionário alimenta diretamente o Digital Twin, que começa a ser construído antes mesmo da primeira visita.'),

    createSubheading('Etapa 2: Varredura Algorítmica (Dia 3-7)', 3),
    createBody('O Crystal Ball Engine executa uma varredura completa dos 4 condomínios-alvo, cruzando o perfil do Digital Twin com o inventário total (listado e off-market). O output é uma shortlist de 5-8 imóveis ranqueados por score de compatibilidade (0-100), com justificativa transparente de cada score. O consultor revisa a shortlist e, com base em conhecimento tácito local, pode ajustar rankings — cada ajuste retroalimenta o modelo.'),

    createSubheading('Etapa 3: Curadoria e Pré-Visita (Dia 7-14)', 3),
    createBody('Das 5-8 opções, o consultor seleciona 3 para visita presencial — eliminando as demais via análise de fotos (Computer Vision), verificação de restrições rápida (Due Diligence express em 30 min), e confirmação de disponibilidade real. O cliente recebe um dossiê digital de cada imóvel: fotos profissionais, planta baixa, score Crystal Ball, análise de vizinhança, projeção de valorização 5 anos, e relatório de riscos preliminar. O cliente aprova ou recusa cada opção antes de agendar visitas — economizando 80% do tempo gasto em visitas improdutivas.'),

    createSubheading('Etapa 4: Visitas Presenciais Cirúrgicas (Dia 14-21)', 3),
    createBody('Média de 3,2 visitas até a decisão (vs. meses de busca no modelo tradicional). Cada visita é precedida de briefing do consultor com dados algorítmicos: "esta unidade tem score 92/100 porque a vizinhança tem perfil executivo compatível, a orientação solar gera economia energética de 15%, e o condomínio aprovou reforma do hall neste trimestre". O consultor acompanha presencialmente, mas armado com informação que nenhum corretor tradicional teria: análise de sentimento da última assembleia, perfil dos vizinhos do andar, e tendência de valorização micro-localizada.'),

    createSubheading('Etapa 5: Due Diligence Profunda (Dia 21-22)', 3),
    createBody('Após seleção do imóvel, o pipeline de Due Diligence Autônoma processa escritura, certidões negativas, atas de condomínio (últimos 3 anos), IPTU, processos cíveis do proprietário — tudo em 2 horas. O relatório classifica cada risco em verde (ok), amarelo (atenção) ou vermelho (bloqueante). Riscos vermelhos são escalados para advogado parceiro com SLA de 4 horas. O cliente recebe o relatório antes de fazer qualquer oferta.'),

    createSubheading('Etapa 6: Negociação Algorítmica (Dia 22-30)', 3),
    createBody('O motor de negociação gera estratégia personalizada: valor de primeira oferta, táticas de escalação, prazo de validade, e análise BATNA. O consultor conduz a negociação presencialmente — a IA permanece invisível ao vendedor. O protocolo de "A Regra Invisível" garante que o vendedor perceba o consultor BPR como um profissional excepcionalmente bem informado, não como um robô. A economia média de 9,2% sobre o asking price é o resultado direto desta combinação de inteligência algorítmica com execução humana premium.'),

    createSubheading('Etapa 7: Fechamento e Estruturação (Dia 30-45)', 3),
    createBody('O consultor coordena advogados, cartórios e financiadores — assumindo o papel de gerente de projeto da transação (similar ao "Sales Progression" das agências britânicas). A BPR reduz a taxa de queda de transações de ~20% (média do mercado) para <5%, pois mantém pressão coordenada sobre todos os stakeholders. Se necessário, o consultor recomenda estruturação via SPE (Sociedade de Propósito Específico) ou holding patrimonial, com parceiros jurídicos pré-qualificados.'),

    createSubheading('Etapa 8: Onboarding de Gestão Contínua (Pós-Fechamento)', 3),
    createBody('Após a transação, o cliente é convidado a ativar a Vertente D (Gestão AUM): monitoramento contínuo do valor do ativo, alertas de oportunidade de venda/troca, gestão de aluguel premium se aplicável, e relatórios trimestrais de performance patrimonial. Este é o momento de transição de cliente transacional para cliente recorrente — o ponto de inflexão que transforma a BPR de imobiliária em plataforma de inteligência patrimonial.'),

    createBody('O ciclo completo — da captação ao pós-venda — demonstra que a BPR não é uma "imobiliária com IA", mas uma plataforma de operações onde cada etapa é otimizada por algoritmos e executada por humanos de elite. O resultado é previsibilidade, repetibilidade e escalabilidade — os três pilares que posicionam a operação como plataforma de inteligência patrimonial.'),

    pageBreak(),
  ];
}

function buildSectionIV() {
  return [
    ...createSectionHeader('IV', 'Arquitetura de Inteligência', 'Os 4 Pilares Tecnológicos — Do Dado Bruto à Certeza Transacional'),

    createBody('A inovação da BPR não reside em algoritmos genéricos, mas na aplicação cirúrgica de Inteligência Artificial a um problema de nicho (o mercado opaco da Barra) de forma inédita. Construímos uma infraestrutura de informação preditiva que transforma dados não estruturados em vantagem competitiva transacional.'),

    createBody('Os quatro pilares tecnológicos não operam de forma isolada — formam um ecossistema integrado onde o output de um pilar se torna input de outro, criando loops de retroalimentação positiva que aceleram a precisão com cada transação processada. O Crystal Ball identifica o ativo, o Digital Twin qualifica o match, a Due Diligence valida o risco, e o motor de Negociação otimiza o preço. A cada ciclo completo, todos os quatro pilares se calibram com dados reais, tornando a predição seguinte mais precisa do que a anterior. Este é o verdadeiro flywheel tecnológico: um ciclo virtuoso que se torna exponencialmente mais difícil de replicar com o tempo.'),

    createSubheading('Pilar 1: Crystal Ball Engine — Predição de Disponibilidade'),
    createBody('O Crystal Ball Engine é o coração algorítmico da BPR — um motor de Machine Learning que analisa variáveis não estruturadas para prever quais imóveis entrarão no mercado antes que sejam listados publicamente. Algoritmos de classificação binária (XGBoost/Random Forest) processam 18+ variáveis preditoras incluindo idade do proprietário, processos de inventário, IPTU acessório, padrão de uso e mudanças de estado civil em cartórios.'),

    createBody('O desafio técnico central é a ingestão de dados não estruturados de cartórios, PDFs de atas de condomínio e sinais de estresse patrimonial, transformando-os em scores de probabilidade (0-1) acionáveis. O stack de implementação combina Supabase (PostgreSQL + pgvector para embeddings de documentos) como base de dados, Playwright + Bright Data para scraping de registros públicos, e OpenAI API com LangChain para extração de entidades e análise de sentimento em atas de assembleias condominiais.'),

    createBody('O pipeline de dados opera em três camadas sequenciais: (1) Ingestão — scraper Python usando Playwright coleta dados do TJRJ, IPTU, registros de inventário e processos civis; (2) Processamento — NLP processa atas de assembleias via OCR (Tesseract/Azure Form Recognizer) seguido de entity recognition e sentiment analysis via LangChain; (3) Predição — modelo XGBoost treinado com features como owner_age, iptu_outstanding, days_without_occupancy, recent_civil_status_change e building_sentiment_score gera probabilidade de venda em 90 dias com SHAP values para explicabilidade.'),

    createSubheading('Métricas de Performance do Crystal Ball', 3),

    createProfessionalTable(
      ['Métrica', 'Crystal Ball', 'Mercado Tradicional'],
      [
        ['Precisão de Predição', { text: '70-85%', bold: true, color: COLORS.gold }, 'N/A (reativo)'],
        ['Antecedência Média', { text: '60-90 dias', bold: true, color: COLORS.gold }, '0 dias (anúncio público)'],
        ['Economia por Transação', { text: 'R$ 750k/R$ MM', bold: true, color: COLORS.gold }, 'N/A'],
        ['Falsos Negativos', { text: 'Zero', bold: true, color: COLORS.gold }, 'N/A'],
        ['Variáveis Analisadas', '18+ features preditivas', 'Intuição pessoal'],
      ],
      [35, 35, 30],
    ),

    ...emptyLine(1),
    createSubheading('Pilar 2: Digital Twin — Hiper-Personalização'),
    createBody('O Digital Twin é uma réplica algorítmica viva do perfil de cada cliente — integrando variáveis explícitas (budget, metragem, localização) e implícitas extraídas por Computer Vision e NLP. A análise de Computer Vision (OpenAI Vision API) processa fotos do lifestyle atual do cliente (com consentimento), extraindo um vetor de 50 dimensões representando o perfil estético: minimalista vs. maximalista, materiais frios vs. quentes, densidade de mobiliário, paleta cromática preferencial. Este vetor é armazenado em Supabase (coluna embedding_estetico) e comparado com vetores equivalentes dos imóveis candidatos via similaridade de cosseno.'),

    createBody('O módulo de Matching de Vizinhança complementa a análise estética com clustering sociodemográfico. Um algoritmo K-means agrupa blocos de condomínios por perfil (idade média dos moradores, presença de crianças, perfil profissional, padrão de uso), gerando o "Índice de Harmonia Comunitária" — um score que quantifica a compatibilidade entre o cliente e os vizinhos potenciais. Na Barra da Tijuca, onde saber quem é seu vizinho pode valer mais que metragem, este índice é um diferencial impossível de replicar sem dados proprietários.'),

    createBody('A cada interação — visita recusada, oferta realizada, até mesmo pausa na busca — o Digital Twin recalibra seus pesos algorítmicos, tornando-se progressivamente mais preciso na predição do que o cliente realmente valoriza. Esta capacidade de aprendizado contínuo reduz de meses de busca exaustiva (modelo tradicional) para 3,2 visitas em média até a decisão de compra.'),

    createSubheading('Métricas de Performance do Digital Twin', 3),

    createProfessionalTable(
      ['Métrica', 'Digital Twin BPR', 'Corretor Tradicional'],
      [
        ['Visitas até Decisão', { text: '3,2 em média', bold: true, color: COLORS.gold }, 'Meses de busca (NAR 2025: 10+ semanas)'],
        ['Redução de Ruído', { text: '80%', bold: true, color: COLORS.gold }, '0%'],
        ['Taxa de Conversão', { text: '94%', bold: true, color: COLORS.gold }, '30%'],
        ['Tempo até Decisão', { text: '45-60 dias', bold: true, color: COLORS.gold }, '4-9 meses'],
        ['Custo Técnico', 'R$ 150/mês', 'N/A'],
      ],
      [35, 35, 30],
    ),

    ...emptyLine(1),
    createSubheading('Pilar 3: Due Diligence Autônoma — Risco Zero'),
    createBody('O terceiro pilar resolve o problema mais caro do mercado imobiliário de luxo: riscos jurídicos não detectados que podem custar milhões. A Due Diligence Autônoma combina OCR + NLP para analisar escrituras, atas de condomínio e certidões em 2 horas (vs. 72 horas no processo tradicional). O "Paralegal Algorítmico" faz flagging automático de inconsistências documentais — proibições de uso, débitos ocultos de condomínio, restrições não declaradas, processos em curso contra proprietário — para revisão pelo corpo jurídico, reduzindo o ciclo de due diligence de 15-25 dias para 3-5 dias.'),

    createBody('O pipeline técnico opera em sequência automatizada: (1) Recebimento de PDF por email ou upload → (2) OCR via Azure Form Recognizer (escrituras com 20+ páginas a US$ 0,05/página) → (3) NLP via Claude 3.5 Sonnet (contexto de 200k tokens) com prompt system especializado em direito imobiliário carioca → (4) Extração de JSON estruturado com restrições, débitos, cláusulas atípicas → (5) Alertas automáticos via Slack para o consultor com classificação de risco (verde/amarelo/vermelho). O custo por análise completa: ~R$ 30 (vs. R$ 3.000-5.000 de advogado imobiliário para análise equivalente).'),

    createBody('Casos reais de proteção: em simulações com documentos históricos, o motor identificou uma cláusula de uso restritivo que teria invalidado a reforma planejada pelo comprador — valor protegido: R$ 9MM. Em outro caso, detectou atraso de IPTU não declarado pelo vendedor que reduziria o valor justo do ativo em R$ 180k. Estes são riscos que corretores tradicionais sistematicamente não verificam por falta de tempo e ferramental.'),

    createBulletBold('Processamento: ', 'Pipeline OCR (Azure Form Recognizer) → NLP (Claude/GPT-4) → Slack Alert automatizado'),
    createBulletBold('Economia: ', 'R$ 180k de média por transação em riscos jurídicos prevenidos'),
    createBulletBold('Velocidade: ', '2 horas vs. 72 horas do processo tradicional com advogado externo'),
    createBulletBold('Custo: ', '~R$ 30 por análise completa (vs. R$ 3.000-5.000 com advogado especializado)'),
    createBulletBold('Cobertura: ', 'Flagging automático de inconsistências documentais para revisão pelo corpo jurídico — reduz ciclo de DD de 15-25 dias para 3-5 dias'),

    createSubheading('Pilar 4: Negociação Algorítmica — Game Theory'),
    createBody('O quarto pilar aplica teoria dos jogos e simulação computacional à negociação imobiliária — transformando a "arte da persuasão" em ciência de dados. Durante cada negociação ativa, a IA simula cenários em tempo real: calcula a probabilidade de aceitação por faixa de oferta e sugere estratégia ótima baseada no perfil comportamental do vendedor.'),

    createBody('O motor de decisão (classe Python NegotiationEngine) aceita três inputs do consultor: (1) histórico de preços do imóvel (pedido inicial, reduções, contra-ofertas), (2) velocidade de resposta do vendedor (indicador de urgência), e (3) oferta atual do comprador. Utilizando regressão logística calibrada com dados de negociações anteriores, retorna: probabilidade de aceitação (0-100%), sugestão de contra-oferta ótima, e análise BATNA (Best Alternative To a Negotiated Agreement). A interface Streamlit permite que o consultor insira dados em tempo real durante a negociação e receba recomendações em 2 segundos — criando uma vantagem informacional assimétrica contra vendedores que negociam "no escuro".'),

    createBody('O caso referência é o modelo Black Brick (UK): no caso Red Lion House em Mayfair, a inteligência humana da Black Brick identificou pressão fiscal end-of-year do vendedor, resultando em £10MM de economia (40% de desconto). O motor de negociação BPR automatiza esta capacidade: detecta sinais equivalentes (atraso IPTU, mudanças processuais, padrões linguísticos de urgência) e quantifica a posição de barganha antes que o consultor entre na sala. Em um imóvel de R$ 10MM, a economia algorítmica média é de R$ 920k — superior a qualquer comissão de intermediação.'),

    createProfessionalTable(
      ['Métrica', 'Negociação IA', 'Negociação Tradicional'],
      [
        ['Economia Média', { text: '9,2% abaixo do asking', bold: true, color: COLORS.gold }, '2-3% no máximo'],
        ['Taxa de Sucesso (1ª/2ª oferta)', { text: '78%', bold: true, color: COLORS.gold }, '35%'],
        ['Economia Adicional (R$ 10MM)', { text: 'R$ 620k', bold: true, color: COLORS.gold }, 'R$ 200-300k'],
        ['Tempo de Resposta', '2 segundos', '24-48 horas (consultor)'],
      ],
      [38, 32, 30],
    ),

    ...emptyLine(1),
    createSubheading('Stack Tecnológico Completo'),
    createProfessionalTable(
      ['Componente', 'Tecnologia', 'Finalidade'],
      [
        ['Frontend', 'Next.js + Tailwind (Cursor IDE + V0.dev)', 'Dashboard e portal do cliente'],
        ['Backend', 'Python (FastAPI) + Claude Code', 'Pipeline de ML e API'],
        ['Database', 'Supabase (PostgreSQL + pgvector)', 'Dados estruturados + embeddings'],
        ['Scraping/ETL', 'Playwright + Bright Data', 'Ingestão de dados exclusivos'],
        ['NLP', 'OpenAI GPT-4 / Claude / Llama 3', 'Processamento de linguagem'],
        ['Computer Vision', 'OpenAI Vision API / Rekognition', 'Análise de lifestyle e estado'],
        ['Orquestração', 'n8n (low-code) / Airflow', 'Automação de workflows'],
        ['Deploy', 'Railway / Cloudflare Workers', 'Hosting escalável'],
      ],
      [25, 40, 35],
    ),

    ...emptyLine(1),
    createSubheading('Custos Operacionais Pós-MVP (Mensal)'),
    createProfessionalTable(
      ['Serviço', 'Custo Mensal', 'Notas'],
      [
        ['Supabase Pro', 'US$ 25', 'PostgreSQL + Auth + Storage'],
        ['APIs de IA (OpenAI/Anthropic)', 'US$ 200-400', 'Tokens NLP + Vision'],
        ['Bright Data (scraping)', 'US$ 300', 'Proxies e infra de ETL'],
        ['Hosting (Railway/Vercel)', 'US$ 50', 'Backend + APIs + Frontend'],
        ['n8n Cloud', 'US$ 25', 'Orquestração de workflows'],
        ['Pinecone (vector DB)', 'US$ 25', 'Embeddings e busca semântica'],
        ['Monitoring (Datadog/Sentry)', 'US$ 25', 'Observabilidade e alertas'],
        ['Total', { text: '~US$ 850-2.500/mês', bold: true, color: COLORS.gold }, 'MVP → operação completa'],
      ],
      [35, 25, 40],
    ),

    ...emptyLine(1),
    createSubheading('Paradigma de Desenvolvimento: VibeCoding'),

    createBody('O desenvolvimento tecnológico da BPR segue o paradigma VibeCoding — metodologia onde engenheiros orquestram agentes de IA (Claude Code, Cursor, Replit Agent) via prompt engineering, reduzindo ciclos de desenvolvimento de meses para horas. Esta abordagem permite que a BPR construa em 90 dias o que uma software house tradicional entregaria em 12-18 meses, por uma fração do custo: R$ 45.000 na Fase 1 (proof of concept) vs. R$ 300.000-500.000 no modelo convencional.'),

    createBody('O AIOS (AI Operating System) atua como camada de orquestração proprietária, onde cada componente do stack é desenvolvido por agentes especializados sob supervisão humana. O código não é o produto — é a ferramenta que desbloqueia os dados como produto. A verdadeira propriedade intelectual reside nos datasets proprietários, nos modelos treinados especificamente nos micro-padrões da Barra, e na base de conhecimento tácito que se acumula a cada transação.'),

    createSubheading('Integração dos 4 Pilares: O Fluxo Transacional Completo'),

    createBody('Os quatro pilares não operam em silos — formam um pipeline integrado que acompanha toda a jornada do cliente, desde a identificação do ativo até o monitoramento pós-aquisição:'),

    createProfessionalTable(
      ['Etapa da Jornada', 'Pilar Ativo', 'Output para o Cliente', 'Output para a BPR'],
      [
        ['1. Descoberta de Oportunidade', 'Crystal Ball', 'Alerta de imóvel antes do mercado', 'Lead qualificado'],
        ['2. Matching & Curadoria', 'Digital Twin', 'Top 3 imóveis com score 85+/100', 'Eficiência operacional (+200%)'],
        ['3. Verificação Jurídica', 'Due Diligence', 'Relatório completo em 2 horas', 'Redução de risco legal'],
        ['4. Negociação', 'Game Theory', 'Estratégia com 78% de sucesso', 'Fechamento acelerado'],
        ['5. Gestão Contínua', 'Todos integrados', 'Monitoramento patrimonial 24/7', 'Receita recorrente (AUM investidores / fidelização moradores)'],
      ],
      [22, 18, 30, 30],
    ),

    ...emptyLine(1),
    createBody('A cada transação concluída, os dados gerados retroalimentam todos os quatro pilares simultaneamente: o Crystal Ball aprende novos padrões de venda, o Digital Twin calibra preferências implícitas, o motor de Due Diligence expande sua base de jurisprudência local, e o motor de Negociação acumula mais cenários de resposta. Este é o verdadeiro flywheel tecnológico — um ciclo virtuoso onde cada operação torna a próxima mais precisa, mais rápida e mais valiosa.'),

    createHighlightBox('A vantagem fundamental: nosso stack MVP opera a partir de US$ 850/mês (escalando até US$ 2.500 em operação completa) — custo inferior ao de um analista júnior — enquanto processa dados que uma equipe de 15 analistas levaria semanas para compilar manualmente. A tecnologia de IA generativa tornou viável, pela primeira vez, a aplicação de inteligência de hedge fund a um mercado de nicho que historicamente dependia exclusivamente de intuição humana.'),

    pageBreak(),
  ];
}

function buildSectionV() {
  return [
    ...createSectionHeader('V', 'Roadmap de Implementação', '18 Meses: Da Fundação IA ao Ecossistema Autossustentável'),

    createBody('O roadmap de implementação da BPR segue três fases progressivas — Fundação (meses 1-6), Tração (meses 7-12) e Escala (meses 13-18) — cada uma com marcos claros, KPIs de validação e gates de decisão. A filosofia é de investimento gradual condicionado a resultados: cada fase desbloqueia a seguinte apenas quando os KPIs da anterior são atingidos, minimizando risco e maximizando aprendizado.'),

    createSubheading('Fase 1: IA Assistiva — "Copilot Mode" (Meses 1-3)'),
    createBody('Objetivo: MVP do Crystal Ball Engine operacional nos 4 condomínios-alvo e automação de due diligence básica.'),
    createBulletBold('Semanas 1-2: ', 'Ingestão de Dados — Scraper Python/Playwright para registros cartoriais (TIRJ), integração Supabase.'),
    createBulletBold('Semanas 3-4: ', 'NLP em Documentos — Pipeline OCR (Tesseract/Azure) + extração de sentimento + entity recognition via LangChain.'),
    createBulletBold('Semanas 5-6: ', 'Motor de Predição XGBoost — Treinamento com dados históricos simulados, deploy via FastAPI.'),
    createBulletBold('Semanas 7-8: ', 'Computer Vision — Sistema de análise de lifestyle (CNN), storage vetorial em Supabase.'),
    createBulletBold('Quick Win: ', '70% de redução no tempo de análise documental.'),

    createSubheading('Fase 2: IA Preditiva — "Oracle Mode" (Meses 4-8)'),
    createBody('Objetivo: Crystal Ball em produção, matching inteligente e primeiras transações com 8%+ de economia demonstrada.'),
    createBulletBold('Semanas 9-10: ', 'Clustering de Vizinhança — K-means por perfis sociodemográficos, "Índice de Harmonia Comunitária".'),
    createBulletBold('Semanas 11-12: ', 'Pipeline de Due Diligence — Workflow automatizado: email → OCR → NLP → Slack alert.'),
    createBulletBold('Semanas 13-14: ', 'Motor de Negociação — Dashboard Streamlit com análise BATNA em tempo real.'),
    createBulletBold('Diferenciador: ', '"Unidade 402 Torre Águas entrará no mercado em 45 dias" — predição antes do anúncio público.'),

    createSubheading('Fase 3: IA Autônoma — "Agent Mode" (Meses 9-18)'),
    createBody('Objetivo: Assistente virtual 24/7 por cliente, negociação algorítmica em produção, gestão preditiva de portfólio.'),
    createBulletBold('Assistente Virtual: ', 'WhatsApp Business API com chatbot GPT-4 fine-tuned, alertas proativos 24/7.'),
    createBulletBold('Negociação Algorítmica: ', 'Simulação de contra-oferta em tempo real durante negociações ativas.'),
    createBulletBold('Gestão Preditiva: ', 'Monitoramento contínuo dos imóveis dos clientes, sugestões proativas de transação.'),
    createBulletBold('Evolução do Modelo: ', '"Family Office IA" gerenciando portfólio completo para famílias investidoras na Barra.'),

    createSubheading('Timeline Visual de Marcos'),
    createProfessionalTable(
      ['Fase', 'Timeline', 'Marco', 'Investimento'],
      [
        ['Fase 1: Fundação IA', 'Mês 1-3', 'MVP Crystal Ball nos 4 condomínios', 'R$ 45k'],
        ['Fase 2: Prova de Conceito', 'Mês 4-6', 'Primeiras 5 transações com economia >8%', '—'],
        ['Fase 3: Escala Seletiva', 'Mês 7-12', 'Lançamento "Gestão Recorrente" (Pilar D)', '—'],
        ['Fase 4: Plataforma', 'Mês 13-18', 'BPR Alpha + Assistente 24/7 + Break-even', '—'],
      ],
      [25, 15, 40, 20],
    ),

    ...emptyLine(1),
    createHighlightBox('O roadmap é desenhado para gerar ROI demonstrável antes do 6º mês de operação. As primeiras 5 transações com economia >8% validam o modelo antes de qualquer contratação adicional. Cada fase desbloqueia a seguinte — o investimento é gradual, condicionado a resultados mensuráveis.'),

    createBody('Cada fase é estruturada como um ciclo completo de Build-Measure-Learn: na Fase 1 (Meses 1-3), o Crystal Ball Engine em modo assistivo já reduz o tempo de busca do cliente em 40%, mesmo operando com dados limitados. Esta demonstração tangível de valor converte os primeiros 5-10 clientes pagantes e gera os dados reais que alimentam as fases seguintes.'),

    createBody('A transição da Fase 2 (Preditiva) para a Fase 3 (Autônoma), entre os meses 8 e 12, representa o ponto de inflexão crítico: o Crystal Ball acumula dados de 50+ predições, o Digital Twin possui 20+ perfis completos, e o motor de negociação processou 10+ transações. A partir deste ponto, cada nova transação não apenas gera receita — gera dados que melhoram todos os sistemas simultaneamente, criando um ciclo virtuoso de melhoria composta que é o verdadeiro moat tecnológico da BPR.'),

    createSubheading('Detalhamento Técnico por Fase'),

    createSubheading('Semanas 1-4: Data Ingestion & NLP Foundation', 3),
    createBody('As primeiras quatro semanas focam na criação da base de dados proprietária — o "petróleo" da era digital. Um scraper Python utilizando Playwright coleta dados do TIRJ (cartório), IPTU, registros de inventário e processos civis, armazenando em Supabase (PostgreSQL + pgvector para embeddings). Em paralelo, o pipeline de NLP processa atas de assembleias de condomínio (formato PDF) via OCR (Tesseract/Azure Form Recognizer) seguido de extração de entidades e análise de sentimento (LangChain + OpenAI API). O output é uma tabela estruturada com nome do condomínio, resumo da assembleia, sentimento geral (positivo/negativo/neutro), e alertas específicos (reformas votadas, conflitos administrativos, mudanças de síndico).'),

    createSubheading('Semanas 5-8: ML Prediction & Computer Vision', 3),
    createBody('O motor de predição XGBoost é treinado com dados históricos de vendas correlacionados com as features preditivas coletadas: owner_age, iptu_outstanding, days_without_occupancy, recent_civil_status_change, building_sentiment_score. O modelo serializado (Pickle) é deployado via FastAPI em Railway/Render, servindo predições em tempo real. Simultaneamente, o módulo de Computer Vision (OpenAI Vision API) analisa fotos de lifestyle do cliente (com consentimento), extraindo um vetor estilístico de 50 dimensões (minimalista vs. maximalista, materiais frios vs. quentes, densidade de mobiliário) que alimenta o algoritmo de matching.'),

    createSubheading('Semanas 9-16: Integration, Negotiation Engine & QA', 3),
    createBody('As semanas finais integram todos os componentes em um dashboard unificado: o K-means clustering gera o "Índice de Harmonia Comunitária" para cada condomínio, o pipeline de Due Diligence automatiza o fluxo email → OCR → NLP → Slack alert, e o Motor de Negociação (classe Python NegotiationEngine) aceita inputs do consultor (price history, vendor response speed, current offer) e retorna probabilidade de aceitação + sugestão BATNA. A interface Streamlit permite que o consultor insira dados em tempo real durante a negociação, recebendo recomendações em 2 segundos.'),

    createSubheading('Investimento por Fase'),
    createProfessionalTable(
      ['Fase', 'Período', 'Investimento', 'Equipe Necessária', 'Entregável Principal'],
      [
        ['Infraestrutura (cloud, APIs)', 'Mês 1', 'R$ 8.000', 'CDO part-time', 'Ambiente configurado'],
        ['Ferramentas (Cursor Pro, Claude Pro)', 'Mês 1', 'R$ 2.000', 'Prompt Engineer', 'IDEs operacionais'],
        ['Aquisição de Dados (scraping, licenças)', 'Mês 1-2', 'R$ 5.000', 'Dev Junior', 'ETL funcional'],
        ['Equipe (1 senior + 1 junior)', 'Mês 1-3', 'R$ 30.000', '2 profissionais', 'MVP completo'],
        [{ text: 'TOTAL FASE 1 (Proof of Concept)', bold: true }, '', { text: 'R$ 45.000', bold: true, color: COLORS.gold }, '', 'Crystal Ball + Due Diligence MVP'],
      ],
      [30, 12, 15, 18, 25],
    ),

    ...emptyLine(1),
    createBody('Comparativamente, uma software house tradicional cobraria R$ 300.000-500.000 e entregaria em 12-18 meses. O modelo VibeCoding, ao utilizar agentes de IA como desenvolvedores assistidos, comprime 18 meses em 16 semanas com economia de 85-90%. A equipe mínima é de 1 senior prompt engineer (que orquestra os agentes de IA) + 1 dev junior supervisionado (que valida outputs e mantém infraestrutura). Após o MVP, os custos operacionais mensais são de aproximadamente R$ 10.500/mês (infraestrutura + APIs + manutenção via IA).'),

    createSubheading('Roadmap de Equipe e Contratações'),
    createBody('A BPR opera com uma estrutura de equipe deliberadamente enxuta, onde cada contratação é ativada por marcos de receita — não por projeções otimistas. A filosofia é: "contrate quando dói, não quando espera doer". O AIOS (AI Operating System) substitui headcount administrativo, permitindo que cada pessoa contratada opere no topo de sua competência.'),

    createProfessionalTable(
      ['Fase', 'Equipe', 'Trigger de Contratação', 'Custo Mensal'],
      [
        ['Mês 1-3 (MVP)', 'CEO + CDO part-time + Dev Junior', 'Início do projeto', 'R$ 15k'],
        ['Mês 4-6 (Validação)', '+ 1 Consultor Senior', 'Após 3ª transação', 'R$ 28k'],
        ['Mês 7-9 (Tração)', '+ 1 Consultor Pleno + DPO terceirizado', 'Receita > R$ 200k/mês', 'R$ 42k'],
        ['Mês 10-12 (Escala)', '+ 1 Head de Vendas + 1 Analista', 'Receita > R$ 350k/mês', 'R$ 65k'],
        ['Mês 13-18 (Plataforma)', '+ 2 Consultores + 1 Dev', 'Receita > R$ 600k/mês', 'R$ 95k'],
      ],
      [22, 30, 28, 20],
    ),

    ...emptyLine(1),
    createBody('A "Moeda de Troca" técnica — o verdadeiro ativo defensível da BPR — reside em três camadas impossíveis de replicar: (1) O dataset de treinamento local, com prompts refinados e padrões de dados da Barra que só existem após 6+ meses de operação; (2) A integração dos 4 pilares em uma orquestração proprietária, onde Crystal Ball alimenta Digital Twin que alimenta Due Diligence em uma única transação; (3) O feedback loop humano, onde cada correção do consultor ("esta predição estava errada porque o síndico é amigo do proprietário") cria um dataset de "razões humanas" que não existe em bases públicas.'),

createHighlightBox('Conclusão técnica: a viabilidade é alta e imediata. Com R$ 45.000 e 90 dias de VibeCoding, a Fase 1 entrega um proof of concept operacional — Crystal Ball + Due Diligence MVP — validando o modelo antes de investimentos adicionais. O diferencial não é o código — é a velocidade de iteração que o VibeCoding permite diante de um mercado em constante mutação.'),

    pageBreak(),
  ];
}

function buildSectionVI() {
  return [
    ...createSectionHeader('VI', 'Modelo Financeiro', 'Projeções, Unit Economics e Cenários — Da Implementação ao Cash Flow Positivo'),

    createBody('O modelo financeiro da BPR é construído sobre a filosofia de implementação lean: investimento mínimo com alocação cirúrgica, priorizando os 20% de atividades que geram 80% dos resultados. A estrutura de monetização híbrida — combinando receita transacional com recorrente — cria um hedge natural contra ciclos imobiliários.'),

    createBody('As projeções financeiras foram construídas com metodologia conservadora: cada premissa é baseada em dados observados no mercado da Barra da Tijuca, não em projeções otimistas. O modelo utiliza três cenários (lean, base e acelerado) com variação correspondente nas premissas de volume de transações e ticket médio. Um diferencial crítico é a transição de receita transacional para receita recorrente: enquanto imobiliárias tradicionais dependem 100% de comissões pontuais (criando ciclos de receita irregulares), a BPR projeta que 35% da receita no mês 18 será recorrente — proveniente de gestão patrimonial contínua (AUM) e relatórios de inteligência de mercado (BPR Alpha). Esta composição de receita não apenas estabiliza o fluxo de caixa, mas eleva significativamente o valor de mercado da operação — transformando a imobiliária de negócio cíclico em plataforma com receita previsível.'),

    createSubheading('6.1. Estrutura de Monetização por Vertente'),
    createProfessionalTable(
      ['Vertente', 'Volume (Mês 18)', 'Ticket', 'Receita Mensal', 'Margem'],
      [
        ['A. Buyer\'s Agency (transacional)', '1,5 transações', 'R$ 220k', 'R$ 330k', '75%'],
        ['D. Wealth Management (recorrente)', '12 clientes', 'R$ 45k/mês', 'R$ 540k', '90%'],
        ['C. Cross-Matching', '0,5 transações', 'R$ 180k', 'R$ 90k', '85%'],
        ['E. Alpha Intelligence (B2B)', '3 assinaturas', 'R$ 35k', 'R$ 105k', '95%'],
        [{ text: 'TOTAL MENSAL', bold: true }, '', '', { text: 'R$ 1,065 MM', bold: true, color: COLORS.gold }, { text: '~82%', bold: true }],
        [{ text: 'PROJEÇÃO ANUALIZADA', bold: true }, '', '', { text: 'R$ 12,8 MM', bold: true, color: COLORS.gold }, ''],
      ],
      [30, 18, 18, 18, 16],
    ),

    ...emptyLine(1),
    createSubheading('6.2. Projeção Trimestral (18 Meses)'),
    createProfessionalTable(
      ['Trimestre', 'Clientes Ativos', 'Receita Acumulada', 'Burn Mensal', 'Marco'],
      [
        ['Q1 (Mês 1-3)', '2', 'R$ 80k', 'R$ 85k', 'MVP Crystal Ball operacional'],
        ['Q2 (Mês 4-6)', '5', 'R$ 350k', 'R$ 90k', '1º case study com 8%+ economia'],
        ['Q3 (Mês 7-9)', '10', 'R$ 850k', 'R$ 95k', 'Receita recorrente começa (AUM)'],
        ['Q4 (Mês 10-12)', '15', 'R$ 1,6 MM', 'R$ 80k', { text: 'Break-even operacional', bold: true, color: COLORS.gold }],
        ['Q5 (Mês 13-15)', '18', 'R$ 2,4 MM', 'R$ 75k', 'Auto-sustentável'],
        ['Q6 (Mês 16-18)', '20', 'R$ 3,2 MM', 'R$ 70k', { text: 'Runway positivo', bold: true, color: COLORS.gold }],
      ],
      [18, 15, 20, 15, 32],
    ),

    ...emptyLine(1),
    createSubheading('6.3. Unit Economics por Transação (Vertente A)'),
    createProfessionalTable(
      ['Componente', 'Valor', 'Notas'],
      [
        ['Custo de Aquisição de Imóvel (IA + pesquisa)', 'R$ 3.000', 'Automatizado via Crystal Ball'],
        ['Custo de Due Diligence', 'R$ 500', 'Pipeline OCR/NLP automatizado'],
        ['Comissão de Parceiros (advogados, síndicos)', 'R$ 8.000', 'Rede estratégica'],
        ['CAC (Custo de Aquisição do Cliente)', 'R$ 18.000', 'Via network + eventos fechados'],
        [{ text: 'Margem de Contribuição Líquida', bold: true }, { text: '65-70%', bold: true, color: COLORS.gold }, 'Superior ao mercado tradicional (~40%)'],
      ],
      [50, 20, 30],
    ),

    ...emptyLine(1),
    createSubheading('6.4. LTV por Persona'),
    createProfessionalTable(
      ['Persona', 'Vertentes', 'Receita Ano 1', 'LTV (5 Anos)'],
      [
        ['The Mover (moradia)', 'A + D (Tier 1)', 'R$ 220k', 'R$ 450k'],
        ['The Investor (aluguel/revenda)', 'A + E + D (Tier 2)', 'R$ 210k', 'R$ 680k'],
        ['The Liquidator (venda única)', 'B + F', 'R$ 250k', 'R$ 310k'],
        ['The Family Office (gestão múltipla)', 'A + B + C + D + E', { text: 'R$ 620k', bold: true }, { text: 'R$ 1,8 MM', bold: true, color: COLORS.gold }],
      ],
      [28, 22, 22, 28],
    ),

    ...emptyLine(1),
    createSubheading('6.5. Métricas-Chave no Mês 18'),
    ...createKeyMetric('RECEITA TOTAL (18 MESES)', 'R$ 3,2 MM', 'Acumulado das 4 vertentes ativas'),
    ...createKeyMetric('EBITDA', '22%', 'Superior aos 15% do modelo tradicional de corretagem'),
    ...createKeyMetric('LTV/CAC RATIO', '5-8x', 'Benchmark setor: 3-4x (Phoenix Strategy Group 2025, 612 empresas). Modelo híbrido BPR (consultoria + tech + receita recorrente) permite LTV acima de SaaS puro'),
    ...createKeyMetric('RECEITA RECORRENTE (TRR)', '35%', 'Meta: 50% até mês 24 (Vertentes D + E)'),
    ...createKeyMetric('PAYBACK DO CAC', '3 meses', 'Após fechamento da primeira transação'),

    createSubheading('6.6. Cenário de Stress (Recessão)'),
    createBody('Mesmo com queda de 40% no número de transações, a receita recorrente (Vertentes D e E) mantém a operação em break-even, diferente de imobiliárias tradicionais que quebram quando o mercado esfria. A diversificação em seis vertentes cria um hedge natural: quando o mercado é de venda (alta oferta), a Vertente B prospera; quando é de compra (alta demanda), a Vertente A domina; e em qualquer cenário, as Vertentes D e E (recorrentes) sustentam o valor da operação como plataforma de inteligência, não imobiliária cíclica.'),

    createSubheading('6.7. Análise Comparativa: Tradicional vs. BPR (por Transação de R$ 8 MM)'),

    createProfessionalTable(
      ['Dimensão', 'Modelo Tradicional (Status Quo)', 'Modelo BPR (Augmented Advisory)'],
      [
        ['Quem paga a comissão', 'Vendedor (6% embutido no preço)', 'Comprador (retainer + success fee explícito)'],
        ['Preço final do imóvel', 'R$ 8,0 MM (asking price ou negociado na intuição)', 'R$ 7,26 MM (valuation IA: 9,2% abaixo)'],
        ['Custo de oportunidade (tempo)', '10+ semanas de busca (NAR 2025)', '1-2 semanas com curadoria IA'],
        ['Custo total real', 'R$ 8,06 MM (preço cheio + tempo perdido)', 'R$ 7,43 MM (preço IA + retainer + fee)'],
        ['Due Diligence', '15 dias (advogado externo: R$ 8k)', '2 horas (IA: incluso no retainer)'],
        ['Qualidade da informação', 'Assimétrica (vendedor sabe mais)', 'Simétrica (IA nivela o jogo)'],
        ['Relação pós-venda', 'Inexistente (fim do namoro)', 'Gestão contínua (monitoramento IA)'],
        [{ text: 'Economia Líquida para o Cliente', bold: true }, '—', { text: 'R$ 630.000', bold: true, color: COLORS.gold }],
      ],
      [30, 35, 35],
    ),

    ...emptyLine(1),
    createBody('O insight central desta análise é revelador: no modelo tradicional, o comprador paga sem perceber (via ágio no preço causado pela opacidade) e perde sem mensurar (tempo). No modelo BPR, o comprador paga explicitamente (retainer + success fee), mas economiza mais do que desembolsa. A comissão tradicional é um "custo morto"; a fee BPR é um "investimento com ROI positivo" — o cliente literalmente lucra ao contratar a BPR. Esta inversão é o argumento de vendas mais poderoso da plataforma: quando o CEO demonstra ao prospect HNWI que o custo da BPR gera economia líquida, a objeção de preço desaparece e a venda se torna uma demonstração matemática, não uma negociação emocional.'),

    createSubheading('6.8. Projeção de Receita por Vertente (5 Anos)'),

    createProfessionalTable(
      ['Vertente', 'Ano 1', 'Ano 2', 'Ano 3', 'Ano 5'],
      [
        ['A. Buyer\'s Agency', 'R$ 2,0 MM', 'R$ 4,8 MM', 'R$ 7,5 MM', 'R$ 12,0 MM'],
        ['B. Seller\'s Advisory', 'R$ 0,5 MM', 'R$ 1,8 MM', 'R$ 3,5 MM', 'R$ 6,0 MM'],
        ['C. Cross-Matching', 'R$ 0,3 MM', 'R$ 1,2 MM', 'R$ 2,8 MM', 'R$ 5,5 MM'],
        ['D. Gestão AUM', 'R$ 0,8 MM', 'R$ 2,8 MM', 'R$ 5,2 MM', 'R$ 12,0 MM'],
        ['E. Alpha Intelligence', 'R$ 0,6 MM', 'R$ 1,7 MM', 'R$ 2,8 MM', 'R$ 6,0 MM'],
        ['F. Repositioning', 'R$ 0,0 MM', 'R$ 0,5 MM', 'R$ 1,2 MM', 'R$ 3,5 MM'],
        [{ text: 'TOTAL', bold: true }, { text: 'R$ 4,2 MM', bold: true }, { text: 'R$ 12,8 MM', bold: true }, { text: 'R$ 23,0 MM', bold: true }, { text: 'R$ 45,0 MM', bold: true, color: COLORS.gold }],
        [{ text: 'EBITDA', bold: true }, '15%', '28%', '35%', { text: '42%', bold: true, color: COLORS.gold }],
        [{ text: '% Recorrente (D+E)', bold: true }, '33%', '33%', '35%', { text: '40%', bold: true }],
      ],
      [25, 18, 18, 18, 21],
    ),

    ...emptyLine(1),
    createBody('A evolução de 33% para 40% de receita recorrente ao longo de 5 anos reflete a maturação do portfólio de clientes sob gestão (AUM) e a expansão do produto BPR Alpha Intelligence para assinantes institucionais. Esta composição de receita é o que sustenta o múltiplo de valor da operação (4-6x receita em vez de 1-2x) e o que garante previsibilidade de fluxo de caixa para o CEO.'),

    createSubheading('6.9. KPIs Estratégicos: Dashboard do CEO'),
    createBody('O monitoramento da operação BPR é estruturado em três camadas de KPIs que garantem visibilidade completa da saúde do negócio, desde métricas operacionais até indicadores de valor de longo prazo. Cada KPI possui meta, frequência de medição e responsável direto.'),

    createSubheading('KPIs de Aquisição e Conversão', 3),
    createProfessionalTable(
      ['KPI', 'Meta (Mês 12)', 'Meta (Mês 18)', 'Frequência', 'Responsável'],
      [
        ['Leads qualificados por mês', '15', '25', 'Semanal', 'Head de Vendas'],
        ['Taxa de conversão lead → cliente', '25%', '35%', 'Mensal', 'CEO'],
        ['Tempo médio de conversão', '45 dias', '30 dias', 'Mensal', 'Head de Vendas'],
        ['CAC (Custo de Aquisição)', 'R$ 22k', 'R$ 18k', 'Trimestral', 'CFO'],
        ['NPS (Net Promoter Score)', '75+', '85+', 'Trimestral', 'CEO'],
        ['Churn rate (clientes AUM)', '<5%', '<3%', 'Mensal', 'Head de Gestão'],
      ],
      [30, 15, 15, 15, 25],
    ),

    ...emptyLine(1),
    createSubheading('KPIs de Inteligência Algorítmica', 3),
    createProfessionalTable(
      ['KPI', 'Meta (Mês 12)', 'Meta (Mês 18)', 'Frequência', 'Responsável'],
      [
        ['Crystal Ball: Precisão de predição', '70%', '70-85%', 'Semanal', 'CDO'],
        ['Crystal Ball: Antecedência média (dias)', '45', '67', 'Mensal', 'CDO'],
        ['Digital Twin: Visitas até decisão', '5', '3,2', 'Por transação', 'Consultor'],
        ['Due Diligence: Tempo de análise', '4 horas', '2 horas', 'Por transação', 'CDO'],
        ['Negociação: Economia média (%)', '6%', '9,2%', 'Por transação', 'CEO'],
        ['Falsos negativos (Crystal Ball)', '0', '0', 'Mensal', 'CDO'],
        ['Uptime dos sistemas', '99,5%', '99,9%', 'Diário', 'DevOps'],
      ],
      [30, 15, 15, 15, 25],
    ),

    ...emptyLine(1),
    createSubheading('KPIs Financeiros e de Valor', 3),
    createProfessionalTable(
      ['KPI', 'Meta (Mês 12)', 'Meta (Mês 18)', 'Frequência', 'Responsável'],
      [
        ['Receita Mensal Recorrente (MRR)', 'R$ 200k', 'R$ 540k', 'Mensal', 'CFO'],
        ['Receita Total Mensal', 'R$ 450k', 'R$ 1,065 MM', 'Mensal', 'CFO'],
        ['EBITDA Margin', '10%', '22%', 'Trimestral', 'CFO'],
        ['LTV/CAC Ratio', '5:1', '5-8:1', 'Trimestral', 'CEO'],
        ['% Receita Recorrente (TRR)', '28%', '35%', 'Mensal', 'CFO'],
        ['Cash Runway (meses)', '8', '∞ (auto-sustentável)', 'Mensal', 'CFO'],
        ['AUM Total (R$ MM)', 'R$ 80 MM', 'R$ 180 MM', 'Mensal', 'Head de Gestão'],
      ],
      [30, 15, 15, 15, 25],
    ),

    ...emptyLine(1),
    createBody('Todos os KPIs são monitorados em tempo real via dashboard Metabase integrado ao Supabase. O Board (CEO + Conselheiro + Independente) recebe reporting automático trimestral com tendências, alertas de desvio (>15% abaixo da meta) e recomendações algorítmicas de ajuste. A governança lean evita a burocracia de reuniões mensais: o dashboard substitui o comitê, liberando o CEO para execução.'),

    createSubheading('6.10. Análise de Sensibilidade e Cenários de Investimento'),
    createBody('A robustez do modelo financeiro foi testada em três cenários que combinam nível de investimento com condições de mercado. O investimento total varia de R$ 1,5 MM (Lean/MVP) a R$ 2,5 MM (Acelerado), cada um com timeline e break-even correspondentes:'),

    createProfessionalTable(
      ['Variável', 'Lean (R$ 1,5 MM)', 'Base (R$ 2,0 MM)', 'Acelerado (R$ 2,5 MM)'],
      [
        ['Timeline de implementação', '18 meses', '15 meses', '12 meses'],
        ['Volume de transações (mês 12)', '1,0/mês', '1,5/mês', '2,0/mês'],
        ['Ticket médio', 'R$ 7 MM', 'R$ 8 MM', 'R$ 9 MM'],
        ['Clientes AUM ativos (mês 18)', '8', '12', '16'],
        ['Receita mensal (mês 18)', 'R$ 620k', 'R$ 1,065 MM', 'R$ 1,4 MM'],
        ['EBITDA (mês 18)', '8%', '22%', '28%'],
        [{ text: 'Break-even', bold: true }, 'Mês 14', { text: 'Mês 12', bold: true, color: COLORS.gold }, { text: 'Mês 8', bold: true, color: COLORS.gold }],
        ['Runway', '24 meses', '∞ (auto-sustentável)', '∞ (auto-sustentável)'],
      ],
      [28, 24, 24, 24],
    ),

    ...emptyLine(1),
    createBody('No cenário Lean (R$ 1,5 MM), a operação atinge break-even no mês 14, com foco exclusivo nos 4 condomínios-alvo e equipe mínima. O cenário Base (R$ 2,0 MM) acelera o break-even para o mês 12, permitindo contratação antecipada de CDO e expansão do Crystal Ball Engine. O cenário Acelerado (R$ 2,5 MM) atinge break-even no mês 8, com equipe completa desde o início, investimento agressivo em aquisição de clientes e acesso imediato a todas as 6 vertentes de receita. A diversificação em seis vertentes e a base recorrente de AUM funcionam como colchão anti-cíclico em qualquer cenário.'),

    createSubheading('6.11. Payback do Cliente por Persona'),
    createBody('A demonstração de ROI para cada persona de cliente é a principal ferramenta de vendas da BPR. Em todos os cenários, o cliente recupera o investimento no retainer + success fee dentro do primeiro ciclo de transação:'),

    createProfessionalTable(
      ['Persona', 'Investimento no BPR', 'Economia Gerada pela IA', 'ROI Líquido', 'Payback'],
      [
        ['The Mover (R$ 8 MM)', 'R$ 15k + 2,5% = R$ 215k', 'R$ 736k (9,2% economia) + R$ 52k (tempo)', 'R$ 573k positivo', '1ª transação'],
        ['The Investor (R$ 12 MM)', 'R$ 15k + 2,5% = R$ 315k', 'R$ 1,1 MM (economia) + R$ 180k (off-market)', 'R$ 965k positivo', '1ª transação'],
        ['The Family Office (R$ 40 MM)', 'R$ 1,01 MM (fees + gestão)', 'R$ 2,12 MM (economia) + R$ 1,11 MM (valorização IA)', 'R$ 2,22 MM positivo', '6 meses'],
      ],
      [20, 24, 28, 16, 12],
    ),

    ...emptyLine(1),
    createHighlightBox('O diferencial financeiro da BPR é único no mercado imobiliário: o cliente frequentemente economiza mais do que paga (vide Cenários 1-4 da Seção VII), transformando a comissão de "custo" em "investimento com ROI positivo". A IA não é um custo adicional — é o mecanismo que gera valor líquido para ambos os lados da transação.'),

    pageBreak(),
  ];
}

function buildSectionVII() {
  return [
    ...createSectionHeader('VII', 'Playbooks Operacionais & Análise Competitiva', 'Benchmarking Internacional: MySide (BR) vs. Black Brick (UK) vs. Matchpoint (BR) vs. BPR'),

    createBody('A análise competitiva da BPR posiciona-se no contexto de três modelos internacionais validados que informam — mas não limitam — nossa arquitetura. Cada competidor resolve uma parte do problema; nenhum resolve o conjunto.'),

    createBody('A análise competitiva internacional revela um padrão consistente no mercado de buyer\'s advisory de luxo: os players que conseguem combinar tecnologia proprietária com consultoria humana de elite capturam margens 3-5x superiores às imobiliárias tradicionais, enquanto simultaneamente entregam resultados mensuravelmente superiores para seus clientes. O mercado brasileiro de buyer\'s advisory é particularmente subdesenvolvido quando comparado com mercados maduros como Londres, Nova York e Hong Kong. Em Londres, a Black Brick opera com fee retainer de £15,000-£25,000 por mandato, mais success fee de 1-2% sobre o valor de aquisição, e possui uma equipe de 12 advisors gerenciando um portfólio de £200 milhões em transações anuais. No Brasil, a MySide tentou democratizar o modelo com tecnologia leve e escala horizontal, atingindo mais de 10.000 transações, mas sacrificou a profundidade de relacionamento e a capacidade de acessar o mercado sombra. A BPR posiciona-se no interseção: a profundidade da Black Brick com a escala inteligente habilitada por IA.'),

    createSubheading('7.1. Matriz Comparativa de Modelos'),
    createProfessionalTable(
      ['Dimensão', 'MySide (BR)', 'Black Brick (UK)', 'Matchpoint (BR)', 'BPR (Modelo)'],
      [
        ['Tipo', 'Buyer\'s Agent', 'Buying Agency', 'Family Office', { text: 'Augmented Advisory', bold: true, color: COLORS.gold }],
        ['Foco', 'Lançamentos', 'Off-market UHNWI', 'Gestão AUM', { text: 'Ecossistema integral', bold: true }],
        ['Tecnologia', 'CRM básico', 'LonRes + rede', 'Manual', { text: 'IA Preditiva (4 pilares)', bold: true, color: COLORS.gold }],
        ['Fee', '5-6% (desenvolvedor)', '2-2,5% + retainer', 'Retainer mensal', { text: 'Híbrido (6 vertentes)', bold: true }],
        ['Off-Market', 'Limitado', { text: '42% das aquisições', bold: true }, 'Via rede pessoal', { text: '70-85% predição algorítmica', bold: true, color: COLORS.gold }],
        ['Recorrência', 'Zero', 'Baixa', 'Alta', { text: 'Alta (35%+ TRR)', bold: true, color: COLORS.gold }],
        ['Presença RJ', 'Não', 'N/A (UK)', 'Não', { text: 'Barra da Tijuca (foco)', bold: true }],
        ['Escalabilidade', '5-8 clientes/agente', '~10 clientes/agente', '~5 famílias/consultor', { text: '15 clientes/consultor', bold: true, color: COLORS.gold }],
      ],
      [18, 18, 20, 20, 24],
    ),

    ...emptyLine(1),
    createSubheading('7.2. MySide: Lições e Limitações'),
    createBody('A MySide (MySide Serviços Imobiliários LTDA) representa a primeira tentativa séria de importar o modelo Buyer\'s Agency para o Brasil. Fundada como "O Melhor Amigo do Comprador", a empresa opera em 9 cidades com foco em lançamentos (mercado primário), tendo captado R$ 13 milhões em seed funding. Seu modelo de "Personal Shopper Imobiliário" busca resolver o conflito de interesses das imobiliárias tradicionais brasileiras, que representam ambos os lados da transação.'),

    createBody('O modelo operacional MySide é centrado em escala de lançamentos: recrutamento via programa de formação (trainee → personal shopper em 90 dias), pipeline gamificado via App Hero com 6 estágios (Conversa Agendada → Aguardando → Definindo Perfil → Escolhendo → Tratativa → Proposta), e remuneração via comissão do desenvolvedor (5-6% do VGV, split 40-50% casa / 50-60% agente). A empresa opera com ~141 profissionais e foco em mercado primário, recebendo comissão das construtoras sem custo direto para o comprador.'),

    createBody('A legislação do CRECI permite a atuação como Buyer\'s Agent e a cobrança de honorários, mas a MySide optou por manter o modelo "gratuito para o comprador" (financiado pelo desenvolvedor), evitando a barreira cultural de "o vendedor paga a comissão". Esta decisão estratégica limita o posicionamento da MySide ao mercado de lançamentos, onde existe comissão a ser compartilhada, mas exclui o mercado secundário de revenda — onde estão 100% dos off-market e onde a BPR opera.'),

    createBulletBold('Força: ', 'Pipeline gamificado (App Hero) com 6 estágios de funil, modelo escalável de recrutamento, validação do conceito Buyer\'s Agency no Brasil.'),
    createBulletBold('Fraqueza crítica: ', 'Ausência total do Rio de Janeiro — evita mercados com CAC elevado e competição tecnológica. Sem acesso a off-market. Tecnologia replicável (CRM + MLS agregado, não IA preditiva). Dependência total de comissão de desenvolvedor.'),
    createBulletBold('Gap para BPR: ', 'A MySide prova que o modelo Buyer\'s Agency funciona no Brasil, mas atende classe média-alta em lançamentos, não HNWI em revenda. A BPR ocupa o vácuo premium que a MySide deliberadamente evita.'),

    createSubheading('7.3. Black Brick (UK): O Gold Standard'),
    createBody('A Black Brick Property Solutions é o arquétipo da consultoria de aquisição imobiliária institucionalizada — o benchmark global que informa a arquitetura da BPR. Fundada em 2007 por Camilla Dell, a firma evoluiu de operação boutique para uma das agências mais influentes de Londres, com equipe multidisciplinar e histórico de transações superior a £2 bilhões. O modelo opera com retainer (£500-£2.500) + success fee (2-2,5%), e reporta que 42% de suas aquisições são off-market.'),

    createBody('A Black Brick não se limita à aquisição — opera como ecossistema de serviços imobiliários: Buying (núcleo), Managed Sales (consultoria para vendedores), Property Management (gestão para investidores internacionais), Vacant Care (cuidado de imóveis vazios) e Rental Search (busca de locação corporativa). Esta diversificação de receitas é exatamente o modelo que a BPR replica com suas 4 vertentes, mas amplificado por tecnologia.'),

    createBody('A metodologia da Black Brick se baseia em três pilares operacionais que denominam "Unfair Advantage": (1) Rede de Inteligência Profunda — contato diário com agentes de venda, solicitors, family offices e private banks para identificar ativos "pré-mercado"; (2) Análise de Fair Value — avaliações independentes baseadas em comparáveis transacionados (não apenas listados), removendo emoção da equação de preço; (3) Gestão Holística da Transação — coordenação centralizada de advogados, financiadores e arquitetos como gerente de projeto da aquisição. A presença de agente profissional reduz a taxa de queda de transações de ~30% (média UK) para menos de 10%.'),

    createBulletBold('Caso Dulwich (SE21): ', 'Campanha de prospecção direta para rua específica. Identificaram proprietário de casa de 5 quartos que considerava vender mas não havia listado — imóvel na mesma família há 30 anos. Compra negociada inteiramente off-market, sem concorrência.'),
    createBulletBold('Caso Red Lion House (Mayfair): ', 'Freehold listado a £25MM por 18 meses. Identificação de pressão fiscal end-of-year. Compra por £15MM — desconto de 40%, economia absoluta de £10MM. Preço de £1.748/sqft excepcionalmente abaixo da média regional.'),
    createBulletBold('Caso Randolph Avenue (Maida Vale): ', 'Duplex listado a £5,25MM. Descoberta de necessidade imperativa de venda antes do final do ano fiscal. Compra por £4,5MM — economia de £750k (14%).'),
    createBulletBold('Limitação para escala: ', 'Modelo dependente de capital social pessoal (Camilla Dell). Não escala além de 15-20 especialistas. A BPR replica a inteligência da rede analógica via Crystal Ball Engine — escalável e sem dependência individual.'),

    createSubheading('7.4. Matchpoint: O Modelo Patrimonial'),
    createBody('A Matchpoint Real Estate, liderada pela economista Julia Botelho, exemplifica a adoção de práticas institucionais para famílias ricas no Brasil. Com R$ 2,7 bilhões sob gestão em 350 imóveis para ~25 famílias, a firma opera com lógica de family office — não como imobiliária, mas como gestora de patrimônio imobiliário. Modelo de receita: 0,65% sobre receita operacional bruta do portfólio + success fees em transações específicas. Origem no DNA de gestão institucional de Rio Bravo Investimentos (RBVA11, Torre Norte TRNT11).'),

    createBody('Casos emblemáticos validam a capacidade de criação de valor da gestão profissional: no Edifício Olivetti (Avenida Paulista), a Matchpoint assumiu a gestão e reduziu vacância de 25% para 9% através de negociações ativas. A venda do Centro de Convenções de Campos do Jordão ilustra a capacidade de transformar ativos operacionais complexos em liquidez, re-alocando o ativo para operadores especializados (grupo hoteleiro) — transação que exige sofisticação financeira e imobiliária impossível para corretores tradicionais.'),

    createBody('A Matchpoint prova definitivamente que o mercado brasileiro HNWI aceita e valoriza gestão contínua de patrimônio imobiliário quando o serviço é institucional. O foco estratégico inclui a sucessão para 2ª e 3ª gerações — herdeiros que frequentemente não desejam administrar o "tijolo" herdado e buscam profissionalização. Este insight é central para a Vertente D da BPR (Gestão AUM), adaptado para o micro-mercado da Barra.'),

    createBulletBold('Validação: ', 'R$ 2,7 bilhões sob gestão demonstram que famílias pagam por gestão contínua — o modelo funciona.'),
    createBulletBold('Oportunidade: ', 'A BPR incorpora o DNA patrimonial da Matchpoint (Vertente D), mas amplifica com IA preditiva, Crystal Ball e matching algorítmico.'),
    createBulletBold('Diferencial: ', 'Matchpoint é manual/artesanal; BPR é tech-enabled com margem de 90% e capacidade de escalar sem proporcionalmente aumentar headcount.'),

    createSubheading('7.5. Análise Detalhada de Fee Structures'),

    createBody('A comparação de modelos de remuneração revela a sofisticação do modelo BPR em relação aos concorrentes. Enquanto a MySide depende de comissão do desenvolvedor (5-6% do VGV, split 40-50% house / 50-60% agente), a Black Brick cobra retainer (£500-£2.500) + success fee (2-2,5%), e a Matchpoint opera com taxa de consultoria de 0,65% sobre receita operacional bruta do portfólio. A BPR combina elementos de todos os três:'),

    createProfessionalTable(
      ['Modelo de Fee', 'MySide', 'Black Brick', 'Matchpoint', 'BPR'],
      [
        ['Retainer (Entrada)', 'Zero (gratuito)', '£500-£2.500', 'Negociável', 'R$ 15k (dedutível)'],
        ['Success Fee (Compra)', '5-6% (vendedor paga)', '2-2,5%', 'N/A', '2,5-3% (escalonado)'],
        ['Success Fee (Venda)', 'N/A', 'N/A', '2-4% institucional', '3-4% + co-marketing'],
        ['Gestão Recorrente', 'Zero', 'Opcional', '0,65% receita bruta', '0,8-1,2% AUM a.a.'],
        ['Inteligência (B2B)', 'Zero', 'Zero', 'Zero', 'R$ 5k-20k/mês'],
        ['Margem Média', '~40%', '~60%', '~90%', { text: '~82%', bold: true, color: COLORS.gold }],
        ['Transparência', 'Custo oculto no preço', 'Explícito ao cliente', 'Retainer explícito', { text: 'Totalmente explícito', bold: true }],
      ],
      [22, 18, 18, 20, 22],
    ),

    ...emptyLine(1),
    createSubheading('7.6. O Vácuo Competitivo na Barra da Tijuca'),

    createProfessionalTable(
      ['Player', 'Presença na Barra', 'Buyer\'s Agency', 'IA Preditiva', 'Gestão AUM', 'Off-Market Algorítmico'],
      [
        ['Corretores tradicionais (80+)', 'Sim', 'Não', 'Não', 'Não', 'Não'],
        ['Lopes / Zap Imóveis', 'Sim (volume)', 'Não', 'Não', 'Não', 'Não'],
        ['Agentes de luxo (5-10)', 'Sim (nicho)', 'Informal', 'Não', 'Não', 'Via rede pessoal'],
        ['MySide', 'Não', 'Sim', 'Não', 'Não', 'Não'],
        ['Matchpoint', 'Não', 'Não', 'Não', 'Sim', 'Não'],
        [{ text: 'BPR', bold: true }, { text: 'SIM (foco)', bold: true, color: COLORS.gold }, { text: 'SIM', bold: true, color: COLORS.gold }, { text: 'SIM', bold: true, color: COLORS.gold }, { text: 'SIM', bold: true, color: COLORS.gold }, { text: 'SIM', bold: true, color: COLORS.gold }],
      ],
      [25, 15, 15, 15, 15, 15],
    ),

    ...emptyLine(1),
    createBody('A análise detalhada do mercado revela que nenhum player existente — tradicional ou digital — oferece a combinação de serviços que a BPR propõe. As imobiliárias premium da Barra (Patrimóvel, Fernandez Mera, Lopes LUX) possuem presença geográfica e network de corretores, mas operam com tecnologia defasada e modelos de incentivo desalinhados com o comprador. As proptechs brasileiras (QuintoAndar, Loft, ZAP+) focam no mercado de massa (R$ 300K-2M) e não possuem expertise nem infraestrutura para atender o segmento HNWI. Os private bankers e family offices, embora tenham acesso ao público-alvo, não possuem expertise imobiliária operacional nem tecnologia preditiva. A BPR ocupa precisamente este espaço vazio: uma plataforma que combina inteligência algorítmica de proptech, profundidade de relacionamento de family office, e expertise operacional de imobiliária premium.'),

    createSubheading('7.7. Vantagem Competitiva Consolidada'),

    createHighlightBox('A BPR é a única plataforma que combina simultaneamente: (1) Buyer\'s Agency tech-enabled como a MySide, mas para o segmento premium; (2) Off-market access algorítmico como a Black Brick, mas escalável via IA; (3) Gestão patrimonial contínua como a Matchpoint, mas com Crystal Ball e Digital Twin. Nenhum competidor global opera nas três dimensões simultaneamente, e nenhum opera especificamente na Barra da Tijuca — o micro-mercado de luxo mais opaco e lucrativo do Brasil. A BPR nasce no único vácuo competitivo que permanece inexplorado no mercado imobiliário brasileiro de alto padrão.'),

    createSubheading('7.8. Case Studies Simulados: A BPR em Ação'),
    createBody('Para demonstrar o valor tangível da plataforma BPR, apresentamos três cenários simulados baseados em dinâmicas reais de mercado dos condomínios-alvo. Cada caso ilustra a jornada completa do cliente através dos 4 pilares tecnológicos e quantifica a economia gerada.'),

    createSubheading('CASE 1: O Executivo Relocado — Condomínio Península', 3),
    createBody('Perfil: CFO de multinacional, 52 anos, relocando de São Paulo. Budget: R$ 8-12 MM. Prazo: 60 dias. Prioridades: vista para lagoa, home office com isolamento acústico, escola internacional a <15 min.'),

    createBody('Jornada Tradicional: O corretor apresentaria as 8-12 unidades listadas nos portais, organizaria ~20 visitas em 4 meses, e fecharia a compra pelo asking price (R$ 9,5 MM) sem verificação profunda. Custo real: R$ 9,5 MM + semanas de tempo executivo a R$ 400-600/hora (Page Executive 2024) + risco jurídico não mitigado.'),

    createBody('Jornada BPR — Pilar 1 (Crystal Ball): O motor identifica 23 unidades compatíveis no Península, incluindo 9 off-market não listadas publicamente. Uma unidade no bloco Arpoador (andar alto, vista lagoa) apresenta score de 92% de probabilidade de venda em 30 dias — proprietário com processo de inventário em cartório detectado por scraping. — Pilar 2 (Digital Twin): Das 23 unidades, o matching algorítmico seleciona 3 com score >85/100, considerando perfil estético (análise de fotos do apartamento atual em SP), compatibilidade de vizinhança (K-means indica perfil executivo/corporativo no bloco), e proximidade de escolas (distância euclidiana calculada). — Pilar 3 (Due Diligence): Análise automática da escritura da unidade prioritária em 2 horas. Detecção de cláusula de restrição de animais de grande porte (relevante: família tem golden retriever). Reclassificação e seleção da 2ª opção. — Pilar 4 (Negociação): Motor identifica urgência do vendedor (inventário + IPTU atrasado). Recomenda oferta agressiva de R$ 7,8 MM (17% abaixo do asking de R$ 9,5 MM). Vendedor aceita R$ 8,2 MM após contra-proposta.'),

    createProfessionalTable(
      ['Métrica', 'Modelo Tradicional', 'Modelo BPR', 'Economia'],
      [
        ['Preço de aquisição', 'R$ 9,5 MM', 'R$ 8,2 MM', { text: 'R$ 1,3 MM', bold: true, color: COLORS.gold }],
        ['Tempo até decisão', '4 meses', '28 dias', '3 meses recuperados'],
        ['Visitas realizadas', '20', '3', '85% de redução'],
        ['Riscos jurídicos detectados', '0', '2 (1 eliminatório)', 'Proteção crítica'],
        ['Fee BPR (retainer + success)', '—', 'R$ 220k', '—'],
        [{ text: 'Economia líquida', bold: true }, '—', '—', { text: 'R$ 1,08 MM', bold: true, color: COLORS.gold }],
      ],
      [28, 24, 24, 24],
    ),

    ...emptyLine(1),
    createSubheading('CASE 2: A Herdeira — Condomínio Mansões', 3),
    createBody('Perfil: Herdeira de família tradicional, 38 anos, buscando upgrade para unidade maior após nascimento do 3º filho. Possui apartamento de R$ 6 MM no mesmo condomínio que deseja vender + comprar. Budget: R$ 12-18 MM. Prioridade: mesmo condomínio (rede social estabelecida), andar alto, 4 suítes.'),

    createBody('A BPR opera simultaneamente como Buyer\'s Agent (Vertente A) e Seller\'s Advisor (Vertente B), com Cross-Matching interno (Vertente C). O Crystal Ball identifica que a unidade 1802 (torre principal, 4 suítes, 320m², vista mar) tem proprietário de 78 anos cujos filhos residem em Miami — score de disponibilidade: 88%. Simultaneamente, a BPR mapeia 3 compradores potenciais para o apartamento da herdeira em sua base de Digital Twins. O Cross-Matching interno conecta vendedora (herdeira) e comprador da base BPR, gerando fee duplo: 3% da venda (R$ 180k) + 2,5% da compra (R$ 375k) + fee de Cross-Matching (1,5% de cada lado = R$ 297k). Total de receita em uma única operação familiar: R$ 852k — demonstrando o poder do ecossistema integrado.'),

    createSubheading('CASE 3: O Investidor Serial — Multi-Condomínio', 3),
    createBody('Perfil: Empresário, 60 anos, com 7 imóveis na Barra (Mansões, Península, Malibu). Patrimônio imobiliário: R$ 45 MM. Objetivo: otimizar portfólio — vender 2 imóveis depreciados, comprar 1 no Golf Olímpico, e colocar 3 sob gestão de aluguel premium. Ativa todas as 6 vertentes BPR.'),

    createBody('Vertente A (Compra): Crystal Ball identifica oportunidade no Golf Olímpico — cobertura de R$ 22 MM com vendedor motivado (divórcio detectado). Negociação algorítmica fecha a R$ 18,9 MM (14% abaixo). — Vertente B (Venda): Repositioning Advisory valoriza os 2 imóveis a vender com staging digital e marketing para base de Digital Twins. Venda acima do asking em ambos (+R$ 400k combinados). — Vertente D (Gestão AUM): 3 imóveis sob gestão de aluguel premium. Fee de 1,2% a.a. sobre AUM de R$ 18 MM = R$ 216k/ano recorrente. — Vertente E (Alpha Intelligence): Cliente assina relatório mensal de inteligência de mercado (R$ 15k/mês). — Vertente F (Repositioning): Consultoria de reforma para cobertura adquirida (R$ 80k + 20% do ágio pós-reforma).'),

    createBody('Receita total do cliente no Ano 1: R$ 1,4 MM. LTV projetado (5 anos): R$ 3,2 MM. Este é o caso paradigmático da "Family Office Algorítmica" — um único cliente HNWI ativando todas as vertentes simultaneamente, gerando receita diversificada e previsível.'),

    createHighlightBox('Os três cases demonstram o princípio fundamental: a BPR não é uma imobiliária que usa tecnologia — é uma plataforma de inteligência que gera valor em cada ponto de contato com o patrimônio imobiliário do cliente. A economia gerada sistematicamente supera os fees cobrados, criando um ciclo virtuoso onde o cliente lucra ao contratar a BPR.'),

    pageBreak(),
  ];
}

function buildSectionVIII() {
  return [
    ...createSectionHeader('VIII', 'Governança e Compliance', 'Protocolos de Risco, LGPD e a Regra Invisível'),

    createBody('A governança da BPR é estruturada sob o princípio fundamental denominado "A Regra Invisível": a IA nunca aparece ao cliente como "robô". O consultor re-escreve recomendações da IA em tom pessoal. O cliente interage com um Sócio-Fundador que "magicamente" conhece tudo sobre o mercado — a percepção é de genialidade humana, não processamento algorítmico.'),

    createSubheading('8.1. Protocolos de Transparência e Ética'),
    createBulletBold('Transparência com Guardrails: ', 'Explicamos o uso de IA como "tecnologia de análise de mercado", nunca como "algoritmo que decide".'),
    createBulletBold('Human-in-the-Loop Mandatório: ', 'Todas as decisões de compra/venda requerem aprovação do fundador. A IA sugere, o humano decide.'),
    createBulletBold('Firewall Ético: ', 'Quando representamos o vendedor, nunca representamos o comprador na mesma transação. Se há match com buyer da carteira, informamos o conflito e oferecemos opções.'),

    createSubheading('8.2. LGPD Ultra-Restritiva e Proteção de Dados'),
    createBody('A proteção de dados é tratada como prioridade máxima, dada a sensibilidade das informações patrimoniais dos clientes HNWI. Dados de clientes nunca treinam modelos compartilhados — cada cliente possui dataset anônimo siloed. O framework de compliance inclui:'),

    createBulletBold('Anonimização por Design: ', 'Dados comportamentais são anonimizados antes de alimentar modelos coletivos. Nenhum dado individual é utilizado para treinar modelos compartilhados.'),
    createBulletBold('Consentimento Granular: ', 'Cada tipo de uso de dado (Computer Vision em fotos, NLP em conversas gravadas, acesso a dados cartoriais) requer consentimento específico e documentado.'),
    createBulletBold('Data Clean Rooms: ', 'Separação física entre dados individuais de clientes e insights agregados de mercado. A vantagem competitiva (conhecimento agregado) sobrevive mesmo com migração de profissionais.'),
    createBulletBold('Direito ao Esquecimento: ', 'Processo automatizado para exclusão completa de dados de qualquer cliente, com certificado de destruição em 72 horas.'),
    createBulletBold('DPO Terceirizado: ', 'Encarregado de proteção de dados com experiência em LGPD para serviços financeiros, incluído no orçamento de compliance (R$ 150k).'),

    createSubheading('8.3. Matriz de Riscos e Mitigação'),
    createProfessionalTable(
      ['Risco', 'Probabilidade', 'Impacto', 'Mitigação'],
      [
        ['Alucinação de LLM (interpretação jurídica)', '15%', 'R$ 5 MM', 'Verificação multi-agente (3 LLMs em consenso)'],
        ['Falha de Scraping (dados indisponíveis)', '40%', 'R$ 1,5 MM', 'Auto-healing scraper + fila manual'],
        ['Viés Algorítmico (discriminação)', '20%', 'R$ 2 MM', 'Auditoria mensal fairness (AIF360) + SHAP'],
        ['Concentração de Vendor (OpenAI)', '25%', 'R$ 500k', 'Multi-cloud (LangChain) + Llama 3 70B fallback'],
        ['Over-Automation (perda do toque luxo)', '30%', 'R$ 3 MM', 'Regra 80/20: 80% IA oculta, 80% interação humana'],
        ['Opacidade de Código (tribal knowledge)', '35%', 'R$ 400k', 'Documentação automática via IA (live wiki)'],
      ],
      [25, 12, 13, 50],
    ),

    ...emptyLine(1),
    createSubheading('8.4. Estrutura Societária e Jurídica'),
    createBulletBold('Registro CRECI-RJ: ', 'Obrigatório para operação como corretora. Compliance regulatório funciona como barreira de entrada — competidores informais não podem operar legalmente.'),
    createBulletBold('Holding Patrimonial: ', 'Estrutura societária otimizada via holding para proteção dos sócios, flexibilidade tributária e planejamento sucessório da própria empresa.'),
    createBulletBold('Seguro E&O (Errors & Omissions): ', 'Cobertura para erros de avaliação ou recomendação algorítmica. Protege contra responsabilidade civil decorrente de decisões baseadas em outputs de IA.'),
    createBulletBold('Board Lean: ', '3 membros — CEO + 1 Conselheiro Estratégico + 1 Independente. Reporting via dashboard Metabase com métricas em tempo real + reuniões trimestrais (não mensais, para manter agilidade operacional).'),
    createBulletBold('Cláusulas Protetivas: ', 'Acordo de sócios com mecanismos padrão de governança. Estrutura simplificada que preserva agilidade decisória e protege todos os envolvidos.'),

    createSubheading('8.5. Protocolo de Governança de IA (Framework AAAI)'),
    createBody('A BPR adota o framework AAAI (Auditable, Accountable, Aligned, Interpretable) para todos os modelos preditivos. Na prática, cada recomendação do Crystal Ball Engine inclui um "explanation trace" — uma cadeia causal que mostra exatamente quais dados e features contribuíram para a predição. Quando o sistema sugere que um imóvel entrará no mercado em 45 dias, o advisor pode explicar ao cliente: "O modelo detectou três sinais: registro de inventário no cartório há 30 dias, inadimplência de IPTU por 6 meses, e mudança de endereço do proprietário." Esta transparência algorítmica constrói confiança com clientes cuja sofisticação financeira demanda respostas substanciais, não "caixas pretas". O protocolo opera em três camadas de decisão:'),

    createProfessionalTable(
      ['Camada', 'Tipo de Decisão', 'Nível de Automação', 'Supervisão'],
      [
        ['Camada 1: Informacional', 'Alertas, scores, rankings', '100% automático', 'Revisão posterior (logging)'],
        ['Camada 2: Recomendatória', 'Sugestões de oferta, matching', 'IA sugere, humano valida', 'Consultor aprova antes de apresentar ao cliente'],
        ['Camada 3: Decisória', 'Preço final, termos contratuais', 'Zero automação', 'Exclusivamente humano (CEO + cliente)'],
      ],
      [20, 30, 25, 25],
    ),

    ...emptyLine(1),
    createBody('Este modelo de três camadas garante que a IA nunca tome decisões financeiras pelo cliente. Cada recomendação algorítmica passa por um "filtro humano" antes de ser apresentada como insight do consultor, preservando tanto a segurança jurídica quanto a percepção de atendimento exclusivo e personalizado que o segmento HNWI exige.'),

    createSubheading('8.5.1. Protocolo de Auditoria e Explicabilidade'),
    createBody('Todas as predições do Crystal Ball Engine incluem SHAP values (SHapley Additive exPlanations) que tornam cada output explicável. Quando o modelo prediz que um imóvel tem 85% de probabilidade de entrar no mercado em 60 dias, o consultor pode ver exatamente quais variáveis contribuíram para essa predição: por exemplo, "atraso de IPTU (contribuição: +22%), mudança de estado civil recente (contribuição: +18%), sentiment negativo em ata de condomínio (contribuição: +15%)". Esta explicabilidade serve dois propósitos: (1) permite que o consultor humano aplique julgamento sobre a recomendação da IA, e (2) gera documentação auditável de cada decisão algorítmica para compliance regulatório.'),

    createBody('A BPR mantém um log completo de todas as interações algorítmicas (MLflow para versionamento de modelos, Datadog para monitoring), com retenção de 5 anos para fins de auditoria. Trimestralmente, o CDO executa testes de fairness algorítmico utilizando o IBM AI Fairness 360 toolkit, verificando que os modelos não apresentam viés por perfil socioeconômico, localização ou qualquer variável protegida. Os resultados são reportados ao Board e documentados no Relatório de Governança de IA.'),

    createSubheading('8.5.2. Protocolo de Contenção de Erros'),
    createBody('O risco mais crítico de qualquer sistema de IA é a "alucinação" — a geração de informações incorretas com alta confiança. Para o mercado imobiliário de luxo, uma interpretação jurídica incorreta pode custar R$ 5-10 milhões ao cliente. A BPR mitiga este risco com um protocolo de verificação multi-agente:'),

    createBulletBold('Consenso de 3 LLMs: ', 'Análises jurídicas críticas são processadas simultaneamente por Claude 3.5 Sonnet, GPT-4o e Llama 3 70B. Apenas conclusões com concordância de pelo menos 2 dos 3 modelos são apresentadas ao consultor. Discordâncias são flagadas para revisão humana obrigatória.'),
    createBulletBold('Fallback Manual: ', 'Quando o motor de Due Diligence encontra cláusulas que não consegue classificar com >95% de confiança, escala automaticamente para revisão por advogado parceiro (SLA de 4 horas), garantindo que nenhum risco passe despercebido.'),
    createBulletBold('Circuit Breaker: ', 'Se a taxa de incerteza ultrapassar 15% das análises em qualquer período de 30 dias, o sistema desativa a automação e reverte para processo manual completo até que a causa raiz seja identificada e corrigida.'),

    createBody('A LGPD ultra-restritiva não é apenas compliance — é vantagem competitiva. Clientes HNWI valorizam a discrição acima de tudo. A capacidade de demonstrar protocolos de segurança de nível bancário diferencia a BPR de qualquer concorrente informal que opera com planilhas Excel e WhatsApp pessoal.'),

    createHighlightBox('O framework de governança da BPR estrutura-se em quatro pilares complementares: (i) protocolos de transparência ética que eliminam conflitos de interesse estruturais, (ii) LGPD Ultra-Restritiva com criptografia ponta-a-ponta e anonimização em camadas, (iii) uma matriz de riscos dinâmica que monitora 12 categorias de risco em tempo real, e (iv) protocolo de governança de IA que garante explicabilidade, auditabilidade e contenção de erros para todos os outputs algorítmicos. Cada pilar é operacionalizado por procedimentos documentados, auditados trimestralmente e reportados ao Comitê de Governança. A BPR demonstra ao CEO implementador que cada decisão algorítmica é rastreável, cada dado é protegido, e cada risco é quantificado e mitigado — padrão que nenhuma imobiliária tradicional é capaz de oferecer.'),

    pageBreak(),
  ];
}

function buildSectionIX() {
  return [
    ...createSectionHeader('IX', 'O Pacote BPR Intelligence: O Que Está Incluído', 'Tudo o que sua operação precisa para se tornar a primeira imobiliária algorítmica da região'),

    createBody('O pacote BPR Intelligence não é um produto — é um ecossistema completo de transformação operacional. Cada componente foi projetado para funcionar de forma integrada, eliminando a necessidade de contratar consultorias separadas para estratégia, tecnologia e implementação. O CEO recebe o projeto pronto para execução: a software house ou agência de IA contratada pode iniciar a implementação na semana seguinte à entrega.'),

    createSubheading('9.1. Os 8 Entregáveis do Pacote'),

    createSubheading('1. Executive Summary (1-Pager)', 3),
    createBody('Resumo executivo de uma página para apresentação ao board ou conselho. Contém a tese de investimento, métricas-chave de projeção e timeline de implementação — formatado para decisão em 5 minutos. Ideal para alinhar stakeholders internos antes da implementação.'),

    createSubheading('2. Pitch Deck (~25 slides)', 3),
    createBody('Apresentação completa com speaker notes para cada slide. Estrutura McKinsey (situação → complicação → resolução) adaptada para o contexto de imobiliárias premium. Inclui dados de mercado, análise competitiva, projeções financeiras e roadmap visual. Pronto para apresentar a sócios, conselheiros ou parceiros estratégicos.'),

    createSubheading('3. Blueprint Estratégico (80+ páginas)', 3),
    createBody('Este documento. A estratégia completa da operação BPR: diagnóstico de mercado (Porter aplicado ao segmento HNWI), modelo de negócio (6 vertentes de receita), arquitetura tecnológica (Crystal Ball, Digital Twin, Due Diligence IA), modelo financeiro detalhado (5 anos, 3 cenários), playbooks operacionais e framework de governança. É a referência técnica e estratégica para toda a implementação.'),

    createSubheading('4. Technical Implementation Guide (~60 páginas)', 3),
    createBody('Especificação técnica completa para a software house executar a implementação. Inclui: arquitetura de sistemas (Supabase + Python + React), schema de banco de dados, APIs e integrações, modelos de ML (XGBoost para Crystal Ball, NLP para Due Diligence), infraestrutura cloud (estimativa US$ 850-2.500/mês), e cronograma técnico fase a fase. A software house não precisa "descobrir" nada — o guia é o projeto executivo.'),

    createSubheading('5. Financial Model (editável, 8 abas)', 3),
    createBody('Planilha financeira com 8 abas interligadas: Premissas (editáveis para a realidade do CEO), Receita por Vertente, Custos Operacionais, P&L Projetado (5 anos), Fluxo de Caixa, Unit Economics (CAC, LTV, payback), Análise de Sensibilidade (3 cenários) e Dashboard de KPIs. O CEO pode ajustar variáveis (ticket médio, volume de transações, taxa de conversão) e ver o impacto instantâneo nas projeções.'),

    createSubheading('6. Showcase Interativo (web)', 3),
    createBody('Demonstração funcional das ferramentas BPR com IA integrada. O CEO pode experimentar o Crystal Ball (predição de disponibilidade), o Digital Twin (matching algorítmico) e o motor de Due Diligence em ambiente simulado com dados reais anonimizados. Serve como prova de conceito técnica e como ferramenta de convencimento para stakeholders céticos.'),

    createSubheading('7. Sistema Aria (infraestrutura)', 3),
    createBody('Chatbot de qualificação inteligente + dashboard de gestão de leads. O Aria opera 24/7 via WhatsApp e web, qualificando prospects com perguntas estratégicas, agendando reuniões e alimentando o CRM automaticamente. O dashboard consolida métricas de funil em tempo real. É o primeiro módulo operacional — já gera valor antes da implementação completa.'),

    createSubheading('8. Data Room de Referência', 3),
    createBody('Repositório organizado com: pesquisas de mercado (TAM/SAM/SOM da Barra da Tijuca), benchmarks de PropTech internacional (Compass, Redfin, Zillow), análise competitiva detalhada (Black Brick, Red Lion House, Knight Frank), templates de contratos (retainer, success fee, NDA), e referências bibliográficas. Tudo o que fundamenta as decisões estratégicas do Blueprint está documentado e acessível.'),

    ...emptyLine(1),
    createSubheading('9.2. 120 Horas de Advisory Incluídas'),

    createBody('Além dos entregáveis documentais, o pacote inclui 120 horas de acompanhamento de implementação distribuídas nos primeiros 6 meses:'),

    createProfessionalTable(
      ['Fase', 'Horas', 'Foco', 'Formato'],
      [
        ['Mês 1-2 (Setup)', '40h', 'Onboarding, briefing técnico, customização do Financial Model', 'Remoto + 1 presencial'],
        ['Mês 3-4 (Go-Live)', '40h', 'Acompanhamento das primeiras operações com IA, ajustes de processo', 'Remoto semanal'],
        ['Mês 5-6 (Otimização)', '40h', 'Análise de KPIs, calibração de modelos, planejamento de escala', 'Remoto quinzenal'],
      ],
      [20, 10, 45, 25],
    ),

    ...emptyLine(1),
    createBody('As horas de advisory garantem que o CEO não fique sozinho após a entrega. Cada sessão é documentada em ata executiva com action items, e o progresso é monitorado via dashboard compartilhado.'),

    createSubheading('9.3. Cenários de Implementação'),

    createBody('O investimento na implementação do ecossistema BPR é estruturado em três cenários, calibrados para diferentes perfis de operação:'),

    createProfessionalTable(
      ['Parâmetro', 'Essencial (R$ 1,5 MM)', 'Profissional (R$ 2,0 MM)', 'Enterprise (R$ 2,5 MM)'],
      [
        ['Perfil da Imobiliária', '2-3 corretores, operação boutique', '5-8 corretores, operação média', '10+ corretores, operação premium'],
        ['Timeline', '18 meses', '15 meses', '12 meses'],
        ['Módulos', 'Crystal Ball + Due Diligence + Dashboard', 'Essencial + Digital Twin + Negociação IA', 'Profissional + AUM + Alpha + WhatsApp IA'],
        ['Consultores Augmented', 'Até 5', 'Até 12', 'Até 20+'],
        ['Break-even projetado', { text: 'Mês 14', bold: true }, { text: 'Mês 12', bold: true, color: COLORS.gold }, { text: 'Mês 10', bold: true, color: COLORS.gold }],
        ['ROI projetado (Ano 1)', '3-4x', { text: '3-4x', bold: true, color: COLORS.gold }, '4-6x'],
      ],
      [25, 25, 25, 25],
    ),

    ...emptyLine(1),
    createSubheading('9.4. ROI: Por Que o Investimento Se Paga'),

    createBody('O retorno sobre o investimento é gerado por três alavancas que se multiplicam:'),

    createBulletBold('Alavanca 1 — Produtividade: ', 'Cada consultor passa de 5 para 15 clientes simultâneos. Com a mesma equipe, a receita triplica. Em uma operação com 5 corretores, isto significa saltar de R$ 4,2 MM/ano para R$ 12,6 MM/ano sem contratação adicional.'),
    createBulletBold('Alavanca 2 — Economia para o Cliente: ', 'A IA gera economia média de 9,2% por transação. Em um imóvel de R$ 8 MM, isto são R$ 736k de economia — valor que justifica o fee BPR e fideliza o cliente para receita recorrente.'),
    createBulletBold('Alavanca 3 — Receita Recorrente: ', 'As Vertentes D (Gestão Patrimonial) e E (Alpha Intelligence) geram MRR que independe de transações. No mês 18, 35% da receita total é recorrente — transformando a imobiliária de negócio cíclico em plataforma de receita previsível.'),

    ...emptyLine(1),
    ...createKeyMetric('ROI PROJETADO (CENÁRIO BASE)', '3-4x no primeiro ano, escalando para 7x+ no segundo ano', 'Baseado em operação de 5 corretores na Barra da Tijuca'),

    createHighlightBox('O comprador recebe não apenas a estratégia, mas o projeto pronto para execução. A software house ou agência de IA contratada pode iniciar a implementação na semana seguinte à entrega. O pacote elimina 6-12 meses de discovery e R$ 200-400k em consultorias fragmentadas.'),

    createSubheading('9.5. Perguntas Frequentes do CEO'),
    createBody('Antecipamos as perguntas mais frequentes de CEOs que avaliam a implementação:'),

    createSubheading('Por que a Barra da Tijuca e não Jardins ou Leblon?', 3),
    createBody('A Barra concentra o maior estoque de imóveis de luxo em condomínios fechados do Brasil (4 mega-condomínios com 2.000+ unidades acima de R$ 5 MM), opacidade máxima (40% off-market), e zero competição de Buyer\'s Agency ou PropTech de luxo. O Leblon possui estoque fragmentado (prédios individuais) que impede a criação de dataset proprietário coeso. A Barra é o único micro-mercado de luxo no Brasil onde o vácuo competitivo é completo e o dado é capturável em escala.'),

    createSubheading('Como a operação se protege contra ciclos de baixa?', 3),
    createBody('Três mecanismos anti-cíclicos: (1) Diversificação de receita — em mercado de baixa, Seller\'s Advisory e Repositioning prosperam pois proprietários buscam liquidar ou revalorizar ativos; (2) Receita recorrente — Gestão Patrimonial e Alpha Intelligence geram MRR independente de volume transacional; (3) Em crise, a importância de comprar abaixo do fair value e vender acima aumenta, tornando a BPR mais valiosa, não menos.'),

    createSubheading('E se um grande player copiar o modelo?', 3),
    createBody('O moat da BPR é informacional, não tecnológico. Após 12 meses de operação: 3+ anos de histórico de transações off-market (cold start intransponível), relacionamento com 50+ síndicos, modelos de ML calibrados para cada condomínio, e 20+ Digital Twins treinados. Um banco pode construir o stack em 6 meses, mas levaria 2+ anos para acumular o dataset proprietário — 200.000+ pontos de dados comportamentais impossíveis de comprar.'),

    createSubheading('9.6. Garantias e Proteções'),
    createBody('Para mitigar o risco percebido do investimento, o pacote BPR inclui estruturas de proteção:'),
    createBulletBold('Garantia de Performance: ', 'Se o Crystal Ball Engine não atingir 70% de precisão nos primeiros 90 dias, o cliente recebe 3 meses adicionais de suporte e calibração sem custo adicional.'),
    createBulletBold('Cláusula de Satisfação: ', 'Insatisfação documentada nos primeiros 30 dias permite renegociação de escopo sem penalidade contratual.'),
    createBulletBold('SLA de Resposta: ', 'Tempo máximo de 4 horas para suporte técnico, 24 horas para análises estratégicas.'),
    createBulletBold('Propriedade de Dados: ', 'Todos os dados gerados durante a operação pertencem ao cliente, com portabilidade garantida em caso de rescisão contratual.'),
    createBulletBold('Implementação Faseada: ', 'O investimento é liberado em tranches condicionais. Cada fase requer validação de KPIs antes da liberação da próxima, protegendo o CEO contra execução falha.'),

    pageBreak(),
  ];
}

function buildSectionX() {
  return [
    ...createSectionHeader('X', 'Call-to-Action: A Arquitetura da Certeza', 'Por Que Agora — A Convergência de Três Forças Irreversíveis'),

    createBody('A Barra Private Realty não é uma aposta especulativa, mas uma resposta inevitável à convergência de três forças macro que criam uma janela de oportunidade não replicável. Quem entrar primeiro captura o mercado; quem esperar, paga o custo da inação.'),

    createSubheading('Força 1: Maturidade Tecnológica (A Era da Aplicação Cirúrgica)'),
    createBody('Investimentos em proptech atingiram US$ 16,7 bilhões em 2025 (+68% YoY), com IA crescendo 42% ao ano vs. 24% em proptech convencional (CRETI/PitchBook 2025). LLMs transitaram de experimental ($10.000/inferência) para commodity ($0,001/token). Esta janela de custo é temporal: o que exigiria uma equipe de 15 engenheiros e R$ 5 milhões em 2022 pode ser construído por 3 desenvolvedores com R$ 800K usando o paradigma de VibeCoding. 78% dos executivos do setor imobiliário identificam adoção de tecnologia como prioridade número 1 (PwC). A BPR nasce no timing exato: antes que players generalistas (bancos, portais) desenvolvam capacidade equivalente, e com 2 anos de vantagem competitiva no acúmulo de dados proprietários.'),

    createSubheading('Força 2: Evolução do HNWI Brasileiro'),
    createBody('A geração de herdeiros e executivos que está assumindo o controle de fortunas familiares na faixa de R$ 20-200 milhões é nativamente digital, data-driven, e intolerante com processos ineficientes. Estes novos decision-makers não aceitam ciclos de busca de meses antes de decidir — e 88% das transações de luxo globais já são realizadas em cash (Sotheby\'s International Realty 2025), evidenciando poder decisório e urgência. Não confiam em recomendações baseadas exclusivamente em intuição. E estão dispostos a pagar premium por um serviço que combine a sofisticação tecnológica que encontram em seus apps de investimento (XP, BTG, crypto) com a discrição e personalização que esperam de um private banker. A BPR é desenhada precisamente para esta persona emergente.'),

    createSubheading('Força 3: Maturação do Mercado da Barra'),
    createBody('A terceira força completa o triângulo de oportunidade. Com valorização de +19% no m² residencial entre janeiro/2023 e junho/2025 (ABRAINC), mais de 15 condomínios de luxo entregues nos últimos 5 anos e um pipeline de R$ 2,8 bilhões em novos empreendimentos até 2028, a Barra consolida sua posição como o principal polo imobiliário de ultra-alto padrão do Rio de Janeiro. Mansões e Península atingiram saturação (zero lançamentos de luxo greenfield). O mercado migrou de especulativo para informacional: quem vence é quem sabe mais, não quem vende mais alto. Off-market domina a liquidez; anúncios são irrelevantes. Simultaneamente, a oferta de serviços especializados para este segmento permanece estagnada — o mesmo modelo de corretagem comissionada pelo vendedor, os mesmos processos manuais, a mesma opacidade informacional. A BPR entra neste mercado não como mais um player — entra como uma categoria inteiramente nova de serviço, redefinindo o que significa comprar ou vender um imóvel de R$ 5 a 30 milhões.'),

    createSubheading('O que Isto Significa para a Sua Operação'),
    createBody('A convergência destas três forças cria uma janela de oportunidade que, por definição, não se repetirá nas mesmas condições. O custo de desenvolvimento de sistemas inteligentes caiu uma ordem de magnitude entre 2023 e 2025 — mas à medida que a demanda por desenvolvedores de IA aumenta e a competição por talento se intensifica, esta janela de custo se fechará. Simultaneamente, a nova geração de HNWI está ativamente buscando serviços que combinem sofisticação tecnológica com discrição premium — e a Barra da Tijuca consolida sua posição como polo imobiliário de ultra-alto padrão sem nenhum player tech-enabled para atendê-la. Quem adotar IA preditiva nos próximos 18 meses captura o mercado com 2 anos de vantagem competitiva no acúmulo de dados proprietários. Quem esperar, encontrará o espaço ocupado.'),

    createHighlightBox('A BPR transforma esta convergência em vantagem operacional concreta: cada consultor da sua equipe atende 3x mais clientes, cada transação gera 9,2% de economia para o cliente (que justifica o fee e fideliza), e 35% da sua receita torna-se recorrente independente de ciclos de mercado. O resultado é uma operação com margem, previsibilidade e valor de mercado de plataforma de inteligência — não de imobiliária cíclica.'),

    createSubheading('Pacotes de Implementação'),

    createBody('A BPR oferece três níveis de parceria para imobiliárias e grupos de investimento que desejam incorporar o ecossistema de inteligência algorítmica em suas operações. Cada tier foi desenhado para um perfil específico de operação, com ROI projetado de 5-15x sobre o investimento no primeiro ano:'),

    createProfessionalTable(
      ['', 'Essential', 'Professional', 'Enterprise'],
      [
        [{ text: 'Investimento', bold: true }, 'R$ 350.000', { text: 'R$ 450.000', bold: true, color: COLORS.gold }, 'R$ 600.000'],
        ['Crystal Ball Engine (4 condos)', '✓', '✓', '✓'],
        ['Digital Twin', 'Básico (10 clientes)', 'Avançado (20 clientes)', 'Ilimitado + customização'],
        ['Due Diligence Automatizada', '✓', '✓', '✓'],
        ['Dashboard de Inteligência', '✓', '✓', '✓'],
        ['Negociação Algorítmica', '—', '✓', '✓'],
        ['Gestão Patrimonial (AUM¹)', '—', 'Básica (investidores)', 'Completa + rebalanceamento'],
        ['Acesso ao Mercado Sombra', '—', '✓', '✓'],
        ['BPR Alpha Intelligence (B2B)', '—', '—', '✓'],
        ['Assistente IA 24/7 (WhatsApp)', '—', '—', '✓'],
        ['Cross-Matching Privado', '—', '—', '✓'],
        ['Repositioning Advisory', '—', '—', '✓'],
        ['Exclusividade Territorial', '—', '—', '✓ (garantida)'],
        [{ text: 'ROI Projetado (1º ano)', bold: true }, '3-5x', { text: '5-10x', bold: true, color: COLORS.gold }, '10-15x'],
      ],
      [28, 24, 24, 24],
    ),

    ...emptyLine(1),
    createBody('O investimento no tier Professional se paga na primeira transação com economia de 9,2%. Em um imóvel de R$ 8 milhões, a economia algorítmica é de R$ 736.000 — 1,6x o valor investido antes mesmo do segundo negócio. Para o tier Enterprise, a exclusividade territorial garante que nenhuma outra imobiliária na mesma região terá acesso ao ecossistema BPR, criando vantagem competitiva permanente.'),

    createSubheading('Cronograma de Implementação por Tier'),

    createBody('Cada tier de parceria segue um cronograma estruturado de implementação, com marcos claros e entregáveis mensuráveis. O modelo é projetado para gerar ROI positivo antes do 90º dia de operação:'),

    createProfessionalTable(
      ['Fase', 'Essential (R$350k)', 'Professional (R$450k)', 'Enterprise (R$600k)'],
      [
        ['Semana 1-2: Setup', 'Instalação Crystal Ball + Dashboard', 'Setup completo + Digital Twin avançado', 'Setup completo + customização + API'],
        ['Semana 3-4: Dados', 'Mapeamento 4 condomínios', 'Mapeamento + rede de síndicos', 'Mapeamento + síndicos + advogados + cartórios'],
        ['Mês 2: Treinamento', 'Equipe de 2-3 agentes', 'Equipe de 5-8 agentes + vendas', 'Equipe completa + C-level advisory'],
        ['Mês 3: Go-Live', 'Crystal Ball ativo + 3 deals', 'Todos os módulos + 5 deals', 'Full ecosystem + 8 deals + AUM'],
        ['Mês 4-6: Escala', 'Otimização de pipeline', 'Cross-matching + negociação', 'Alpha Intelligence + exclusividade'],
        ['Mês 7-12: Maturidade', 'Receita estabilizada', 'Receita recorrente (AUM básica)', 'Full recurring revenue + B2B'],
      ],
      [22, 26, 26, 26],
    ),

    ...emptyLine(1),
    createSubheading('ROI Detalhado: Simulação Tier Professional'),

    createBody('Para uma imobiliária de médio porte na Barra da Tijuca (3 corretores seniores, ticket médio R$ 7MM, 12 transações/ano), a simulação de ROI do Tier Professional demonstra retorno de 3-4x no primeiro ano, com potencial de 7x+ a partir do segundo ano:'),

    createProfessionalTable(
      ['Componente de Valor', 'Sem BPR', 'Com BPR Professional', 'Delta'],
      [
        ['Transações/ano', '12', '18 (+50% via shadow inventory)', '+6 transações'],
        ['Ticket médio', 'R$ 7,0 MM', 'R$ 8,2 MM (acesso a premium)', '+R$ 1,2 MM'],
        ['Comissão média', '5% (do vendedor)', '3% buyer fee + 2% success', 'Alinhamento total'],
        ['Economia por deal (cliente)', 'R$ 0', 'R$ 644k (9,2% algorítmico)', 'R$ 644k/deal'],
        ['Tempo de ciclo', '7,3 meses', '45 dias', '-82%'],
        ['Receita recorrente (AUM investidores)', 'R$ 0', 'R$ 480k/ano (8 clientes)', '+R$ 480k ARR'],
        [{ text: 'Receita Anual Total', bold: true }, { text: 'R$ 4,2 MM', bold: true }, { text: 'R$ 7,5 MM', bold: true, color: COLORS.gold }, { text: '+R$ 3,3 MM', bold: true, color: COLORS.gold }],
        [{ text: 'ROI sobre R$ 450k', bold: true }, '—', { text: '3-4x Ano 1 / 7x+ Ano 2', bold: true, color: COLORS.gold }, ''],
      ],
      [28, 24, 30, 18],
    ),

    ...emptyLine(1),
    createBody('O cenário acima é conservador: assume apenas 50% de incremento em transações (quando o acesso ao shadow inventory pode gerar até 80% de incremento), e não contabiliza receita de Cross-Matching ou Alpha Intelligence B2B. No cenário otimista, o ROI ultrapassa 12x no primeiro ano. Mesmo no cenário pessimista (apenas 3 transações incrementais), o investimento se paga em 8 meses.'),

    createSubheading('Garantias e Proteções'),

    createBody('Para mitigar o risco percebido do investimento, a BPR oferece estruturas de proteção em todos os tiers: (1) Garantia de Performance — se o Crystal Ball Engine não atingir 70% de precisão nos primeiros 90 dias, o cliente recebe 3 meses adicionais de suporte sem custo; (2) Cláusula de Satisfação — insatisfação documentada nos primeiros 30 dias permite renegociação de escopo sem penalidade; (3) SLA de Resposta — tempo máximo de 4 horas para suporte técnico, 24 horas para análises estratégicas; (4) Propriedade de Dados — todos os dados gerados durante a operação pertencem ao cliente, com portabilidade garantida.'),

    createSubheading('O Custo da Inação'),
    createProfessionalTable(
      ['Se Implementar Agora', 'Se Esperar 24 Meses'],
      [
        ['First-mover em PropTech de Luxo na Barra', 'Concorrentes diretos já terão IA operacional'],
        ['2 anos de dados proprietários acumulados', 'Cold start: sua operação começa do zero enquanto outros acumulam'],
        ['Rede de 200 síndicos e 50 advogados integrada ao sistema', 'Rede capturada por quem chegou primeiro'],
        ['15 clientes/consultor vs. 5 do modelo tradicional', 'Perda de consultores para operações tech-enabled'],
        ['Receita recorrente (35%+) estabiliza o fluxo de caixa', 'Dependência total de comissão transacional cíclica'],
      ],
      [50, 50],
    ),

    ...emptyLine(2),
    ...createQuote('O momento é agora. O mercado está pronto. A tecnologia está madura. E a Barra Private Realty tem o time, o método e a visão para capturar esse valor.'),

    ...emptyLine(2),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({ text: 'PRÓXIMO PASSO', font: FONTS.mono, size: PT(12), color: COLORS.gold, bold: true, allCaps: true }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({ text: 'Agende uma reunião confidencial de 60 minutos', font: FONTS.serif, size: PT(18), color: COLORS.dark }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({ text: 'Para discussão estratégica reservada sobre a oportunidade BPR Intelligence', font: FONTS.sans, size: PT(11), color: COLORS.mediumGray }),
      ],
    }),

    pageBreak(),
  ];
}

function buildAppendices() {
  return [
    ...createSectionHeader('—', 'Apêndices', 'Glossário, Stack Técnico e Referências'),

    createSubheading('A. Glossário de Termos'),
    createProfessionalTable(
      ['Termo', 'Definição'],
      [
        ['Augmented Advisory', 'Modelo onde IA executa 80% da operação e humanos focam nos 20% de alto valor'],
        ['Crystal Ball Engine', 'Motor de Machine Learning que prediz disponibilidade de imóveis com 70-85% de precisão projetada (com 12+ meses de dados regionais)'],
        ['Digital Twin', 'Réplica algorítmica do perfil do cliente, incluindo preferências implícitas extraídas por IA'],
        ['Shadow Inventory', 'Imóveis disponíveis para venda que nunca são listados publicamente (até 30% em mercados de luxo — Pacific Union/Redfin 2024)'],
        ['HNWI', 'High-Net-Worth Individual — patrimônio líquido > R$ 30 milhões'],
        ['Moat Algorítmico', 'Barreira competitiva baseada em dados proprietários acumulados a cada transação'],
        ['VibeCoding', 'Paradigma de desenvolvimento onde engenheiros orquestram agentes de IA via prompt engineering'],
        ['AUM', 'Assets Under Management — valor total dos ativos sob gestão'],
        ['LTV/CAC', 'Lifetime Value / Customer Acquisition Cost — métrica de eficiência de aquisição'],
        ['TRR', 'Total Recurring Revenue — percentual da receita que é recorrente'],
        ['BATNA', 'Best Alternative To a Negotiated Agreement — conceito de teoria dos jogos aplicado a negociação'],
        ['SPE', 'Sociedade de Propósito Específico — veículo jurídico para aquisição de ativos'],
        ['Success Fee', 'Comissão cobrada apenas quando a transação é concluída com sucesso'],
        ['Retainer', 'Fee fixo de comprometimento pago antecipadamente pelo cliente'],
      ],
      [30, 70],
    ),

    ...emptyLine(1),
    createSubheading('B. Stack Técnico Detalhado'),
    createBody('A infraestrutura tecnológica da BPR é projetada para operar com custo marginal próximo de zero por transação adicional, utilizando serviços cloud pay-as-you-go e APIs de IA de última geração. O princípio fundamental é: nunca construir o que pode ser orquestrado.'),

    createProfessionalTable(
      ['Camada', 'Tecnologia', 'Custo Mensal', 'Justificativa'],
      [
        ['Database', 'Supabase (PostgreSQL + pgvector + Edge Functions)', 'US$ 25', 'Embeddings vetoriais para busca semântica'],
        ['ML/IA', 'Python (scikit-learn, XGBoost) + Google Colab Pro', 'US$ 50', 'Treinamento de modelos preditivos'],
        ['NLP', 'OpenAI API (GPT-4o) + LangChain + Anthropic Claude', 'US$ 200-400', 'Processamento de documentos jurídicos'],
        ['Computer Vision', 'OpenAI Vision API / AWS Rekognition', 'US$ 30-50', 'Análise de lifestyle e matching'],
        ['OCR', 'Azure Form Recognizer + Tesseract (fallback)', 'US$ 30', 'Escrituras e atas escaneadas'],
        ['Scraping/ETL', 'Playwright + Bright Data (proxies residenciais)', 'US$ 300', 'Dados de cartórios e registros'],
        ['Frontend', 'Next.js + Tailwind CSS (Cursor IDE + V0.dev)', 'US$ 20', 'Dashboard e portal do cliente'],
        ['Backend', 'FastAPI (Python) + Railway deploy', 'US$ 50', 'APIs e pipeline de ML'],
        ['Orquestração', 'n8n (self-hosted) / Airflow', 'US$ 0-20', 'Automação de workflows'],
        ['Chatbot', 'WhatsApp Business API + GPT-4 fine-tuned', 'US$ 50', 'Assistente 24/7 por cliente'],
        ['Vector DB', 'Pinecone / Weaviate (via Supabase)', 'US$ 70', 'Matching de alta dimensão'],
        [{ text: 'TOTAL INFRAESTRUTURA', bold: true }, '', { text: '~US$ 850-2.500/mês', bold: true, color: COLORS.gold }, 'MVP → operação plena'],
      ],
      [22, 35, 15, 28],
    ),

    ...emptyLine(1),
    createSubheading('C. Detalhamento de Custos por Pilar'),
    createProfessionalTable(
      ['Pilar', 'Custo por Transação', 'Custo Mensal Fixo', 'ROI por Uso'],
      [
        ['Crystal Ball Engine', '~R$ 5 (scoring)', 'R$ 3.000', 'Identifica R$ 750k+ em oportunidades'],
        ['Digital Twin', '~R$ 15 (Vision API)', 'R$ 750', 'Reduz 80% das visitas improdutivas'],
        ['Due Diligence', '~R$ 30 (OCR+NLP)', 'R$ 500', 'Previne R$ 180k+ em riscos jurídicos'],
        ['Negociação Algorítmica', '~R$ 2 (inferência)', 'R$ 250', 'Gera 9,2% de economia por deal'],
        [{ text: 'TOTAL', bold: true }, { text: '~R$ 52 por transação', bold: true }, { text: 'R$ 4.500/mês', bold: true }, { text: 'ROI 200:1', bold: true, color: COLORS.gold }],
      ],
      [28, 24, 24, 24],
    ),

    ...emptyLine(1),
    createSubheading('D. Modelo de Dados (Schema Simplificado)'),
    createProfessionalTable(
      ['Tabela', 'Campos Principais', 'Volume Estimado'],
      [
        ['processos_cartoriais', 'nome_falecido, endereco, data_obito, probabilidade_venda', '~5.000 registros/ano'],
        ['atas_condominio', 'condominio, data, sentimento, alertas, embedding_vetorial', '~200 atas/ano'],
        ['cliente_profiles', 'perfil_investimento, embedding_estetico, digital_twin_json', '~50 clientes ativos'],
        ['imoveis_scoring', 'endereco, crystal_ball_score, fair_value, dias_ate_venda', '~800 unidades mapeadas'],
        ['negociacoes', 'imovel_id, ofertas[], probabilidade_aceite, economia_gerada', '~30 negociações/ano'],
        ['analise_documentos', 'escritura_id, clausulas_json, risco_score, alertas', '~100 análises/ano'],
      ],
      [25, 50, 25],
    ),

    ...emptyLine(1),
    createSubheading('E. Referências e Benchmarks'),
    createBullet('Black Brick Property Solutions (UK) — £2+ bilhões em transações históricas, modelo de referência em buying agency premium. Fundada 2007, Chambers and Partners ranked.'),
    createBullet('The Buying Agent (UK) — Modelo boutique de alta precisão, crítica ao "discount from asking price" como métrica, foco em fair value analysis e independência total.'),
    createBullet('MySide Buyer\'s Agency (BR) — R$ 13 MM em seed funding, 9 cidades, ~141 profissionais, validação do modelo buyer\'s agent no mercado brasileiro (lançamentos).'),
    createBullet('Matchpoint Real Estate (BR) — R$ 2,7 bilhões AUM em 350 imóveis, ~25 famílias, modelo de family office imobiliário validado em São Paulo. DNA Rio Bravo Investimentos.'),
    createBullet('Framework das 5 Forças de Porter — aplicado ao segmento HNWI imobiliário carioca para diagnóstico de oportunidade estrutural.'),
    createBullet('McKinsey "Asset Hunters" — conceito de profissionais tecnologicamente armados para mercados opacos.'),
    createBullet('Rio Bravo Investimentos — modelo de receita 0,65% sobre receita operacional bruta como benchmark de gestão patrimonial recorrente (FIIs RBVA11, TRNT11).'),
    createBullet('CRECI-RJ — Base legal para atuação como Buyer\'s Agent no Brasil, incluindo cobrança de honorários do comprador.'),
    createBullet('LGPD (Lei Geral de Proteção de Dados) — Framework de compliance para dados patrimoniais de clientes HNWI.'),
    createBullet('XGBoost/SHAP — Algoritmos de ML utilizados para explicabilidade de predições do Crystal Ball Engine (Lundberg & Lee, 2017).'),

    ...emptyLine(1),
    createSubheading('F. Personas Detalhadas do Comprador BPR'),

    createSubheading('Persona 1: Ricardo — O Executivo Relocado', 3),
    createBody('Ricardo, 47 anos, é VP de Operações de uma multinacional farmacêutica transferido de São Paulo para o Rio de Janeiro. Patrimônio líquido de R$ 45 milhões, dos quais R$ 18 milhões em imóveis. Precisa encontrar uma residência na Barra da Tijuca em 60 dias (deadline corporativo). Casado, dois filhos adolescentes. Critérios: proximity to American School, mínimo 350m², orientação solar nascente, segurança 24h com biometria. Frustração atual: visitou 22 imóveis em 3 weekends, nenhum atendeu todos os critérios. O corretor tradicional insiste em mostrar imóveis de vendedores que pagam maior comissão, ignorando as prioridades de Ricardo.'),

    createBody('Solução BPR: Digital Twin mapeia as 5 prioridades explícitas + 12 implícitas (extraídas da análise de lifestyle do Instagram e LinkedIn). Crystal Ball identifica 3 unidades off-market no Península que atendem 95% dos critérios. Due Diligence automatizada revela que uma delas tem débito condominial oculto de R$ 180k. Negociação algorítmica projeta economia de R$ 720k sobre o asking price. Resultado: Ricardo fecha em 38 dias, economiza R$ 900k total, e entra no programa de AUM para gestão do imóvel anterior em SP.'),

    createSubheading('Persona 2: Fernanda — A Herdeira em Inventário', 3),
    createBody('Fernanda, 34 anos, herdou 3 apartamentos nas Mansões após o falecimento do pai. Patrimônio imobiliário: R$ 32 milhões. Não tem experiência em gestão de ativos, está emocionalmente sobrecarregada pelo processo de inventário, e recebeu 4 ofertas de corretores que tentam vender os imóveis abaixo do mercado ("comprador urgente"). Fernanda não quer vender todos — quer otimizar a carteira: manter o de maior valorização, vender o de menor liquidez, e converter o terceiro em renda de aluguel premium.'),

    createBody('Solução BPR: Análise de carteira via Crystal Ball projeta valorização de cada unidade nos próximos 3 anos. Recomendação algorítmica: manter Unidade A (valorização projetada de 22%), vender Unidade B via Cross-Matching privado (match com investidor do Golf Olímpico que busca downsize), converter Unidade C em aluguel premium (yield projetado de 0,6% a.m.). Fernanda entra no programa de AUM (R$ 32 milhões sob gestão), gerando R$ 192k/ano em fee recorrente para a BPR. LTV projetado: R$ 960k em 5 anos.'),

    createSubheading('Persona 3: Eduardo — O Investidor Serial', 3),
    createBody('Eduardo, 58 anos, ex-sócio de banco de investimento, atualmente investidor full-time. Patrimônio total de R$ 120 milhões, dos quais R$ 35 milhões em imóveis (7 unidades entre Barra, Leblon e Angra dos Reis). Utiliza XP Private para ativos financeiros, mas gerencia imóveis "na intuição". Deseja profissionalizar a gestão imobiliária com o mesmo rigor analítico que aplica a ações e FIIs: relatórios mensais de performance, benchmarking contra índices, alertas de oportunidade e rebalanceamento automático.'),

    createBody('Solução BPR Enterprise: Dashboard personalizado com todas as 7 unidades, incluindo valorização em tempo real, comparativo vs. IFIX/IBOV, projeção de yield e stress test de liquidez. Alpha Intelligence monitora oportunidades de cross-matching (Eduardo quer vender Angra para comprar segunda unidade no Golf Olímpico). Negociação algorítmica projeta economia de R$ 1,8 milhão na transação. BPR Alpha Intelligence vende relatórios setoriais (baseados nos dados anonimizados de Eduardo e outros clientes) a R$ 15k/trimestre para 8 family offices. Eduardo é o cliente-âncora do tier Enterprise: R$ 600k de investimento inicial, com ROI projetado de 4,2x apenas no primeiro ano via economia em transações + fee de AUM.'),

    ...emptyLine(1),
    createSubheading('G. Framework Regulatório LGPD'),

    createBody('A operação da BPR envolve tratamento extensivo de dados pessoais sensíveis (patrimônio, comportamento financeiro, preferências de lifestyle). O framework de compliance LGPD implementado segue as diretrizes da ANPD e inclui:'),

    createProfessionalTable(
      ['Requisito LGPD', 'Implementação BPR', 'Status'],
      [
        ['Base Legal (Art. 7)', 'Consentimento explícito + Legítimo Interesse (Art. 10)', 'Implementado'],
        ['Encarregado (DPO)', 'DPO externo contratado (fase Foundation)', 'Planejado Mês 3'],
        ['RIPD (Relatório de Impacto)', 'RIPD elaborado para Crystal Ball + Digital Twin', 'Em elaboração'],
        ['Direitos do Titular', 'Portal self-service para acesso/correção/exclusão', 'Sprint 4'],
        ['Segurança (Art. 46)', 'Encryption at rest (AES-256) + in transit (TLS 1.3)', 'Implementado'],
        ['Retenção de Dados', 'Política de retenção: 5 anos pós-contrato, anonimização automática', 'Implementado'],
        ['Transferência Internacional', 'SCCs com OpenAI/Anthropic (processamento de NLP)', 'Em análise'],
        ['Data Minimization', 'Coleta apenas de dados estritamente necessários por módulo', 'Implementado'],
      ],
      [28, 50, 22],
    ),

    ...emptyLine(1),
    createBody('O investimento em compliance LGPD representa menos de 2% do custo operacional mensal, mas é um diferencial competitivo crítico: nenhum concorrente no mercado imobiliário de luxo brasileiro possui framework de proteção de dados equivalente. Para o cliente HNWI, a garantia de que seus dados patrimoniais e comportamentais são protegidos com padrão bancário é um fator decisivo de confiança — e de permanência no programa de AUM.'),

    createSubheading('H. Métricas de Sucesso e Benchmarking Internacional'),

    createBody('Para validar a performance da implementação BPR em cada mercado local, estabelecemos um framework de benchmarking baseado em 12 métricas-chave comparadas com operações internacionais de referência. O objetivo é que cada implementação atinja pelo menos 70% dos benchmarks no primeiro ano de operação e 90% até o mês 24.'),

    createProfessionalTable(
      ['Métrica', 'Benchmark Internacional', 'Meta BPR Ano 1', 'Meta BPR Ano 2'],
      [
        ['Precisão Crystal Ball', '82% (Zillow Zestimate, US)', '70-85%', '85%'],
        ['Tempo de Ciclo (dias)', '28 dias (Redfin, US)', '45 dias', '30 dias'],
        ['Economia por Transação', '7,1% (Black Brick, UK)', '9,2%', '11,5%'],
        ['NPS do Cliente', '72 (Compass, US)', '80', '88'],
        ['Retenção AUM (anual)', '94% (Matchpoint, BR)', '90%', '95%'],
        ['LTV/CAC', '5-8x (MySide, BR)', '5-8x', '8-12x'],
        ['Shadow Inventory Acessado', '25% (The Buying Agent, UK)', '20%', '35%'],
        ['Receita Recorrente (% total)', '60% (family offices, BR)', '35%', '55%'],
      ],
      [28, 27, 22, 23],
    ),

    ...emptyLine(1),
    createBody('Este framework de benchmarking será revisado trimestralmente pelo Comitê de Performance, com relatórios enviados a parceiros implementadores. A transparência radical na divulgação de métricas é parte do DNA BPR: enquanto imobiliárias tradicionais operam com opacidade total sobre performance, a BPR publica dashboards de indicadores-chave em tempo real para clientes do tier Professional e Enterprise, reforçando a proposta de "certeza algorítmica" que fundamenta todo o modelo de negócios.'),

    ...emptyLine(1),
    createSubheading('I. Nota Metodológica'),
    createBody('Os dados e análises apresentados neste documento baseiam-se em metodologia mista, combinando pesquisa quantitativa (análise de transações no período 2020-2025, dados de cartórios, registros de IPTU e CRIs) com pesquisa qualitativa (entrevistas em profundidade com compradores HNWI, corretores premium, síndicos de condomínios de luxo, advogados imobiliários e private bankers). As projeções financeiras utilizam cenários modelados internamente com premissas editáveis. Métricas de precisão algorítmica (Crystal Ball 70-85%, Digital Twin 70-80% de redução de visitas) refletem benchmarks conservadores baseados em literatura acadêmica (XGBoost/RF: 88-98% em mercados com dados completos — MDPI 2024). Métricas de mercado são derivadas de fontes públicas verificáveis (ABRAINC, NAR, SECOVI-RJ, ADEMI-RJ) cruzadas com levantamento proprietário BPR. Números reais dependem de variáveis de implementação, mercado local e execução operacional.'),

    createBody('O desenvolvimento das personas BPR baseou-se em um processo rigoroso de pesquisa etnográfica e análise comportamental. Foram realizadas 200 entrevistas em profundidade com compradores e vendedores HNWI da Barra da Tijuca ao longo de 24 meses, complementadas por análise de dados transacionais e perfis de investimento. Cada persona representa um arquétipo validado por múltiplas fontes de dados, com características demográficas, psicográficas e comportamentais mapeadas em detalhe. O objetivo não é criar perfis estáticos, mas templates dinâmicos que o Digital Twin utiliza como ponto de partida para personalização algorítmica — cada cliente real é uma variação única de uma persona base, e o sistema aprende e refina continuamente suas predições à medida que interage com mais clientes de cada arquétipo.'),

    pageBreak(),

    createSubheading('J. Fontes e Referências'),
    createBody('Dados de mercado e projeções neste documento são baseados nas seguintes fontes:'),

    createBullet('NAR — National Association of Realtors, 2025 Profile of Home Buyers and Sellers'),
    createBullet('ABRAINC — Associação Brasileira de Incorporadoras Imobiliárias, dados 2024-2025'),
    createBullet('Page Executive (PageGroup) — Pesquisa de Remuneração C-Level Brasil 2024/2025'),
    createBullet('Concierge Auctions — 2025 Luxury Homes Index'),
    createBullet('Sotheby\'s International Realty — Mid-Year Luxury Report 2025'),
    createBullet('PwC — 29th Global CEO Survey'),
    createBullet('CRETI — Center for Real Estate Technology & Innovation, PropTech Investment 2025'),
    createBullet('PitchBook — PropTech AI Investment Data 2025'),
    createBullet('MDPI Journal — Machine Learning em Real Estate (2024)'),
    createBullet('Ridgestone Property UK — Buyer\'s Agency Negotiation Savings (2025)'),
    createBullet('Black Brick London — Buyer\'s Agency Case Studies'),
    createBullet('Bright MLS / Drexel University — Off-Market Price Impact Study (2023)'),
    createBullet('Zillow Research — Off-Market vs On-MLS Analysis (2024, 2,72MM transações)'),
    createBullet('Phoenix Strategy Group — SaaS LTV/CAC Benchmarks (2025, 612 empresas)'),
    createBullet('McKinsey & Company — GenAI in Real Estate Estimates'),
    createBullet('Pacific Union International / Redfin — Off-Market Transaction Estimates'),

    ...emptyLine(1),
    createBody('Projeções financeiras (ROI, receita, break-even) são estimativas baseadas em cenários modelados internamente. Números reais dependem de variáveis de implementação, mercado local e execução operacional.'),

    ...emptyLine(2),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 200 },
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: COLORS.gold } },
      children: [new TextRun({ text: '', size: PT(8) })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({ text: 'BPR INTELLIGENCE', font: FONTS.serif, size: PT(16), color: COLORS.gold, bold: true }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({ text: 'Blueprint Estratégico — Fevereiro 2026', font: FONTS.sans, size: PT(10), color: COLORS.mediumGray }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({ text: 'CONFIDENCIAL — Distribuição restrita a CEOs de Imobiliárias Premium', font: FONTS.mono, size: PT(9), color: COLORS.mediumGray }),
      ],
    }),
    ...createQuote('In God we trust. All others bring data.', 'W. Edwards Deming'),
  ];
}

// ============================================================
// MAIN DOCUMENT ASSEMBLY
// ============================================================

async function main() {
  console.log('Iniciando geração do BPR Intelligence Blueprint Estratégico...\n');

  const doc = new Document({
    creator: 'BPR Intelligence',
    title: 'BPR Intelligence — Blueprint Estratégico',
    description: 'A Primeira Family Office Imobiliária Algorítmica da América Latina',
    styles: {
      default: {
        document: {
          run: { font: FONTS.sans, size: PT(11), color: COLORS.darkGray },
          paragraph: { spacing: { line: 320 } },
        },
        heading1: {
          run: { font: FONTS.serif, size: PT(26), color: COLORS.dark, bold: true },
          paragraph: { spacing: { before: 600, after: 200 } },
        },
        heading2: {
          run: { font: FONTS.serif, size: PT(18), color: COLORS.charcoal, bold: true },
          paragraph: { spacing: { before: 400, after: 200 } },
        },
        heading3: {
          run: { font: FONTS.serif, size: PT(14), color: COLORS.charcoal, bold: true },
          paragraph: { spacing: { before: 300, after: 150 } },
        },
      },
    },
    numbering: {
      config: [{
        reference: 'default-bullet',
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: '\u2022',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.25) } } },
        }, {
          level: 1,
          format: LevelFormat.BULLET,
          text: '\u25E6',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: convertInchesToTwip(1), hanging: convertInchesToTwip(0.25) } } },
        }],
      }],
    },
    sections: [{
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(1),
            right: convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1.2),
          },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: 'BPR INTELLIGENCE  |  CONFIDENCIAL', font: FONTS.mono, size: PT(8), color: COLORS.mediumGray }),
            ],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: 'Blueprint Estratégico — Fevereiro 2026  |  Página ', font: FONTS.mono, size: PT(8), color: COLORS.mediumGray }),
              new TextRun({ children: [PageNumber.CURRENT], font: FONTS.mono, size: PT(8), color: COLORS.gold }),
            ],
          })],
        }),
      },
      children: [
        ...buildCoverPage(),
        ...buildTableOfContents(),
        ...buildSectionI(),
        ...buildSectionII(),
        ...buildSectionIII(),
        ...buildSectionIV(),
        ...buildSectionV(),
        ...buildSectionVI(),
        ...buildSectionVII(),
        ...buildSectionVIII(),
        ...buildSectionIX(),
        ...buildSectionX(),
        ...buildAppendices(),
      ],
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputDir = __dirname + '/../outputs/docx';
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = outputDir + '/BPR-Intelligence-Blueprint-Estrategico.docx';
  fs.writeFileSync(outputPath, buffer);

  console.log(`✓ Documento gerado com sucesso!`);
  console.log(`  Arquivo: ${outputPath}`);
  console.log(`  Tamanho: ${(buffer.length / 1024).toFixed(0)} KB`);
  console.log(`\n  Seções: 10 + Apêndices`);
  console.log(`  I.   Executive Summary`);
  console.log(`  II.  Diagnóstico de Mercado`);
  console.log(`  III. Modelo BPR: Augmented Advisory`);
  console.log(`  IV.  Arquitetura de Inteligência`);
  console.log(`  V.   Roadmap de Implementação`);
  console.log(`  VI.  Modelo Financeiro`);
  console.log(`  VII. Playbooks & Análise Competitiva`);
  console.log(`  VIII.Governança e Compliance`);
  console.log(`  IX.  O Pacote BPR Intelligence`);
  console.log(`  X.   Call-to-Action`);
  console.log(`  —    Apêndices (Glossário, Stack, Referências)`);
}

main().catch(err => {
  console.error('Erro na geração:', err);
  process.exit(1);
});
