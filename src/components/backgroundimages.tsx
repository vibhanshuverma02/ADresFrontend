// 'use client'
// import { useEffect, useRef, useState } from "react";

// type DimmedVideoProps = {
//   src: string;
//   opacity?: number;
//   className?: string;
// };

// export default function DimmedVideo({
//   src,
//   opacity = 0.3,
//   className = "",
// }: DimmedVideoProps) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [playing, setPlaying] = useState(false);
//   const [muted, setMuted] = useState(true);

//   useEffect(() => {
//     const v = videoRef.current;
//     if (!v) return;

//     v.muted = true;
//     v.playsInline = true;

//     // ▶️ first user interaction → unmute + play
//     const handleFirstInteraction = () => {
//       if (!v) return;
//       v.muted = false;
//       setMuted(false);
//       v.play().then(() => setPlaying(true)).catch(() => {});
//       window.removeEventListener("click", handleFirstInteraction);
//       window.removeEventListener("touchstart", handleFirstInteraction);
//     };

//     window.addEventListener("click", handleFirstInteraction);
//     window.addEventListener("touchstart", handleFirstInteraction);

//     return () => {
//       window.removeEventListener("click", handleFirstInteraction);
//       window.removeEventListener("touchstart", handleFirstInteraction);
//     };
//   }, []);

//   const togglePlay = () => {
//     const v = videoRef.current;
//     if (!v) return;

//     if (v.paused) {
//       v.play().then(() => setPlaying(true)).catch(() => {});
//     } else {
//       v.pause();
//       setPlaying(false);
//     }
//   };

//   return (
//     <div className="absolute inset-0">
//       <video
//         ref={videoRef}
        
//         className={`w-full h-full object-cover object-center ${className}`}
//         style={{ opacity }}
//       >
//         <source src={src} type="video/mp4" />
//       </video>

//       <button
//         onClick={togglePlay}
//         className="absolute bottom-4 right-4 bg-black/60 text-white px-4 py-2 rounded-lg text-sm"
//       >
//         {playing ? "Pause" : "Play"}
//       </button>
//     </div>
//   );
// }


'use client'
import { useEffect, useRef, useState } from "react";

type DimmedVideoProps = {
  src: string;
  opacity?: number;
  className?: string;
};

export default function DimmedVideo({
  src,
  opacity = 0.3,
  className = "",
}: DimmedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.playsInline = true;

    // ▶️ auto play only when visible
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(v);

    return () => observer.disconnect();
  }, []);

  // 🔊 unmute only THIS video when clicked
  const handleUnmute = () => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = false;
    setMuted(false);
    v.volume = 1;
    v.play().catch(() => {});
  };

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        loop
        className={`w-full h-full object-cover object-center ${className}`}
        style={{ opacity }}
        onClick={handleUnmute}
      >
        <source src={src} type="video/mp4" />
      </video>

      {muted && (
        <button
          onClick={handleUnmute}
          className="absolute bottom-4 right-4 bg-black/60 text-white px-4 py-2 rounded-lg text-sm"
        >
          Tap to unmute
        </button>
      )}
    </div>
  );
}
