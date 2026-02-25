// BPR Aria — Leads Management Endpoint (Protected by Supabase JWT)
// GET: lista leads | GET ?id=X: detalhes | PATCH: atualizar status/notas

const { getServiceClient, isConfigured, SUPABASE_URL, SUPABASE_ANON_KEY } = require('../lib/supabase');
const { createClient } = require('@supabase/supabase-js');

// Domínios permitidos (CORS) — sem 'null' para bloquear requests de file:// e iframes
const ALLOWED_ORIGINS = [
  'https://bpr-intelligence.vercel.app',
  'https://bprintelligence.com',
  'https://www.bprintelligence.com',
  'https://bpr-aria-proxy.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000'
];

// Verify JWT from Supabase Auth and return user
async function verifyAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  const token = authHeader.replace('Bearer ', '');

  // Create a client with the user's JWT to verify it
  const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } }
  });

  const { data: { user }, error } = await userClient.auth.getUser();
  if (error || !user) return null;
  return user;
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (!isConfigured()) return res.status(503).json({ error: 'Service not configured' });

  // Auth check
  const user = await verifyAuth(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const supabase = getServiceClient();
  if (!supabase) return res.status(503).json({ error: 'Database unavailable' });

  // Parse query params com validação
  const url = new URL(req.url, `https://${req.headers.host}`);
  const leadId = url.searchParams.get('id');
  const action = url.searchParams.get('action');

  // Validar formato UUID do leadId para evitar injection
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (leadId && !UUID_RE.test(leadId)) {
    return res.status(400).json({ error: 'Invalid lead ID format' });
  }

  try {
    // GET single lead with full details
    if (req.method === 'GET' && leadId) {
      const { data: lead, error } = await supabase
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .single();

      if (error || !lead) return res.status(404).json({ error: 'Lead not found' });

      // Get conversations
      const { data: conversations } = await supabase
        .from('conversations')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: true });

      // Get behavioral events
      const { data: events } = await supabase
        .from('behavioral_events')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: true });

      // Get SDR notes
      const { data: notes } = await supabase
        .from('sdr_notes')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false });

      return res.status(200).json({
        lead,
        conversations: conversations || [],
        events: events || [],
        notes: notes || []
      });
    }

    // GET list of leads with filters
    if (req.method === 'GET') {
      const status = url.searchParams.get('status');
      const minScore = url.searchParams.get('min_score');
      const search = url.searchParams.get('search');
      const limit = parseInt(url.searchParams.get('limit')) || 50;
      const offset = parseInt(url.searchParams.get('offset')) || 0;

      let query = supabase
        .from('leads')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (status) query = query.eq('status', status);
      if (minScore) query = query.gte('lead_score', parseInt(minScore));
      if (search) {
        // Escapar caracteres especiais de LIKE (%, _) para evitar injection
        const escaped = search.replace(/[%_\\]/g, '\\$&').slice(0, 100);
        query = query.or(`nome.ilike.%${escaped}%,email.ilike.%${escaped}%,empresa.ilike.%${escaped}%`);
      }

      const { data, count, error } = await query;
      if (error) return res.status(500).json({ error: 'Query failed' });

      // Get today's count
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: todayCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

      // Get avg score
      const { data: scoreData } = await supabase.rpc('avg_lead_score').catch(() => ({ data: null }));

      return res.status(200).json({
        leads: data || [],
        total: count || 0,
        today: todayCount || 0,
        avgScore: scoreData || 0
      });
    }

    // PATCH update lead status
    if (req.method === 'PATCH' && leadId) {
      let body;
      try {
        body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      } catch {
        return res.status(400).json({ error: 'Invalid JSON' });
      }

      const updates = {};
      if (body.status) updates.status = body.status;
      if (body.nivel_interesse) updates.nivel_interesse = body.nivel_interesse;

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'No valid fields to update' });
      }

      const { data, error } = await supabase
        .from('leads')
        .update(updates)
        .eq('id', leadId)
        .select()
        .single();

      if (error) return res.status(500).json({ error: 'Update failed' });
      return res.status(200).json({ lead: data });
    }

    // POST add SDR note
    if (req.method === 'POST' && leadId && action === 'note') {
      let body;
      try {
        body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      } catch {
        return res.status(400).json({ error: 'Invalid JSON' });
      }

      if (!body.content || typeof body.content !== 'string') {
        return res.status(400).json({ error: 'Content required' });
      }

      const { data, error } = await supabase
        .from('sdr_notes')
        .insert({
          lead_id: leadId,
          author_id: user.id,
          content: body.content.slice(0, 2000)
        })
        .select()
        .single();

      if (error) return res.status(500).json({ error: 'Insert failed' });
      return res.status(201).json({ note: data });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (e) {
    return res.status(500).json({ error: 'Internal error' });
  }
};
