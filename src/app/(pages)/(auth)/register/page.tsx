


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { CheckCircle, Loader2, MailCheck, KeyRound } from "lucide-react";
// import api from "@/lib/axios";
// import { ContactsEditor } from "@/components/contact";

// export default function RegisterWizard() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [inviteData, setInviteData] = useState<any>(null);

//   const [form, setForm] = useState({
//     email: "",
//     name: "",
//     password: "",
//     about: "",
//     inviteToken: "",
//     description: "",
//     designation: "",
//     learnMoreLink: "",
//     contacts: {} as Record<string, any>
//   });

//   const [activationCode, setActivationCode] = useState("");

//   // -----------------------------
//   // STEP 1: Verify Invite Token
//   // -----------------------------
//   useEffect(() => {
//     const token = searchParams.get("token");
//     if (!token) return;

//     setForm((p) => ({ ...p, inviteToken: token }));
//     verifyInviteToken(token);
//   }, [searchParams]);

//   async function verifyInviteToken(token: string) {
//     setLoading(true);
//     try {
//       const { data } = await api.get(`/auth/invite/verify?token=${token}`);
//       const invite = data.data;
//       setInviteData(invite.org);
//       setForm((prev) => ({ ...prev, email: invite.email }));
//       setStep(2);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Invalid or expired invite");
//     } finally {
//       setLoading(false);
//     }
//   }

//   // -----------------------------
//   // STEP 2: Registration
//   // -----------------------------
//   function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//   }

//   async function handleRegister(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       await api.post("/auth/register", {
//         ...form,
//         contacts: JSON.stringify(form.contacts),
//       });
//       setStep(3);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   // -----------------------------
//   // STEP 3: Activation
//   // -----------------------------
//   async function handleActivate(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await api.post("/auth/activate-org", {
//         orgId: inviteData.id,
//         code: activationCode,
//       });
//       router.push("/login");
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Activation failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   const stepInfo = [
//     {
//       id: 1,
//       title: "Verifying Invitation",
//       icon: <MailCheck className="w-8 h-8 text-blue-600" />,
//       description: "Confirming your invitation details before you begin.",
//       mediaUrl: "/videos/verify.mp4",
//       isVideo: true,
//     },
//     {
//       id: 2,
//       title: "Complete Registration",
//       icon: <CheckCircle className="w-8 h-8 text-green-600" />,
//       description: "Set up your personal profile and organization details.",
//       mediaUrl: "/videos/verify.mp4",
//       isVideo: false,
//     },
//     {
//       id: 3,
//       title: "Activate Your Organization",
//       icon: <KeyRound className="w-8 h-8 text-yellow-600" />,
//       description: "Enter the activation code we sent to your email.",
//       mediaUrl: "/images/activate.gif",
//       isVideo: false,
//     },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* LEFT SIDE: Steps Carousel */}
//       <div className="w-1/2 bg-white flex flex-col items-center justify-center border-r p-10 relative overflow-hidden">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={step}
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 50 }}
//             transition={{ duration: 0.5 }}
//             className="text-center max-w-md"
//           >
//             <div className="flex justify-center mb-4">{stepInfo[step - 1].icon}</div>
//             <h2 className="text-2xl font-bold mb-3">{stepInfo[step - 1].title}</h2>
//             <p className="text-gray-600 mb-6">{stepInfo[step - 1].description}</p>
//             {stepInfo[step - 1].isVideo ? (
//               <video
//                 src={stepInfo[step - 1].mediaUrl}
//                 autoPlay
//                 loop
//                 muted
//                 className="w-64 mx-auto rounded-xl shadow"
//               />
//             ) : (
//               <img
//                 src={stepInfo[step - 1].mediaUrl}
//                 alt="illustration"
//                 className="w-64 mx-auto rounded-xl shadow"
//               />
//             )}
//             <div className="absolute bottom-8 w-full flex justify-center space-x-2">
//               {[1, 2, 3].map((n) => (
//                 <div
//                   key={n}
//                   className={`h-2 w-8 rounded-full ${
//                     step === n ? "bg-blue-600" : "bg-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* RIGHT SIDE: Scrollable Form */}
//       <div className="w-1/2 flex flex-col items-center justify-start p-10 overflow-y-auto max-h-screen">
//         {loading && (
//           <div className="flex items-center space-x-3 text-blue-600 mb-4">
//             <Loader2 className="animate-spin" /> <span>Processing...</span>
//           </div>
//         )}
//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         {/* STEP 1 */}
//         {!loading && step === 1 && <p className="text-gray-600 text-center">Verifying your invite token...</p>}

