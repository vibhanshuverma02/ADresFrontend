// "use client";
// import { useState } from "react";
// import { useAuth } from "@/context/Authcontext";
// import { RedirectIfAuthenticated } from "@/components/ProctectedRoute";
// import DimmedVideo from "@/components/backgroundimages";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebook } from "react-icons/fa";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import ExternalLoginButtons from "@/components/loginbutton";

// export default function LoginPage() {
//   const {
//     login,
//     verifyOtp,
//     resendOtp,
//     recreateCaptcha,
//     verifyCaptcha,
//     step,
//     loading,
//     captchaImage, // ✅ directly from context
//   } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [captcha, setCaptcha] = useState("");
//   const [remember, setRemember] = useState(false);
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   // 1️⃣ Handle login
//   async function handleLogin(e: React.FormEvent) {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     try {
//       await login(email, password); // context handles moving to EMAIL_OTP_SENT
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   // 2️⃣ Handle OTP
//   async function handleOtp(e: React.FormEvent) {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     try {
//       await verifyOtp(otp); // context moves step → CAPTCHA_REQUIRED
//     } catch (err: any) {
//       setError(err.response?.data?.message || "OTP verification failed");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   async function handleResendOtp() {
//     try {
//       await resendOtp();
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to resend OTP");
//     }
//   }

//   // 3️⃣ Handle Captcha
//   async function handleCaptcha(e: React.FormEvent) {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     try {

//       await verifyCaptcha(captcha, "web-client");
//       console.log("@@@@") // will redirect to /choose-role
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Captcha verification failed");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   async function handleRecreateCaptcha() {
//     try {
//       await recreateCaptcha(); // ✅ context updates captchaImage automatically
//     } catch (err: any) {
//       setError("Failed to load new captcha");
//     }
//   }

//   return (
//     <RedirectIfAuthenticated>
//       {/* Background video */}
//       <div className="fixed inset-0 -z-10">
//         <DimmedVideo src="/login.mp4" opacity={0.75} />
//       </div>

//       {/* Branding */}
//       <div className="text-center">
//         <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
//         <p className="text-blue-600">Login to get started!</p>
//       </div>

//       <div className="relative max-w-md mx-auto h-[420px] mt-6">
//         <AnimatePresence mode="wait">
//           {/* STEP 1: Login */}
//           {step === "INIT" && (
//             <motion.div
//               key="login-card"
//               initial={{ x: -300, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: -300, opacity: 0 }}
//               transition={{ duration: 0.4 }}
//               className="absolute w-full"
//             >
//               <Card className="bg-white/90 backdrop-blur shadow-lg border rounded-xl">
//                 <CardHeader>
//                   <CardTitle>Login</CardTitle>
//                   {/* <ExternalLoginButtons></ExternalLoginButtons> */}
//                   <CardDescription>Please enter your credentials</CardDescription>
//                 </CardHeader>

//                 <form onSubmit={handleLogin}>
//                   <CardContent className="space-y-4">
//                     <Input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Email"
//                       required
//                     />
//                     <Input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Password"
//                       required
//                     />
//                     <div className="flex items-center justify-between">
//                       <label className="flex items-center space-x-2">
//                         <Checkbox
//                           checked={remember}
//                           onCheckedChange={(val: boolean) => setRemember(val)}
//                         />
//                         <span className="text-sm">Remember me</span>
//                       </label>
//                       <Link
//                         href="#"
//                         className="text-blue-600 text-sm hover:underline"
//                       >
//                         Forgot Password?
//                       </Link>
//                     </div>
//                   </CardContent>

//                   <CardFooter className="flex flex-col gap-3">
//                     <Button
//                       type="submit"
//                       className="w-full bg-blue-600 text-white"
//                       disabled={submitting || loading}
//                     >
//                       {submitting || loading ? "Logging in..." : "Login"}
//                     </Button>

//                     {/* <div className="text-center text-gray-500 text-sm">
//                       Or sign in with
//                     </div>
//                     <div className="flex gap-3">
//                       <Button variant="outline" className="w-1/2 flex gap-2" >
//                         <FcGoogle size={18} /> Google
                      
//                       </Button>
//                       <Button variant="outline" className="w-1/2 flex gap-2">
//                         <FaFacebook size={18} className="text-blue-600" /> Facebook
//                       </Button>
//                     </div> */}
//                   </CardFooter>
//                 </form>
//               </Card>
//             </motion.div>
//           )}

