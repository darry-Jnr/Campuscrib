import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const secret = process.env.PAYSTACK_SECRET_KEY!;

    // 1. Verify the signature (Security: prevents fake payments)
    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(body))
      .digest("hex");

    if (hash !== req.headers.get("x-paystack-signature")) {
      return new NextResponse("Invalid signature", { status: 400 });
    }

    // 2. Check for successful payment event
    if (body.event === "charge.success") {
      const email = body.data.customer.email;
      
      // 3. Update the Profile credits via the User relation
      // Since 'User' has a unique email, we find the user and update their profile
      await prisma.user.update({
        where: { email: email },
        data: {
          profile: {
            update: {
              credits: {
                increment: 5 // Add 5 credits as per your pricing
              }
            }
          }
        }
      });

      console.log(`✅ Success: Added 5 credits to profile for user: ${email}`);
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}