import { motion } from "framer-motion";
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiDownload, FiSend } from "react-icons/fi";
import Terminal from "./Terminal";
import profileImg from "../assets/profile.jpg";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const childFadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const socialLinks = [
  { icon: FiMail, href: "#", label: "Email" },
  { icon: FiGithub, href: "https://github.com/ArpitYadav77", label: "GitHub" },
  { icon: FiLinkedin, href: "#", label: "LinkedIn" },
  { icon: FiTwitter, href: "#", label: "Twitter" },
];

const infoPills = [
  { emoji: "📍", label: "LOCATION", value: "Bangalore, Karnataka (originally from Bareilly)" },
  { emoji: "🎓", label: "STUDENT", value: "Final-year B.Tech, ECE, Thapar Institute of Engineering & Technology (TIET)" },
  { emoji: "💡", label: "INTERESTS", value: "Trading, DSA, Building things" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="w-full max-w-5xl mx-auto px-6 pt-6 pb-8"
    >
      <motion.div
        className="w-full flex flex-col md:flex-row gap-6 lg:gap-8 items-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ========== LEFT CARD ========== */}
        <motion.div
          className="w-full md:w-[38%] bg-white border-2 border-b-4 border-r-4 border-black rounded-3xl p-5 lg:p-6 shadow-neo flex flex-col items-center text-center relative overflow-hidden"
          variants={slideInLeft}
        >
          <motion.div className="flex flex-col items-center w-full" variants={containerVariants}>
            {/* Avatar */}
            <motion.div
              className="w-[120px] h-[120px] rounded-full border-4 border-brutal-black bg-brutal-navy flex items-center justify-center mb-5 overflow-hidden select-none"
              variants={childFadeUp}
            >
              <img
                src={profileImg}
                alt="Arpit Yadav Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Name */}
            <motion.h1
              className="font-display text-3xl lg:text-4xl text-brutal-black leading-tight mb-3"
              variants={childFadeUp}
            >
              ARPIT YADAV
            </motion.h1>

            {/* Role Pill */}
            <motion.span
              className="brutal-pill bg-brutal-navy text-brutal-white border-brutal-black mb-5 px-3 py-1.5 text-xs rounded-full"
              variants={childFadeUp}
            >
              FULL_STACK_DEVELOPER()
            </motion.span>

            {/* Info Pills */}
            <motion.div className="flex flex-col gap-3 w-full mb-5" variants={childFadeUp}>
              {infoPills.map(({ emoji, label, value }) => (
                <div
                  key={label}
                  className="bg-hero-white text-brutal-black border-2 border-brutal-black px-4 py-2.5 rounded-[16px] text-xs lg:text-sm !whitespace-normal leading-relaxed font-mono shadow-[2px_2px_0_#000]"
                >
                  <span className="mr-1.5">{emoji}</span>
                  <span className="font-bold mr-1.5">{label}:</span>
                  <span className="font-medium text-black/80">{value}</span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex flex-row gap-3 w-full mb-5"
              variants={childFadeUp}
            >
              <a
                href="#"
                className="brutal-btn bg-brutal-green text-brutal-white px-2.5 lg:px-4 py-3 flex items-center justify-center gap-1.5 text-xs lg:text-sm font-bold flex-1"
              >
                <FiDownload className="text-lg" />
                RESUME
              </a>
              <a
                href="#"
                className="brutal-btn bg-brutal-red text-brutal-white px-2.5 lg:px-4 py-3 flex items-center justify-center gap-1.5 text-xs lg:text-sm font-bold flex-1"
              >
                <FiSend className="text-lg" />
                CONTACT
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div className="flex gap-4" variants={childFadeUp}>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 border-3 border-brutal-black bg-brutal-white flex items-center justify-center text-brutal-black text-2xl transition-all duration-100 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] shadow-[4px_4px_0px_#000]"
                >
                  <Icon />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ========== RIGHT COLUMN (INTRO & TERMINAL) ========== */}
        <div className="w-full md:w-[62%] flex flex-col gap-6">
          {/* ========== RIGHT CARD (INTRO) ========== */}
          <motion.div
            className="bg-hero-yellow p-8 md:p-12 rounded-3xl border-2 border-b-4 border-r-4 border-black shadow-neo flex flex-col"
            variants={slideInRight}
          >
            <motion.div className="flex flex-col animate-none" variants={containerVariants}>
              {/* Heading */}
              <motion.h2
                className="font-display text-3xl lg:text-4xl text-brutal-black mb-6"
                variants={childFadeUp}
              >
                Hi people! 👋
              </motion.h2>

              {/* Body */}
              <motion.p
                className="font-body text-lg text-brutal-black leading-relaxed mb-6"
                variants={childFadeUp}
              >
                I&apos;m a final-year B.Tech student in Electrical &amp; Computer
                Engineering at TIET, graduating May 2027. I build full-stack
                products with React, Node.js and TypeScript, and I&apos;m actively
                exploring both SDE and Business Analyst roles. I learn best by
                shipping real, deployed things.
              </motion.p>

              {/* Highlighted Chip */}
              <motion.div
                className="bg-white p-4 border-2 border-black rounded-2xl inline-block font-bold shadow-neo-sm text-brutal-black self-start text-sm md:text-base leading-snug cursor-pointer select-none"
                variants={childFadeUp}
              >
                🚀 Open to SDE Internships &amp; Full-Time Roles
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ========== TERMINAL ========== */}
          <motion.div
            className="w-full"
            variants={childFadeUp}
          >
            <Terminal />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
