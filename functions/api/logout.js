export async function onRequestPost() {
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    [
      "admin_session=",
      "Path=/",
      "HttpOnly",
      "Secure",
      "SameSite=Strict",
      "Max-Age=0"
    ].join("; ")
  );

  headers.set("Content-Type", "application/json");
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
}
