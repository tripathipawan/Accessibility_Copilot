import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, Heart, Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/constants";
import { scrollToSection } from "@/lib/scrollUtils";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const hash = href.replace("#", "");

    if (location.pathname === "/") {
      scrollToSection(hash);
    } else {
      navigate(`/#${hash}`);
    }
  };

  return (
    <footer className="bg-white dark:bg-[#07070f] border-t border-gray-200 dark:border-gray-800/50">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm mb-8">
              We design and audit accessible digital products that stand out.
              Because inclusive code deserves brilliant execution.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: "GitHub", href: SOCIAL_LINKS.github },
                { label: "Twitter", href: SOCIAL_LINKS.twitter },
                { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 text-xs font-medium"
                >
                  {s.label[0]}
                </a>
              ))}
            </div>
          </div>

          <div className="gap-10 grid grid-cols-2">
            {/* Product */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-widest mb-5">
                Product
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Features", href: "#features" },
                  { label: "How It Works", href: "#how-it-works" },
                  { label: "Scoring System", href: "#scoring-system" },
                  { label: "Audit Tool", href: "/audit" },
                ].map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-widest mb-5">
                Company
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms of Service", href: "#" },
                  { label: "Cookie Policy", href: "#" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {[
            {
              icon: Mail,
              label: "EMAIL US",
              value: "hello@accesscopilot.ai",
              href: "mailto:hello@accesscopilot.ai",
            },
            {
              icon: Phone,
              label: "CALL / WHATSAPP",
              value: "+91 98765 43210",
              href: "tel:+919876543210",
            },
            {
              icon: MapPin,
              label: "LOCATION",
              value: "Remote · India",
              href: "#",
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800/50 group hover:pl-2 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-0.5">
                    {item.value}
                  </p>
                </div>
              </div>
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 dark:border-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400 flex items-center gap-1 flex-wrap justify-center sm:justify-start">
              Made with{" "}
              <Heart className="w-3 h-3 text-red-500 fill-red-500 flex-shrink-0" />{" "}
              using React & AI · © 2026 {SITE_CONFIG.name}
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono uppercase tracking-wider whitespace-nowrap">
                AccessCopilot · Available 24/7
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
