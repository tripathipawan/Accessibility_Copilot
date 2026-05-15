import { SignIn } from "@clerk/clerk-react";
import { Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex bg-white dark:bg-[#060612]">
      {/* Left — Desktop only */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 flex-col justify-between p-12">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #fff, transparent 65%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">AccessCopilot</span>
          </Link>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Build Accessible
            <span className="block text-white/70">Code with AI</span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed max-w-sm">
            Detect and fix WCAG violations instantly. Join developers shipping
            accessible code.
          </p>
          <div className="flex gap-8 mt-10">
            {[
              { value: "10k+", label: "Issues Fixed" },
              { value: "99%", label: "Accuracy" },
              { value: "<2s", label: "Audit Time" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-white/50 uppercase tracking-wide mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur rounded-2xl p-5">
          <p className="text-white/80 text-sm leading-relaxed italic">
            "AccessCopilot helped us achieve WCAG compliance in one sprint."
          </p>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
              RS
            </div>
            <div>
              <p className="text-white text-sm font-medium">Rahul Sharma</p>
              <p className="text-white/50 text-xs">Frontend Dev @ Zomato</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Form (all screens) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center min-h-screen p-6 sm:p-8 bg-white dark:bg-[#060612]">
        {/* Mobile Header */}
        <div className="w-full max-w-md mb-8 lg:hidden">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              AccessCopilot
            </span>
          </Link>

          <div className="grid grid-cols-2 gap-2 mb-6">
            {[
              "Unlimited audits",
              "WCAG 2.1 checks",
              "AI auto-fix",
              "Score reports",
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl px-3 py-2"
              >
                <CheckCircle className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Clerk Form */}
        <div className="w-full max-w-md">
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
