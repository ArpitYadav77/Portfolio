import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

const projects = [
  {
    title: "FlowGrid",
    description: "Role-based service booking platform",
    tags: ["React", "Node.js", "MySQL", "JWT", "Razorpay"],
    link: "#",
    live: false,
    bullets: [
      "Role-based booking flow with customer and provider dashboards",
      "JWT authentication with secure session management",
      "Razorpay payment integration for seamless transactions",
      "Resend for transactional email notifications",
    ],
  },
  {
    title: "Phatak Radar",
    description: "Real-time railway crossing monitoring",
    tags: ["React", "Node.js", "Leaflet", "In-memory State"],
    link: "https://phatak-radar.vercel.app",
    live: true,
    bullets: [
      "Real-time railway crossing monitoring and status map",
      "Leaflet-based interactive map visualization",
      "In-memory state management for live updates",
      "Deployed on Vercel (frontend) + Render (backend)",
    ],
  },
  {
    title: "Auto Insights",
    description: "AI-powered analytics platform",
    tags: ["MERN", "FastAPI", "OpenAI GPT-4o"],
    link: "#",
    live: false,
    bullets: [
      "AI-powered analytics platform with natural language querying",
      "FastAPI microservice for AI/ML processing layer",
      "MERN stack dashboard with interactive data visualizations",
      "OpenAI GPT-4o integration for intelligent data analysis",
    ],
  },
  {
    title: "ETL + RAG Pipeline",
    description: "Automated data pipeline with semantic search",
    tags: ["Airflow", "MinIO", "PostgreSQL", "ChromaDB", "LangChain", "FastAPI"],
    link: "#",
    live: true,
    bullets: [
      "Automated ETL pipeline with GitHub Actions orchestration",
      "Vector search powered by ChromaDB for semantic retrieval",
      "RAG-based Q&A system using LangChain",
      "Deployed with Render + Supabase for production reliability",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Projects() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 mt-16">
      <section
        id="projects"
        className="w-full bg-projects-mustard border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo py-16 lg:py-24 px-8 md:px-16 overflow-hidden"
      >
        <div className="w-full mx-auto">
          {/* Section Heading */}
          <motion.h2
            className="font-display text-4xl lg:text-5xl text-brutal-black mb-10 lg:mb-14"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            PROJECTS
          </motion.h2>

          {/* Card Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                className="brutal-card bg-brutal-white p-6 relative group hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#000] transition-all duration-200"
              >
                {/* External Link Icon — top-right */}
                {project.link && project.link !== "#" ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 text-brutal-black hover:text-brutal-navy transition-colors"
                    aria-label={`Open ${project.title}`}
                  >
                    <FiExternalLink className="w-5 h-5" />
                  </a>
                ) : (
                  <span className="absolute top-4 right-4 text-gray-400">
                    <FiExternalLink className="w-5 h-5" />
                  </span>
                )}

                {/* Title */}
                <h3 className="font-display text-xl text-brutal-black pr-8">
                  {project.title}
                </h3>

                {/* Live Project Pill */}
                {project.live && (
                  <span className="brutal-pill inline-flex items-center mt-3 bg-[#2ECC71] text-white border-2 border-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Live Project
                  </span>
                )}

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="brutal-pill font-mono text-xs border-2 border-black rounded-full px-3 py-1 bg-brutal-white text-brutal-navy"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bullet Points */}
                <ul className="mt-5 space-y-2">
                  {project.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="font-body text-sm text-brutal-black flex items-start gap-2"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 min-w-[6px] rounded-full bg-brutal-black" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
