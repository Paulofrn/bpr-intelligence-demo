/**
 * BPR Intelligence — Pitch Deck Generator
 * Etapa 2: ~25 slides PPTX para reunião presencial com CEOs
 *
 * Gera: bpr-project/outputs/pptx/BPR-Intelligence-Pitch-Deck.pptx
 * Dependência: npm install pptxgenjs
 */

const PptxGenJS = require('pptxgenjs');
const path = require('path');

// ─────────────────────────────────────────────
// DESIGN SYSTEM BPR
// ─────────────────────────────────────────────

const COLORS = {
  dark: '0D0D0D',
  charcoal: '1A1A2E',
  gold: 'C9B037',
  goldLight: 'E0C94A',
  cyan: '00A3B5',
  white: 'FFFFFF',
  lightGray: 'F5F5F5',
  medGray: '666666',
  cardBg: '2A2A3E',
  cardBorder: '3A3A4E',
};

const FONT = {
  title: 'Georgia',
  body: 'Calibri',
};

// ─────────────────────────────────────────────
// UNICODE ICONS (fallback seguro — funciona em qualquer sistema)
// ─────────────────────────────────────────────

const ICO = {
  trending: '\u25B2',   // ▲
  clock: '\u23F0',      // ⏰
  money: '\u2747',      // ❇
  chart: '\u2194',      // ↔
  warning: '\u26A0',    // ⚠
  check: '\u2713',      // ✓
  cross: '\u2717',      // ✗
  star: '\u2605',       // ★
  diamond: '\u25C6',    // ◆
  circle: '\u25CF',     // ●
  arrow: '\u279C',      // ➜
  lock: '\u2756',       // ❖
  user: '\u263A',       // ☺
  brain: '\u2726',      // ✦
  target: '\u25CE',     // ◎
  building: '\u2302',   // ⌂
  globe: '\u2741',      // ❁
  shield: '\u2742',     // ❂
  rocket: '\u2738',     // ✸
  lightbulb: '\u2600',  // ☀
  handshake: '\u2660',  // ♠
  key: '\u2736',        // ✶
  doc: '\u2759',        // ❙
  bar: '\u2759',        // ❙
};

// ─────────────────────────────────────────────
// PRESENTATION SETUP
// ─────────────────────────────────────────────

function createPresentation() {
  const pptx = new PptxGenJS();
  pptx.author = 'BPR Intelligence';
  pptx.company = 'BPR Intelligence';
  pptx.subject = 'Pitch Deck — Imobiliárias de Alto Padrão';
  pptx.title = 'BPR Intelligence Pitch Deck';
  pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 in

  // Define slide masters
  pptx.defineSlideMaster({
    title: 'TITLE_DARK',
    background: { color: COLORS.dark },
  });
  pptx.defineSlideMaster({
    title: 'CONTENT_CHARCOAL',
    background: { color: COLORS.charcoal },
  });
  pptx.defineSlideMaster({
    title: 'HIGHLIGHT_GOLD',
    background: { color: COLORS.dark },
  });

  return pptx;
}

// ─────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────

function addGoldBar(slide) {
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.08, h: '100%',
    fill: { color: COLORS.gold },
  });
}

function addConfidential(slide) {
  slide.addText('CONFIDENCIAL', {
    x: 0.5, y: 6.95, w: 3, h: 0.35,
    fontSize: 10, fontFace: FONT.body,
    color: COLORS.gold, align: 'left',
  });
}

function addSlideNumber(slide, num) {
  slide.addText(`${num}`, {
    x: 12.3, y: 6.95, w: 0.7, h: 0.35,
    fontSize: 10, fontFace: FONT.body,
    color: COLORS.medGray, align: 'right',
  });
}

function addPageFooter(slide, num) {
  addSlideNumber(slide, num);
}

function addSectionTitle(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x || 0.7, y: opts.y || 0.5, w: opts.w || 11.9, h: 0.7,
    fontSize: opts.fontSize || 36, fontFace: FONT.title, bold: true,
    color: opts.color || COLORS.white,
  });
}

function addSubtitle(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x || 0.7, y: opts.y || 1.25, w: opts.w || 11.9, h: 0.5,
    fontSize: opts.fontSize || 20, fontFace: FONT.body,
    color: opts.color || COLORS.medGray,
  });
}

function addIconCircle(slide, icon, x, y, size = 0.6, color = COLORS.gold) {
  slide.addShape('ellipse', {
    x: x, y: y, w: size, h: size,
    fill: { color: color }, line: { color: color },
  });
  slide.addText(icon, {
    x: x, y: y, w: size, h: size,
    fontSize: size * 24, fontFace: FONT.body, bold: true,
    color: COLORS.dark, align: 'center', valign: 'middle',
  });
}

function addStatCard(slide, { icon, stat, label, source, x, y, w, h }) {
  // Card background
  slide.addShape('roundRect', {
    x, y, w, h: h || 3.8,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.cardBorder, width: 1 },
  });
  // Icon
  slide.addText(icon, {
    x: x + 0.2, y: y + 0.3, w: 0.7, h: 0.7,
    fontSize: 28, fontFace: FONT.body,
    color: COLORS.gold, align: 'center', valign: 'middle',
  });
  // Stat number
  slide.addText(stat, {
    x: x + 0.15, y: y + 1.1, w: w - 0.3, h: 0.9,
    fontSize: 44, fontFace: FONT.title, bold: true,
    color: COLORS.gold, align: 'center', valign: 'middle',
  });
  // Label
  slide.addText(label, {
    x: x + 0.25, y: y + 2.0, w: w - 0.5, h: 0.9,
    fontSize: 13, fontFace: FONT.body,
    color: COLORS.white, align: 'center', valign: 'top',
    lineSpacingMultiple: 1.1,
  });
  // Source
  if (source) {
    slide.addText(source, {
      x: x + 0.25, y: y + 2.9, w: w - 0.5, h: 0.5,
      fontSize: 10, fontFace: FONT.body, italic: true,
      color: COLORS.medGray, align: 'center', valign: 'top',
    });
  }
}

function addCard(slide, { title, body, x, y, w, h, icon, accentColor }) {
  const accent = accentColor || COLORS.gold;
  slide.addShape('roundRect', {
    x, y, w, h,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: accent, width: 1.5 },
  });
  // Accent top bar
  slide.addShape('rect', {
    x: x + 0.05, y: y + 0.05, w: w - 0.1, h: 0.06,
    fill: { color: accent },
  });
  if (icon) {
    slide.addText(icon, {
      x: x + 0.2, y: y + 0.25, w: 0.5, h: 0.5,
      fontSize: 22, color: accent, align: 'center',
    });
  }
  slide.addText(title, {
    x: x + (icon ? 0.7 : 0.25), y: y + 0.25, w: w - (icon ? 1.0 : 0.5), h: 0.45,
    fontSize: 15, fontFace: FONT.title, bold: true,
    color: COLORS.white,
  });
  slide.addText(body, {
    x: x + 0.25, y: y + 0.8, w: w - 0.5, h: h - 1.0,
    fontSize: 12, fontFace: FONT.body,
    color: COLORS.lightGray, valign: 'top',
    lineSpacingMultiple: 1.15,
  });
}

// ─────────────────────────────────────────────
// SLIDES
// ─────────────────────────────────────────────

function slide01_Cover(pptx) {
  const slide = pptx.addSlide({ masterName: 'TITLE_DARK' });

  // Icon accent
  slide.addText(ICO.diamond, {
    x: 0, y: 1.0, w: 13.33, h: 0.6,
    fontSize: 24, color: COLORS.gold, align: 'center',
  });

  // BPR Logo text
  slide.addText('BPR', {
    x: 0, y: 1.6, w: 13.33, h: 1.2,
    fontSize: 72, fontFace: FONT.title, bold: true,
    color: COLORS.gold, align: 'center',
  });
  slide.addText('INTELLIGENCE', {
    x: 0, y: 2.7, w: 13.33, h: 0.7,
    fontSize: 28, fontFace: FONT.body,
    color: COLORS.white, align: 'center', charSpacing: 8,
  });

  // Divider line
  slide.addShape('rect', {
    x: 5.2, y: 3.55, w: 2.9, h: 0.03,
    fill: { color: COLORS.gold },
  });

  slide.addText('Inteligência Artificial para Imobiliárias de Alto Padrão', {
    x: 2, y: 3.8, w: 9.33, h: 0.6,
    fontSize: 18, fontFace: FONT.body,
    color: COLORS.medGray, align: 'center',
  });

  slide.addText('Fevereiro 2026', {
    x: 0, y: 4.6, w: 13.33, h: 0.4,
    fontSize: 14, fontFace: FONT.body,
    color: COLORS.medGray, align: 'center',
  });

  addConfidential(slide);

  slide.addNotes('Boa tarde. Antes de começar, este material é confidencial — peço que não compartilhe. O que vou apresentar nos próximos 25 minutos pode mudar a forma como a sua imobiliária opera.');
}

