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

export async function onRequestPost({ request, env }) {
  // Protege o SAVE
  const auth = await requireAuth(request, env);
  if (!auth.ok) return json({ error: "Não autorizado." }, 401);

  const body = await request.json().catch(() => null);
  if (!body) return json({ error: "JSON inválido." }, 400);

  await env.SITE_KV.put(CONTENT_KEY, JSON.stringify(body));
  return json({ ok: true }, 200);
}

async function requireAuth(request, env) {
  if (!env.SITE_KV) return { ok: false };

  const token = getCookie(request.headers.get("Cookie") || "", "FL_ADMIN_SESSION");
  if (!token) return { ok: false };

  const key = `admin_session:${token}`;
  const exists = await env.SITE_KV.get(key);
  return { ok: !!exists };
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function getCookie(cookieHeader, name) {
  const parts = cookieHeader.split(";").map(s => s.trim());
  for (const p of parts) {
    const [k, ...rest] = p.split("=");
    if (k === name) return decodeURIComponent(rest.join("="));
  }
  return "";
}
