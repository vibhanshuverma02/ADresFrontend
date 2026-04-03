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

  // ✅ CASE 1: Only one role → auto assign it
  if (user.roles.length === 1 && !activeRole) {
    const singleRole = user.roles[0];
    console.log("🎯 Single role detected:", singleRole);

    // You may already have a setter in context like setActiveRole
    // If yes → use it
    // setActiveRole(singleRole);

    // OR directly redirect based on role
    if (singleRole === "SUPER_ADMIN") {
      window.location.href = "https://adresnetwork.iitr.ac.in/dashboard/superadmin/Dashboard";
    } else if (singleRole === "COE_MANAGER") {
      window.location.href = "https://adresnetwork.iitr.ac.in/dashboard/coemanager/Dashboard";
    } else if (singleRole === "RESEARCHER") {
      window.location.href = "https://adresnetwork.iitr.ac.in/dashboard/researcher/Dashboard";
    }

    return;
  }

  // ✅ CASE 2: Multiple roles → choose role page
  if (user.roles.length > 1 && !activeRole) {
    router.replace("/choose-role");
    return;
  }

  // ✅ CASE 3: Role already selected
  if (activeRole === "SUPER_ADMIN") {
    window.location.href = "https://adresnetwork.iitr.ac.in/dashboard/superadmin/Dashboard";
  } else if (activeRole === "COE_MANAGER") {
    window.location.href = "https://adresnetwork.iitr.ac.in/dashboard/coemanager/Dashboard";
  } else if (activeRole === "RESEARCHER") {
    window.location.href = "https://adresnetwork.iitr.ac.in/dashboard/researcher/Dashboard";
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