function slide02_Agenda(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'Agenda');
  addPageFooter(slide, 2);

  const items = [
    { num: '01', title: 'O Mercado Hoje', icon: ICO.chart },
    { num: '02', title: 'As Fricções', icon: ICO.warning },
    { num: '03', title: 'A Visão BPR', icon: ICO.lightbulb },
    { num: '04', title: 'O Ecossistema', icon: ICO.brain },
    { num: '05', title: 'Os Números', icon: ICO.trending },
    { num: '06', title: 'O Pacote', icon: ICO.key },
  ];

  const col1 = items.slice(0, 3);
  const col2 = items.slice(3, 6);

  [col1, col2].forEach((col, ci) => {
    const baseX = ci === 0 ? 1.2 : 7.2;
    col.forEach((item, i) => {
      const yPos = 1.8 + i * 1.5;
      // Number accent
      slide.addText(item.num, {
        x: baseX, y: yPos, w: 0.7, h: 0.7,
        fontSize: 24, fontFace: FONT.title, bold: true,
        color: COLORS.gold, align: 'center', valign: 'middle',
      });
      // Divider
      slide.addShape('rect', {
        x: baseX + 0.8, y: yPos + 0.15, w: 0.03, h: 0.4,
        fill: { color: COLORS.gold },
      });
      // Title
      slide.addText(`${item.icon}  ${item.title}`, {
        x: baseX + 1.1, y: yPos, w: 4, h: 0.7,
        fontSize: 20, fontFace: FONT.body,
        color: COLORS.white, valign: 'middle',
      });
    });
  });

  slide.addNotes('Vou seguir essa estrutura. Primeiro entender o problema, depois a solução, e no final os números e o que você leva.');
}

function slide03_MercadoHoje(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'O Mercado Hoje');
  addSubtitle(slide, 'Barra da Tijuca — o epicentro do luxo carioca');
  addPageFooter(slide, 3);

  const stats = [
    { icon: ICO.building, stat: 'R$ 1,6 Bi', label: 'VGV Barra da Tijuca\n1º quadrimestre 2025', source: 'ABRAINC 2025' },
    { icon: ICO.trending, stat: '+75%', label: 'Crescimento do segmento\nde luxo no RJ', source: 'ABRAINC 2025' },
    { icon: ICO.chart, stat: '+19%', label: 'Valorização do m² na Barra\n2023-2025', source: 'ABRAINC' },
  ];

  stats.forEach((s, i) => {
    const xPos = 0.7 + i * 4.1;
    addStatCard(slide, { ...s, x: xPos, y: 2.2, w: 3.7 });
  });

  slide.addNotes('A Barra movimentou R$1,6 bilhão só no primeiro quadrimestre. O segmento de luxo cresceu 75%. O metro quadrado valorizou 19% em dois anos. Não é um mercado parado — é um mercado explodindo onde quem tem inteligência de dados captura desproporcional.');
}

function slide04_FriccoesdoCEO(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'As Fricções do CEO');
  addSubtitle(slide, 'O que seu cliente de R$ 10 milhões enfrenta');
  addPageFooter(slide, 4);

  const cards = [
    {
      icon: ICO.clock, title: '10+ semanas',
      body: 'Busca do comprador (NAR 2025).\nNo luxo: 10+ meses (Concierge Auctions)',
      accentColor: COLORS.gold,
    },
    {
      icon: ICO.money, title: '9-17% sobrepreço',
      body: 'Sem representação exclusiva\n(Ridgestone / Bright MLS-Drexel)',
      accentColor: COLORS.cyan,
    },
    {
      icon: ICO.chart, title: '30% fall-through',
      body: 'vs. <10% com buyer\'s agent\n(Black Brick UK)',
      accentColor: COLORS.gold,
    },
  ];

  cards.forEach((c, i) => {
    addCard(slide, { ...c, x: 0.7 + i * 4.1, y: 2.2, w: 3.7, h: 3.8 });
  });

  slide.addNotes('Essas são as dores que seu cliente de R$10 milhões sente. Ele gasta meses procurando, paga mais do que deveria, e 1 em cada 3 negócios cai. Isso tudo tem custo — e com custo-hora executivo entre R$400-600 segundo a Page Executive, cada semana perdida custa R$16-24 mil ao seu cliente.');
}

function slide05_CustoInacao(pptx) {
  const slide = pptx.addSlide({ masterName: 'HIGHLIGHT_GOLD' });

  addGoldBar(slide);
  addPageFooter(slide, 5);

  slide.addText(ICO.warning, {
    x: 0.5, y: 0.7, w: 12.33, h: 0.6,
    fontSize: 28, color: COLORS.gold, align: 'center',
  });

  slide.addText('56%', {
    x: 0.5, y: 1.2, w: 12.33, h: 1.5,
    fontSize: 96, fontFace: FONT.title, bold: true,
    color: COLORS.gold, align: 'center',
  });

  slide.addText('dos compradores dizem que encontrar o imóvel certo\né o aspecto mais difícil da aquisição', {
    x: 2, y: 2.8, w: 9.33, h: 0.9,
    fontSize: 20, fontFace: FONT.body,
    color: COLORS.white, align: 'center',
    lineSpacingMultiple: 1.2,
  });

  slide.addText('NAR — National Association of Realtors, 2025', {
    x: 2, y: 3.7, w: 9.33, h: 0.4,
    fontSize: 11, fontFace: FONT.body, italic: true,
    color: COLORS.medGray, align: 'center',
  });

  // Divider
  slide.addShape('rect', {
    x: 5.5, y: 4.4, w: 2.33, h: 0.02,
    fill: { color: COLORS.gold },
  });

  slide.addText('78% dos executivos do setor imobiliário identificam\nadoção de tecnologia como prioridade #1', {
    x: 2, y: 4.7, w: 9.33, h: 0.8,
    fontSize: 18, fontFace: FONT.body,
    color: COLORS.lightGray, align: 'center',
    lineSpacingMultiple: 1.2,
  });

  slide.addText('PwC — 29th Global CEO Survey', {
    x: 2, y: 5.5, w: 9.33, h: 0.4,
    fontSize: 11, fontFace: FONT.body, italic: true,
    color: COLORS.medGray, align: 'center',
  });

  slide.addNotes('Mais da metade dos compradores dizem que o mais difícil é achar o imóvel certo. E 78% dos seus pares no mercado já identificam tecnologia como prioridade número 1. A questão não é SE alguém vai resolver isso — é QUEM vai resolver primeiro na sua região.');
}

function slide06_VisaoBPR(pptx) {
  const slide = pptx.addSlide({ masterName: 'TITLE_DARK' });

  addPageFooter(slide, 6);

  slide.addText(ICO.brain, {
    x: 0, y: 1.5, w: 13.33, h: 0.8,
    fontSize: 40, color: COLORS.gold, align: 'center',
  });

  slide.addText('Da imobiliária que vende\npara a imobiliária que pensa.', {
    x: 1.5, y: 2.4, w: 10.33, h: 1.8,
    fontSize: 38, fontFace: FONT.title, bold: true,
    color: COLORS.white, align: 'center',
    lineSpacingMultiple: 1.2,
  });

  slide.addText('5 ferramentas de IA integradas. Uma plataforma de inteligência.', {
    x: 2, y: 4.4, w: 9.33, h: 0.6,
    fontSize: 18, fontFace: FONT.body,
    color: COLORS.gold, align: 'center',
  });

  slide.addNotes('O BPR Intelligence transforma a imobiliária de um modelo artesanal — dependente de feeling e relacionamento — em uma plataforma de inteligência que usa dados para encontrar, avaliar, negociar e fidelizar. Sem substituir o corretor. Potencializando ele.');
}

