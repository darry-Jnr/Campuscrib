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

  const { name, dept, level, gender, location, bio } = await req.json();

  const profile = await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: { name, dept, level, gender, location, bio },
    create: { userId: session.user.id, name, dept, level, gender, location, bio },
  });

  return new Response(JSON.stringify(profile), { status: 200 });
}


// // pages/api/profile/update.ts
// import { prisma } from "@/lib/prisma";
// import { getSession } from "next-auth/react";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   const session = await getSession({ req });
//   if (!session) return res.status(401).json({ error: "Not authenticated" });

//   const { name, dept, level, bio } = req.body;

//   // Update or create profile
//   const profile = await prisma.profile.upsert({
//     where: { userId: session.user.id },
//     update: { name, dept, level, bio },
//     create: { userId: session.user.id, name, dept, level, bio },
//   });

//   res.status(200).json(profile);
// }
