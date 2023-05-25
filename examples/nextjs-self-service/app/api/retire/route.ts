import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    console.log("got req", json);
    return NextResponse.json({ success: true });
  } catch (e) {}
}
