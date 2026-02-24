-- ============================================================
-- BPR Intelligence — Aria Lead Capture Schema
-- Execute este SQL no Supabase SQL Editor
-- ============================================================

-- 1. TABELA: leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  nome TEXT,
  sobrenome TEXT,
  telefone TEXT,
  whatsapp TEXT,
  email TEXT,
  empresa TEXT,
  regiao TEXT,
  ticket_medio TEXT,
  tamanho_equipe TEXT,
  principal_dor TEXT,
  uso_tecnologia TEXT,
  nivel_interesse TEXT DEFAULT 'curioso' CHECK (nivel_interesse IN ('curioso', 'interessado', 'pronto')),
  perfil_tecnologico TEXT DEFAULT 'tradicional' CHECK (perfil_tecnologico IN ('tradicional', 'em-transicao', 'tech-forward')),
  potencial_estimado TEXT DEFAULT 'medio' CHECK (potencial_estimado IN ('medio', 'alto', 'premium')),
  lead_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'contato_feito', 'em_negociacao', 'convertido', 'descartado')),
  fase_conversa INTEGER DEFAULT 1 CHECK (fase_conversa BETWEEN 1 AND 5),
  mensagens_total INTEGER DEFAULT 0,
  secoes_visitadas TEXT[] DEFAULT '{}',
  valores_calculadora JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index para buscas frequentes
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_score ON leads(lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_session ON leads(session_id);

-- 2. TABELA: conversations
CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conversations_lead ON conversations(lead_id, created_at);

-- 3. TABELA: behavioral_events
CREATE TABLE IF NOT EXISTS behavioral_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_lead ON behavioral_events(lead_id, created_at);
CREATE INDEX IF NOT EXISTS idx_events_session ON behavioral_events(session_id);

-- 4. TABELA: sdr_notes
CREATE TABLE IF NOT EXISTS sdr_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notes_lead ON sdr_notes(lead_id, created_at);

-- ============================================================
-- FUNCTION: Calcular lead_score automaticamente
-- ============================================================
CREATE OR REPLACE FUNCTION calculate_lead_score(lead leads)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
BEGIN
  -- Email: +20
  IF lead.email IS NOT NULL AND lead.email != '' THEN
    score := score + 20;
  END IF;
  -- WhatsApp: +20
  IF lead.whatsapp IS NOT NULL AND lead.whatsapp != '' THEN
    score := score + 20;
  END IF;
  -- Empresa: +10
  IF lead.empresa IS NOT NULL AND lead.empresa != '' THEN
    score := score + 10;
  END IF;
  -- Regiao: +10
  IF lead.regiao IS NOT NULL AND lead.regiao != '' THEN
    score := score + 10;
  END IF;
  -- Ticket: +10
  IF lead.ticket_medio IS NOT NULL AND lead.ticket_medio != '' THEN
    score := score + 10;
  END IF;
  -- Equipe: +10
  IF lead.tamanho_equipe IS NOT NULL AND lead.tamanho_equipe != '' THEN
    score := score + 10;
  END IF;
  -- Interesse pronto: +30
  IF lead.nivel_interesse = 'pronto' THEN
    score := score + 30;
  ELSIF lead.nivel_interesse = 'interessado' THEN
    score := score + 15;
  END IF;
  -- Potencial premium: +20
  IF lead.potencial_estimado = 'premium' THEN
    score := score + 20;
  ELSIF lead.potencial_estimado = 'alto' THEN
    score := score + 10;
  END IF;
  RETURN score;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================================
-- FUNCTION: avg_lead_score (para o dashboard)
-- ============================================================
CREATE OR REPLACE FUNCTION avg_lead_score()
RETURNS NUMERIC AS $$
  SELECT COALESCE(ROUND(AVG(lead_score)::numeric, 0), 0) FROM leads;
$$ LANGUAGE sql STABLE;

-- ============================================================
-- TRIGGER: Auto-update lead_score e updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_lead_score_trigger()
RETURNS TRIGGER AS $$
BEGIN
  NEW.lead_score := calculate_lead_score(NEW);
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_lead_score ON leads;
CREATE TRIGGER trg_lead_score
  BEFORE INSERT OR UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_lead_score_trigger();

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE behavioral_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sdr_notes ENABLE ROW LEVEL SECURITY;

-- LEADS: anon pode INSERT e UPDATE (chat cria/atualiza leads)
CREATE POLICY "anon_insert_leads" ON leads
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "anon_update_leads" ON leads
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);

-- LEADS: authenticated pode tudo (SDR)
CREATE POLICY "auth_all_leads" ON leads
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- CONVERSATIONS: anon pode INSERT
CREATE POLICY "anon_insert_conversations" ON conversations
  FOR INSERT TO anon
  WITH CHECK (true);

-- CONVERSATIONS: authenticated pode SELECT
CREATE POLICY "auth_select_conversations" ON conversations
  FOR SELECT TO authenticated
  USING (true);

-- BEHAVIORAL_EVENTS: anon pode INSERT
CREATE POLICY "anon_insert_events" ON behavioral_events
  FOR INSERT TO anon
  WITH CHECK (true);

-- BEHAVIORAL_EVENTS: authenticated pode SELECT
CREATE POLICY "auth_select_events" ON behavioral_events
  FOR SELECT TO authenticated
  USING (true);

-- SDR_NOTES: authenticated pode tudo
CREATE POLICY "auth_all_notes" ON sdr_notes
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- REALTIME: Habilitar para leads (notificação de novos leads)
-- ============================================================
-- No Supabase Dashboard: Database > Replication > Habilitar 'leads' para Realtime
-- Ou via SQL:
ALTER PUBLICATION supabase_realtime ADD TABLE leads;

-- ============================================================
-- VIEW: Lead summary para dashboard
-- ============================================================
CREATE OR REPLACE VIEW lead_summary AS
SELECT
  l.id,
  l.session_id,
  COALESCE(l.nome, '') || ' ' || COALESCE(l.sobrenome, '') AS nome_completo,
  l.email,
  l.whatsapp,
  l.empresa,
  l.regiao,
  l.lead_score,
  l.status,
  l.nivel_interesse,
  l.potencial_estimado,
  l.fase_conversa,
  l.mensagens_total,
  l.created_at,
  l.updated_at,
  (SELECT content FROM conversations WHERE lead_id = l.id ORDER BY created_at DESC LIMIT 1) AS ultima_mensagem,
  (SELECT COUNT(*) FROM conversations WHERE lead_id = l.id) AS total_conversas,
  (SELECT COUNT(*) FROM behavioral_events WHERE lead_id = l.id) AS total_eventos
FROM leads l
ORDER BY l.created_at DESC;
