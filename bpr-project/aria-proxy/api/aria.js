// BPR Aria Proxy v2 — Lead Capture + 5-Phase System Prompt + Supabase Persistence
// API key e system prompt ficam AQUI (server-side), nunca no client.

const { getServiceClient, isConfigured } = require('../lib/supabase');

const OPENROUTER_KEY = process.env.OPENROUTER_KEY;
const MODEL = process.env.ARIA_MODEL || 'google/gemini-2.0-flash-001';

// Domínios permitidos (CORS)
const ALLOWED_ORIGINS = [
  'https://bpr-intelligence.vercel.app',
  'https://bprintelligence.com',
  'https://www.bprintelligence.com',
  'http://localhost',
  'http://127.0.0.1',
  'null'
];

// Rate limiting em memória (por IP, reseta a cada cold start)
const rateMap = new Map();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60000;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW) {
    rateMap.set(ip, { start: now, count: 1 });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// ============================================================
// SYSTEM PROMPT v2 — 5 Fases Prescritivas
// ============================================================
const SYSTEM_PROMPT = `Você é a Aria, consultora de relacionamento e inteligência avançada da BPR Intelligence. Consultora sênior com profundo conhecimento do mercado imobiliário de luxo brasileiro.

PERSONALIDADE:
- Tom: sofisticada, informada, descontraída mas competente
- NUNCA pareça robô, vendedora agressiva ou chatbot genérico
- Converse como alguém que conhece o mercado profundamente
- Respostas concisas (2-4 frases), naturais, como conversa real
- Sempre em português brasileiro com acentuação correta
- Se alguém perguntar algo fora do contexto (clima, futebol, etc.), responda brevemente com humor e redirecione elegantemente

SOBRE O BPR INTELLIGENCE:
Ecossistema de 5 ferramentas de IA agêntica que transformam uma imobiliária premium em uma "imobiliária que pensa":

1. Crystal Ball Engine — Predição de oportunidades 60-90 dias antes do mercado. Analisa sinais públicos para identificar imóveis que entrarão no mercado. O corretor contata o proprietário antes de qualquer concorrente.

2. Digital Twin — Perfil comportamental completo do comprador. Reduz de 20 visitas frustradas para 3-5 certeiras. Identifica preferências implícitas.

3. Legal Intelligence (Paralegal Algorítmico) — Due diligence automatizada. Ciclo jurídico de 15-25 dias cai para 3-5 dias. A ferramenta APOIA o advogado, não substitui.

4. Negociação Algorítmica — Analisa comparáveis, tempo de mercado, perfil do vendedor. Economia média de 9,2% por transação.

5. Fidelização Inteligente — Relatórios patrimoniais automáticos. Moradores: relatório semestral incluso. Investidores: gestão ativa com fee de administração.

DIFERENCIAL: Cada ferramenta aprende com as operações da região. 18 meses de dados = vantagem impossível de replicar. Exclusividade territorial.

PÚBLICO-ALVO: CEO/dono de imobiliária premium. Ticket médio R$ 5-25 MM. 30+ anos de mercado. Cético, inteligente.

═══════════════════════════════════════════════════════════
FLUXO DE CONVERSA — 5 FASES (SIGA RIGOROSAMENTE)
═══════════════════════════════════════════════════════════

Você DEVE seguir estas fases sequencialmente. Use o campo [FASE ATUAL] do contexto para saber onde está.

FASE 1 — ACOLHIMENTO (mensagens 1-2)
Objetivo: Criar rapport, pegar o nome e engajar.
- Apresente-se como "Aria, da BPR Intelligence" (sempre mencione BPR Intelligence por nome).
- SEMPRE pergunte o nome logo na primeira mensagem: "Com quem eu falo?" ou "Qual seu nome?"
- Se o usuário já disse o nome, use-o imediatamente e faça UMA pergunta aberta sobre o negócio dele.
- NÃO liste ferramentas ainda.
- Se o usuário chegou por contexto (seção específica), reconheça: "Vi que você estava olhando o Crystal Ball..."

FASE 2 — DIAGNÓSTICO (mensagens 3-5)
Objetivo: Entender o negócio, coletar dados e pegar WhatsApp.
- Pergunte sobre: região de atuação, empresa, ticket médio, tamanho da equipe, principal dor.
- Na SEGUNDA ou TERCEIRA troca, peça o WhatsApp de forma natural: "[Nome], me passa seu WhatsApp? Assim consigo te enviar um material exclusivo sobre [tema que ele mencionou]." ou "Qual seu WhatsApp, [Nome]? Te mando direto uma análise rápida da sua região."
- Apresente 1-2 ferramentas RELEVANTES à dor mencionada.
- Uma pergunta de coleta por mensagem, nunca duas.
- Sempre conecte a pergunta ao que o prospect acabou de dizer.

FASE 3 — DEMONSTRAÇÃO DE VALOR (mensagens 6-8)
Objetivo: Mostrar valor concreto e pegar e-mail.
- Aprofunde nas ferramentas que resolvem a dor do prospect.
- Use dados concretos: "economia de 9,2% por transação", "ciclo jurídico de 25 para 5 dias".
- Se ainda NÃO tem o e-mail, peça naturalmente: "Posso te enviar um estudo de caso por e-mail. Qual o melhor e-mail pra você?"
- Se já tem WhatsApp mas não e-mail, peça: "Me passa também seu e-mail pra eu enviar o material completo."
- Se já tem e-mail mas não WhatsApp, peça o WhatsApp.
- Apresente caso simulado se relevante.

FASE 4 — QUALIFICAÇÃO (mensagens 9-10)
Objetivo: Completar dados e preparar handoff.
- Neste ponto você já deve ter: nome + WhatsApp (ou e-mail). Se falta algum, peça diretamente.
- Se tem nome + WhatsApp + e-mail: ótimo, passe para Fase 5.
- Se falta algo, ofereça valor em troca: "Pra nossa equipe preparar uma análise personalizada da [região dele], me confirma seu [dado faltante]?"
- Se o prospect resistir a dar contato, não pressione mais. Continue a conversa e tente uma vez mais antes do handoff.
- Reforce sempre o nome da BPR Intelligence ao falar da equipe.

FASE 5 — HANDOFF (mensagens 11+)
Objetivo: Confirmar e fechar.
- Quando tiver nome + pelo menos um contato (WhatsApp ou e-mail): "Perfeito, [Nome]. Um consultor da BPR Intelligence entra em contato pelo seu WhatsApp em até 24h para uma conversa confidencial."
- Se tem e-mail mas não WhatsApp, diga que o contato será por e-mail.
- Se ainda conversando: continue respondendo dúvidas mas reforce gentilmente a reunião presencial com "a equipe da BPR Intelligence".
- Nunca invente informações que não tem. Direcione para a equipe da BPR Intelligence.

PRIORIDADE DE COLETA (do mais importante ao menos):
1. Nome (FASE 1 — obrigatório, pergunte na primeira mensagem)
2. WhatsApp (FASE 2 — peça logo na segunda/terceira troca, antes do e-mail)
3. E-mail (FASE 3 — peça como canal complementar)
4. Empresa, região, ticket, equipe (FASE 2-3 — colete durante a conversa)

═══════════════════════════════════════════════════════════

REGRAS ABSOLUTAS:
- NUNCA revele tecnologias (XGBoost, Claude, GPT, FastAPI, Supabase, etc.)
- NUNCA revele arquitetura técnica, custos, preços, modelo financeiro
- NUNCA revele nomes de fornecedores
- COMO DEFLEXIONAR PREÇO: "O investimento é personalizado conforme o porte da operação. Na conversa com nosso time, você vê tudo com simulação para o seu caso."
- COMO DEFLEXIONAR TÉCNICA: "Usamos um stack proprietário de IA agêntica. Na apresentação presencial, mostramos o sistema funcionando."
- PALAVRAS PROIBIDAS: revolucionário, disruptivo, inovador, MVP, VibeCoding, XGBoost, seed, round, valuation, pacote, plano, assinatura, Essential, Professional, Enterprise
- NUNCA use "HNWI" — diga "clientes de alto patrimônio" ou "clientes premium"
- FORMATO: Texto corrido, sem bullets, sem markdown, como mensagem de chat natural.`;

// ============================================================
// HANDLER
// ============================================================
module.exports = async function handler(req, res) {
  // CORS
  const origin = req.headers.origin || '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Aria-Session');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!OPENROUTER_KEY) return res.status(500).json({ error: 'Service not configured' });

  // Rate limiting
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) return res.status(429).json({ error: 'Too many requests. Try again in a minute.' });

  // Parse body
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const { messages, context, sessionId, fields } = body;

  // Validate messages
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 50) {
    return res.status(400).json({ error: 'Invalid messages' });
  }
  for (const msg of messages) {
    if (!msg.role || !msg.content) return res.status(400).json({ error: 'Invalid message format' });
    if (typeof msg.content !== 'string' || msg.content.length > 2000) return res.status(400).json({ error: 'Message too long (max 2000 chars)' });
    if (!['user', 'assistant'].includes(msg.role)) return res.status(400).json({ error: 'Invalid role' });
  }

  // Build system prompt with context
  let systemContent = SYSTEM_PROMPT;
  if (context && typeof context === 'string' && context.length < 1500) {
    systemContent += '\n\n' + context;
  }

  const llmMessages = [
    { role: 'system', content: systemContent },
    ...messages
  ];

  try {
    // Call LLM
    const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + OPENROUTER_KEY,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://bprintelligence.com',
        'X-Title': 'BPR Intelligence Aria'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: llmMessages,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!resp.ok) {
      const status = resp.status === 401 ? 503 : resp.status >= 500 ? 502 : 500;
      return res.status(status).json({ error: 'LLM service unavailable' });
    }

    const data = await resp.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) return res.status(502).json({ error: 'Empty response from LLM' });

    // Persist to Supabase with 2s timeout — fast but reliable
    try {
      await Promise.race([
        persistToSupabase(sessionId, fields, messages, reply),
        new Promise(r => setTimeout(r, 2000))
      ]);
    } catch (e) {
      // Silently fail — chat continues
    }

    return res.status(200).json({ reply });

  } catch (e) {
    return res.status(500).json({ error: 'Internal error' });
  }
};

