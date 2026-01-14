// /functions/api/login.js
export async function onRequestPost({ request, env }) {
  try {
    // 1) garante que a secret existe
    if (!env.ADMIN_PASSWORD) {
      return json({ error: "ADMIN_PASSWORD não configurado no Cloudflare." }, 500);
    }
    if (!env.SITE_KV) {
      return json({ error: "Binding SITE_KV não configurado (KV obrigatório)." }, 500);
    }

    // 2) lê senha enviada
    const body = await request.json().catch(() => ({}));
    const password = (body.password || "").toString();

    if (!password) {
      return json({ error: "Informe a senha." }, 400);
    }

    // 3) valida
    if (password !== env.ADMIN_PASSWORD) {
      return json({ error: "Senha incorreta." }, 401);
    }

    // 4) cria token de sessão + salva no KV
    const token = crypto.randomUUID();
    const key = `admin_session:${token}`;
    // 7 dias
    await env.SITE_KV.put(key, "1", { expirationTtl: 60 * 60 * 24 * 7 });

    // 5) seta cookie HttpOnly (seguro)
    const headers = new Headers();
    headers.set("Set-Cookie", cookie("FL_ADMIN_SESSION", token, 60 * 60 * 24 * 7));
    headers.set("Cache-Control", "no-store");

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers,
    });
  } catch (e) {
    return json({ error: "Erro interno no login.", detail: String(e?.message || e) }, 500);
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

function cookie(name, value, maxAgeSeconds) {
  // Secure + HttpOnly + SameSite=Strict (ótimo)
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; HttpOnly; Secure; SameSite=Strict`;
}