//           {/* STEP 2: OTP */}
//           {step === "EMAIL_OTP_SENT" && (
//             <motion.div
//               key="otp-card"
//               initial={{ x: 300, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: 300, opacity: 0 }}
//               transition={{ duration: 0.4 }}
//               className="absolute w-full"
//             >
//               <Card className="bg-white/90 backdrop-blur shadow-lg border rounded-xl">
//                 <CardHeader>
//                   <CardTitle>Email OTP</CardTitle>
//                   <CardDescription>
//                     Enter the OTP sent to <span className="font-semibold">{email}</span>
//                   </CardDescription>
//                 </CardHeader>

//                 <form onSubmit={handleOtp}>
//                   <CardContent className="space-y-4">
//                     <Input
//                       type="text"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       placeholder="Enter 6-digit OTP"
//                       required
//                     />
//                   </CardContent>

//                   <CardFooter className="flex flex-col gap-3">
//                     <Button
//                       type="submit"
//                       className="w-full bg-green-600 text-white"
//                       disabled={submitting}
//                     >
//                       {submitting ? "Verifying..." : "Verify OTP"}
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="w-full"
//                       type="button"
//                       onClick={handleResendOtp}
//                     >
//                       Resend OTP
//                     </Button>
//                   </CardFooter>
//                 </form>
//               </Card>
//             </motion.div>
//           )}

//           {/* STEP 3: Captcha */}
//           {step === "CAPTCHA_REQUIRED" && (
//             <motion.div
//               key="captcha-card"
//               initial={{ x: 300, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: 300, opacity: 0 }}
//               transition={{ duration: 0.4 }}
//               className="absolute w-full"
//             >
//               <Card className="bg-white/90 backdrop-blur shadow-lg border rounded-xl">
//                 <CardHeader>
//                   <CardTitle>Captcha Verification</CardTitle>
//                   <CardDescription>
//                     Please solve the captcha to continue
//                   </CardDescription>
//                 </CardHeader>

//                 <form onSubmit={handleCaptcha}>
//                   <CardContent className="space-y-4 text-center">
//                     {captchaImage ? (
//                       <img
//                         src={captchaImage}
//                         alt="captcha"
//                         className="mx-auto rounded border"
//                       />
//                     ) : (
//                       <div className="p-4 bg-gray-100 rounded">
//                         Captcha not loaded
//                       </div>
//                     )}

//                     <Input
//                       type="text"
//                       value={captcha}
//                       onChange={(e) => setCaptcha(e.target.value)}
//                       placeholder="Enter captcha"
//                       required
//                     />

//                     <Button
//                       type="button"
//                       variant="outline"
//                       className="w-full"
//                       onClick={handleRecreateCaptcha}
//                     >
//                       Refresh Captcha
//                     </Button>
//                   </CardContent>

//                   <CardFooter>
//                     <Button
//                       type="submit"
//                       className="w-full bg-purple-600 text-white"
//                       disabled={submitting}
//                     >
//                       {submitting ? "Verifying..." : "Verify Captcha"}
//                     </Button>
//                   </CardFooter>
//                 </form>
//               </Card>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Error message */}
//         {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
//       </div>
//     </RedirectIfAuthenticated>
//   );
// }
"use client";
import { useState } from "react";
import { useAuth } from "@/context/Authcontext";
import { RedirectIfAuthenticated } from "@/components/ProctectedRoute";
import DimmedVideo from "@/components/backgroundimages";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
import api from "@/lib/axios";

// ─── Forgot-password sub-steps ────────────────────────────────────────────────
type ForgotStep = "EMAIL" | "OTP" | "NEW_PASSWORD" | "DONE";

