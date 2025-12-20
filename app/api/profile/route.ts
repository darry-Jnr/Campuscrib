import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const { name, dept, level, gender, location, bio, status, school, phone } = await req.json();

  const profile = await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: { 
      name, 
      dept, 
      level, 
      gender, 
      location, 
      bio,
      status,
      school,
      phone,
      // THIS PART updates the User table name to match
      user: {
        update: { name: name }
      }
    },
    create: { 
      userId: session.user.id, 
      name, 
      dept, 
      level, 
      gender, 
      location, 
      bio ,
      status,
      school,
      phone
    },
  });

  return new Response(JSON.stringify(profile), { status: 200 });
}