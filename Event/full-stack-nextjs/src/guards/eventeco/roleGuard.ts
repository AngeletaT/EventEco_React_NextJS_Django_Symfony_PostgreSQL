import { NextRequest, NextResponse } from "next/server";

export function roleGuard_E(req: NextRequest) {
    const accesstoken = req.cookies.get("accesstoken");
    const userType = req.cookies.get("userType")?.value;

    if (!accesstoken || !userType) {
        return NextResponse.redirect(new URL("/eventeco/auth", req.url));
    }

    const url = req.nextUrl.pathname;

    if (userType === "client") {
        if (url.startsWith("/eventeco/dashboard-organizer") || url.startsWith("/eventeco/dashboard-admin")) {
            return NextResponse.redirect(new URL("/eventeco/profile", req.url));
        }
    } else if (userType === "organizer") {
        if (!url.startsWith("/eventeco/dashboard-organizer")) {
            return NextResponse.redirect(new URL("/eventeco/dashboard-organizer", req.url));
        }
    } else if (userType === "admin") {
        if (!url.startsWith("/eventeco/dashboard-admin")) {
            return NextResponse.redirect(new URL("/eventeco/dashboard-admin", req.url));
        }
    }

    return NextResponse.next();
}
