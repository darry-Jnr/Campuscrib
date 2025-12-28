'use server'
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    if (!existingAgent.isVerified) {
      redirect("/agents/pending");
    }
    redirect("/agents");
  }

  return { userId: session.user.id }
}

export async function createAgentProfile(formData: any) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    if (!session) {
     redirect("/auth/login")
    }
  
    try {
      // 1. Save to Database
      const newAgent = await prisma.agentProfile.create({
        data: {
          userId: session.user.id,
          businessName: formData.businessName,
          agentType: formData.agentType,
          yearsOfExperience: parseInt(formData.yearsOfExperience) || 0,
          whatsappNumber: formData.whatsappNumber,
          responseTime: formData.responseTime,
          officeAddress: formData.officeAddress || null,
          status: "REGISTERED",
          isVerified: false, 
        },
      });
  
      // 2. Update the User's Role to AGENT
      await prisma.user.update({
        where: { id: session.user.id },
        data: { role: "AGENT" },
      });

      // 3. SEND EMAIL NOTIFICATION TO YOU
      // Note: If you haven't verified a domain in Resend, 
      // use 'onboarding@resend.dev' as the 'from' address.
      await resend.emails.send({
        from: 'CampusCrib <onboarding@resend.dev>',
        to: 'claudistore01@gmail.com',
        subject: `🚀 New Agent: ${formData.businessName}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #16a34a;">New Agent Registration</h2>
            <p>A new agent has just signed up on CampusCrib.</p>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p><strong>Business Name:</strong> ${formData.businessName}</p>
            <p><strong>Agent Type:</strong> ${formData.agentType}</p>
            <p><strong>WhatsApp:</strong> ${formData.whatsappNumber}</p>
            <p><strong>Exp:</strong> ${formData.yearsOfExperience} years</p>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #666;">Action Required: Login to Prisma Studio to verify this account.</p>
          </div>
        `
      });
  
    } catch (error) {
      console.error("Database or Email Error:", error);
      // We still redirect to pending even if email fails so the user isn't stuck
    }
  
    redirect("/agents/pending");
  }