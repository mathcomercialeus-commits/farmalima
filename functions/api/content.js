export async function onRequest(context) {
  const { request, env } = context;

  // KV obrigatório
  if (!env.SITE_KV) {
    return new Response("KV NÃO CONFIGURADO (SITE_KV).", { status: 500 });
  }

  const url = new URL(request.url);

  // CORS básico (se precisar)
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET,POST,OPTIONS",
        "access-control-allow-headers": "content-type,x-admin-token",
      },
    });
  }

  const headers = {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": "*",
  };

  const KEY = "content";

  if (request.method === "GET") {
    const data = await env.SITE_KV.get(KEY);
    return new Response(data || "{}", { headers });
  }

  if (request.method === "POST") {
    // Proteção simples por token
    // Configure em: Pages > Settings > Variables and secrets
    // Nome: ADMIN_TOKEN  Valor: SUA_SENHA_FORTE
    const expected = (env.ADMIN_TOKEN || "").trim();
    const got = (request.headers.get("x-admin-token") || "").trim();

    if (!expected) {
      return new Response("ADMIN_TOKEN NÃO CONFIGURADO NO PROJETO.", { status: 500 });
    }
    if (!got || got !== expected) {
      return new Response("SEM PERMISSÃO (TOKEN INVÁLIDO).", { status: 401 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response("JSON INVÁLIDO.", { status: 400 });
    }

    // Sanitização mínima
    const safe = {
      brandName: String(body.brandName || "").toUpperCase(),
      brandSub: String(body.brandSub || "").toUpperCase(),
      pillText: String(body.pillText || "").toUpperCase(),
      heroTitle: String(body.heroTitle || "").toUpperCase(),
      heroDesc: String(body.heroDesc || "").toUpperCase(),
      heroCardTitle: String(body.heroCardTitle || "").toUpperCase(),
      heroCardSub: String(body.heroCardSub || "").toUpperCase(),
      globalWhatsapp: String(body.globalWhatsapp || "").toUpperCase(),
      footerText: String(body.footerText || "").toUpperCase(),
      units: Array.isArray(body.units) ? body.units.map(u => ({
        name: String(u.name || "").toUpperCase(),
        note: String(u.note || "").toUpperCase(),
        address: String(u.address || "").toUpperCase(),
        whatsapp: String(u.whatsapp || "").toUpperCase(),
        maps: String(u.maps || "").toUpperCase(),
      })) : []
    };

    await env.SITE_KV.put(KEY, JSON.stringify(safe));
    return new Response(JSON.stringify({ ok: true }), { headers });
  }

  return new Response("MÉTODO NÃO SUPORTADO.", { status: 405 });
}
