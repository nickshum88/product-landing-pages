import { NextRequest, NextResponse } from "next/server";
import {
  createSession,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/admin/auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const expected = process.env.ADMIN_PASSWORD;

    if (!expected) {
      return NextResponse.json(
        { error: "Admin access not configured" },
        { status: 500 }
      );
    }

    if (password !== expected) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const session = await createSession();
    const response = NextResponse.json({ ok: true });

    response.cookies.set(SESSION_COOKIE, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
