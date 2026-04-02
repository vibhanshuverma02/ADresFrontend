"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Administrator",
  COE_MANAGER: "Center of Excellence",
  RESEARCHER: "Associate Member of Center of Excellence",
};

export default function ChooseRolePage() {
  const { user, loading, chooseRole } = useAuth();
  const router = useRouter();

  // ✅ If loading is done and no user → redirect to login
  // This handles the case where rt cookie expired and refresh failed
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  // ✅ Show spinner while session is being restored
  // (axios interceptor may be refreshing token in background)
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600 gap-3">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm">Restoring your session…</p>
      </div>
    );
  }

  // ✅ While redirecting to login — show nothing (avoids flash of error)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <p className="text-sm">Redirecting to login…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Choose Your Role
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Select how you want to continue
          </p>
          {user.name && (
            <p className="text-sm text-blue-600 font-medium mt-2">
              Welcome, {user.name} 👋
            </p>
          )}
        </div>

        {/* Roles */}
        <div className="space-y-3">
          {user.roles.map((role: string) => (
            <button
              key={role}
              onClick={() => chooseRole(role)}
              className="
                w-full px-4 py-3 rounded-xl border border-gray-200
                text-left font-medium text-gray-800
                hover:border-blue-500 hover:bg-blue-50
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-all duration-200
              "
            >
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  {role.replace(/_/g, " ")}
                </span>
                <span className="text-base">
                  {ROLE_LABELS[role] ?? role}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          You can switch roles later from your profile
        </p>
      </div>
    </div>
  );
}