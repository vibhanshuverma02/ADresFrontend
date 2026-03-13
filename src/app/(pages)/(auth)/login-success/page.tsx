// "use client";
// import { useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function LoginSuccess() {
//   const search = useSearchParams();
//   const router = useRouter();

//   useEffect(() => {
//     const token = search.get("token");
//     if (token) {
//       localStorage.setItem("externalAccessToken", token);
//       router.push("/forums");
//     }
//   }, [search, router]);

//   return <div>Logging you in...</div>;
// }
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/context/Authcontext";

export default function LoginSuccess() {
  const router = useRouter();
  const { user, setActiveRole } = useAuth();

  useEffect(() => {
    const cookieToken = Cookies.get("accessToken");

    if (cookieToken) {
      console.log("✅ Found accessToken cookie from backend redirect");
      localStorage.setItem("accessToken", cookieToken);
      // AuthContext will auto-run validateSession() now
    } else {
      console.warn("⚠️ No accessToken cookie found — check domain or path mismatch");
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    console.log("👤 User set from AuthContext:", user);

    if (user.roles?.length === 1) {
      setActiveRole(user.roles[0]);
    }

    if (user.roles?.includes("EXTERNAL_ACTOR")) {
  console.log("doooooo")
    } else {
      router.push("/choose-role");
    }
  }, [user, router, setActiveRole]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium text-gray-700">
        Signing you in…
      </p>
    </div>
  );
}


// ✅ Helper to decode JWT payload safely
function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}
