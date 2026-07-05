import { motion } from "framer-motion";
import { FiBriefcase, FiMapPin, FiCalendar } from "react-icons/fi";

const experiences = [
  {
    role: "Joint Secretary",
    org: "Institution's Innovation Council (IIC), TIET",
    date: "2024 - Present",
    location: "On-site",
    locationColor: "bg-blue-400/80",
    bullets: [
      "Led and managed a cohort of 100+ student innovators across departments",
      "Organized flagship innovation events including ideathons and speaker sessions",
      "Coordinated with faculty mentors to drive student-led technical projects",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    org: "Self-Employed",
    date: "2024 - Present",
    location: "Remote",
    locationColor: "bg-brutal-green/80",
    bullets: [
      "Delivered production-ready website for BSA Design Studio (architecture portfolio)",
      "Built The Seekers International school management system with Sanity CMS admin panel",
      "Projects sourced through college network and professional referrals",
    ],
  },
];

const cardVariants = (direction) => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -80 : 80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

function BrowserDots() {
  return (
    <div className="flex items-center gap-2">
      <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] border-2 border-black" />
      <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border-2 border-black" />
      <span className="w-3.5 h-3.5 rounded-full bg-[#28C840] border-2 border-black" />
    </div>
  );
}

function TimelineCard({ exp, index }) {
  const isEven = index % 2 === 0;
  const direction = isEven ? "left" : "right";

  return (
    <div className="relative flex items-center w-full">
      {/* Timeline dot */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20 hidden lg:flex">
        <div className="w-6 h-6 rounded-full bg-brutal-black border-4 border-experience-purple shadow-[0_0_0_4px_#000]" />
      </div>

      {/* Mobile timeline dot */}
      <div className="absolute left-[18px] z-20 flex lg:hidden">
        <div className="w-5 h-5 rounded-full bg-brutal-black border-4 border-experience-purple shadow-[0_0_0_3px_#000]" />
      </div>

      {/* Card container — alternating sides on desktop, all right on mobile */}
      <motion.div
        className={`
          w-full lg:w-[calc(50%-40px)]
          ml-12 lg:ml-0
          ${isEven ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"}
        `}
        variants={cardVariants(direction)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Browser Window Card */}
        <div className="brutal-card bg-brutal-white rounded-[14px] overflow-hidden">
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-brutal-navy border-b-3 border-black">
            <BrowserDots />
            <span className="font-mono text-xs text-white/90 tracking-wide truncate mx-4 text-center flex-1">
              {exp.role}
            </span>
            <div className="w-[52px]" /> {/* Spacer to balance dots */}
          </div>

          {/* Card Content */}
          <div className="p-5 md:p-6">
            {/* Role */}
            <h3 className="font-display text-lg md:text-xl text-brutal-black leading-tight">
              {exp.role}
            </h3>

            {/* Organization */}
            <p className="font-body text-sm md:text-base text-brutal-navy/80 mt-1 font-medium">
              {exp.org}
            </p>

            {/* Pills row */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="brutal-pill bg-brutal-white">
                <FiCalendar className="w-3.5 h-3.5" />
                {exp.date}
              </span>
              <span className={`brutal-pill text-brutal-black ${exp.locationColor}`}>
                <FiMapPin className="w-3.5 h-3.5" />
                {exp.location}
              </span>
            </div>

            {/* Bullets */}
            <ul className="mt-5 space-y-3">
              {exp.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-sm md:text-[15px] font-body text-brutal-navy/90 leading-relaxed">
                  <span className="mt-1.5 min-w-2 h-2 rounded-full bg-experience-purple border-2 border-black flex-shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 mt-16">
      <section
        id="experience"
        className="w-full bg-experience-purple py-16 lg:py-24 px-8 md:px-16 border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo overflow-hidden"
      >
        <div className="w-full mx-auto">
          {/* ── Section Heading ── */}
          <motion.div
            className="text-center mb-14 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="text-4xl">💼</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-brutal-black tracking-tight">
              EXPERIENCE
            </h2>
            {/* Thick decorative underline */}
            <div className="mt-4 mx-auto w-32 h-2 bg-brutal-black rounded-full" />
          </motion.div>

          {/* ── Timeline ── */}
          <div className="relative">
            {/* Vertical line — desktop (center) */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-brutal-black" />

            {/* Vertical line — mobile (left) */}
            <div className="block lg:hidden absolute left-[27px] top-0 bottom-0 w-1 bg-brutal-black" />

            {/* Cards */}
            <div className="flex flex-col gap-12 lg:gap-16">
              {experiences.map((exp, index) => (
                <TimelineCard key={index} exp={exp} index={index} />
              ))}
            </div>

            {/* Timeline end dot — desktop */}
            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -bottom-4 z-20">
              <div className="w-4 h-4 rounded-full bg-brutal-black" />
            </div>

            {/* Timeline end dot — mobile */}
            <div className="flex lg:hidden absolute left-[22px] -bottom-4 z-20">
              <div className="w-3.5 h-3.5 rounded-full bg-brutal-black" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
