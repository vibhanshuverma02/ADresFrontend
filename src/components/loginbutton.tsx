"use client";
import React from "react";

export default function ExternalLoginButtons() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010";

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/auth/external/google`;
  };

  const handleLinkedInLogin = () => {
    window.location.href = `${API_BASE}/auth/external/linkedin`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleGoogleLogin} // ✅ not handleGoogleLogin()
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Continue with Google
      </button>

      <button
        onClick={handleLinkedInLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Continue with LinkedIn
      </button>
    </div>
  );
}
