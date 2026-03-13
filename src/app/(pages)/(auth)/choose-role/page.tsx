// "use client";
// import { useAuth } from "@/hooks/useAuth";
// import { useRouter } from "next/navigation";

// export default function ChooseRolePage() {
//   const { user, loading } = useAuth(false);
//   const router = useRouter();

//   if (loading) return <p>Loading...</p>;

//   if (!user) {
//     router.push("/login");
//     return null;
//   }

//   const handleSelectRole = (role: string) => {
//     // optionally save active role in localStorage
//     localStorage.setItem("activeRole", role);

//     if (role === "ADMIN") router.push("/admin/dashboard");
//     else if (role === "RESEARCHER") router.push("/ceo/dashboard");
//     else router.push("/");
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Select your role</h2>
//       {user.roles.map((role: string) => (
//         <button
//           key={role}
//           onClick={() => handleSelectRole(role)}
//           className="block mb-2 px-4 py-2 border rounded hover:bg-gray-200"
//         >
//           {role}
//         </button>
//       ))}
//     </div>
//   );
// }

"use client";

import { useAuth } from "@/context/Authcontext";

const ROLE_LABELS: Record<string, string> = {
  COE_MANAGER: "Center of Excellence",
  RESEARCHER: "Associate Member of Center of Excellence",
};

export default function ChooseRolePage() {
  const { user, loading, chooseRole } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading your workspace…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        No user session found. Please log in again.
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
                <span className="text-sm text-gray-500 uppercase">
                  {role.replace("_", " ")}
                </span>
                <span className="text-base">
                  {ROLE_LABELS[role] ?? role}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <p className="text-xs text-gray-400 text-center mt-6">
          You can switch roles later from your profile
        </p>
      </div>
    </div>
  );
}
