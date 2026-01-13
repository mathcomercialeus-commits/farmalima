export async function onRequest(context) {
  const { request, env } = context;

  const KEY = "site_content_v1";

  if (!env.SITE_KV) {
    return new Response("KV não configurado (SITE_KV).", { status: 500 });
  }

  if (request.method === "GET") {
    const raw = await env.SITE_KV.get(KEY);
    return new Response(raw || "{}", {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }

  if (request.method === "PUT") {
    // (A segurança real vai ser via Cloudflare Access protegendo /admin e /api)
    const body = await request.text();
    try {
      JSON.parse(body);
    } catch {
      return new Response("JSON inválido.", { status: 400 });
    }

    await env.SITE_KV.put(KEY, body);
    return new Response("OK", { status: 200 });
  }

  return new Response("Method not allowed", { status: 405 });
}