function ForgotPasswordModal({ onClose }: { onClose: () => void }) {
  const [forgotStep, setForgotStep] = useState<ForgotStep>("EMAIL");
  const [fpEmail, setFpEmail]         = useState("");
  const [fpOtp, setFpOtp]             = useState("");
  const [fpPassword, setFpPassword]   = useState("");
  const [fpConfirm, setFpConfirm]     = useState("");
  const [submitting, setSubmitting]   = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState("");

  // Step 1 — send OTP
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSubmitting(true);
    try {
      await api.post("/auth/forgot-password", { email: fpEmail });
      setSuccess("A reset code has been sent to your email.");
      setForgotStep("OTP");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset code.");
    } finally { setSubmitting(false); }
  }

  // Step 2 — verify OTP (no separate endpoint needed; move to step 3)
  // We just let them proceed; backend validates OTP on reset-password call.
  function handleOtpNext(e: React.FormEvent) {
    e.preventDefault();
    if (fpOtp.length !== 6) { setError("Enter the 6-digit code."); return; }
    setError("");
    setForgotStep("NEW_PASSWORD");
  }

  // Step 3 — reset password
  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (fpPassword !== fpConfirm) { setError("Passwords do not match."); return; }
    if (fpPassword.length < 8 || !/\d/.test(fpPassword)) {
      setError("Password must be ≥ 8 characters and contain at least one number.");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/auth/reset-password", {
        email: fpEmail,
        otp: fpOtp,
        newPassword: fpPassword,
      });
      setForgotStep("DONE");
    } catch (err: any) {
      setError(err.response?.data?.message || "Reset failed. Please try again.");
    } finally { setSubmitting(false); }
  }

  const stepTitles: Record<ForgotStep, string> = {
    EMAIL:        "Forgot Password",
    OTP:          "Enter Reset Code",
    NEW_PASSWORD: "Set New Password",
    DONE:         "Password Reset!",
  };

  const stepDescriptions: Record<ForgotStep, string> = {
    EMAIL:        "Enter your email and we'll send a 6-digit reset code.",
    OTP:          `We sent a 6-digit code to ${fpEmail}.`,
    NEW_PASSWORD: "Choose a strong new password.",
    DONE:         "Your password has been updated. You can now log in.",
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={  { scale: 0.92, opacity: 0, y: 20  }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm mx-4"
      >
        <Card className="bg-white shadow-2xl border-0 rounded-2xl overflow-hidden">
          {/* Coloured top bar that moves with step */}
          <div
            className={`h-1.5 transition-all duration-500 ${
              forgotStep === "EMAIL"        ? "bg-blue-500   w-1/4" :
              forgotStep === "OTP"          ? "bg-amber-500  w-2/4" :
              forgotStep === "NEW_PASSWORD" ? "bg-violet-500 w-3/4" :
                                              "bg-green-500  w-full"
            }`}
          />

          <CardHeader className="pt-6 pb-2">
            <CardTitle className="text-xl font-bold text-gray-800">
              {stepTitles[forgotStep]}
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              {stepDescriptions[forgotStep]}
            </CardDescription>
          </CardHeader>

          <AnimatePresence mode="wait">
            {/* ── Step: EMAIL ── */}
            {forgotStep === "EMAIL" && (
              <motion.div key="fp-email"
                initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }} transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleSendOtp}>
                  <CardContent className="space-y-3 pt-2">
                    <Input
                      type="email" placeholder="your@email.com"
                      value={fpEmail} onChange={(e) => setFpEmail(e.target.value)}
                      required autoFocus
                    />
                    {success && <p className="text-green-600 text-sm">{success}</p>}
                    {error   && <p className="text-red-500   text-sm">{error}</p>}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2 pb-6">
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={submitting}>
                      {submitting ? "Sending…" : "Send Reset Code"}
                    </Button>
                    <Button type="button" variant="ghost" className="w-full text-sm text-gray-500" onClick={onClose}>
                      Back to Login
                    </Button>
                  </CardFooter>
                </form>
              </motion.div>
            )}

            {/* ── Step: OTP ── */}
            {forgotStep === "OTP" && (
              <motion.div key="fp-otp"
                initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }} transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleOtpNext}>
                  <CardContent className="space-y-3 pt-2">
                    <Input
                      type="text" placeholder="6-digit code" maxLength={6}
                      value={fpOtp} onChange={(e) => setFpOtp(e.target.value.replace(/\D/g, ""))}
                      className="tracking-[0.35em] text-center text-lg font-mono"
                      required autoFocus
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                      type="button"
                      className="text-xs text-blue-500 hover:underline w-full text-center"
                      onClick={() => { setForgotStep("EMAIL"); setFpOtp(""); setError(""); setSuccess(""); }}
                    >
                      Didn't receive the code? Go back
                    </button>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2 pb-6">
                    <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                      Continue
                    </Button>
                  </CardFooter>
                </form>
              </motion.div>
            )}

            {/* ── Step: NEW_PASSWORD ── */}
            {forgotStep === "NEW_PASSWORD" && (
              <motion.div key="fp-pw"
                initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }} transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleReset}>
                  <CardContent className="space-y-3 pt-2">
                    <Input
                      type="password" placeholder="New password"
                      value={fpPassword} onChange={(e) => setFpPassword(e.target.value)}
                      required autoFocus
                    />
                    <Input
                      type="password" placeholder="Confirm new password"
                      value={fpConfirm} onChange={(e) => setFpConfirm(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-400">Min 8 characters, at least one number.</p>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2 pb-6">
                    <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white" disabled={submitting}>
                      {submitting ? "Resetting…" : "Reset Password"}
                    </Button>
                  </CardFooter>
                </form>
              </motion.div>
            )}

            {/* ── Step: DONE ── */}
            {forgotStep === "DONE" && (
              <motion.div key="fp-done"
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-4 pb-2 text-center">
                  <div className="text-5xl mb-3">✅</div>
                  <p className="text-gray-600 text-sm">
                    Your password has been updated successfully.
                  </p>
                </CardContent>
                <CardFooter className="pb-6">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={onClose}>
                    Back to Login
                  </Button>
                </CardFooter>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
}

// ─── Main Login Page ──────────────────────────────────────────────────────────
export default function LoginPage() {
  const {
    login,
    verifyOtp,
    resendOtp,
    recreateCaptcha,
    verifyCaptcha,
    step,
    loading,
    captchaImage,
  } = useAuth();

  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [otp, setOtp]               = useState("");
  const [captcha, setCaptcha]       = useState("");
  const [remember, setRemember]     = useState(false);
  const [error, setError]           = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSubmitting(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally { setSubmitting(false); }
  }

  async function handleOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSubmitting(true);
    try {
      await verifyOtp(otp);
    } catch (err: any) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally { setSubmitting(false); }
  }

  async function handleResendOtp() {
    try { await resendOtp(); }
    catch (err: any) { setError(err.response?.data?.message || "Failed to resend OTP"); }
  }

  async function handleCaptcha(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSubmitting(true);
    try {
      await verifyCaptcha(captcha, "web-client");
    } catch (err: any) {
      setError(err.response?.data?.message || "Captcha verification failed");
    } finally { setSubmitting(false); }
  }

  async function handleRecreateCaptcha() {
    try { await recreateCaptcha(); }
    catch { setError("Failed to load new captcha"); }
  }

  return (
    <RedirectIfAuthenticated>
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <DimmedVideo src="/login.mp4" opacity={0.75} />
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}
      </AnimatePresence>

      {/* Branding */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-blue-600">Login to get started!</p>
      </div>

      <div className="relative max-w-md mx-auto h-[420px] mt-6">
        <AnimatePresence mode="wait">

          {/* ── STEP 1: Login ── */}
          {step === "INIT" && (
            <motion.div key="login-card"
              initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }} transition={{ duration: 0.4 }}
              className="absolute w-full"
            >
              <Card className="bg-white/90 backdrop-blur shadow-lg border rounded-xl">
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>Please enter your credentials</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <Input
                      type="email" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email" required
                    />
                    <Input
                      type="password" value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password" required
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <Checkbox
                          checked={remember}
                          onCheckedChange={(val: boolean) => setRemember(val)}
                        />
                        <span className="text-sm">Remember me</span>
                      </label>

                      {/* ✅ Forgot password — opens modal */}
                      <button
                        type="button"
                        onClick={() => setShowForgot(true)}
                        className="text-blue-600 text-sm hover:underline focus:outline-none"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 text-white"
                      disabled={submitting || loading}
                    >
                      {submitting || loading ? "Logging in…" : "Login"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>
          )}

          {/* ── STEP 2: OTP ── */}
          {step === "EMAIL_OTP_SENT" && (
            <motion.div key="otp-card"
              initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }} transition={{ duration: 0.4 }}
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
                      type="text" value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP" required
                    />
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Button type="submit" className="w-full bg-green-600 text-white" disabled={submitting}>
                      {submitting ? "Verifying…" : "Verify OTP"}
                    </Button>
                    <Button variant="outline" className="w-full" type="button" onClick={handleResendOtp}>
                      Resend OTP
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>
          )}

          {/* ── STEP 3: Captcha ── */}
          {step === "CAPTCHA_REQUIRED" && (
            <motion.div key="captcha-card"
              initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }} transition={{ duration: 0.4 }}
              className="absolute w-full"
            >
              <Card className="bg-white/90 backdrop-blur shadow-lg border rounded-xl">
                <CardHeader>
                  <CardTitle>Captcha Verification</CardTitle>
                  <CardDescription>Please solve the captcha to continue</CardDescription>
                </CardHeader>
                <form onSubmit={handleCaptcha}>
                  <CardContent className="space-y-4 text-center">
                    {captchaImage ? (
                      <img src={captchaImage} alt="captcha" className="mx-auto rounded border" />
                    ) : (
                      <div className="p-4 bg-gray-100 rounded">Captcha not loaded</div>
                    )}
                    <Input
                      type="text" value={captcha}
                      onChange={(e) => setCaptcha(e.target.value)}
                      placeholder="Enter captcha answer" required
                    />
                    <Button type="button" variant="outline" className="w-full" onClick={handleRecreateCaptcha}>
                      Refresh Captcha
                    </Button>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-purple-600 text-white" disabled={submitting}>
                      {submitting ? "Verifying…" : "Verify Captcha"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>
          )}

        </AnimatePresence>

        {error && <p className="text-red-600 mt-4 text-center text-sm">{error}</p>}
      </div>
    </RedirectIfAuthenticated>
  );
}