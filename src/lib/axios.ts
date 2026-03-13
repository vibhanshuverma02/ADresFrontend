"use client";
import axios from "axios";

// --- Normal API instance ---
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010",
  withCredentials: true,
});

// --- Separate instance ONLY for refresh ---
const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010",
  withCredentials: true,
});

// --- Request Interceptor ---
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    console.log("🔑 Attaching access token");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Response Interceptor ---
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        
        const res = await refreshApi.post("/auth/refresh");
        // ✅ cookies included
        const newToken = res.data.accessToken;
         
        localStorage.setItem("accessToken", newToken);
      
        original.headers.Authorization = `Bearer ${newToken}`;

        return api(original); // retry with new token
      } catch (refreshErr) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
// "use client";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010",
//   withCredentials: true,
// });

// const refreshApi = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010",
//   withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const original = err.config;

//     // Only handle 401 errors once
//     if (err.response?.status === 401 && !original._retry) {
//       original._retry = true;
//       console.warn("🔁 Token expired, trying refresh...");

//       try {
//         // Remember current route to restore after refresh
//         const currentPath = window.location.pathname;
//         localStorage.setItem("lastPathBeforeRefresh", currentPath);

//         const res = await refreshApi.post("/auth/refresh");
//         const newToken = res.data.accessToken;

//         // ✅ Update token and retry failed request
//         localStorage.setItem("accessToken", newToken);
//             window.dispatchEvent(new Event("tokenRefreshed")); // 🔔
//         original.headers.Authorization = `Bearer ${newToken}`;

//         return api(original);
//       } catch (refreshErr) {
//         // ❌ Refresh failed → log out completely
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("user");
//         localStorage.removeItem("lastPathBeforeRefresh");

//         window.location.href = "/login";
//         return Promise.reject(refreshErr);
//       }
//     }

//     return Promise.reject(err);
//   }
// );

// export default api;
