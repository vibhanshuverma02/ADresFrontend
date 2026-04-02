"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<AuthStep>("INIT");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);

  // ── Session restore on mount ─────────────────────────────────────────────
  // The axios interceptor handles 401 → refresh → retry automatically.
  // So api.get("/auth/me") succeeds even if accessToken expired,
  // as long as the rt cookie is still valid (30 days).
  // context/Authcontext.tsx — fix validateSession
useEffect(() => {
  const storedRole = localStorage.getItem("activeRole");

  async function validateSession() {
    try {
      const res = await api.get("/auth/me");
      const userData = res.data;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setStep("LOGGED_IN");

      // ✅ KEY FIX: if role already chosen, go straight to dashboard
      if (storedRole && userData.roles?.includes(storedRole)) {
        setActiveRole(storedRole);
        // Don't redirect here — let RedirectIfAuthenticated handle it
        // but pass the storedRole so it can go to dashboard directly
      } else {
        // Role not stored or invalid — clear it
        localStorage.removeItem("activeRole");
      }
    } catch {
      console.warn("❌ Session fully expired");
      clearAuthState();
    } finally {
      setLoading(false);
    }
  }

  validateSession();
}, []);

  function clearAuthState() {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("activeRole");
      localStorage.removeItem("accessToken");
    } catch {}
    setUser(null);
    setActiveRole(null);
    setSessionId(null);
    setCaptchaImage(null);
    setStep("INIT");
  }

  // ── Login flow ───────────────────────────────────────────────────────────

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
        // Save accessToken in both localStorage and cookie
        localStorage.setItem("accessToken", res.data.accessToken);
        document.cookie = `accessToken=${res.data.accessToken}; path=/; SameSite=Lax; Secure`;

        // Fetch full user from /auth/me
        const meRes = await api.get("/auth/me");
        const userData = meRes.data;
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setStep("LOGGED_IN");
        router.push("/choose-role");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Logout ───────────────────────────────────────────────────────────────

  const logout = (redirect = true) => {
    clearAuthState();
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "activeRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    if (redirect) router.push("/login");
  };

  // ── Role choice ──────────────────────────────────────────────────────────

  const chooseRole = (role: string) => {
    setActiveRole(role);
    localStorage.setItem("activeRole", role);
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
        user, activeRole, loading, step, sessionId, captchaImage,
        login, verifyOtp, resendOtp, recreateCaptcha, verifyCaptcha,
        logout, chooseRole, setActiveRole,
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