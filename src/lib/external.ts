"use client";
import axios from "axios";

// --- Normal API instance ---
const api2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010",
  withCredentials: true,
});
// --- Request Interceptor ---
api2.interceptors.request.use((config) => {
  const token = localStorage.getItem("externalAccessToken");
  if (token) {
    console.log("🔑 Attaching access token");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api2;