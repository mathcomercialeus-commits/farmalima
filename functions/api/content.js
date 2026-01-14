// /functions/api/content.js
// Protege PUT/POST com token (ADMIN_TOKEN) e deixa GET público pro site carregar.
// Requisitos no Cloudflare Pages:
// 1) KV binding: SITE_KV
// 2) Secret: ADMIN_TOKEN

export async function onRequest(context) {
  const { request, env } = context;

  const KV = env.SITE_KV;
  const KEY = "content";
  const method = (request.method || "GET").toUpperCase();

  const withHeaders = (headers = {}) => ({
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,PUT,POST,OPTIONS",
    "access-control-allow-headers": "content-type,x-admin-token",
    ...headers,
  });

  const json = (data, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: withHeaders({
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      }),
    });

  const text = (msg, status = 200) =>
    new Response(msg, {
      status,
      headers: withHeaders({
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      }),
    });

  if (!KV) return text("KV NÃO CONFIGURADO (SITE_KV).", 500);

  // Preflight CORS
  if (method === "OPTIONS") return new Response(null, { headers: withHeaders() });

  // GET público (site consome)
  if (method === "GET") {
    try {
      const raw = await KV.get(KEY);
      if (!raw) return json({});
      // garante que devolve JSON válido
      const parsed = JSON.parse(raw);
      return json(parsed);
    } catch (e) {
      return text("ERRO AO LER DADOS DO KV.", 500);
    }
  }

  // Qualquer escrita exige token
  const expected = (env.ADMIN_TOKEN || "").trim();
  if (!expected) {
    // evita ficar aberto por acidente
    return text("ADMIN_TOKEN NÃO CONFIGURADO NO SERVIDOR.", 500);
  }

  const token = (request.headers.get("x-admin-token") || "").trim();
  if (token !== expected) {
    return text("NÃO AUTORIZADO.", 403);
  }

  // PUT/POST para salvar conteúdo
  if (method === "PUT" || method === "POST") {
    let body;
    try {
      body = await request.json();
    } catch {
      return text("JSON INVÁLIDO.", 400);
    }

    try {
      await KV.put(KEY, JSON.stringify(body));
      return json({ ok: true });
    } catch (e) {
      return text("ERRO AO SALVAR NO KV.", 500);
    }
  }

  return text("MÉTODO NÃO PERMITIDO.", 405);
}
