import "./trustedby.css";
import { Fragment } from "react";

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
            <Fragment key={`a-${i}`}>
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] whitespace-nowrap flex-shrink-0">
                {item}
              </span>
              <Separator />
            </Fragment>
          ))}

          {/* Duplicate */}
          {items.map((item, i) => (
            <span key={`b-${i}`} className="contents">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] whitespace-nowrap flex-shrink-0">
                {item}
              </span>
              <Separator />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
