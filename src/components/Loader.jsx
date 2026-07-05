import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    const updateProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Wait a short moment at 100% for user feedback, then trigger complete
          setTimeout(onComplete, 350);
          return 100;
        }
        // Random increment between 5 and 15 for realistic load feel
        const increment = Math.floor(Math.random() * 11) + 5;
        return Math.min(prev + increment, 100);
      });
    };

    // Fast loading progress steps
    timer = setInterval(updateProgress, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 flex flex-col items-center justify-center select-none"
      style={{
        zIndex: 9999,
        backgroundColor: "#121214",
        backgroundImage: "repeating-linear-gradient(180deg, transparent, transparent 48px, #FFE156 48px, #FFE156 50px)",
      }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Loading Text */}
        <h1 className="font-display italic text-4xl md:text-5xl text-hero-yellow tracking-wider drop-shadow-[3px_3px_0_#000]">
          LOADING...
        </h1>

        {/* Percentage Chip */}
        <div className="border-2 border-white bg-black px-3 py-1 font-mono text-sm font-semibold text-white tracking-widest shadow-[3px_3px_0_#000]">
          {progress}%
        </div>

        {/* Progress Bar Container */}
        <div className="w-[300px] md:w-[400px] h-7 bg-black border-3 border-white rounded-full p-[3px] overflow-hidden shadow-[4px_4px_0_#000]">
          {/* Inner Progress Fill */}
          <motion.div
            className="h-full bg-hero-yellow rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </div>

      {/* Decorative Handle widget at the bottom */}
      <div className="absolute bottom-6 flex justify-center w-full">
        <div className="w-28 h-6 bg-hero-yellow border-3 border-black rounded-full flex items-center justify-between px-3 shadow-[3px_3px_0_#000]">
          {/* Left circle screw */}
          <span className="w-1.5 h-1.5 rounded-full bg-white border border-black" />
          {/* Center handle slot */}
          <span className="w-10 h-1.5 bg-[#6b4724] border border-black/30 rounded-full" />
          {/* Right circle screw */}
          <span className="w-1.5 h-1.5 rounded-full bg-white border border-black" />
        </div>
      </div>
    </motion.div>
  );
}
