// BPR Aria — Behavioral Event Tracking Endpoint
// Lightweight: recebe eventos comportamentais, grava no Supabase, sem LLM.

const { getServiceClient, isConfigured } = require('../lib/supabase');

const ALLOWED_ORIGINS = [
  'https://bpr-intelligence.vercel.app',
  'https://bprintelligence.com',
  'https://www.bprintelligence.com',
  'http://localhost',
  'http://127.0.0.1',
  'null'
];

// Rate limiting
const rateMap = new Map();
const RATE_LIMIT = 60;
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

// Tipos de evento válidos
const VALID_EVENTS = [
  'page_view', 'section_view', 'calculator_use', 'chat_open',
  'chat_message', 'time_on_page', 'scroll_depth', 'cta_click'
];

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Aria-Session');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) return res.status(429).json({ error: 'Too many requests' });

  if (!isConfigured()) return res.status(200).json({ ok: true }); // graceful degrade

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const { sessionId, eventType, eventData } = body;

  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({ error: 'sessionId required' });
  }
  if (!eventType || !VALID_EVENTS.includes(eventType)) {
    return res.status(400).json({ error: 'Invalid eventType' });
  }

  const supabase = getServiceClient();
  if (!supabase) return res.status(200).json({ ok: true });

  // Persist with 2s timeout — fast but reliable
  try {
    await Promise.race([
      (async () => {
        const { data: lead } = await supabase
          .from('leads')
          .select('id')
          .eq('session_id', sessionId)
          .single();

        await supabase.from('behavioral_events').insert({
          lead_id: lead?.id || null,
          session_id: sessionId,
          event_type: eventType,
          event_data: eventData || {}
        });
      })(),
      new Promise(r => setTimeout(r, 2000))
    ]);
  } catch (e) {
    // Silently fail
  }

  return res.status(200).json({ ok: true });
};
