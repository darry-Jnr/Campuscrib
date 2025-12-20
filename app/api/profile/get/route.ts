import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: {
      name: true,
      dept: true,
      level: true,
      gender: true,
      location: true,
      bio: true,
    },
  });

  return new Response(JSON.stringify(profile), { status: 200 });
}
