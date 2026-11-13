import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Protects the admin portal and the admin-only order API with HTTP Basic Auth.
 * Credentials come from ADMIN_USER / ADMIN_PASSWORD (set them in .env.local and on the host).
 * If ADMIN_PASSWORD is not set, admin access is refused entirely (fail closed).
 *
 * Public on purpose:
 *  - POST /api/orders           (customers placing an order)
 *  - GET  /api/orders?id=...    (tracking page; returns a masked order)
 */
export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const isOrdersApi = pathname === "/api/orders";

  if (isOrdersApi) {
    const method = request.method;
    if (method === "POST") return NextResponse.next();
    if (method === "GET" && searchParams.get("id")) return NextResponse.next();
  }

  const password = process.env.ADMIN_PASSWORD;
  const user = process.env.ADMIN_USER || "admin";
  if (!password) {
    return new NextResponse("Admin désactivé : définissez ADMIN_PASSWORD.", { status: 503 });
  }

  const header = request.headers.get("authorization") || "";
  if (header.startsWith("Basic ")) {
    try {
      const [u, ...rest] = atob(header.slice(6)).split(":");
      if (u === user && rest.join(":") === password) return NextResponse.next();
    } catch {}
  }

  return new NextResponse("Authentification requise", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="OMNIS Admin", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/orders"],
};
