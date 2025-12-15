'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname(); // <-- get current page path
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      try {
        const res = await fetch("http://localhost:3001/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
        } else {
          setLoading(false);
        }
      } catch (error) {
        router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      }
    };

    checkAuth();
  }, [router, pathname]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default ProtectedLayout;
