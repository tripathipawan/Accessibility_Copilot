import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Frontend Developer @ Zomato",
    avatar: "RS",
    color: "from-blue-500 to-blue-600",
    rating: 5,
    text: "AccessCopilot saved me hours of manual accessibility testing. The AI fixes are spot on and WCAG compliant every time.",
  },
  {
    name: "Priya Mehta",
    role: "UI Engineer @ Razorpay",
    avatar: "PM",
    color: "from-purple-500 to-purple-600",
    rating: 5,
    text: "I pasted a complex form component and got back perfectly labeled, keyboard-navigable code in under 2 seconds. Incredible!",
  },
  {
    name: "Arjun Verma",
    role: "React Developer @ Swiggy",
    avatar: "AV",
    color: "from-green-500 to-green-600",
    rating: 5,
    text: "Finally a tool that explains WHY something is an accessibility issue, not just what. The WCAG references are super helpful.",
  },
  {
    name: "Sneha Patel",
    role: "Full Stack Dev @ Cred",
    avatar: "SP",
    color: "from-pink-500 to-pink-600",
    rating: 5,
    text: "Our accessibility score went from 34 to 91 in one sprint using AccessCopilot. The PDF reports helped convince the client too.",
  },
  {
    name: "Karan Singh",
    role: "Tech Lead @ PhonePe",
    avatar: "KS",
    color: "from-orange-500 to-orange-600",
    rating: 5,
    text: "Best accessibility tool I have used. Simple UI, fast AI, and the before/after code comparison is exactly what developers need.",
  },
  {
    name: "Divya Nair",
    role: "Frontend Dev @ Meesho",
    avatar: "DN",
    color: "from-teal-500 to-teal-600",
    rating: 5,
    text: "The color contrast checker alone is worth it. Caught issues our designers missed and the fix suggestions were perfect.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Loved by Developers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Developers across India trust AccessCopilot
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
