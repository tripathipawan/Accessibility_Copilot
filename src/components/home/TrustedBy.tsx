import { motion } from "framer-motion";
import "./trustedby.css";

const companies = [
  "Zomato",
  "Razorpay",
  "Swiggy",
  "PhonePe",
  "CRED",
  "Meesho",
  "Groww",
  "Zepto",
  "Ola",
];

const TrustedBy = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-gray-400 dark:text-gray-500 mb-8 uppercase tracking-widest font-medium"
        >
          Trusted by developers at
        </motion.p>

        <div className="relative overflow-hidden">
          {/* CSS marquee */}
          <div className="marquee-track">
            {[...companies, ...companies].map((company, index) => (
              <div key={index} className="marquee-item">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {company}
                </span>
              </div>
            ))}
          </div>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