function slide07_Ecossistema(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'Ecossistema BPR Intelligence');
  addPageFooter(slide, 7);

  // Central hub
  slide.addShape('ellipse', {
    x: 5.17, y: 2.8, w: 3.0, h: 1.4,
    fill: { color: COLORS.dark },
    line: { color: COLORS.gold, width: 2.5 },
  });
  slide.addText('BPR\nIntelligence', {
    x: 5.17, y: 2.8, w: 3.0, h: 1.4,
    fontSize: 18, fontFace: FONT.title, bold: true,
    color: COLORS.gold, align: 'center', valign: 'middle',
    lineSpacingMultiple: 1.1,
  });

  const nodes = [
    { label: 'Digital Twin',       icon: ICO.user,      x: 1.0,  y: 1.3 },
    { label: 'Crystal Ball',       icon: ICO.brain,     x: 9.8,  y: 1.3 },
    { label: 'Negociação IA',      icon: ICO.handshake, x: 0.5,  y: 4.8 },
    { label: 'Family Office',      icon: ICO.building,  x: 10.3, y: 4.8 },
    { label: 'Alpha Intelligence', icon: ICO.globe,     x: 5.17, y: 5.8 },
  ];

  const cx = 6.67, cy = 3.5; // center of hub

  nodes.forEach((n) => {
    const nCx = n.x + 1.25;
    const nCy = n.y + 0.5;
    // Connector line
    slide.addShape('line', {
      x: Math.min(cx, nCx), y: Math.min(cy, nCy),
      w: Math.abs(cx - nCx), h: Math.abs(cy - nCy),
      line: { color: COLORS.gold, width: 1, dashType: 'dash' },
      flipH: nCx > cx ? false : true,
      flipV: nCy > cy ? false : true,
    });
    // Node box
    slide.addShape('roundRect', {
      x: n.x, y: n.y, w: 2.5, h: 1.0,
      rectRadius: 0.08,
      fill: { color: COLORS.cardBg },
      line: { color: COLORS.gold, width: 1 },
    });
    slide.addText(`${n.icon}  ${n.label}`, {
      x: n.x, y: n.y, w: 2.5, h: 1.0,
      fontSize: 14, fontFace: FONT.body, bold: true,
      color: COLORS.white, align: 'center', valign: 'middle',
    });
  });

  slide.addNotes('São 5 ferramentas que funcionam integradas. Cada uma resolve uma fricção específica que mostrei antes. Vou passar por cada uma rapidamente.');
}

function slide08_DigitalTwin(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'Digital Twin do Comprador');
  addPageFooter(slide, 8);

  // Left column — text
  addCard(slide, {
    icon: ICO.user, title: 'O que faz',
    body: 'Perfil completo do cliente — 47 dimensões mapeadas automaticamente.',
    x: 0.7, y: 1.8, w: 5.5, h: 2.0,
  });

  addCard(slide, {
    icon: ICO.target, title: 'Benefício',
    body: 'Curadoria precisa — zero visitas desnecessárias.',
    x: 0.7, y: 4.1, w: 5.5, h: 2.0, accentColor: COLORS.cyan,
  });

  // Right column — stat
  slide.addShape('roundRect', {
    x: 6.8, y: 1.8, w: 5.8, h: 4.3,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.gold, width: 1 },
  });
  slide.addText(ICO.user, {
    x: 6.8, y: 2.1, w: 5.8, h: 1.0,
    fontSize: 48, color: COLORS.gold, align: 'center',
  });
  slide.addText('56%', {
    x: 6.8, y: 3.1, w: 5.8, h: 1.0,
    fontSize: 60, fontFace: FONT.title, bold: true,
    color: COLORS.gold, align: 'center',
  });
  slide.addText('dos compradores dizem que encontrar\no imóvel certo é o mais difícil', {
    x: 7.3, y: 4.1, w: 4.8, h: 0.8,
    fontSize: 14, fontFace: FONT.body,
    color: COLORS.white, align: 'center',
    lineSpacingMultiple: 1.15,
  });
  slide.addText('NAR 2025', {
    x: 7.3, y: 4.9, w: 4.8, h: 0.4,
    fontSize: 10, fontFace: FONT.body, italic: true,
    color: COLORS.medGray, align: 'center',
  });

  slide.addNotes('Em vez do corretor perguntar \'o que você procura?\' e anotar num papel, o Digital Twin mapeia 47 dimensões do comprador. Desde o óbvio — metragem, bairro — até o implícito: tolerância a ruído, padrão de luminosidade, proximidade de escola. Isso elimina as visitas que desperdiçam tempo.');
}

function slide09_CrystalBall(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'Crystal Ball — IA Preditiva');
  addPageFooter(slide, 9);

  // Left — features
  addCard(slide, {
    icon: ICO.brain, title: 'O que faz',
    body: 'Prevê disponibilidade antes do mercado. Identifica oportunidades em 45-90 dias.',
    x: 0.7, y: 1.8, w: 5.5, h: 2.0,
  });

  addCard(slide, {
    icon: ICO.lock, title: 'Acesso off-market',
    body: 'Até 30% do luxo é off-market (Pacific Union/Redfin). Acesso antecipado = 10-17% melhor.',
    x: 0.7, y: 4.1, w: 5.5, h: 2.0, accentColor: COLORS.cyan,
  });

  // Right — precision stat
  slide.addShape('roundRect', {
    x: 6.8, y: 1.8, w: 5.8, h: 4.3,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.cyan, width: 1 },
  });
  slide.addText(ICO.brain, {
    x: 6.8, y: 2.1, w: 5.8, h: 1.0,
    fontSize: 48, color: COLORS.cyan, align: 'center',
  });
  slide.addText('70-85%', {
    x: 6.8, y: 3.1, w: 5.8, h: 1.0,
    fontSize: 56, fontFace: FONT.title, bold: true,
    color: COLORS.gold, align: 'center',
  });
  slide.addText('Precisão preditiva\n(conservador)', {
    x: 7.3, y: 4.1, w: 4.8, h: 0.7,
    fontSize: 14, fontFace: FONT.body,
    color: COLORS.white, align: 'center',
    lineSpacingMultiple: 1.15,
  });
  slide.addText('Literatura acadêmica: 88-98% (MDPI 2024)', {
    x: 7.3, y: 4.8, w: 4.8, h: 0.4,
    fontSize: 10, fontFace: FONT.body, italic: true,
    color: COLORS.medGray, align: 'center',
  });

  slide.addNotes('Esta é a ferramenta mais diferenciadora. Até 30% dos imóveis premium nunca chegam ao mercado aberto — são vendidos por inventário, divórcio, partilha. O Crystal Ball monitora sinais públicos e prevê com 70-85% de precisão quais imóveis estarão disponíveis em 45-90 dias. Quem acessa antes, negocia 10-17% melhor.');
}

function slide10_NegociacaoIA(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'Motor de Negociação Inteligente');
  addPageFooter(slide, 10);

  // Left — description
  addCard(slide, {
    icon: ICO.handshake, title: 'O que faz',
    body: 'Analisa histórico, perfil do vendedor e mercado para otimizar ofertas.',
    x: 0.7, y: 1.8, w: 5.5, h: 2.0,
  });

  addCard(slide, {
    icon: ICO.money, title: 'Resultado comprovado',
    body: 'Economia média de 9-9,5% (Ridgestone UK 2025 / Black Brick London)',
    x: 0.7, y: 4.1, w: 5.5, h: 2.0, accentColor: COLORS.gold,
  });

  // Right — big stat
  slide.addShape('roundRect', {
    x: 6.8, y: 1.8, w: 5.8, h: 4.3,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.gold, width: 1 },
  });
  slide.addText(ICO.money, {
    x: 6.8, y: 2.1, w: 5.8, h: 1.0,
    fontSize: 48, color: COLORS.gold, align: 'center',
  });
  slide.addText('9-10%', {
    x: 6.8, y: 3.1, w: 5.8, h: 1.0,
    fontSize: 60, fontFace: FONT.title, bold: true,
    color: COLORS.gold, align: 'center',
  });
  slide.addText('economia média por transação', {
    x: 7.3, y: 4.1, w: 4.8, h: 0.5,
    fontSize: 14, fontFace: FONT.body,
    color: COLORS.white, align: 'center',
  });
  slide.addText('Em R$10MM = R$900k-1MM de economia', {
    x: 7.3, y: 4.6, w: 4.8, h: 0.5,
    fontSize: 13, fontFace: FONT.body, bold: true,
    color: COLORS.cyan, align: 'center',
  });

  slide.addNotes('Buyer\'s agents no mercado britânico — o mais maduro do mundo — geram em média 9-10% de economia. Num imóvel de R$10 milhões, são R$900 mil a R$1 milhão. No Brasil, onde esse serviço não existe de forma estruturada, a assimetria é ainda maior.');
}

