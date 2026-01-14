export async function onRequest(context) {
  const { request, env } = context;

  if (!env.SITE_KV) {
    return new Response("KV NÃO CONFIGURADO (SITE_KV).", { status: 500 });
  }

  const headers = {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,PUT,POST,OPTIONS",
    "access-control-allow-headers": "content-type",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  const KEY = "content";

  if (request.method === "GET") {
    const data = await env.SITE_KV.get(KEY);
    return new Response(data || "{}", { headers });
  }

  if (request.method === "PUT" || request.method === "POST") {
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "JSON INVÁLIDO" }), {
        status: 400,
        headers
      });
    }

    await env.SITE_KV.put(KEY, JSON.stringify(body));
    return new Response(JSON.stringify({ ok: true }), { headers });
  }

  return new Response(JSON.stringify({ ok: false, error: "MÉTODO NÃO SUPORTADO" }), {
    status: 405,
    headers
  });
}
