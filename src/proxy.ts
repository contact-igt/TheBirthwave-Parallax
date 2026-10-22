import { NextResponse, type NextRequest } from "next/server";
import { decideCheckinRoute, isCheckinApp } from "@/lib/app-mode";

/**
 * Active only on the check-in deployment (CLINIC_APP=checkin). It makes `/`
 * open the registration experience in place (an internal rewrite, never a
 * redirect) and hides every marketing route behind a plain 404.
 */
export function proxy(request: NextRequest) {
  if (!isCheckinApp()) return NextResponse.next();

  const decision = decideCheckinRoute(request.nextUrl.pathname);
  if (decision.action === "rewrite") {
    // Keep the query string: `/?kiosk=1` must reach the page as `?kiosk=1`.
    const target = request.nextUrl.clone();
    target.pathname = decision.to;
    return NextResponse.rewrite(target);
  }
  if (decision.action === "notfound") {
    return new NextResponse("Not found", {
      status: 404,
      headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