function slide11_FamilyAlpha(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'Family Office + Alpha Intelligence');
  addSubtitle(slide, 'Receita recorrente');
  addPageFooter(slide, 11);

  // Left card — Family Office
  slide.addShape('roundRect', {
    x: 0.7, y: 2.2, w: 5.7, h: 4.0,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.gold, width: 1.5 },
  });
  slide.addText(`${ICO.building}  Family Office Imobiliário`, {
    x: 1.0, y: 2.4, w: 5.1, h: 0.6,
    fontSize: 18, fontFace: FONT.title, bold: true,
    color: COLORS.gold,
  });
  slide.addText('Gestão de portfólio: patrimônio,\nmanutenção, valorização', {
    x: 1.0, y: 3.1, w: 5.1, h: 0.9,
    fontSize: 14, fontFace: FONT.body,
    color: COLORS.white, lineSpacingMultiple: 1.2,
  });
  slide.addText('R$ 5-15k/mês por família', {
    x: 1.0, y: 4.2, w: 5.1, h: 0.5,
    fontSize: 15, fontFace: FONT.body, bold: true,
    color: COLORS.cyan,
  });
  slide.addText('De transação única a cliente vitalício.', {
    x: 1.0, y: 4.9, w: 5.1, h: 0.5,
    fontSize: 13, fontFace: FONT.body, italic: true,
    color: COLORS.medGray,
  });

  // Right card — Alpha Intelligence
  slide.addShape('roundRect', {
    x: 6.9, y: 2.2, w: 5.7, h: 4.0,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.cyan, width: 1.5 },
  });
  slide.addText(`${ICO.globe}  Alpha Intelligence`, {
    x: 7.2, y: 2.4, w: 5.1, h: 0.6,
    fontSize: 18, fontFace: FONT.title, bold: true,
    color: COLORS.cyan,
  });
  slide.addText('Inteligência de mercado\npara decisões de investimento', {
    x: 7.2, y: 3.1, w: 5.1, h: 0.9,
    fontSize: 14, fontFace: FONT.body,
    color: COLORS.white, lineSpacingMultiple: 1.2,
  });
  slide.addText('R$ 5-20k/mês — Dashboard B2B', {
    x: 7.2, y: 4.2, w: 5.1, h: 0.5,
    fontSize: 15, fontFace: FONT.body, bold: true,
    color: COLORS.gold,
  });
  slide.addText('Dados como serviço.', {
    x: 7.2, y: 4.9, w: 5.1, h: 0.5,
    fontSize: 13, fontFace: FONT.body, italic: true,
    color: COLORS.medGray,
  });

  slide.addNotes('Family Office transforma cliente de uma transação em cliente para a vida. Em vez de ganhar na venda e nunca mais ver o cliente, você gerencia o patrimônio dele e cobra retainer mensal. Alpha Intelligence é o braço B2B — dados de mercado vendidos como serviço para fundos, family offices, incorporadoras.');
}

function slide12_Moat(pptx) {
  const slide = pptx.addSlide({ masterName: 'HIGHLIGHT_GOLD' });

  addGoldBar(slide);
  addPageFooter(slide, 12);

  slide.addText(ICO.lock, {
    x: 0.5, y: 0.4, w: 12.33, h: 0.5,
    fontSize: 24, color: COLORS.gold, align: 'center',
  });

  slide.addText('18 meses', {
    x: 0.5, y: 0.8, w: 12.33, h: 1.3,
    fontSize: 72, fontFace: FONT.title, bold: true,
    color: COLORS.gold, align: 'center',
  });

  slide.addText('Inteligência acumulativa — vantagem que não se compra depois', {
    x: 2, y: 2.1, w: 9.33, h: 0.6,
    fontSize: 20, fontFace: FONT.body,
    color: COLORS.white, align: 'center',
  });

  // Timeline
  const months = ['Mês 1', 'Mês 6', 'Mês 12', 'Mês 18'];
  const labels = ['Setup +\nprimeiros dados', 'Digital Twin\ntreinado', 'Crystal Ball\ncalibrado', 'Moat\nconsolidado'];

  // Timeline line
  slide.addShape('rect', {
    x: 1.5, y: 3.7, w: 10.33, h: 0.04,
    fill: { color: COLORS.gold },
  });

  months.forEach((m, i) => {
    const xPos = 1.5 + i * 2.8;
    // Dot
    slide.addShape('ellipse', {
      x: xPos + 0.6, y: 3.52, w: 0.4, h: 0.4,
      fill: { color: COLORS.gold },
    });
    // Month label
    slide.addText(m, {
      x: xPos, y: 3.0, w: 1.6, h: 0.4,
      fontSize: 14, fontFace: FONT.body, bold: true,
      color: COLORS.gold, align: 'center',
    });
    // Description
    slide.addText(labels[i], {
      x: xPos - 0.1, y: 4.1, w: 1.8, h: 0.8,
      fontSize: 12, fontFace: FONT.body,
      color: COLORS.white, align: 'center',
      lineSpacingMultiple: 1.1,
    });
  });

  // PropTech stat
  slide.addText('IA imobiliária cresce 42%/ano vs. 24% proptech convencional (PitchBook/CRETI 2025)', {
    x: 2, y: 5.5, w: 9.33, h: 0.4,
    fontSize: 12, fontFace: FONT.body, italic: true,
    color: COLORS.medGray, align: 'center',
  });

  slide.addNotes('Cada transação alimenta o modelo. Cada dado de comportamento treina o Digital Twin. Em 18 meses, sua base de inteligência é tão profunda que nenhum concorrente consegue replicar — mesmo copiando a tecnologia. Os dados são o moat.');
}

function slide13_TAM(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, `${ICO.target}  Mercado Endereçável`);
  addPageFooter(slide, 13);

  // Concentric circles — outermost to innermost
  const circles = [
    { label: 'TAM', value: 'R$ 28,8 Bi', desc: 'Mercado RJ — 9 meses (ABRAINC 2024)', r: 4.2, color: '2A2A3E', lineColor: COLORS.gold },
    { label: 'SAM', value: 'R$ 1,6 Bi', desc: 'Barra luxo — 1 quad (ABRAINC 2025)', r: 2.8, color: '333350', lineColor: COLORS.cyan },
    { label: 'SOM', value: '4 condomínios', desc: 'Mansões, Península, Malibu, Golf', r: 1.5, color: '3D3D58', lineColor: COLORS.gold },
  ];

  const cx = 6.67, cy = 4.0;

  circles.forEach((c) => {
    slide.addShape('ellipse', {
      x: cx - c.r / 2, y: cy - c.r / 2, w: c.r, h: c.r,
      fill: { color: c.color, transparency: 40 },
      line: { color: c.lineColor, width: 1.5 },
    });
  });

  // Labels - positioned outside circles
  slide.addText([
    { text: 'TAM  ', options: { fontSize: 12, bold: true, color: COLORS.gold } },
    { text: 'R$ 28,8 Bi\n', options: { fontSize: 16, bold: true, color: COLORS.white } },
    { text: 'Mercado RJ 9 meses (ABRAINC)', options: { fontSize: 10, color: COLORS.medGray } },
  ], { x: 9.5, y: 1.8, w: 3.3, h: 1.2 });

  slide.addText([
    { text: 'SAM  ', options: { fontSize: 12, bold: true, color: COLORS.cyan } },
    { text: 'R$ 1,6 Bi\n', options: { fontSize: 16, bold: true, color: COLORS.white } },
    { text: 'Barra luxo 1º quad (ABRAINC)', options: { fontSize: 10, color: COLORS.medGray } },
  ], { x: 9.5, y: 3.2, w: 3.3, h: 1.2 });

  slide.addText([
    { text: 'SOM  ', options: { fontSize: 12, bold: true, color: COLORS.gold } },
    { text: '4 condomínios\n', options: { fontSize: 16, bold: true, color: COLORS.white } },
    { text: 'Mansões, Península, Malibu, Golf', options: { fontSize: 10, color: COLORS.medGray } },
  ], { x: 9.5, y: 4.6, w: 3.3, h: 1.2 });

  slide.addNotes('O mercado total do Rio nos primeiros 9 meses de 2024 foi R$28,8 bilhões. A Barra sozinha representa um terço. Nosso foco são os 4 condomínios de ultra-alto padrão — um mercado concentrado onde dados fazem mais diferença.');
}

