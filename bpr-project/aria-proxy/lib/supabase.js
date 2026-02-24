// BPR Aria — Supabase Server-Side Client
// Usa service_role key para bypass RLS no server (nunca expor no client)

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

let _serviceClient = null;
let _anonClient = null;

function getServiceClient() {
  if (!_serviceClient && SUPABASE_URL && SUPABASE_SERVICE_KEY) {
    _serviceClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
  }
  return _serviceClient;
}

function getAnonClient() {
  if (!_anonClient && SUPABASE_URL && SUPABASE_ANON_KEY) {
    _anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return _anonClient;
}

function isConfigured() {
  return !!(SUPABASE_URL && SUPABASE_SERVICE_KEY);
}

module.exports = { getServiceClient, getAnonClient, isConfigured, SUPABASE_URL, SUPABASE_ANON_KEY };
