import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("page") === "1") {
    return NextResponse.json([
      {
        id: 3,
      },
      {
        id: 4,
      },
    ]);
  }
  return NextResponse.json([
    {
      id: 1,
    },
    {
      id: 2,
    },
  ]);
}