function slide14_ModeloReceita(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'Modelo de Receita — 4 Fontes');
  addPageFooter(slide, 14);

  const cards = [
    {
      icon: ICO.handshake, title: 'Buyer\'s Fee',
      body: '3-5% success fee\nR$ 150-500k/transação',
      x: 0.7, y: 2.3, w: 5.7, h: 2.2, accentColor: COLORS.gold,
    },
    {
      icon: ICO.building, title: 'Family Office',
      body: 'Retainer R$ 5-15k/mês',
      x: 6.9, y: 2.3, w: 5.7, h: 2.2, accentColor: COLORS.cyan,
    },
    {
      icon: ICO.globe, title: 'Alpha Intelligence',
      body: 'Assinatura B2B R$ 5-20k/mês',
      x: 0.7, y: 4.7, w: 5.7, h: 2.2, accentColor: COLORS.cyan,
    },
    {
      icon: ICO.star, title: 'Repositioning',
      body: 'Advisory R$ 30-100k + 20% ágio',
      x: 6.9, y: 4.7, w: 5.7, h: 2.2, accentColor: COLORS.gold,
    },
  ];

  cards.forEach((c) => addCard(slide, c));

  slide.addNotes('São 4 fontes de receita, sendo que 2 delas são recorrentes — Family Office e Alpha. Isso reduz a dependência do modelo transacional e cria previsibilidade. O benchmark de mercado para buyer\'s agent é 3-5% de success fee.');
}

function slide15_UnitEconomics(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'Unit Economics');
  addPageFooter(slide, 15);

  const metrics = [
    { label: 'LTV / CAC', value: '5-8x', note: 'Benchmark setor: 3-4x (Phoenix Strategy Group 2025)', color: COLORS.gold },
    { label: 'CAC Payback', value: '~14 meses', note: 'Projeção cenário base', color: COLORS.cyan },
    { label: 'Receita Recorrente', value: '35%+', note: 'Family Office + Alpha Intelligence', color: COLORS.gold },
    { label: 'Cash Buyers (luxo)', value: '88%', note: 'Sem dependência de crédito (Sotheby\'s 2025)', color: COLORS.cyan },
  ];

  metrics.forEach((m, i) => {
    const yPos = 1.8 + i * 1.3;
    // Background row
    slide.addShape('roundRect', {
      x: 0.7, y: yPos, w: 11.9, h: 1.1,
      rectRadius: 0.06,
      fill: { color: i % 2 === 0 ? COLORS.cardBg : COLORS.charcoal },
    });
    // Label
    slide.addText(m.label, {
      x: 1.0, y: yPos, w: 3.5, h: 1.1,
      fontSize: 16, fontFace: FONT.body, bold: true,
      color: COLORS.white, valign: 'middle',
    });
    // Value
    slide.addText(m.value, {
      x: 4.5, y: yPos, w: 2.5, h: 1.1,
      fontSize: 28, fontFace: FONT.title, bold: true,
      color: m.color, align: 'center', valign: 'middle',
    });
    // Note
    slide.addText(m.note, {
      x: 7.2, y: yPos, w: 5.0, h: 1.1,
      fontSize: 12, fontFace: FONT.body, italic: true,
      color: COLORS.medGray, valign: 'middle',
    });
  });

  // PropTech investment
  slide.addText(`${ICO.trending}  Investimento global em proptech: US$ 16,7 bi em 2025 (+68% YoY — CRETI)`, {
    x: 0.7, y: 6.3, w: 11.9, h: 0.5,
    fontSize: 11, fontFace: FONT.body, italic: true,
    color: COLORS.medGray,
  });

  slide.addNotes('O LTV/CAC de 5-8x está acima do benchmark de mercado que é 3-4x para best-in-class. Isso acontece porque o modelo combina transação com recorrência. E um dado importante: 88% dos compradores de luxo pagam em cash — sem dependência de crédito.');
}

function slide16_ProjecaoFinanceira(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'Projeção Financeira');
  addPageFooter(slide, 16);

  // Simulated bar chart using shapes
  const months = [
    { m: '1', v: 0 }, { m: '2', v: 0 }, { m: '3', v: 15 },
    { m: '4', v: 25 }, { m: '5', v: 35 }, { m: '6', v: 50 },
    { m: '7', v: 55 }, { m: '8', v: 65 }, { m: '9', v: 75 },
    { m: '10', v: 80 }, { m: '11', v: 85 }, { m: '12', v: 95 },
    { m: '13', v: 100 }, { m: '14', v: 110 }, { m: '15', v: 120 },
    { m: '16', v: 135 }, { m: '17', v: 150 }, { m: '18', v: 170 },
  ];

  const chartX = 0.9, chartY = 1.8, chartW = 11.5, chartH = 3.5;
  const barW = chartW / months.length - 0.1;
  const maxV = 180;

  // Baseline
  slide.addShape('rect', {
    x: chartX, y: chartY + chartH, w: chartW, h: 0.02,
    fill: { color: COLORS.medGray },
  });

  months.forEach((d, i) => {
    const barH = (d.v / maxV) * chartH;
    const x = chartX + i * (chartW / months.length) + 0.05;
    const isBreakEven = d.m === '14';

    if (barH > 0) {
      slide.addShape('rect', {
        x, y: chartY + chartH - barH, w: barW, h: barH,
        fill: { color: isBreakEven ? COLORS.gold : (parseInt(d.m) <= 12 ? COLORS.cyan : COLORS.gold) },
      });
    }
    // Month label
    slide.addText(d.m, {
      x, y: chartY + chartH + 0.05, w: barW, h: 0.35,
      fontSize: 9, fontFace: FONT.body,
      color: COLORS.medGray, align: 'center',
    });
  });

  // Break-even annotation
  slide.addText(`${ICO.arrow} Break-even: mês 14`, {
    x: 7.5, y: 2.0, w: 4, h: 0.4,
    fontSize: 13, fontFace: FONT.body, bold: true,
    color: COLORS.gold,
  });

  // ROI boxes
  const roiData = [
    { label: 'ROI Ano 1', value: '3-4x', note: 'Projeção cenário base' },
    { label: 'ROI Ano 2', value: '7x+', note: 'Projeção com recorrência' },
  ];

  roiData.forEach((r, i) => {
    const rx = 0.9 + i * 6;
    slide.addShape('roundRect', {
      x: rx, y: 5.6, w: 5.5, h: 1.2,
      rectRadius: 0.08,
      fill: { color: COLORS.cardBg },
      line: { color: COLORS.gold, width: 1 },
    });
    slide.addText(r.value, {
      x: rx + 0.2, y: 5.6, w: 2.0, h: 1.2,
      fontSize: 32, fontFace: FONT.title, bold: true,
      color: COLORS.gold, valign: 'middle',
    });
    slide.addText(`${r.label}\n${r.note}`, {
      x: rx + 2.2, y: 5.6, w: 3.0, h: 1.2,
      fontSize: 12, fontFace: FONT.body,
      color: COLORS.white, valign: 'middle',
      lineSpacingMultiple: 1.3,
    });
  });

  slide.addText('Inputs: 3-5 corretores, ticket R$7MM, 12 transações/ano', {
    x: 0.9, y: 6.9, w: 11.5, h: 0.4,
    fontSize: 10, fontFace: FONT.body, italic: true,
    color: COLORS.medGray,
  });

  slide.addNotes('Esta é a projeção do cenário base — 3 a 5 corretores, ticket médio de R$7 milhões, 12 transações por ano. Break-even no mês 14. ROI de 3-4x no primeiro ano. Esses números são editáveis — na planilha financeira, você coloca os SEUS números e vê o SEU retorno.');
}

