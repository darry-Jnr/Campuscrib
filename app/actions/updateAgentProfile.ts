"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function updateAgentProfile(data: any) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error("Unauthorized");

    const profile = await prisma.agentProfile.upsert({
      where: { userId: session.user.id },
      update: {
        businessName: data.businessName,
        agentType: data.agentType,
        yearsOfExperience: Number(data.yearsOfExperience),
        whatsappNumber: data.whatsappNumber,
        officeAddress: data.officeAddress,
        responseTime: data.responseTime,
      },
      create: {
        userId: session.user.id,
        businessName: data.businessName,
        agentType: data.agentType,
        yearsOfExperience: Number(data.yearsOfExperience),
        whatsappNumber: data.whatsappNumber,
        officeAddress: data.officeAddress,
        responseTime: data.responseTime,
      },
    });

    revalidatePath("/agents/profile");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}