import { useState, useEffect } from "react";

const NUTRIENTS = [
  { name: "Protein", color: "#10b981", value: 72, max: 120 },
  { name: "Carbs", color: "#f59e0b", value: 185, max: 250 },
  { name: "Fat", color: "#f43f5e", value: 48, max: 65 },
  { name: "Fiber", color: "#8b5cf6", value: 18, max: 30 },
];

const FOODS = [
  "2 scrambled eggs with toast",
  "grilled chicken salad with olive oil",
  "1 banana and a handful of almonds",
  "salmon with brown rice and broccoli",
  "oatmeal with blueberries and honey",
];

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const LeafIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 1c1 2 2 4.5 2 8 0 5.5-4.5 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const SparklesIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
  </svg>
);

// Floating particle component
function Particle({ delay, x, y, size }) {
  return (
    <div
      className="absolute rounded-full opacity-0"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: "radial-gradient(circle, rgba(245,158,11,0.3), transparent)",
        animation: `floatParticle 6s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

// Animated typing demo
function TypingDemo() {
  const [phase, setPhase] = useState(0); // 0=typing, 1=parsing, 2=results
  const [typed, setTyped] = useState("");
  const text = "2 eggs, toast with butter, orange juice";

  useEffect(() => {
    let t;
    if (phase === 0) {
      if (typed.length < text.length) {
        t = setTimeout(() => setTyped(text.slice(0, typed.length + 1)), 45);
      } else {
        t = setTimeout(() => setPhase(1), 600);
      }
    } else if (phase === 1) {
      t = setTimeout(() => setPhase(2), 1200);
    } else {
      t = setTimeout(() => { setPhase(0); setTyped(""); }, 3000);
    }
    return () => clearTimeout(t);
  }, [phase, typed]);

  const results = [
    { name: "Scrambled Eggs (2)", cal: 196, p: 14, c: 2, f: 15 },
    { name: "Toast w/ Butter (1)", cal: 167, p: 4, c: 22, f: 7 },
    { name: "Orange Juice (8oz)", cal: 112, p: 2, c: 26, f: 0 },
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="bg-zinc-800/80 rounded-lg px-4 py-3 border border-zinc-700/50 font-mono text-sm text-zinc-300 min-h-[44px] flex items-center">
          <SparklesIcon className="w-4 h-4 text-amber-400 mr-2 flex-shrink-0" />
          <span>{typed}</span>
          {phase === 0 && (
            <span className="inline-block w-0.5 h-4 bg-amber-400 ml-0.5" style={{ animation: "blink 1s step-end infinite" }} />
          )}
        </div>
      </div>

      {phase === 1 && (
        <div className="flex items-center justify-center gap-2 py-3">
          <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full" style={{ animation: "spin 0.8s linear infinite" }} />
          <span className="text-xs text-amber-400">Parsing with AI...</span>
        </div>
      )}

      {phase === 2 && (
        <div className="space-y-1.5" style={{ animation: "fadeInUp 0.4s ease-out" }}>
          {results.map((r, i) => (
            <div
              key={r.name}
              className="bg-zinc-800/60 rounded-lg px-3 py-2 border border-zinc-700/30 flex items-center justify-between"
              style={{ animation: `fadeInUp 0.3s ease-out ${i * 0.1}s both` }}
            >
              <span className="text-xs text-zinc-300">{r.name}</span>
              <div className="flex gap-3 text-[10px]">
                <span className="text-amber-400 font-medium">{r.cal} cal</span>
                <span className="text-emerald-400">P:{r.p}g</span>
                <span className="text-yellow-400">C:{r.c}g</span>
                <span className="text-rose-400">F:{r.f}g</span>
              </div>
            </div>
          ))}
          <div className="text-center pt-1">
            <span className="text-[10px] text-amber-400/70 font-medium">Total: 475 cal</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Macro progress bar
function MacroBar({ name, value, max, color, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth((value / max) * 100), 300 + delay);
    return () => clearTimeout(t);
  }, [value, max, delay]);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px]">
        <span className="text-zinc-400">{name}</span>
        <span style={{ color }}>{value}g / {max}g</span>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${Math.min(width, 100)}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function SignInPage() {
  const [hoveredBtn, setHoveredBtn] = useState(null);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Global styles */}
      <style>{`
        @keyframes floatParticle {
          0%, 100% { opacity: 0; transform: translateY(0) scale(1); }
          50% { opacity: 1; transform: translateY(-30px) scale(1.2); }
        }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)", animation: "pulseGlow 8s ease-in-out infinite" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.06), transparent 70%)", animation: "pulseGlow 8s ease-in-out 4s infinite" }} />

      {/* Floating particles */}
      <Particle delay={0} x={10} y={20} size={6} />
      <Particle delay={1.5} x={85} y={15} size={4} />
      <Particle delay={3} x={20} y={75} size={5} />
      <Particle delay={2} x={75} y={80} size={7} />
      <Particle delay={4} x={50} y={10} size={4} />
      <Particle delay={1} x={90} y={50} size={5} />

      {/* Main container */}
      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* Left - Branding & Demo */}
        <div className="hidden lg:block space-y-8" style={{ animation: "slideInLeft 0.6s ease-out" }}>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <LeafIcon className="w-5 h-5 text-zinc-900" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Eat<span className="text-amber-400">Clean</span>
            </span>
          </div>

          {/* Tagline */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-white leading-tight">
              Track nutrition<br />
              <span className="text-amber-400">effortlessly</span> with AI
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
              Describe your meals in plain language. Get instant, USDA-accurate nutrition data with 30+ tracked nutrients.
            </p>
          </div>

          {/* Live Demo Card */}
          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800/80 p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <SparklesIcon className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">Live AI Demo</span>
            </div>
            <TypingDemo />
          </div>

          {/* Macro preview */}
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Today's Progress</span>
              <span className="text-xs text-amber-400 font-medium">1,847 / 2,000 cal</span>
            </div>
            <div className="space-y-3">
              {NUTRIENTS.map((n, i) => (
                <MacroBar key={n.name} {...n} delay={i * 150} />
              ))}
            </div>
          </div>
        </div>

        {/* Right - Sign In Card */}
        <div className="flex justify-center lg:justify-end" style={{ animation: "slideInRight 0.6s ease-out" }}>
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <LeafIcon className="w-5 h-5 text-zinc-900" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Eat<span className="text-amber-400">Clean</span>
              </span>
            </div>

            {/* Card */}
            <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-zinc-800/80 shadow-2xl shadow-black/30 p-8 space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">Welcome back</h2>
                <p className="text-sm text-zinc-400">Sign in to continue tracking your nutrition</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

              {/* OAuth Buttons */}
              <div className="space-y-3">
                <button
                  onMouseEnter={() => setHoveredBtn("github")}
                  onMouseLeave={() => setHoveredBtn(null)}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-200"
                  style={{
                    background: hoveredBtn === "github"
                      ? "linear-gradient(135deg, #f59e0b, #d97706)"
                      : "linear-gradient(135deg, #f59e0b, #d97706)",
                    color: "#18181b",
                    transform: hoveredBtn === "github" ? "translateY(-1px)" : "none",
                    boxShadow: hoveredBtn === "github"
                      ? "0 8px 25px rgba(245,158,11,0.35), 0 0 0 1px rgba(245,158,11,0.2)"
                      : "0 4px 15px rgba(245,158,11,0.2)",
                    opacity: hoveredBtn === "github" ? 1 : 0.92,
                  }}
                >
                  <GitHubIcon />
                  Continue with GitHub
                </button>

                <button
                  onMouseEnter={() => setHoveredBtn("google")}
                  onMouseLeave={() => setHoveredBtn(null)}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-200"
                  style={{
                    background: hoveredBtn === "google" ? "rgba(63,63,70,0.7)" : "rgba(39,39,42,0.8)",
                    color: "#e4e4e7",
                    border: "1px solid",
                    borderColor: hoveredBtn === "google" ? "rgba(245,158,11,0.3)" : "rgba(63,63,70,0.5)",
                    transform: hoveredBtn === "google" ? "translateY(-1px)" : "none",
                    boxShadow: hoveredBtn === "google" ? "0 4px 15px rgba(0,0,0,0.3)" : "none",
                  }}
                >
                  <GoogleIcon />
                  Continue with Google
                </button>
              </div>

              {/* Features mini list */}
              <div className="pt-2 space-y-3">
                {[
                  { icon: "sparkle", label: "AI-powered natural language food logging" },
                  { icon: "chart", label: "30+ nutrients tracked from USDA data" },
                  { icon: "lock", label: "Private, secure, zero cost" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      {f.icon === "sparkle" && <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />}
                      {f.icon === "chart" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-amber-400">
                          <line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" />
                        </svg>
                      )}
                      {f.icon === "lock" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-amber-400">
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-zinc-600">
                By continuing, you agree to our{" "}
                <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors underline underline-offset-2">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors underline underline-offset-2">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}