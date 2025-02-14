import { NextRequest, NextResponse } from "next/server";

export function roleGuard_P(req: NextRequest) {
    const accesstoken = req.cookies.get("accesstoken");
    const userType = req.cookies.get("userType")?.value;

    if (!accesstoken || !userType) {
        return NextResponse.redirect(new URL("/pawnity/auth", req.url));
    }

    const url = req.nextUrl.pathname;

    if (userType === "client") {
        if (url.startsWith("/pawnity/dashboard-organizer") || url.startsWith("/pawnity/dashboard-admin")) {
            return NextResponse.redirect(new URL("/pawnity/profile", req.url));
        }
    } else if (userType === "organizer") {
        if (!url.startsWith("/pawnity/dashboard-organizer")) {
            return NextResponse.redirect(new URL("/pawnity/dashboard-organizer", req.url));
        }
    } else if (userType === "admin") {
        if (!url.startsWith("/pawnity/dashboard-admin")) {
            return NextResponse.redirect(new URL("/pawnity/dashboard-admin", req.url));
        }
    }

    return NextResponse.next();
}
