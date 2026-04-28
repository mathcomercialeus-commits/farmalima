export async function onRequest(context) {
  const { request, env } = context;

  if (!env.SITE_KV) {
    return json({ error: "KV SITE_KV nao encontrado" }, 500);
  }

  const KEY = "CONTENT";
  const cors = getCorsHeaders(request);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

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

  if (request.method === "PUT") {
    const authError = authorize(request, env);
    if (authError) {
      return json(
        { error: authError },
        authError === "CONTENT_TOKEN nao configurado" ? 500 : 401,
        cors
      );
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ error: "JSON invalido" }, 400, cors);
    }

    const content = normalizeContent(data);
    if (!content.ok) {
      return json({ error: content.error }, 400, cors);
    }

    await env.SITE_KV.put(KEY, JSON.stringify(content.value));

    return json({ ok: true }, 200, cors);
  }

  return json({ error: "Metodo nao permitido" }, 405, cors);
}

function getCorsHeaders(request) {
  const origin = request.headers.get("Origin");
  const sameOrigin = origin && origin === new URL(request.url).origin;

  return {
    ...(sameOrigin ? { "Access-Control-Allow-Origin": origin } : {}),
    "Access-Control-Allow-Methods": "GET,PUT,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Content-Token",
    "Vary": "Origin",
  };
}

function authorize(request, env) {
  if (!env.CONTENT_TOKEN) return "CONTENT_TOKEN nao configurado";

  const bearer = request.headers.get("Authorization") || "";
  const headerToken = request.headers.get("X-Content-Token") || "";
  const token = bearer.startsWith("Bearer ") ? bearer.slice(7) : headerToken;

  return token && token === env.CONTENT_TOKEN ? null : "Token invalido";
}

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

function normalizeText(value, max = 160) {
  return String(value ?? "").trim().slice(0, max);
}

function normalizePhone(value) {
  return String(value ?? "").replace(/\D/g, "").slice(0, 15);
}

function normalizeUrl(value, max = 500) {
  const url = normalizeText(value, max);
  if (!url) return "";
  if (url.startsWith("/")) return url;

  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol) ? parsed.href : "";
  } catch {
    return "";
  }
}

function normalizeContent(data) {
  const units = Array.isArray(data?.units) ? data.units.slice(0, 50) : [];

  const value = {
    brandName: normalizeText(data?.brandName, 80),
    brandSub: normalizeText(data?.brandSub, 120),
    logoUrl: normalizeUrl(data?.logoUrl),
    pillText: normalizeText(data?.pillText, 80),
    heroTitle: normalizeText(data?.heroTitle, 120),
    heroDesc: normalizeText(data?.heroDesc, 600),
    heroCardTitle: normalizeText(data?.heroCardTitle, 120),
    heroCardSub: normalizeText(data?.heroCardSub, 160),
    globalWhatsapp: normalizePhone(data?.globalWhatsapp),
    footerText: normalizeText(data?.footerText, 120),
    units: units.map((unit) => ({
      name: normalizeText(unit?.name, 80),
      note: normalizeText(unit?.note, 160),
      address: normalizeText(unit?.address, 220),
      whatsapp: normalizePhone(unit?.whatsapp),
      maps: normalizeUrl(unit?.maps),
    })).filter((unit) => unit.name || unit.address),
  };

  if (!value.brandName) value.brandName = "FARMA LIMA";
  if (!value.globalWhatsapp && !value.units.some((unit) => unit.whatsapp)) {
    return { ok: false, error: "Informe ao menos um WhatsApp valido" };
  }

  return { ok: true, value };
}
