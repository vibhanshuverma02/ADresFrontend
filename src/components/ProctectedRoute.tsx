// "use client";
// import { useAuth } from "@/hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export function RedirectIfAuthenticated({ children }: { children: React.ReactNode }) {
//   const { user, loading } = useAuth(false); 
//   const router = useRouter();
//   const [checking, setChecking] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       setChecking(false);
//       return;
//     }

//     if (!loading && user) {
//       if (user.roles.length > 1) {
//         // multiple roles → send to choose page
//         router.replace("/choose-role");
//       } else if (user.roles.includes("ADMIN")) {
//         router.replace("/admin/dashboard");
//       } else if (user.roles.includes("RESEARCHER")) {
//         router.replace("/ceo/dashboard");
//       } else {
//         router.replace("/"); // fallback
//       }
//     }

//     if (!loading) setChecking(false);
//   }, [user, loading, router]);

//   if (checking) return <p>Loading...</p>;

//   return <>{children}</>;
// }
"use client";
import { useAuth } from "@/context/Authcontext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function RedirectIfAuthenticated({ children }: { children: React.ReactNode }) {
  const { user, activeRole, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const inviteToken = searchParams.get("token");
    console.log("🔍 [RedirectIfAuthenticated] inviteToken:", inviteToken);

    if (loading) return; // still fetching session

    // ✅ If it's an invite registration link → don't redirect
    if (inviteToken) {
      console.log("📩 Invite token detected, allowing registration");
      setChecking(false);
      return;
    }

    if (user) {
      console.log("✅ User found, redirecting...");
      if (user.roles.length > 1 && !activeRole) {
        router.replace("/choose-role");
      } else if (activeRole === "SUPER_ADMIN") {
        // router.replace("/admin/dashboard");
        window.location.href = "http://localhost:3003/superadmin/Dashboard";
      } else if (activeRole === "COE_MANAGER") {
        // router.replace("/ceo/dashboard");
         window.location.href = "http://localhost:3003/coemanager/Dashboard";
      }
      else if (activeRole === "RESEARCHER") {
        // router.replace("/ceo/dashboard");
         window.location.href = "http://localhost:3003/researcher/Dashboard";
      } else {
        router.replace("/");
      }
      return;
    }

    console.log("❌ No user, showing login/register page");
    setChecking(false);
  }, [user, activeRole, loading, router, searchParams]);

  if (checking) return <p>Loading...</p>;

  return <>{children}</>;
}