function slide17_Competitivo(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'Cenário Competitivo');
  addPageFooter(slide, 17);

  const headers = ['Capacidade', 'BPR', 'MySide', 'Matchpoint', 'Black Brick'];
  const rows = [
    ['IA Preditiva',       ICO.check, ICO.cross,  ICO.cross,  ICO.cross],
    ['Digital Twin',       ICO.check, ICO.cross,  ICO.cross,  ICO.cross],
    ['Receita Recorrente', ICO.check, ICO.cross,  ICO.check,  ICO.cross],
    ['Off-Market Access',  ICO.check, ICO.cross,  ICO.cross,  ICO.check],
    ['100% Buyer-Side',    ICO.check, ICO.check,  ICO.cross,  ICO.check],
    ['Operação BR',        ICO.check, ICO.check,  ICO.check,  ICO.cross],
  ];

  const colW = [3.5, 2.0, 2.0, 2.0, 2.0];
  const startX = 0.9, startY = 1.8;
  const rowH = 0.65;

  // Header row
  headers.forEach((h, i) => {
    let x = startX;
    for (let j = 0; j < i; j++) x += colW[j];
    slide.addShape('rect', {
      x, y: startY, w: colW[i], h: rowH,
      fill: { color: i === 1 ? COLORS.gold : COLORS.dark },
    });
    slide.addText(h, {
      x, y: startY, w: colW[i], h: rowH,
      fontSize: 13, fontFace: FONT.body, bold: true,
      color: i === 1 ? COLORS.dark : COLORS.white,
      align: 'center', valign: 'middle',
    });
  });

  // Data rows
  rows.forEach((row, ri) => {
    const ry = startY + rowH + ri * rowH;
    row.forEach((cell, ci) => {
      let x = startX;
      for (let j = 0; j < ci; j++) x += colW[j];

      const bgColor = ri % 2 === 0 ? COLORS.cardBg : COLORS.charcoal;
      slide.addShape('rect', {
        x, y: ry, w: colW[ci], h: rowH,
        fill: { color: ci === 1 ? '2A3A2A' : bgColor },
      });

      const isCheck = cell === ICO.check;
      slide.addText(cell, {
        x, y: ry, w: colW[ci], h: rowH,
        fontSize: ci === 0 ? 12 : 18, fontFace: FONT.body,
        bold: ci === 0,
        color: ci === 0 ? COLORS.white : (isCheck ? COLORS.gold : COLORS.medGray),
        align: 'center', valign: 'middle',
      });
    });
  });

  slide.addNotes('MySide é o mais próximo no Brasil — 100% buyer-side, 9% de economia. Mas não tem IA preditiva. Black Brick em Londres cobra 2-2,5% e gera economia consistente, mas não opera no Brasil. Matchpoint tem 500+ clientes mas modelo diferente. O BPR é o único que combina buyer\'s agency com IA preditiva no mercado brasileiro.');
}

function slide18_Case1(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'Cenário — Família Executiva, Península');
  addPageFooter(slide, 18);

  // Timeline
  const steps = [
    { week: 'Semana 1', label: 'Digital Twin', desc: 'Perfil mapeado', icon: ICO.user },
    { week: 'Semana 3', label: 'Crystal Ball', desc: 'Unidade detectada', icon: ICO.brain },
    { week: 'Semana 5', label: 'Negociação IA', desc: 'Oferta otimizada', icon: ICO.handshake },
    { week: 'Semana 6', label: 'Fechamento', desc: '9,5% economia', icon: ICO.check },
  ];

  // Timeline line
  slide.addShape('rect', {
    x: 1.2, y: 3.5, w: 10.9, h: 0.04,
    fill: { color: COLORS.gold },
  });

  steps.forEach((s, i) => {
    const x = 1.2 + i * 3.0;
    // Node
    slide.addShape('ellipse', {
      x: x + 0.8, y: 3.3, w: 0.5, h: 0.5,
      fill: { color: COLORS.gold },
    });
    slide.addText(s.icon, {
      x: x + 0.8, y: 3.3, w: 0.5, h: 0.5,
      fontSize: 14, color: COLORS.dark, align: 'center', valign: 'middle',
    });
    // Week label
    slide.addText(s.week, {
      x: x, y: 2.4, w: 2.1, h: 0.4,
      fontSize: 11, fontFace: FONT.body,
      color: COLORS.gold, align: 'center',
    });
    // Step name
    slide.addText(s.label, {
      x: x, y: 2.8, w: 2.1, h: 0.4,
      fontSize: 14, fontFace: FONT.body, bold: true,
      color: COLORS.white, align: 'center',
    });
    // Description
    slide.addText(s.desc, {
      x: x, y: 4.0, w: 2.1, h: 0.4,
      fontSize: 12, fontFace: FONT.body,
      color: COLORS.lightGray, align: 'center',
    });
  });

  // Result box
  slide.addShape('roundRect', {
    x: 2.0, y: 4.8, w: 9.33, h: 1.6,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.gold, width: 1.5 },
  });
  slide.addText('R$ 9,5MM → R$ 8,6MM (-9,5%)', {
    x: 2.2, y: 4.9, w: 5.0, h: 0.7,
    fontSize: 22, fontFace: FONT.title, bold: true,
    color: COLORS.gold,
  });
  slide.addText('R$ 900k economia | 6 semanas vs. 4+ meses', {
    x: 2.2, y: 5.5, w: 5.0, h: 0.5,
    fontSize: 14, fontFace: FONT.body,
    color: COLORS.white,
  });
  slide.addText('Cenário ilustrativo', {
    x: 8.5, y: 5.5, w: 2.5, h: 0.5,
    fontSize: 10, fontFace: FONT.body, italic: true,
    color: COLORS.medGray, align: 'right',
  });

  slide.addNotes('Cenário ilustrativo baseado nos dados reais: família executiva busca no Península, ticket R$9-10 milhões. Digital Twin mapeia o perfil em 1 semana. Crystal Ball identifica unidade em pré-partilha na semana 3 — antes de chegar ao mercado. Negociação IA fecha com 9,5% de desconto. Economia de R$900 mil em 6 semanas. No modelo tradicional, seriam 4 meses e provavelmente pelo asking price.');
}

function slide19_Case2(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'Cenário — Investidor, Golf Olímpico');
  addPageFooter(slide, 19);

  // Before/After layout
  // BEFORE
  slide.addShape('roundRect', {
    x: 0.7, y: 2.2, w: 5.7, h: 3.8,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.medGray, width: 1 },
  });
  slide.addText('TRADICIONAL', {
    x: 0.7, y: 2.3, w: 5.7, h: 0.5,
    fontSize: 14, fontFace: FONT.body, bold: true,
    color: COLORS.medGray, align: 'center',
  });
  slide.addText([
    { text: `${ICO.cross}  `, options: { color: COLORS.medGray, fontSize: 16 } },
    { text: '8-12 unidades em portais\n\n', options: { color: COLORS.white, fontSize: 14 } },
    { text: `${ICO.cross}  `, options: { color: COLORS.medGray, fontSize: 16 } },
    { text: '4 meses de busca\n\n', options: { color: COLORS.white, fontSize: 14 } },
    { text: `${ICO.cross}  `, options: { color: COLORS.medGray, fontSize: 16 } },
    { text: 'Asking price: R$ 15 MM', options: { color: COLORS.white, fontSize: 14 } },
  ], {
    x: 1.2, y: 3.0, w: 4.7, h: 2.5,
    valign: 'top', lineSpacingMultiple: 1.0,
  });

  // AFTER
  slide.addShape('roundRect', {
    x: 6.9, y: 2.2, w: 5.7, h: 3.8,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.gold, width: 2 },
  });
  slide.addText('COM BPR', {
    x: 6.9, y: 2.3, w: 5.7, h: 0.5,
    fontSize: 14, fontFace: FONT.body, bold: true,
    color: COLORS.gold, align: 'center',
  });
  slide.addText([
    { text: `${ICO.check}  `, options: { color: COLORS.gold, fontSize: 16 } },
    { text: 'Shortlist 5 imóveis por score\n\n', options: { color: COLORS.white, fontSize: 14 } },
    { text: `${ICO.check}  `, options: { color: COLORS.gold, fontSize: 16 } },
    { text: '6 semanas\n\n', options: { color: COLORS.white, fontSize: 14 } },
    { text: `${ICO.check}  `, options: { color: COLORS.gold, fontSize: 16 } },
    { text: 'R$ 13,2 MM (-12%)', options: { color: COLORS.gold, fontSize: 14, bold: true } },
  ], {
    x: 7.4, y: 3.0, w: 4.7, h: 2.5,
    valign: 'top', lineSpacingMultiple: 1.0,
  });

  // Source
  slide.addText('Off-market: -1,5 a 17,5% (Zillow / Bright MLS-Drexel)  |  Cenário ilustrativo', {
    x: 0.7, y: 6.3, w: 11.9, h: 0.4,
    fontSize: 10, fontFace: FONT.body, italic: true,
    color: COLORS.medGray, align: 'center',
  });

  slide.addNotes('Segundo caso: investidor buscando no Golf Olímpico, o mais exclusivo. No modelo tradicional, veria 8-12 unidades dos portais, gastaria 4 meses, pagaria o preço pedido. Com BPR, o Crystal Ball traz 5 imóveis ranqueados por score — incluindo off-market. Economia de 12%. Dados de Zillow e Drexel University confirmam que off-market vende por 1,5-17,5% menos.');
}

