// "use client";

// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { Header } from "@/components/layout/header";
// import { Footer } from "@/components/layout/footer";
// import SplashScreen from "@/components/splash";

// export default function ClientWrapper({ children }: { children: React.ReactNode }) {
//   const [showSplash, setShowSplash] = useState(true);
//   const pathname = usePathname();

//   // Routes where splash should NOT appear
//   const noSplashRoutes = ["/login", "/dashboard"];

//   useEffect(() => {
//     // Skip splash for no-splash routes
//     if (noSplashRoutes.includes(pathname)) {
//       setShowSplash(false);
//       return;
//     }

//     const hasSeenSplash = localStorage.getItem("hasSeenSplash");

//     // First visit splash
//     if (!hasSeenSplash) {
//       setShowSplash(true);
//       const timer = setTimeout(() => {
//         setShowSplash(false);
//         localStorage.setItem("hasSeenSplash", "true");
//       }, 2000);
//       return () => clearTimeout(timer);
//     }

//     // For subsequent route changes, show splash briefly
//     setShowSplash(true);
//     const timer = setTimeout(() => {
//       setShowSplash(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [pathname]);

//   if (showSplash) {
//     return <SplashScreen onFinish={() => setShowSplash(false)} />;
//   }

//   return (
//     <>
//       <Header />
//       <main className="min-h-screen">{children}</main>
//       <Footer />
//     </>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import SplashScreen from "@/components/splash";
import { AuthProvider } from "@/context/Authcontext";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const pathname = usePathname();
  const noSplashRoutes = ["/login", "/dashboard"];
const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (noSplashRoutes.includes(pathname)) {
      setShowSplash(false);
      return;
    }

    const hasSeenSplash = localStorage.getItem("hasSeenSplash");
    if (!hasSeenSplash) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem("hasSeenSplash", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }

    setShowSplash(true);
    const timer = setTimeout(() => setShowSplash(false), 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  return (
    <AuthProvider>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </AuthProvider>
  );
}
