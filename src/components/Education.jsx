import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCalendar } from "react-icons/fi";
import { FaPencilAlt, FaEraser, FaTrashAlt } from "react-icons/fa";

/* ─── Education Data ─── */
const educationEntries = [
  {
    title: "B.Tech, Electrical & Computer Engineering",
    institution: "Thapar Institute of Engineering & Technology (TIET)",
    date: "2023 - 2027",
    bullet:
      "Relevant coursework — DSA, OOP, DBMS, Computer Networks; focus on full-stack development & AI",
  },
  {
    title: "Senior Secondary Education",
    institution: "DAV Public School, Patiala",
    date: "2021 - 2023",
    bullet: "CBSE Board — 92.4%",
  },
  {
    title: "Secondary Education",
    institution: "Army Public School, Bareilly",
    date: "2019 - 2021",
    bullet: "CBSE Board — 95.2%",
  },
];

const PEN_COLORS = ["#FFFFFF", "#FFE156", "#FF6B6B", "#2ECC71"];
const CANVAS_BG = "#1A1A2E";

/* ─── Animation Variants ─── */
const cardSlideIn = {
  hidden: { opacity: 0, x: -80 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const doodleFadeIn = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Timeline Card ─── */
function TimelineCard({ entry, index }) {
  return (
    <motion.div
      className="relative flex items-start"
      custom={index}
      variants={cardSlideIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Circle marker on the timeline line */}
      <div className="absolute left-0 top-3 z-10 -translate-x-1/2">
        <div className="w-5 h-5 rounded-full bg-education-mint border-[3px] border-black shadow-[0_0_0_3px_#A8E6CF]" />
      </div>

      {/* Card */}
      <div className="ml-8 brutal-card bg-brutal-white rounded-[14px] overflow-hidden w-full">
        <div className="p-5 md:p-6">
          {/* Title */}
          <h3 className="font-display text-base md:text-lg text-brutal-black leading-tight">
            {entry.title}
          </h3>

          {/* Institution */}
          <p className="font-body text-sm md:text-base text-brutal-navy/80 mt-1 font-medium">
            {entry.institution}
          </p>

          {/* Date pill */}
          <div className="mt-3">
            <span className="brutal-pill bg-brutal-white">
              <FiCalendar className="w-3.5 h-3.5" />
              {entry.date}
            </span>
          </div>

          {/* Bullet */}
          <div className="mt-4 flex items-start gap-3 text-sm md:text-[15px] font-body text-brutal-navy/90 leading-relaxed">
            <span className="mt-1.5 min-w-2 h-2 rounded-full bg-education-mint border-2 border-black flex-shrink-0" />
            {entry.bullet}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Doodle Canvas ─── */
function DoodlePad() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pencil"); // 'pencil' | 'eraser'
  const [penColor, setPenColor] = useState(PEN_COLORS[0]);

  /* Resize canvas to fill container */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 300 * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = "300px";
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    // fill background after resize
    ctx.fillStyle = CANVAS_BG;
    ctx.fillRect(0, 0, rect.width, 300);
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  /* Get pointer position relative to canvas */
  const getPos = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  const startDraw = useCallback(
    (e) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineWidth = tool === "eraser" ? 20 : 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = tool === "eraser" ? CANVAS_BG : penColor;
      setIsDrawing(true);
    },
    [getPos, tool, penColor]
  );

  const draw = useCallback(
    (e) => {
      e.preventDefault();
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    },
    [isDrawing, getPos]
  );

  const stopDraw = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.parentElement.getBoundingClientRect();
    ctx.fillStyle = CANVAS_BG;
    ctx.fillRect(0, 0, rect.width, 300);
  }, []);

  return (
    <motion.div
      className="brutal-card bg-brutal-navy rounded-[14px] overflow-hidden"
      variants={doodleFadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Title */}
      <div className="px-5 pt-5 pb-3">
        <h3 className="font-display text-lg md:text-xl text-white">
          Doodle something cool! ✏️
        </h3>
      </div>

      {/* Canvas */}
      <div className="px-5">
        <div className="w-full border-3 border-white/20 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            className="doodle-canvas block w-full"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-5 py-4 flex flex-wrap items-center gap-3">
        {/* Pencil */}
        <button
          onClick={() => setTool("pencil")}
          className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 border-white/30 transition-all ${
            tool === "pencil"
              ? "bg-white text-brutal-navy shadow-[3px_3px_0_rgba(255,255,255,0.3)]"
              : "bg-transparent text-white hover:bg-white/10"
          }`}
          title="Pencil"
        >
          <FaPencilAlt className="w-4 h-4" />
        </button>

        {/* Eraser */}
        <button
          onClick={() => setTool("eraser")}
          className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 border-white/30 transition-all ${
            tool === "eraser"
              ? "bg-white text-brutal-navy shadow-[3px_3px_0_rgba(255,255,255,0.3)]"
              : "bg-transparent text-white hover:bg-white/10"
          }`}
          title="Eraser"
        >
          <FaEraser className="w-4 h-4" />
        </button>

        {/* Clear */}
        <button
          onClick={clearCanvas}
          className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-white/30 bg-transparent text-white hover:bg-brutal-red hover:border-brutal-red transition-all"
          title="Clear canvas"
        >
          <FaTrashAlt className="w-4 h-4" />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-white/20 mx-1" />

        {/* Color Picker Dots */}
        {PEN_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => {
              setPenColor(color);
              setTool("pencil");
            }}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              penColor === color && tool === "pencil"
                ? "border-white scale-110 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                : "border-white/40 hover:border-white/80"
            }`}
            style={{ backgroundColor: color }}
            title={`Color ${color}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Education Section ─── */
export default function Education() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 mt-16">
      <section
        id="education"
        className="w-full bg-education-mint py-16 lg:py-24 px-8 md:px-16 border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo overflow-hidden"
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
              <span className="text-4xl">🎓</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-brutal-black tracking-tight">
              EDUCATION
            </h2>
            {/* Thick decorative underline */}
            <div className="mt-4 mx-auto w-32 h-2 bg-brutal-black rounded-full" />
          </motion.div>

          {/* ── Two-Column Layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* LEFT — Vertical Timeline */}
            <div className="relative pl-4">
              {/* Vertical timeline line */}
              <div className="absolute left-0 top-0 bottom-0 border-l-4 border-black" />

              {/* Cards */}
              <div className="flex flex-col gap-10">
                {educationEntries.map((entry, index) => (
                  <TimelineCard key={index} entry={entry} index={index} />
                ))}
              </div>

              {/* Timeline end dot */}
              <div className="absolute left-0 -bottom-3 -translate-x-[calc(50%-0.5px)] z-10">
                <div className="w-3.5 h-3.5 rounded-full bg-brutal-black" />
              </div>
            </div>

            {/* RIGHT — Doodle Canvas */}
            <div className="lg:sticky lg:top-24">
              <DoodlePad />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
