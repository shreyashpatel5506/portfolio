import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return new NextResponse("Admin access is not configured.", { status: 500 });
  }

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new NextResponse("Authentication required.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Dashboard", charset="UTF-8"',
      },
    });
  }

  try {
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [providedUsername, ...rest] = credentials.split(":");
    const providedPassword = rest.join(":");

    const isValidUser = providedUsername === username;
    const isValidPassword = providedPassword === password;

    if (!isValidUser || !isValidPassword) {
      return new NextResponse("Invalid credentials.", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Dashboard", charset="UTF-8"',
        },
      });
    }
  } catch {
    return new NextResponse("Invalid authentication header.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Dashboard", charset="UTF-8"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
