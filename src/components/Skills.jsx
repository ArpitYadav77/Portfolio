import { motion } from "framer-motion";
import {
  FiCode,
  FiLayout,
  FiServer,
  FiDatabase,
  FiCpu,
  FiCloud,
} from "react-icons/fi";

const categories = [
  {
    name: "Languages",
    color: "#5B9BF5",
    tint: "bg-blue-100",
    icon: FiCode,
    skills: ["Java", "Python", "JavaScript", "TypeScript", "C"],
  },
  {
    name: "Frontend",
    color: "#B28DFF",
    tint: "bg-purple-100",
    icon: FiLayout,
    skills: ["React.js", "Next.js", "HTML", "CSS", "Tailwind", "Responsive Design"],
  },
  {
    name: "Backend",
    color: "#2ECC71",
    tint: "bg-green-100",
    icon: FiServer,
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
  },
  {
    name: "Databases",
    color: "#FFA726",
    tint: "bg-orange-100",
    icon: FiDatabase,
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Supabase"],
  },
  {
    name: "Core CS",
    color: "#FF6B6B",
    tint: "bg-red-100",
    icon: FiCpu,
    skills: ["DSA (Java)", "OOP", "DBMS", "Computer Networks"],
  },
  {
    name: "Tools & Cloud",
    color: "#FFE156",
    tint: "bg-yellow-100",
    icon: FiCloud,
    skills: ["Git", "GitHub", "Vercel", "Render", "AWS", "Postman"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Skills() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 mt-16">
      <section
        id="skills"
        className="w-full py-16 lg:py-24 px-8 md:px-16 border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo overflow-hidden"
        style={{ backgroundColor: "#FFB5C2" }}
      >
        {/* Section Heading */}
        <motion.h2
          className="font-display text-4xl lg:text-5xl text-brutal-black text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          SKILLS
        </motion.h2>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.name}
                className="brutal-card bg-white p-6"
                variants={cardVariants}
                whileHover={{
                  translate: "-2px -2px",
                  boxShadow: "8px 8px 0 #000",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* Category Label Pill */}
                <span
                  className="brutal-pill inline-flex items-center gap-2 text-white font-body font-bold text-sm mb-5 transition-colors duration-150 hover:!bg-brutal-green hover:!text-white cursor-pointer select-none"
                  style={{ backgroundColor: category.color }}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </span>

                {/* Skill Tag Chips */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`brutal-pill text-sm font-body font-medium text-brutal-black transition-colors duration-150 cursor-pointer hover:bg-brutal-green hover:text-white select-none ${category.tint}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
