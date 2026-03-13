"use client";
import { useState } from "react";
import { useAuth } from "@/context/Authcontext";
import { RedirectIfAuthenticated } from "@/components/ProctectedRoute";
import DimmedVideo from "@/components/backgroundimages";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ExternalLoginButtons from "@/components/loginbutton";

export default function LoginPage() {
  const {
    login,
    verifyOtp,
    resendOtp,
    recreateCaptcha,
    verifyCaptcha,
    step,
    loading,
    captchaImage, // ✅ directly from context
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 1️⃣ Handle login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password); // context handles moving to EMAIL_OTP_SENT
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  // 2️⃣ Handle OTP
  async function handleOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await verifyOtp(otp); // context moves step → CAPTCHA_REQUIRED
    } catch (err: any) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResendOtp() {
    try {
      await resendOtp();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    }
  }

  // 3️⃣ Handle Captcha
  async function handleCaptcha(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {

      await verifyCaptcha(captcha, "web-client");
      console.log("@@@@") // will redirect to /choose-role
    } catch (err: any) {
      setError(err.response?.data?.message || "Captcha verification failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRecreateCaptcha() {
    try {
      await recreateCaptcha(); // ✅ context updates captchaImage automatically
    } catch (err: any) {
      setError("Failed to load new captcha");
    }
  }

  return (
    <RedirectIfAuthenticated>
      {/* Background video */}
      <div className="fixed inset-0 -z-10">
        <DimmedVideo src="/login.mp4" opacity={0.75} />
      </div>

      {/* Branding */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-blue-600">Login to get started!</p>
      </div>

      <div className="relative max-w-md mx-auto h-[420px] mt-6">
        <AnimatePresence mode="wait">
          {/* STEP 1: Login */}
          {step === "INIT" && (
            <motion.div
              key="login-card"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute w-full"
            >
              <Card className="bg-white/90 backdrop-blur shadow-lg border rounded-xl">
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <ExternalLoginButtons></ExternalLoginButtons>
                  <CardDescription>Please enter your credentials</CardDescription>
                </CardHeader>

                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <Checkbox
                          checked={remember}
                          onCheckedChange={(val: boolean) => setRemember(val)}
                        />
                        <span className="text-sm">Remember me</span>
                      </label>
                      <Link
                        href="#"
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 text-white"
                      disabled={submitting || loading}
                    >
                      {submitting || loading ? "Logging in..." : "Login"}
                    </Button>

                    <div className="text-center text-gray-500 text-sm">
                      Or sign in with
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" className="w-1/2 flex gap-2" >
                        <FcGoogle size={18} /> Google
                      
                      </Button>
                      <Button variant="outline" className="w-1/2 flex gap-2">
                        <FaFacebook size={18} className="text-blue-600" /> Facebook
                      </Button>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>
          )}

          {/* STEP 2: OTP */}
          {step === "EMAIL_OTP_SENT" && (
            <motion.div
              key="otp-card"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute w-full"
            >
              <Card className="bg-white/90 backdrop-blur shadow-lg border rounded-xl">
                <CardHeader>
                  <CardTitle>Email OTP</CardTitle>
                  <CardDescription>
                    Enter the OTP sent to <span className="font-semibold">{email}</span>
                  </CardDescription>
                </CardHeader>

                <form onSubmit={handleOtp}>
                  <CardContent className="space-y-4">
                    <Input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      required
                    />
                  </CardContent>

                  <CardFooter className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full bg-green-600 text-white"
                      disabled={submitting}
                    >
                      {submitting ? "Verifying..." : "Verify OTP"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      type="button"
                      onClick={handleResendOtp}
                    >
                      Resend OTP
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>
          )}

          {/* STEP 3: Captcha */}
          {step === "CAPTCHA_REQUIRED" && (
            <motion.div
              key="captcha-card"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute w-full"
            >
              <Card className="bg-white/90 backdrop-blur shadow-lg border rounded-xl">
                <CardHeader>
                  <CardTitle>Captcha Verification</CardTitle>
                  <CardDescription>
                    Please solve the captcha to continue
                  </CardDescription>
                </CardHeader>

                <form onSubmit={handleCaptcha}>
                  <CardContent className="space-y-4 text-center">
                    {captchaImage ? (
                      <img
                        src={captchaImage}
                        alt="captcha"
                        className="mx-auto rounded border"
                      />
                    ) : (
                      <div className="p-4 bg-gray-100 rounded">
                        Captcha not loaded
                      </div>
                    )}

                    <Input
                      type="text"
                      value={captcha}
                      onChange={(e) => setCaptcha(e.target.value)}
                      placeholder="Enter captcha"
                      required
                    />

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleRecreateCaptcha}
                    >
                      Refresh Captcha
                    </Button>
                  </CardContent>

                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full bg-purple-600 text-white"
                      disabled={submitting}
                    >
                      {submitting ? "Verifying..." : "Verify Captcha"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error message */}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </RedirectIfAuthenticated>
  );
}
