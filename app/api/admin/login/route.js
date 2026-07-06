import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const username = String(formData.get("username") || "");
    const password = String(formData.get("password") || "");
    const nextPath = String(formData.get("next") || "/admin");

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      return NextResponse.json(
        { error: "Admin credentials are not configured." },
        { status: 500 },
      );
    }

    if (username !== adminUsername || password !== adminPassword) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ success: true, next: nextPath });
    response.cookies.set("admin_session", "authenticated", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Login failed." },
      { status: 500 },
    );
  }
}
