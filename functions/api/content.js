// /functions/api/content.js
const CONTENT_KEY = "site:content";

export async function onRequestGet({ env }) {
  if (!env.SITE_KV) return json({ error: "SITE_KV não configurado." }, 500);

  const raw = await env.SITE_KV.get(CONTENT_KEY);
  if (!raw) return json({}, 200);

  try {
    return json(JSON.parse(raw), 200);
  } catch {
    return json({}, 200);
  }
}

// salva com token (header x-admin-token)
export async function onRequestPut({ request, env }) {
  if (!env.SITE_KV) return json({ error: "SITE_KV não configurado." }, 500);

  const token = request.headers.get("x-admin-token") || "";
  if (!token) return json({ error: "Não autorizado." }, 401);

  const key = `admin_token:${token}`;
  const exists = await env.SITE_KV.get(key);
  if (!exists) return json({ error: "Token inválido/expirado." }, 401);

  const body = await request.json().catch(() => null);
  if (!body) return json({ error: "JSON inválido." }, 400);

  await env.SITE_KV.put(CONTENT_KEY, JSON.stringify(body));
  return json({ ok: true }, 200);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
