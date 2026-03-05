import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/admin/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and auth API without authentication
  if (
    pathname === "/products/manage/login" ||
    pathname === "/api/admin/auth"
  ) {
    return NextResponse.next();
  }

  const session = request.cookies.get(SESSION_COOKIE)?.value;

  if (!session || !(await verifySession(session))) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(
      new URL("/products/manage/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products", "/products/manage/:path*", "/api/admin/:path*"],
};
