export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const password = body.password || "";

    if (!env.ADMIN_PASSWORD) {
      return new Response(
        JSON.stringify({ error: "ADMIN_PASSWORD não configurado" }),
        { status: 500 }
      );
    }

    if (password !== env.ADMIN_PASSWORD) {
      return new Response(
        JSON.stringify({ error: "Senha incorreta" }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Erro interno" }),
      { status: 500 }
    );
  }
}
