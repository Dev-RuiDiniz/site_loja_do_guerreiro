import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Integração descontinuada na nova Loja do Guerreiro" },
    { status: 410 }
  );
}
