import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ 
      headers: await headers() 
    });

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { targetId } = await req.json();

    // Deduct credit and add to unlocked list
    await prisma.profile.update({
      where: { userId: session.user.id },
      data: {
        credits: { decrement: 1 },
        profilesViewed: { push: targetId }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unlock Error:", error);
    return new NextResponse("Error processing unlock", { status: 500 });
  }
}