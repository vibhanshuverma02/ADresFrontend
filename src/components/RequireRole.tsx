// "use client";
// import { ReactNode, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/hooks/useAuth";

// export default function RequireRole({
//   roles,
//   children,
// }: {
//   roles: string[];
//   children: ReactNode;
// }) {
//   const { user, loading } = useAuth(false); // don't auto-redirect on unauth
//   const router = useRouter();
//   const [checking, setChecking] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       router.replace("/login");
//       return;
//     }

//     if (!loading) {
//       if (!user) {
//         router.replace("/login");
//       } else if (!roles.some((r) => user.roles.includes(r))) {
//         router.replace("/unauthorized");
//       } else {
//         setChecking(false); // authorized → render page
//       }
//     }
//   }, [user, loading, roles, router]);

//   if (checking) return <p>Loading...</p>;

//   return <>{children}</>;
// }


"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";

export default function RequireRole({
  roles,
  children,
}: {
  roles: string[];
  children: ReactNode;
}) {
  const { user, activeRole, loading } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (loading) return; // still fetching session

    if (!user) {
      router.replace("/login");
      return;
    }

    // ✅ if role hasn’t been chosen yet but user has multiple
    if (!activeRole && user.roles.length > 1) {
      router.replace("/choose-role");
      return;
    }

    // ✅ if active role not in allowed list
    if (activeRole && !roles.includes(activeRole)) {
      router.replace("/unauthorized");
      return;
    }

    setChecking(false);
  }, [user, activeRole, roles, loading, router]);

  if (checking) return <p>Loading...</p>;

  return <>{children}</>;
}
