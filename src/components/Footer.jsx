import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="w-full bg-black py-8 border-t border-white/20"
    >
      <motion.div
        className="flex flex-col items-center justify-center gap-3 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-display text-lg text-white text-center">
          Made with ☕ 💻 and a lo-fi playlist
        </p>
        <p className="font-mono text-xs text-gray-400 text-center">
          © 2025 Arpit Yadav. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
