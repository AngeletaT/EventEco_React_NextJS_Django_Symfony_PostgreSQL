import { NextRequest, NextResponse } from "next/server";

export function authGuard_E(req: NextRequest) {
    const accesstoken = req.cookies.get("accesstoken");

    if (accesstoken) {
        return NextResponse.redirect(new URL("/eventeco/home", req.url));
    }

    return NextResponse.next();
}
