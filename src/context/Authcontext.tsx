"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { isExternal } from "util/types";

type User = {
  id: string;
  name: string;
  email: string;
  roles: string[];
};

type AuthStep =
  | "INIT"
  | "EMAIL_OTP_SENT"
  | "OTP_VERIFIED"
  | "CAPTCHA_REQUIRED"
  | "LOGGED_IN";

type AuthContextType = {
  user: User | null;
  activeRole: string | null;
  loading: boolean;
  step: AuthStep;
  sessionId: string | null;
  captchaImage: string | null;

  login: (email: string, password: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  resendOtp: () => Promise<void>;
  recreateCaptcha: () => Promise<any>;
  verifyCaptcha: (captcha: string, deviceInfo: string) => Promise<void>;

  logout: (redirect?: boolean) => void;
  chooseRole: (role: string) => void;
  setActiveRole: (role: string | null) => void;
};

type JwtPayload = {
  sub?: string;
  email?: string;
  roles?: string[];
  [key: string]: any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<AuthStep>("INIT");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);

  function parseJwt(token: string): JwtPayload | null {
  try {
    const base64 = token.split(".")[1];
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}


  // ✅ Restore + validate session on mount
  useEffect(() => {
    const storedRole = localStorage.getItem("activeRole");

    async function validateSession() {
      try {
        console.log("itired")
        const res = await api.get("/auth/me");
        
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        if (storedRole) setActiveRole(storedRole);
        setStep("LOGGED_IN");
       // router.push("/choose-role");
      } catch (err) {
        console.warn("❌ Session invalid, clearing localStorage");
        logout(false);
      } finally {
        setLoading(false);
      }
    }

    validateSession();
  }, []);
 // ✅ Restore + validate session on mount
  // ------------------------------
  // Validate Session (Used on mount + refresh)
  // ------------------------------
  async function validateSession() {
    const storedRole = localStorage.getItem("activeRole");
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setLoading(false);
      return;
    }

    const payload = parseJwt(token);
    const isExternal =  payload?.roles?.includes("EXTERNAL_ACTOR");

    try {
      console.log("🔍 Validating session...");
      const endpoint = "/auth/me";
      const res = await api.get(endpoint);

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      if (storedRole) setActiveRole(storedRole);
      setStep("LOGGED_IN");

      // ✅ Restore last path if refresh just happened
      const lastPath = localStorage.getItem("lastPathBeforeRefresh");
      if (lastPath) {
        router.push(lastPath);
        localStorage.removeItem("lastPathBeforeRefresh");
      }
    } catch (err) {
      console.warn("❌ Session invalid, clearing localStorage");
      logout(false);
    } finally {
      setLoading(false);
    }
  }

  // // ------------------------------
  // // Mount → Validate session
  // // ------------------------------
  // useEffect(() => {
  //   validateSession();
  // }, []);

  // // ------------------------------
  // // Listen for token refresh events
  // // ------------------------------
  // useEffect(() => {
  //   const handleTokenRefresh = () => {
  //     console.log("🔔 Token refreshed — revalidating session...");
  //     validateSession();
  //   };

  //   window.addEventListener("tokenRefreshed", handleTokenRefresh);
  //   return () => window.removeEventListener("tokenRefreshed", handleTokenRefresh);
  // }, []);

  // -------------------------------
  // LOGIN → OTP → CAPTCHA FLOW
  // -------------------------------

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data.step === "EMAIL_OTP_SENT") {
        setSessionId(res.data.sessionId);
        setStep("EMAIL_OTP_SENT");
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp: string) => {
    if (!sessionId) throw new Error("No active session");
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-email-otp", { sessionId, otp });
      if (res.data.step === "CAPTCHA_REQUIRED") {
        setStep("CAPTCHA_REQUIRED");
        setCaptchaImage(res.data.captchaImage);
      }
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!sessionId) throw new Error("No active session");
    await api.post("/auth/resend-email-otp", { sessionId });
  };

  const recreateCaptcha = async () => {
    if (!sessionId) throw new Error("No active session");
    const res = await api.post("/auth/recreate-captcha", { sessionId });
    setCaptchaImage(res.data.captchaImage);
    return res.data;
  };

  const verifyCaptcha = async (captcha: string, deviceInfo: string) => {
    if (!sessionId) throw new Error("No active session");
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-captcha", {
        sessionId,
        captcha,
        deviceInfo,
      });

      if (res.data.message === "login") {
        // ✅ Save accessToken
        localStorage.setItem("accessToken", res.data.accessToken);
        document.cookie = `accessToken=${res.data.accessToken}; path=/; SameSite=Lax; Secure`;
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setUser(res.data.user);
        setStep("LOGGED_IN");
        router.push("/choose-role");
      }
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // LOGOUT
  // -------------------------------

  const logout = (redirect: boolean = true) => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("activeRole");
      localStorage.removeItem("accessToken");
    } catch (e) {}
    setUser(null);
    setActiveRole(null);
    setSessionId(null);
    setCaptchaImage(null);
    setStep("INIT");
    if (redirect) router.push("/login");
  };

  // -------------------------------
  // ROLE CHOICE
  // -------------------------------

 const chooseRole = (role: string) => {
  setActiveRole(role);
  localStorage.setItem("activeRole", role);
  // ✅ Remove domain=localhost
  document.cookie = `activeRole=${role}; path=/; SameSite=Lax`;
  
  if (role === "SUPER_ADMIN") {
    window.location.href = "https://adresnetwork.iitr.ac.in/dashboard/superadmin/Dashboard";
  } else if (role === "COE_MANAGER") {
    window.location.href = "https://adresnetwork.iitr.ac.in/dashboard/coemanager/Dashboard";
  } else if (role === "RESEARCHER") {
    window.location.href = "https://adresnetwork.iitr.ac.in/dashboard/researcher/Dashboard";
  }
};

  return (
    <AuthContext.Provider
      value={{
        user,
        activeRole,
        loading,
        step,
        sessionId,
        captchaImage,
        login,
        verifyOtp,
        resendOtp,
        recreateCaptcha,
        verifyCaptcha,
        logout,
        chooseRole,
        setActiveRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
function parseJwt(token: string) {
  throw new Error("Function not implemented.");
}

