import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import {
  FiCode,
  FiHeart,
} from "react-icons/fi";
import {
  SiLeetcode,
  SiGeeksforgeeks,
} from "react-icons/si";


/* ── Coding stats ── */
const codingStats = {
  leetcode: { solved: 330, label: "330+ Problems Solved" },
  languages: ["Java (primary)", "Python"],
  focus: ["Arrays", "Trees", "Graphs", "Dynamic Programming"],
  profiles: [
    { name: "LeetCode", icon: SiLeetcode, color: "#FFA116" },
    { name: "GeeksForGeeks", icon: SiGeeksforgeeks, color: "#2F8D46" },
  ],
};

/* ── Beyond-code hobbies ── */
const hobbies = [
  { emoji: "📈", title: "Futures & Paper Trading", detail: "Bitcoin, S&P 500, Gold micro-futures" },
  { emoji: "🎵", title: "Music & Lo-fi playlists", detail: "while coding" },
  { emoji: "📚", title: "Reading", detail: "about startups, business strategy, and tech" },
  { emoji: "🎮", title: "Gaming", detail: "in downtime" },
];

/* ── Accordion bar configs ── */
const bars = [
  {
    id: "coding",
    title: "CODING",
    bg: "#FFE156",
    icon: FiCode,
    sectionId: "coding-profiles",
  },
  {
    id: "beyondcode",
    title: "BEYOND CODE",
    bg: "#B28DFF",
    icon: FiHeart,
    sectionId: "beyond-code",
  },
];

/* ── Expand / collapse animation ── */
const contentVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.35, ease: "easeInOut" },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

/* ── Progress bar component ── */
function ProgressBar({ value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full h-5 bg-white border-3 border-black rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}


/* ── Coding content ── */
function CodingContent() {
  return (
    <div className="pt-4 space-y-5">
      {/* LeetCode progress */}
      <motion.div
        className="brutal-card bg-white p-5 rounded-[14px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <SiLeetcode className="text-[#FFA116] w-6 h-6" />
          <span className="font-display text-base lg:text-lg">LeetCode</span>
          <span className="brutal-pill bg-yellow-100 text-brutal-black ml-auto">
            {codingStats.leetcode.label}
          </span>
        </div>
        <ProgressBar value={330} max={500} color="#FFA116" />
      </motion.div>

      {/* Languages & Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          className="brutal-card bg-white p-5 rounded-[14px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          <h4 className="font-display text-sm mb-3">LANGUAGES</h4>
          <div className="flex flex-wrap gap-2">
            {codingStats.languages.map((lang) => (
              <span key={lang} className="brutal-pill bg-blue-100 text-brutal-black">
                {lang}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="brutal-card bg-white p-5 rounded-[14px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
        >
          <h4 className="font-display text-sm mb-3">FOCUS AREAS</h4>
          <div className="flex flex-wrap gap-2">
            {codingStats.focus.map((area) => (
              <span key={area} className="brutal-pill bg-green-100 text-brutal-black">
                {area}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Competitive Profiles */}
      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.35 }}
      >
        {codingStats.profiles.map((p) => {
          const Icon = p.icon;
          return (
            <span
              key={p.name}
              className="brutal-pill bg-white text-brutal-black text-sm flex items-center gap-2"
            >
              <Icon style={{ color: p.color }} className="w-4 h-4" />
              {p.name}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ── Beyond Code content ── */
function BeyondCodeContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
      {hobbies.map((h, i) => (
        <motion.div
          key={h.title}
          className="brutal-card bg-white p-5 rounded-[14px] flex items-start gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.35 }}
        >
          <span className="text-2xl shrink-0">{h.emoji}</span>
          <div>
            <h4 className="font-display text-sm lg:text-base">{h.title}</h4>
            <p className="font-body text-sm text-gray-700">{h.detail}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Content selector ── */
const contentMap = {
  coding: CodingContent,
  beyondcode: BeyondCodeContent,
};

/* ============================================
   ACCORDION BAR COMPONENT
   ============================================ */
export default function AccordionBar() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="w-full flex flex-col">
      {bars.map((bar, idx) => {
        const isOpen = openId === bar.id;
        const Icon = bar.icon;
        const Content = contentMap[bar.id];

        return (
          <div key={bar.id} className="w-full max-w-5xl mx-auto px-6 mt-16">
            <motion.section
              id={bar.sectionId}
              className="border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo overflow-hidden"
              style={{ backgroundColor: bar.bg }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
            >
              <div className="px-8 py-8 md:px-12 md:py-10">
                {/* ── Header row ── */}
                <button
                  onClick={() => toggle(bar.id)}
                  className="w-full flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  {/* Left: icon + title */}
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-brutal-black" />
                    <h3 className="font-display text-xl lg:text-2xl text-brutal-black select-none">
                      {bar.title}
                    </h3>
                  </div>

                  {/* Right: toggle button + chevron */}
                  <div className="flex items-center gap-3">
                    <span className="brutal-btn bg-black text-white px-4 py-1 text-xs pointer-events-none">
                      {isOpen ? "CLOSE" : "OPEN"}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-brutal-black"
                    >
                      <FiChevronDown className="w-6 h-6" />
                    </motion.span>
                  </div>
                </button>

                {/* ── Expandable content ── */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`content-${bar.id}`}
                      variants={contentVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="overflow-hidden"
                    >
                      <Content />
                      {/* bottom spacer */}
                      <div className="h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          </div>
        );
      })}
    </div>
  );
}
