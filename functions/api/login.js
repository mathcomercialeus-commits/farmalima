export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const password = (body?.password || "").trim();

    const correct = (env.ADMIN_PASSWORD || "").trim();
    if (!correct) {
      return new Response("ADMIN_PASSWORD não configurado no Cloudflare.", { status: 500 });
    }

    if (password !== correct) {
      return new Response("Senha inválida.", { status: 401 });
    }

    // Cookie simples (produção: pode reforçar depois)
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      [
        "admin_session=ok",
        "Path=/",
        "HttpOnly",
        "Secure",
        "SameSite=Strict",
        "Max-Age=86400" // 24h
      ].join("; ")
    );

    headers.set("Content-Type", "application/json");
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (e) {
    return new Response("Payload inválido.", { status: 400 });
  }
}
