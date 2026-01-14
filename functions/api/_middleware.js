export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Protege SOMENTE o admin (pode incluir /admin também se você criar)
  const isAdminPage =
    url.pathname === "/admin.html" ||
    url.pathname === "/admin" ||
    url.pathname.startsWith("/admin/");

  if (!isAdminPage) return next();

  const cookie = request.headers.get("Cookie") || "";
  const logged = cookie.includes("admin_session=ok");

  if (logged) return next();

  // Se não estiver logado, manda para tela de login
  return Response.redirect(`${url.origin}/admin-login.html`, 302);
}
