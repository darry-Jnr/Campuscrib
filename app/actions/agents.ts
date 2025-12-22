'use server'
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function checkExistingAgent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signup");
  }

  const existingAgent = await prisma.agentProfile.findUnique({
    where:{ userId: session.user.id }
  });

  if (existingAgent) {
    redirect("/agents")
  }

  return {
    userId: session.user.id
  }
}

export async function createAgentProfile(formData: any) {
    // 1. Get the session again to be 100% safe (Security)
    const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    if (!session) {
     redirect("/auth/login")
    }
  
    // 2. THE SWITCH: Determine if they are Level 1 or Level 2
    // If NIN is present and has 11 digits, they are IDENTITY_VERIFIED
    const isIdProvided = formData.nin && formData.nin.length === 11;
    const status = isIdProvided ? "IDENTITY_VERIFIED" : "REGISTERED";
  
    try {
      // 3. Save to Database
      await prisma.agentProfile.create({
        data: {
          userId: session.user.id,
          businessName: formData.businessName,
          agentType: formData.agentType,
          yearsOfExperience: parseInt(formData.yearsOfExperience) || 0,
          whatsappNumber: formData.whatsappNumber,
          backupNumber: formData.backupNumber || null,
          officeAddress: formData.officeAddress || null,
          // Step 3 data
          nin: formData.nin || null,
          association: formData.association || null,
          // The Verification Status
          status: status,
          isVerified: false, // This stays false until you (Admin) confirm the NIN is real
        },
      });
  
      // 4. Update the User's Role to AGENT
      await prisma.user.update({
        where: { id: session.user.id },
        data: { role: "AGENT" },
      });
  
    } catch (error) {
      console.error("Database Error:", error);
      return { error: "Something went wrong while saving your profile." };
    }
  
    // 5. Send them to the Agent Dashboard
    redirect("/agents");
  }