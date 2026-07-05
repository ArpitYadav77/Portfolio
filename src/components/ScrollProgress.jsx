import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress using a spring physics effect
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[8px] bg-gradient-to-r from-[#2ecc71] via-[#FFE156] to-white z-[99999] origin-left border-b-2 border-black"
      style={{ scaleX }}
    />
  );
}
