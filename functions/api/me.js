// /functions/api/me.js
export async function onRequestGet({ request, env }) {
  try {
    if (!env.SITE_KV) return json({ ok: false, error: "SITE_KV não configurado." }, 500);

    const token = request.headers.get("x-admin-token") || "";
    if (!token) return json({ ok: false }, 401);

    const key = `admin_token:${token}`;
    const exists = await env.SITE_KV.get(key);
    if (!exists) return json({ ok: false }, 401);

    return json({ ok: true }, 200);
  } catch (e) {
    return json({ ok: false, error: "Erro interno.", detail: String(e?.message || e) }, 500);
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
