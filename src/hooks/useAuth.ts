"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export function useAuth(redirectIfUnauthed = true) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
   const [activeRole, setActiveRole] = useState<string | null>(
  localStorage.getItem("activeRole")
);


 useEffect(() => {
  let mounted = true;

  async function checkAuth() {
    try {
      // 1. Check localStorage first
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // 2. Only hit backend if user not in localStorage
        const res = await api.get("/auth/me");
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    } catch (err) {
      if (redirectIfUnauthed) router.push("/login");
    } finally {
      if (mounted) setLoading(false);
    }
  }

  checkAuth();

  return () => {
    mounted = false;
  };
}, [router, redirectIfUnauthed]);


  return { user, loading ,  activeRole, setActiveRole };
}
