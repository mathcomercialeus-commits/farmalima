// /functions/api/logout.js
export async function onRequestPost({ request, env }) {
  try {
    if (!env.SITE_KV) return json({ ok: false, error: "SITE_KV não configurado." }, 500);

    const token = request.headers.get("x-admin-token") || "";
    if (!token) return json({ ok: true }, 200);

    await env.SITE_KV.delete(`admin_token:${token}`);
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
