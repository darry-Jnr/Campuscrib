import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function PATCH(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

  const { isPublished } = await req.json();

  const updated = await prisma.profile.update({
    where: { userId: session.user.id },
    data: { isPublished },
  });

  return new Response(JSON.stringify(updated), { status: 200 });
}