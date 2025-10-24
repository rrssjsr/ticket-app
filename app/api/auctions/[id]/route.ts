import { NextResponse } from "next/server";
import { tickets } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const t = tickets.find((x) => x.id === id);
  if (!t) return new Response("Not found", { status: 404 });
  return NextResponse.json({ ticket: t });
}
