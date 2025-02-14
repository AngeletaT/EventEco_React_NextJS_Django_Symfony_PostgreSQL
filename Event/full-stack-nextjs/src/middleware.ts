import { authGuard_E } from "@/guards/eventeco/authGuard";
import { authGuard_P } from "@/guards/pawnity/authGuard";
import { roleGuard_E } from "@/guards/eventeco/roleGuard";
import { roleGuard_P } from "@/guards/pawnity/roleGuard";
import { NextRequest, NextResponse } from "next/server";

const authProtectedRoutesE = ["/eventeco/auth"];
const authProtectedRoutesP = ["/pawnity/auth"];

const roleProtectedRoutesE = ["/eventeco/dashboard-organizer", "/eventeco/dashboard-admin", "/eventeco/profile"];
const roleProtectedRoutesP = ["/pawnity/dashboard-organizer", "/pawnity/dashboard-admin", "/pawnity/profile"];

export function middleware(req: NextRequest) {
    const url = req.nextUrl.pathname;

    if (authProtectedRoutesE.includes(url)) {
        return authGuard_E(req);
    } else if (authProtectedRoutesP.includes(url)) {
        return authGuard_P(req);
    }

    if (roleProtectedRoutesE.some((route) => url.startsWith(route))) {
        return roleGuard_E(req);
    } else if (roleProtectedRoutesP.some((route) => url.startsWith(route))) {
        return roleGuard_P(req);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/eventeco/:path*", "/pawnity/:path*"],
};
