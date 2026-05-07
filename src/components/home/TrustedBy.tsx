import "./trustedby.css";

const items = [
  "UI/UX DESIGN",
  "ACCESSIBILITY",
  "WEB DEVELOPMENT",
  "WCAG COMPLIANCE",
  "REACT COMPONENTS",
  "AI AUDITING",
  "ARIA STANDARDS",
  "CODE QUALITY",
];

const Separator = () => (
  <span className="text-indigo-400 dark:text-indigo-500 text-lg flex-shrink-0">
    ✦
  </span>
);

const TrustedBy = () => {
  return (
    <section className="py-5 bg-white dark:bg-[#07070f] border-y border-gray-100 dark:border-gray-800/50 overflow-hidden">
      <div className="marquee-wrapper">
        <div className="marquee-track-text">
          {/* First set */}
          {items.map((item, i) => (
            <>
              <span
                key={`a-${i}`}
                className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] whitespace-nowrap flex-shrink-0"
              >
                {item}
              </span>
              <Separator key={`sep-a-${i}`} />
            </>
          ))}
          {/* Duplicate for seamless loop */}
          {items.map((item, i) => (
            <>
              <span
                key={`b-${i}`}
                className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] whitespace-nowrap flex-shrink-0"
              >
                {item}
              </span>
              <Separator key={`sep-b-${i}`} />
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
