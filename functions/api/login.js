// /functions/api/login.js
export async function onRequestPost({ request, env }) {
  try {
    if (!env.ADMIN_PASSWORD) {
      return json({ ok: false, error: "ADMIN_PASSWORD não configurado no Cloudflare." }, 500);
    }
    if (!env.SITE_KV) {
      return json({ ok: false, error: "SITE_KV não configurado (falta binding do KV)." }, 500);
    }

    const body = await request.json().catch(() => ({}));
    const password = (body.password || "").toString().trim();

    if (!password) return json({ ok: false, error: "Informe a senha." }, 400);
    if (password !== env.ADMIN_PASSWORD) return json({ ok: false, error: "Senha incorreta." }, 401);

    // token automático (não fica no código)
    const token = crypto.randomUUID();
    const key = `admin_token:${token}`;

    // 7 dias
    await env.SITE_KV.put(key, "1", { expirationTtl: 60 * 60 * 24 * 7 });

    return json({ ok: true, token }, 200);
  } catch (e) {
    return json({ ok: false, error: "Erro interno no login.", detail: String(e?.message || e) }, 500);
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
login.js
