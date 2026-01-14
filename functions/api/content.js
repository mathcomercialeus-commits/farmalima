export async function onRequest(context) {
  const { request, env } = context;

  if (!env.SITE_KV) {
    return new Response("KV SITE_KV não encontrado", { status: 500 });
  }

  const KEY = "CONTENT";

  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  // 🔹 LER
  if (request.method === "GET") {
    const value = await env.SITE_KV.get(KEY);
    return new Response(value || "{}", {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...cors,
      },
    });
  }

  // 🔹 SALVAR (SEM TOKEN – ABERTO)
  if (request.method === "PUT") {
    let data;
    try {
      data = await request.json();
    } catch {
      return new Response("JSON inválido", { status: 400 });
    }

    await env.SITE_KV.put(KEY, JSON.stringify(data));

    return new Response(
      JSON.stringify({ ok: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...cors,
        },
      }
    );
  }

  return new Response("Método não permitido", {
    status: 405,
    headers: cors,
  });
}
