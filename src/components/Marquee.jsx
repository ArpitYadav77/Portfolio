const tagline =
  "AVAILABLE FOR INTERNSHIPS ✓ · FULL-STACK ENGINEER ⚡ · REACT · NODE · POSTGRESQL · BUILDING REAL-WORLD PRODUCTS 🚀";

export default function Marquee() {
  return (
    <div
      className="w-full overflow-hidden border-y-3 border-black stripe-pattern mt-16"
      style={{ backgroundColor: "#FFE156", height: 60 }}
    >
      <div className="animate-marquee flex items-center whitespace-nowrap h-full">
        {/* Two identical copies for seamless looping */}
        {[0, 1].map((copy) => (
          <span
            key={copy}
            className="font-display text-sm md:text-base uppercase font-bold text-black px-6 shrink-0"
          >
            {tagline}
            <span className="mx-4">·</span>
            {tagline}
            <span className="mx-4">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
