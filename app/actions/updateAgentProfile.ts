"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function updateAgentProfile(data: any) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { success: false };

  try {
    await prisma.agentProfile.upsert({
      where: { userId: session.user.id },
      update: { ...data, yearsOfExperience: Number(data.yearsOfExperience) },
      create: { ...data, userId: session.user.id, yearsOfExperience: Number(data.yearsOfExperience) }
    });
    return { success: true };
  } catch (e) { return { success: false }; }
}
