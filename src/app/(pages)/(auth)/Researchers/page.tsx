"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, MailCheck } from "lucide-react";
import api from "@/lib/axios";
import { ContactsEditor } from "@/components/contact";

export default function ResearcherRegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [inviteData, setInviteData] = useState<any>(null);

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    description: "",
    designation: "",
    learnMoreLink: "",
    contacts: {} as Record<string, any>,
    inviteToken: "",
  });

  // -----------------------------
  // STEP 1: Verify Invite Token
  // -----------------------------
  useEffect(() => {
    const token = searchParams.get("token");
    const role = searchParams.get("role");

    if (!token || role !== "RESEARCHER") {
      setError("Invalid invite link");
      return;
    }

    setForm((p) => ({ ...p, inviteToken: token }));
    verifyInviteToken(token);
  }, [searchParams]);

  async function verifyInviteToken(token: string) {
    setLoading(true);
    try {
      const { data } = await api.get(`/auth/invite/verify?token=${token}`);
      setInviteData(data.data); // contains org info
      setForm((prev) => ({ ...prev, email: data.data.email }));
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid or expired invite");
    } finally {
      setLoading(false);
    }
  }

  // -----------------------------
  // STEP 2: Researcher Registration
  // -----------------------------
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...form,
        contacts: JSON.stringify(form.contacts),
      };
      await api.post("/users/newuser", payload);
      router.push("/login"); // redirect after successful registration
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
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
    },
    {
      id: 2,
      title: "Complete Registration",
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      description: "Set up your researcher profile.",
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

        {/* STEP 2 */}
        {!loading && step === 2 && (
          <motion.form
            key="register"
            onSubmit={handleRegister}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-6"
          >
            <h3 className="text-lg font-semibold text-green-600">Researcher Profile</h3>

            <input
              name="email"
              className="border p-2 w-full rounded bg-gray-100 cursor-not-allowed"
              value={form.email}
              readOnly
              placeholder="Email"
            />
            <input
              name="name"
              placeholder="Full Name"
              className="border p-2 w-full rounded"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 w-full rounded"
              value={form.password}
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

            <button
              className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