//         {/* STEP 2: Registration */}
//         {!loading && step === 2 && (
//           <motion.form
//             key="register"
//             onSubmit={handleRegister}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="w-full max-w-md space-y-6"
//           >
//             <h3 className="text-lg font-semibold text-blue-600">CoE Manager Profile</h3>

//             <input
//               name="email"
//               className="border p-2 w-full rounded bg-gray-100 cursor-not-allowed"
//               value={form.email}
//               readOnly
//               placeholder="Email"
//             />
//             <input
//               name="name"
//               placeholder="Full Name"
//               className="border p-2 w-full rounded"
//               value={form.name}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               className="border p-2 w-full rounded"
//               value={form.password}
//               onChange={handleChange}
//               required
//             />
//             <input
//               name="designation"
//               placeholder="Designation / Center of Excellence P.I."
//               className="border p-2 w-full rounded"
//               value={form.designation}
//               onChange={handleChange}
//             />
//             <textarea
//               name="description"
//               placeholder="Profile Description"
//               className="border p-2 w-full rounded"
//               value={form.description}
//               onChange={handleChange}
//             />
//             <input
//               name="learnMoreLink"
//               placeholder="Learn More Link"
//               className="border p-2 w-full rounded"
//               value={form.learnMoreLink}
//               onChange={handleChange}
//             />
//             <ContactsEditor
//               contacts={form.contacts || {}}
//               onChange={(c) => setForm((p) => ({ ...p, contacts: c }))}
//             />

//             <h3 className="text-lg font-semibold text-green-600 mt-6">Organization Details</h3>
//             <textarea
//               name="about"
//               placeholder="About your organization..."
//               className="border p-2 w-full rounded"
//               value={form.about}
//               onChange={handleChange}
//             />

//             <button
//               className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? "Registering..." : "Continue"}
//             </button>
//           </motion.form>
//         )}

//         {/* STEP 3: Activation */}
//         {!loading && step === 3 && (
//           <motion.form
//             key="activation"
//             onSubmit={handleActivate}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="w-full max-w-sm space-y-4"
//           >
//             <p className="text-gray-600 text-center">Enter the 6-digit activation code sent to your email.</p>
//             <input
//               name="activationCode"
//               placeholder="Activation Code"
//               className="border p-2 w-full text-center rounded tracking-widest"
//               value={activationCode}
//               onChange={(e) => setActivationCode(e.target.value)}
//               maxLength={6}
//               required
//             />
//             <button
//               className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
//               type="submit"
//             >
//               Activate Organization
//             </button>
//           </motion.form>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, MailCheck, KeyRound } from "lucide-react";
import api from "@/lib/axios";
import { ContactsEditor } from "@/components/contact";

type InviteData = 
  | {
      role: "RESEARCHER";
      name: string;
      designation: string;
      email: string;
      orgId: string;
      org: {
        id: string;
        name: string;
        state: string;
        subTypeId: string;
        about: string;
        logo: string;
        isActive: boolean;
      };
    }
  | {
      role: "COE_MANAGER" | "SUPER_ADMIN";
      email: string;
      org: {
        id: string;
        name: string;
        state: string;
        subTypeId: string;
        about: string;
        logo: string;
        isActive: boolean;
      };
    };