function slide20_ROI(pptx) {
  const slide = pptx.addSlide({ masterName: 'HIGHLIGHT_GOLD' });

  addGoldBar(slide);
  addPageFooter(slide, 20);

  slide.addText(ICO.trending, {
    x: 0.5, y: 0.6, w: 12.33, h: 0.5,
    fontSize: 28, color: COLORS.gold, align: 'center',
  });

  slide.addText('3-4x', {
    x: 0.5, y: 1.0, w: 12.33, h: 1.5,
    fontSize: 96, fontFace: FONT.title, bold: true,
    color: COLORS.gold, align: 'center',
  });

  slide.addText('ROI projetado no primeiro ano (cenário base)', {
    x: 2, y: 2.6, w: 9.33, h: 0.6,
    fontSize: 22, fontFace: FONT.body,
    color: COLORS.white, align: 'center',
  });

  slide.addText('7x+ a partir do segundo ano', {
    x: 2, y: 3.4, w: 9.33, h: 0.5,
    fontSize: 18, fontFace: FONT.body,
    color: COLORS.lightGray, align: 'center',
  });

  // Divider
  slide.addShape('rect', {
    x: 5.5, y: 4.2, w: 2.33, h: 0.02,
    fill: { color: COLORS.gold },
  });

  slide.addText('Projeção: 3-5 corretores, ticket R$ 7MM — editável no Financial Model', {
    x: 2, y: 4.5, w: 9.33, h: 0.5,
    fontSize: 13, fontFace: FONT.body,
    color: COLORS.medGray, align: 'center',
  });

  slide.addText('30% dos CEOs reportam aumento de receita\natribuível a IA nos últimos 12 meses', {
    x: 2.5, y: 5.3, w: 8.33, h: 0.8,
    fontSize: 15, fontFace: FONT.body, italic: true,
    color: COLORS.lightGray, align: 'center',
    lineSpacingMultiple: 1.2,
  });
  slide.addText('PwC — 29th Global CEO Survey', {
    x: 2, y: 6.1, w: 9.33, h: 0.3,
    fontSize: 10, fontFace: FONT.body, italic: true,
    color: COLORS.medGray, align: 'center',
  });

  slide.addNotes('O retorno projetado é de 3 a 4 vezes o investimento no primeiro ano, escalando para 7x no segundo. Isso é uma projeção baseada em cenário, não uma promessa — os inputs são editáveis na planilha. Mas para contextualizar: 30% dos CEOs globais já reportam aumento de receita atribuível a IA, segundo a PwC.');
}

function slide21_OQueVoceRecebe(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'O Que Você Recebe');
  addPageFooter(slide, 21);

  const items = [
    { text: 'Blueprint Estratégico (80+ pgs)', icon: ICO.doc },
    { text: 'Guia Técnico (60+ pgs)', icon: ICO.doc },
    { text: 'Planilha Financeira (8 abas)', icon: ICO.chart },
    { text: 'Aria Intelligence (leads 24/7)', icon: ICO.brain },
    { text: 'Research Pack (7 estudos)', icon: ICO.globe },
    { text: '120h advisory (6 meses)', icon: ICO.clock },
    { text: 'Código-fonte — propriedade total', icon: ICO.key },
    { text: 'Zero lock-in de fornecedor', icon: ICO.shield },
  ];

  items.forEach((item, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i % 4;
    const x = col === 0 ? 0.7 : 6.9;
    const y = 1.8 + row * 1.25;

    slide.addShape('roundRect', {
      x, y, w: 5.7, h: 1.05,
      rectRadius: 0.06,
      fill: { color: COLORS.cardBg },
    });
    slide.addText(item.icon, {
      x: x + 0.15, y, w: 0.7, h: 1.05,
      fontSize: 20, color: COLORS.gold,
      align: 'center', valign: 'middle',
    });
    slide.addText(ICO.check, {
      x: x + 0.8, y, w: 0.5, h: 1.05,
      fontSize: 16, color: COLORS.gold,
      align: 'center', valign: 'middle',
    });
    slide.addText(item.text, {
      x: x + 1.3, y, w: 4.2, h: 1.05,
      fontSize: 14, fontFace: FONT.body,
      color: COLORS.white, valign: 'middle',
    });
  });

  slide.addNotes('São 8 entregáveis. Destaco dois pontos: código-fonte completo — é seu, você pode trocar de software house amanhã e continuar operando. E 120 horas de advisory nos primeiros 6 meses para garantir que a implementação saia do papel.');
}

function slide22_Pricing(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'Investimento');
  addPageFooter(slide, 22);

  const tiers = [
    {
      name: 'Essencial', price: 'R$ 350k', featured: false,
      items: ['Blueprint Estratégico', 'Financial Model', 'Research Pack', '40h advisory'],
      borderColor: COLORS.medGray,
    },
    {
      name: 'Profissional', price: 'R$ 450k', featured: true,
      items: ['Tudo do Essencial +', 'Guia Técnico (TIG)', 'Aria Intelligence', '80h advisory'],
      borderColor: COLORS.gold,
    },
    {
      name: 'Enterprise', price: 'R$ 600k', featured: false,
      items: ['Tudo do Profissional +', 'Implementação assistida', '120h advisory', 'Suporte 6 meses'],
      borderColor: COLORS.cyan,
    },
  ];

  tiers.forEach((t, i) => {
    const x = 0.7 + i * 4.2;
    const w = 3.8;
    const h = 4.8;
    const y = 1.8;

    // Card
    slide.addShape('roundRect', {
      x, y, w, h,
      rectRadius: 0.1,
      fill: { color: t.featured ? '1A2A1A' : COLORS.cardBg },
      line: { color: t.borderColor, width: t.featured ? 2.5 : 1 },
    });

    // "Recomendado" badge
    if (t.featured) {
      slide.addShape('roundRect', {
        x: x + 0.6, y: y - 0.2, w: 2.6, h: 0.4,
        rectRadius: 0.2,
        fill: { color: COLORS.gold },
      });
      slide.addText('RECOMENDADO', {
        x: x + 0.6, y: y - 0.2, w: 2.6, h: 0.4,
        fontSize: 11, fontFace: FONT.body, bold: true,
        color: COLORS.dark, align: 'center', valign: 'middle',
      });
    }

    // Tier name
    slide.addText(t.name, {
      x, y: y + 0.3, w, h: 0.5,
      fontSize: 18, fontFace: FONT.title, bold: true,
      color: t.featured ? COLORS.gold : COLORS.white, align: 'center',
    });

    // Price
    slide.addText(t.price, {
      x, y: y + 0.8, w, h: 0.7,
      fontSize: 30, fontFace: FONT.title, bold: true,
      color: COLORS.gold, align: 'center',
    });

    // Divider
    slide.addShape('rect', {
      x: x + 0.5, y: y + 1.6, w: w - 1, h: 0.02,
      fill: { color: t.borderColor },
    });

    // Items
    t.items.forEach((item, ii) => {
      slide.addText(`${ICO.check}  ${item}`, {
        x: x + 0.3, y: y + 1.8 + ii * 0.6, w: w - 0.6, h: 0.5,
        fontSize: 12, fontFace: FONT.body,
        color: COLORS.lightGray, valign: 'middle',
      });
    });
  });

  slide.addNotes('Três opções. O Essencial entrega a estratégia e os números. O Profissional — que é o que recomendo — entrega tudo: estratégia, guia técnico, Aria de leads, e 80 horas de acompanhamento. O Enterprise inclui assistência na implementação com a software house.');
}