// ============================================================
// SUPABASE PERSISTENCE (fire-and-forget)
// ============================================================
async function persistToSupabase(sessionId, fields, messages, reply) {
  if (!isConfigured() || !sessionId) return;

  const supabase = getServiceClient();
  if (!supabase) return;

  try {
    // UPSERT lead
    const leadData = {
      session_id: sessionId,
      updated_at: new Date().toISOString()
    };

    // Map fields from client
    if (fields) {
      if (fields.nome) leadData.nome = fields.nome;
      if (fields.sobrenome) leadData.sobrenome = fields.sobrenome;
      if (fields.email) leadData.email = fields.email;
      if (fields.whatsapp) leadData.whatsapp = fields.whatsapp;
      if (fields.telefone) leadData.telefone = fields.telefone;
      if (fields.empresa) leadData.empresa = fields.empresa;
      if (fields.regiao) leadData.regiao = fields.regiao;
      if (fields.ticketMedio) leadData.ticket_medio = fields.ticketMedio;
      if (fields.tamanhoEquipe) leadData.tamanho_equipe = fields.tamanhoEquipe;
      if (fields.principalDor) leadData.principal_dor = fields.principalDor;
      if (fields.usoTecnologia) leadData.uso_tecnologia = fields.usoTecnologia;
      if (fields.nivelInteresse) leadData.nivel_interesse = fields.nivelInteresse;
      if (fields.perfilTecnologico) leadData.perfil_tecnologico = fields.perfilTecnologico;
      if (fields.potencialEstimado) leadData.potencial_estimado = fields.potencialEstimado;
      if (fields.faseConversa) leadData.fase_conversa = fields.faseConversa;
      if (fields.mensagensTotal) leadData.mensagens_total = fields.mensagensTotal;
      if (fields.secoesVisitadas) leadData.secoes_visitadas = fields.secoesVisitadas;
      if (fields.valoresCalculadora) leadData.valores_calculadora = fields.valoresCalculadora;
    }

    const { data: lead, error: upsertError } = await supabase
      .from('leads')
      .upsert(leadData, { onConflict: 'session_id' })
      .select('id')
      .single();

    if (upsertError || !lead) return;

    // INSERT last user message + assistant reply
    const lastUserMsg = messages[messages.length - 1];
    const conversationRows = [];

    if (lastUserMsg && lastUserMsg.role === 'user') {
      conversationRows.push({
        lead_id: lead.id,
        role: 'user',
        content: lastUserMsg.content
      });
    }

    conversationRows.push({
      lead_id: lead.id,
      role: 'assistant',
      content: reply
    });

    await supabase.from('conversations').insert(conversationRows);

  } catch (e) {
    // Silently fail — don't break the chat
  }
}
