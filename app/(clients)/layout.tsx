import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "../globals.css";

import Navbar from "../components/navbar/Navbar";
import ClientsOnly from "../components/ClientsOnly";
import ToasterProvider from "../providers/ToasterProvider";
import ConditionalBottomNav from "../components/navbar/ConditionalBottomNav";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const font = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Campus Crib",
    template: "%s | Campus Crib",
  },
  description:
    "Campus Crib helps students find verified off-campus housing easily. Browse available houses, connect with trusted agents, and secure accommodation faster.",
  manifest:"/site.webmanifest",
  verification: {
    google: "dtZJ_gFOAk8VJtYxYO4U49SP4tG5baOLGfOqxrVq06c",
  },
  keywords: [
    "Campus Crib",
    "student housing Nigeria",
    "FUTA accommodation",
    "off campus housing",
    "student rent",
    "student apartments",
  ],
  authors: [{ name: "Campus Crib" }],
  creator: "Campus Crib",
};

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Server-side session fetch
  const session = await auth.api.getSession({
headers: await headers(),
});
  

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientsOnly>
          <ToasterProvider />
          <Navbar session={session} />
          <ConditionalBottomNav />
        </ClientsOnly>

        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
    }
