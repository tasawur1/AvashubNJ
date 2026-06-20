import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type SessionData } from "@/lib/session";

export async function GET() {
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    return NextResponse.json({ isLoggedIn: session.isLoggedIn === true });
  } catch {
    return NextResponse.json({ isLoggedIn: false });
  }
}