function slide23_Timeline(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'Timeline — 6 Meses');
  addPageFooter(slide, 23);

  const phases = [
    { period: 'Mês 1-2', label: 'Setup', desc: 'Infraestrutura +\nDigital Twin', color: COLORS.gold },
    { period: 'Mês 3', label: 'Crystal Ball', desc: 'Modelo preditivo\ntreinado', color: COLORS.cyan },
    { period: 'Mês 4', label: 'Negociação +\nFamily Office', desc: 'Módulos\noperacionais', color: COLORS.gold },
    { period: 'Mês 5', label: 'Alpha', desc: 'Dashboard B2B', color: COLORS.cyan },
    { period: 'Mês 6', label: 'Go-Live', desc: '5 ferramentas\nativas', color: COLORS.gold },
  ];

  // Main timeline bar
  slide.addShape('roundRect', {
    x: 0.7, y: 3.3, w: 11.9, h: 0.15,
    rectRadius: 0.07,
    fill: { color: COLORS.gold },
  });

  phases.forEach((p, i) => {
    const x = 0.7 + i * 2.5;
    const w = 2.2;

    // Circle node
    slide.addShape('ellipse', {
      x: x + 0.8, y: 3.1, w: 0.5, h: 0.5,
      fill: { color: p.color },
    });
    slide.addText(`${i + 1}`, {
      x: x + 0.8, y: 3.1, w: 0.5, h: 0.5,
      fontSize: 14, fontFace: FONT.body, bold: true,
      color: COLORS.dark, align: 'center', valign: 'middle',
    });

    // Period
    slide.addText(p.period, {
      x, y: 2.2, w: w, h: 0.35,
      fontSize: 12, fontFace: FONT.body, bold: true,
      color: p.color, align: 'center',
    });
    // Label
    slide.addText(p.label, {
      x, y: 2.5, w: w, h: 0.65,
      fontSize: 13, fontFace: FONT.body, bold: true,
      color: COLORS.white, align: 'center',
      lineSpacingMultiple: 1.1,
    });
    // Description
    slide.addText(p.desc, {
      x, y: 3.8, w: w, h: 1.2,
      fontSize: 11, fontFace: FONT.body,
      color: COLORS.lightGray, align: 'center',
      lineSpacingMultiple: 1.1,
    });
  });

  // Highlight box
  slide.addShape('roundRect', {
    x: 3.5, y: 5.5, w: 6.33, h: 0.8,
    rectRadius: 0.08,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.gold, width: 1 },
  });
  slide.addText(`${ICO.rocket}  90 dias: Digital Twin + Crystal Ball ativos`, {
    x: 3.7, y: 5.5, w: 5.93, h: 0.8,
    fontSize: 14, fontFace: FONT.body, bold: true,
    color: COLORS.gold, valign: 'middle',
  });

  slide.addNotes('Em 6 meses, tudo está rodando. No mês 2, o Digital Twin já está operacional — você já pode começar a usar com clientes. No mês 3, o Crystal Ball começa a prever. Não é um projeto de 2 anos — em 90 dias você já tem resultado.');
}

function slide24_PorQueAgora(pptx) {
  const slide = pptx.addSlide({ masterName: 'CONTENT_CHARCOAL' });

  addSectionTitle(slide, 'Por Que Agora');
  addPageFooter(slide, 24);

  const stats = [
    { stat: 'US$ 16,7 Bi', label: 'investidos em proptech\nem 2025 (+68% YoY)', source: 'CRETI 2025', icon: ICO.trending },
    { stat: '42%', label: 'crescimento anual em IA\nimobiliária vs. 24% convencional', source: 'PitchBook/CRETI', icon: ICO.rocket },
    { stat: '78%', label: 'dos executivos RE:\ntecnologia é prioridade #1', source: 'PwC', icon: ICO.star },
  ];

  stats.forEach((s, i) => {
    addStatCard(slide, { ...s, x: 0.7 + i * 4.1, y: 1.8, w: 3.7 });
  });

  // Closing statement
  slide.addShape('roundRect', {
    x: 1.5, y: 6.2, w: 10.33, h: 0.7,
    rectRadius: 0.06,
    fill: { color: COLORS.dark },
    line: { color: COLORS.gold, width: 1 },
  });
  slide.addText('Quem implementar primeiro captura o moat de dados. Quem esperar, compra tecnologia defasada.', {
    x: 1.7, y: 6.2, w: 9.93, h: 0.7,
    fontSize: 14, fontFace: FONT.body, bold: true,
    color: COLORS.gold, valign: 'middle', align: 'center',
  });

  slide.addNotes('Três forças convergindo: o investimento em proptech explodiu 68% em um ano. IA imobiliária cresce o dobro da proptech convencional. E 78% dos seus pares já priorizaram tecnologia. A janela de vantagem competitiva é de 18 meses — depois, será tabela de preço.');
}

function slide25_ProximoPasso(pptx) {
  const slide = pptx.addSlide({ masterName: 'TITLE_DARK' });

  slide.addText(ICO.diamond, {
    x: 0, y: 0.6, w: 13.33, h: 0.5,
    fontSize: 24, color: COLORS.gold, align: 'center',
  });

  slide.addText('BPR', {
    x: 0, y: 1.0, w: 13.33, h: 0.9,
    fontSize: 48, fontFace: FONT.title, bold: true,
    color: COLORS.gold, align: 'center',
  });

  slide.addText('Próximo Passo', {
    x: 0, y: 2.2, w: 13.33, h: 0.8,
    fontSize: 36, fontFace: FONT.title, bold: true,
    color: COLORS.white, align: 'center',
  });

  // Divider
  slide.addShape('rect', {
    x: 5.2, y: 3.15, w: 2.9, h: 0.03,
    fill: { color: COLORS.gold },
  });

  slide.addText('Agende uma sessão de 45 minutos para modelar\no cenário da SUA imobiliária.', {
    x: 2, y: 3.5, w: 9.33, h: 0.9,
    fontSize: 20, fontFace: FONT.body,
    color: COLORS.lightGray, align: 'center',
    lineSpacingMultiple: 1.3,
  });

  slide.addText('Paulo Gomes', {
    x: 0, y: 4.8, w: 13.33, h: 0.5,
    fontSize: 18, fontFace: FONT.body, bold: true,
    color: COLORS.white, align: 'center',
  });

  slide.addText('[email]  |  [telefone]', {
    x: 0, y: 5.3, w: 13.33, h: 0.4,
    fontSize: 14, fontFace: FONT.body,
    color: COLORS.gold, align: 'center',
  });

  addConfidential(slide);

  slide.addNotes('Obrigado pelo tempo. O próximo passo é uma sessão de 45 minutos onde eu abro a planilha financeira com os SEUS números — seus corretores, seu ticket médio, sua região. Você vê o ROI calculado para a sua realidade. Sem compromisso.');
}

// ─────────────────────────────────────────────
// MAIN — BUILD & SAVE
// ─────────────────────────────────────────────

async function main() {
  console.log('Gerando BPR Intelligence Pitch Deck...\n');

  const pptx = createPresentation();

  // ATO 1: DESCONFORTO (slides 1-6)
  slide01_Cover(pptx);
  slide02_Agenda(pptx);
  slide03_MercadoHoje(pptx);
  slide04_FriccoesdoCEO(pptx);
  slide05_CustoInacao(pptx);
  slide06_VisaoBPR(pptx);

  // ATO 2: POSSIBILIDADE (slides 7-12)
  slide07_Ecossistema(pptx);
  slide08_DigitalTwin(pptx);
  slide09_CrystalBall(pptx);
  slide10_NegociacaoIA(pptx);
  slide11_FamilyAlpha(pptx);
  slide12_Moat(pptx);

  // ATO 3: PROVA (slides 13-19)
  slide13_TAM(pptx);
  slide14_ModeloReceita(pptx);
  slide15_UnitEconomics(pptx);
  slide16_ProjecaoFinanceira(pptx);
  slide17_Competitivo(pptx);
  slide18_Case1(pptx);
  slide19_Case2(pptx);

  // ATO 4: DECISÃO (slides 20-25)
  slide20_ROI(pptx);
  slide21_OQueVoceRecebe(pptx);
  slide22_Pricing(pptx);
  slide23_Timeline(pptx);
  slide24_PorQueAgora(pptx);
  slide25_ProximoPasso(pptx);

  const outPath = path.join(__dirname, '..', 'outputs', 'pptx', 'BPR-Intelligence-Pitch-Deck.pptx');
  await pptx.writeFile({ fileName: outPath });

  console.log(`✓ Pitch Deck gerado com sucesso!`);
  console.log(`  Arquivo: ${outPath}`);
  console.log(`  Slides: 25`);
  console.log(`\n  ATO 1 (1-6):   DESCONFORTO`);
  console.log(`  ATO 2 (7-12):  POSSIBILIDADE`);
  console.log(`  ATO 3 (13-19): PROVA`);
  console.log(`  ATO 4 (20-25): DECISÃO`);
}

main().catch((err) => {
  console.error('Erro ao gerar pitch deck:', err);
  process.exit(1);
});