export default function RegisterWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 const [activationCode, setActivationCode] = useState("");
  const [inviteData, setInviteData] = useState<InviteData | null>(null);

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    about: "",
    inviteToken: "",
    description: "",
    designation: "",
    learnMoreLink: "",
    contacts: {} as Record<string, any>
  });

  // -----------------------------
  // STEP 1: Verify Invite Token
  // -----------------------------
  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) return;

    setForm((p) => ({ ...p, inviteToken: token }));
    verifyInviteToken(token);
  }, [searchParams]);

  async function verifyInviteToken(token: string) {
    setLoading(true);
    try {
      const { data } = await api.get(`/auth/invite/verify?token=${token}`);
      const invite: InviteData = data.data;

      setInviteData(invite);

      // Map fields to form state
      if (invite.role === "RESEARCHER") {
        setForm((prev) => ({
          ...prev,
          email: invite.email,
          name: invite.name,
          designation: invite.designation,
          about: "",
        }));
      } else {
        // COE/SuperAdmin
        setForm((prev) => ({
          ...prev,
          email: invite.email,
          about: invite.org.about,
        }));
      }

      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid or expired invite");
    } finally {
      setLoading(false);
    }
  }

  // -----------------------------
// STEP 2: Registration
// -----------------------------
function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  const { name, value } = e.target;
  setForm((p) => ({ ...p, [name]: value }));
}

// async function handleRegister(e: React.FormEvent) {
//   e.preventDefault();
//   setLoading(true);
//   setError("");

//   try {
//     const payload = {
//       ...form,
//       contacts: JSON.stringify(form.contacts),
//     };

//     if (inviteData?.role === "RESEARCHER") {
//       // Researcher registration
//       await api.post("/users/newuser", payload);
//       router.push("/login"); // redirect after successful registration
//     } else {
//       // COE/SuperAdmin registration
//       await api.post("/auth/register", payload);
//       setStep(3); // proceed to activation
//     }
//   } catch (err: any) {
//     setError(err.response?.data?.message || "Registration failed");
//   } finally {
//     setLoading(false);
//   }
// }

