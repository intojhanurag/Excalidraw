"use client"


import { useEffect } from "react"

import { useRouter } from "next/navigation"


export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.replace("/signin");
    }
  }, [router]);

  return <>{children}</>;
}