async function handleRegister(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const payload = {
      ...form,
      contacts: JSON.stringify(form.contacts),
    };

    if (inviteData?.role === "RESEARCHER") {
      // Researcher registration
      await api.post("/users/newuser", payload);

      // ✅ Clear localStorage
      localStorage.clear();

      // ✅ Clear sessionStorage
      sessionStorage.clear();

      // ✅ Clear all cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
      });

      router.push("/login"); // redirect after successful registration
    } else {
      // COE/SuperAdmin registration
      await api.post("/auth/register", payload);
      setStep(3); // proceed to activation
    }
  } catch (err: any) {
    setError(err.response?.data?.message || "Registration failed");
  } finally {
    setLoading(false);
  }
}


  // -----------------------------
  // STEP 3: Activation (only for org invites)
  // -----------------------------
  async function handleActivate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (inviteData && inviteData.role !== "RESEARCHER") {
        await api.post("/auth/activate-org", {
          orgId: inviteData.org.id,
          code: activationCode,
        });
      }
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Activation failed");
    } finally {
      setLoading(false);
    }
  }

  const stepInfo = [
  {
    id: 1,
    title: "Verifying Invitation",
    icon: <MailCheck className="w-8 h-8 text-blue-600" />,
    description: "Confirming your invitation details before you begin.",
    mediaUrl: "/videos/verify.mp4",
    isVideo: true,   // ✅ plays your video
  },
  {
    id: 2,
    title: "Complete Registration",
    icon: <CheckCircle className="w-8 h-8 text-green-600" />,
    description: "Set up your personal profile and organization details.",
     mediaUrl: "/register.svg",  
    isVideo: false,  // ✅ shows static image
  },
  {
    id: 3,
    title: "Activate Your Organization",
    icon: <KeyRound className="w-8 h-8 text-yellow-600" />,
    description: "Enter the activation code we sent to your email.",
    mediaUrl: "/activate.svg",
    isVideo: false,  // ✅ shows static image
  },
];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* LEFT SIDE: Steps Carousel */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center border-r p-10 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md"
          >
            <div className="flex justify-center mb-4">{stepInfo[step - 1].icon}</div>
            <h2 className="text-2xl font-bold mb-3">{stepInfo[step - 1].title}</h2>
            <p className="text-gray-600 mb-6">{stepInfo[step - 1].description}</p>
            {stepInfo[step - 1].isVideo ? (
              <video
                src={stepInfo[step - 1].mediaUrl}
                autoPlay
                loop
                muted
                className="w-64 mx-auto rounded-xl shadow"
              />
            ) : (
              <img
                src={stepInfo[step - 1].mediaUrl}
                alt="illustration"
                className="w-64 mx-auto rounded-xl shadow"
              />
            )}
            <div className="absolute bottom-8 w-full flex justify-center space-x-2">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={`h-2 w-8 rounded-full ${
                    step === n ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT SIDE: Scrollable Form */}
      <div className="w-1/2 flex flex-col items-center justify-start p-10 overflow-y-auto max-h-screen">
        {loading && (
          <div className="flex items-center space-x-3 text-blue-600 mb-4">
            <Loader2 className="animate-spin" /> <span>Processing...</span>
          </div>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* STEP 1 */}
        {!loading && step === 1 && <p className="text-gray-600 text-center">Verifying your invite token...</p>}

        {/* STEP 2: Registration */}
        {!loading && step === 2 && (
          <motion.form
            key="register"
            onSubmit={handleRegister}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-6"
          >
            <h3 className="text-lg font-semibold text-blue-600">
              {inviteData?.role === "RESEARCHER" ? "Researcher Profile" : "CoE Manager Profile"}
            </h3>

            <input
              name="email"
              className="border p-2 w-full rounded bg-gray-100 cursor-not-allowed"
              value={form.email}
              readOnly
              placeholder="Email"
            />
            {inviteData?.role === "RESEARCHER" && (
              <>
                <input
                  name="name"
                  placeholder="Full Name"
                  className="border p-2 w-full rounded"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  name="designation"
                  placeholder="Designation"
                  className="border p-2 w-full rounded"
                  value={form.designation}
                  onChange={handleChange}
                />
              </>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 w-full rounded"
              value={form.password}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Profile Description"
              className="border p-2 w-full rounded"
              value={form.description}
              onChange={handleChange}
            />
            <input
              name="learnMoreLink"
              placeholder="Learn More Link"
              className="border p-2 w-full rounded"
              value={form.learnMoreLink}
              onChange={handleChange}
            />
            <ContactsEditor
              contacts={form.contacts || {}}
              onChange={(c) => setForm((p) => ({ ...p, contacts: c }))}
            />

            {inviteData?.role !== "RESEARCHER" && (
              <>
                <h3 className="text-lg font-semibold text-green-600 mt-6">Organization Details</h3>
                <textarea
                  name="about"
                  placeholder="About your organization..."
                  className="border p-2 w-full rounded"
                  value={form.about}
                  onChange={handleChange}
                />
              </>
            )}

            <button
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Continue"}
            </button>
          </motion.form>
        )}

        {/* STEP 3: Activation (only for org invites) */}
        {!loading && step === 3 && inviteData?.role !== "RESEARCHER" && (
          <motion.form
            key="activation"
            onSubmit={handleActivate}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm space-y-4"
          >
            <p className="text-gray-600 text-center">Enter the 6-digit activation code sent to your email.</p>
            <input
              name="activationCode"
              placeholder="Activation Code"
              className="border p-2 w-full text-center rounded tracking-widest"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              maxLength={6}
              required
            />
            <button
              className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
              type="submit"
            >
              Activate Organization
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
