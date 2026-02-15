import { useState, useEffect, useRef } from "react";

const Leaf = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 1c1 2 2 4.5 2 8 0 5.5-4.5 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
);

const Sparkles = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
);

const Calendar = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);

const BarChart = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" />
    </svg>
);

const Shield = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
);

const Zap = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
);

const Github = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const ArrowRight = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
);

const Check = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 6 9 17l-5-5" />
    </svg>
);

// Mini calendar preview component
function MiniCalendar() {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const data = [
        [null, null, null, null, null, null, 1],
        [2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22],
        [23, 24, 25, 26, 27, 28, null],
    ];
    const filled = { 3: 1850, 4: 2100, 5: 1920, 6: 1750, 7: 2200, 8: 1900, 9: 2050, 10: 2150, 11: 977, 12: 1680, 13: 1920, 14: 2100, 15: 1800 };
    const goal = 2200;

    return (
        <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-white">February 2026</span>
                <div className="flex gap-1">
                    <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-400 text-xs">‹</div>
                    <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-400 text-xs">›</div>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-1">
                {days.map((d, i) => <div key={i} className="text-center text-[10px] text-zinc-500 font-medium py-1">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {data.flat().map((day, i) => {
                    if (!day) return <div key={i} />;
                    const cal = filled[day];
                    const isToday = day === 15;
                    const pct = cal ? Math.min(cal / goal, 1) : 0;
                    return (
                        <div key={i} className={`aspect-square rounded-lg flex flex-col items-center justify-center gap-0.5 text-xs transition-all ${isToday ? 'ring-1 ring-emerald-500 bg-emerald-500/10' : cal ? 'bg-zinc-800/60 hover:bg-zinc-800' : 'bg-zinc-800/20 text-zinc-600'}`}>
                            <span className={`font-medium ${isToday ? 'text-emerald-400' : cal ? 'text-zinc-300' : 'text-zinc-600'}`}>{day}</span>
                            {cal && (
                                <div className="w-4/5 h-[3px] bg-zinc-700 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: `${pct * 100}%` }} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-zinc-500">
                <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-emerald-500 rounded-full inline-block" />Protein</span>
                <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-amber-500 rounded-full inline-block" />Carbs</span>
                <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-rose-500 rounded-full inline-block" />Fat</span>
            </div>
        </div>
    );
}

// Typing animation for the AI demo
function TypingDemo() {
    const [text, setText] = useState("");
    const [phase, setPhase] = useState(0); // 0=typing, 1=processing, 2=result
    const full = "2 scrambled eggs, toast with butter, and a glass of orange juice";
    const ref = useRef(null);

    useEffect(() => {
        if (phase === 0) {
            if (text.length < full.length) {
                const t = setTimeout(() => setText(full.slice(0, text.length + 1)), 40);
                return () => clearTimeout(t);
            } else {
                const t = setTimeout(() => setPhase(1), 800);
                return () => clearTimeout(t);
            }
        } else if (phase === 1) {
            const t = setTimeout(() => setPhase(2), 1500);
            return () => clearTimeout(t);
        } else {
            const t = setTimeout(() => { setText(""); setPhase(0); }, 4000);
            return () => clearTimeout(t);
        }
    }, [text, phase]);

    return (
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="p-4 border-b border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-violet-500/20 rounded-md"><Sparkles className="w-3.5 h-3.5 text-violet-400" /></div>
                    <span className="text-xs font-medium text-zinc-300">AI Food Logger</span>
                </div>
                <div className="bg-zinc-800 rounded-xl p-3 min-h-[60px] text-sm text-zinc-300 font-mono">
                    {text}<span className={`inline-block w-0.5 h-4 bg-emerald-400 ml-0.5 align-middle ${phase === 0 ? 'animate-pulse' : 'opacity-0'}`} />
                </div>
            </div>
            <div className={`transition-all duration-500 overflow-hidden ${phase >= 1 ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                {phase === 1 && (
                    <div className="p-4 flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs text-zinc-400">Analyzing nutrition...</span>
                    </div>
                )}
                {phase === 2 && (
                    <div className="p-4 space-y-2">
                        {[
                            { name: "Scrambled eggs (2)", cal: 182, p: 12, c: 2, f: 14 },
                            { name: "Toast with butter", cal: 167, p: 4, c: 20, f: 8 },
                            { name: "Orange juice (1 glass)", cal: 112, p: 2, c: 26, f: 0 },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between bg-zinc-800/60 rounded-lg px-3 py-2 animate-[fadeSlide_0.3s_ease_forwards]" style={{ animationDelay: `${i * 100}ms` }}>
                                <div>
                                    <div className="text-xs font-medium text-zinc-200">{item.name}</div>
                                    <div className="text-[10px] text-zinc-500">{item.cal} kcal</div>
                                </div>
                                <div className="flex gap-2 text-[10px]">
                                    <span className="text-emerald-400">{item.p}P</span>
                                    <span className="text-amber-400">{item.c}C</span>
                                    <span className="text-rose-400">{item.f}F</span>
                                </div>
                            </div>
                        ))}
                        <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                            <span className="text-xs text-zinc-400">Total</span>
                            <span className="text-sm font-semibold text-white">461 kcal</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Animated counter
function Counter({ target, suffix = "", duration = 2000 }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const el = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
        if (el.current) obs.observe(el.current);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;
        const steps = 60;
        const inc = target / steps;
        let curr = 0;
        const iv = setInterval(() => {
            curr += inc;
            if (curr >= target) { setCount(target); clearInterval(iv); }
            else setCount(Math.floor(curr));
        }, duration / steps);
        return () => clearInterval(iv);
    }, [started, target, duration]);

    return <span ref={el}>{count.toLocaleString()}{suffix}</span>;
}

// Nutrient bar component
function NutrientBar({ label, value, max, color, unit }) {
    const pct = Math.round((value / max) * 100);
    const colors = {
        emerald: "bg-emerald-500",
        amber: "bg-amber-500",
        rose: "bg-rose-500",
        violet: "bg-violet-500",
        cyan: "bg-cyan-500",
    };
    return (
        <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 w-20 text-right">{label}</span>
            <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className={`h-full ${colors[color]} rounded-full transition-all duration-1000`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs text-zinc-300 w-16">{value}{unit} <span className="text-zinc-600">/ {max}</span></span>
        </div>
    );
}

export default function EatCleanLanding() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [faqOpen, setFaqOpen] = useState(null);

    const faqs = [
        { q: "Is EatClean really free?", a: "Yes. EatClean runs on free-tier infrastructure and open-source technology. There are no premium plans, no ads, and no hidden fees. The USDA nutrition database we use is public domain." },
        { q: "How does the AI food logging work?", a: "Just type what you ate in plain English — like \"2 eggs with toast and OJ\" — and our AI powered by Llama 3.3 parses it into individual food items with full nutritional breakdown using USDA data." },
        { q: "What nutrition data do you track?", a: "Calories, macronutrients (protein, carbs, fat), 6 minerals (sodium, potassium, calcium, iron, magnesium, zinc), and 12 vitamins (A, C, D, E, K, and all B vitamins)." },
        { q: "Where does the nutrition data come from?", a: "We use the USDA FoodData Central database — specifically Foundation Foods and SR Legacy datasets. This is the same data used by researchers and healthcare professionals." },
        { q: "Is my data private?", a: "Your data is stored securely in an edge database and is only accessible by you. We use GitHub OAuth for authentication — we never see or store your password." },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <style>{`
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes glow { 0%,100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        .glow-orb { animation: glow 4s ease-in-out infinite; }
        .float { animation: float 6s ease-in-out infinite; }
        .float-delay { animation: float 6s ease-in-out 2s infinite; }
        html { scroll-behavior: smooth; }
      `}</style>

            {/* ───── NAV ───── */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-500/20 rounded-lg">
                            <Leaf className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">EatClean</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#demo" className="hover:text-white transition-colors">Demo</a>
                        <a href="#nutrition" className="hover:text-white transition-colors">Nutrition</a>
                        <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-zinc-900 rounded-xl text-sm font-semibold hover:bg-zinc-100 transition-colors">
                            <Github className="w-4 h-4" />
                            Sign in with GitHub
                        </button>
                        <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setMobileMenu(!mobileMenu)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                                {mobileMenu ? <path d="M18 6 6 18M6 6l12 12" /> : <g><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" /></g>}
                            </svg>
                        </button>
                    </div>
                </div>
                {mobileMenu && (
                    <div className="md:hidden border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-xl">
                        <div className="px-4 py-4 flex flex-col gap-3">
                            <a href="#features" className="text-sm text-zinc-400 hover:text-white py-2" onClick={() => setMobileMenu(false)}>Features</a>
                            <a href="#demo" className="text-sm text-zinc-400 hover:text-white py-2" onClick={() => setMobileMenu(false)}>Demo</a>
                            <a href="#nutrition" className="text-sm text-zinc-400 hover:text-white py-2" onClick={() => setMobileMenu(false)}>Nutrition</a>
                            <a href="#faq" className="text-sm text-zinc-400 hover:text-white py-2" onClick={() => setMobileMenu(false)}>FAQ</a>
                            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-zinc-900 rounded-xl text-sm font-semibold mt-2">
                                <Github className="w-4 h-4" />
                                Sign in with GitHub
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* ───── HERO ───── */}
            <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl glow-orb" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/6 rounded-full blur-3xl glow-orb" style={{ animationDelay: "2s" }} />
                </div>
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400 font-medium mb-6">
                                <Sparkles className="w-3.5 h-3.5" />
                                AI-Powered Nutrition Tracking
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                Track what you eat,{" "}
                                <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                                    not spreadsheets
                                </span>
                            </h1>
                            <p className="text-lg text-zinc-400 max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0">
                                Just describe your meal in plain English. EatClean's AI breaks it down into detailed nutrition — calories, macros, vitamins, minerals — all backed by USDA data. Free forever.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-emerald-500/25">
                                    Get Started — It's Free
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <a href="#demo" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium transition-colors text-zinc-300">
                                    See it in action
                                </a>
                            </div>
                            <div className="flex items-center gap-6 mt-8 text-xs text-zinc-500 justify-center lg:justify-start">
                                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" />No credit card</span>
                                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" />No ads</span>
                                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" />USDA sourced</span>
                            </div>
                        </div>
                        <div className="flex-shrink-0 float">
                            <MiniCalendar />
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── STATS BAR ───── */}
            <section className="border-y border-zinc-800/50 bg-zinc-900/30">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { val: 8700, suffix: "+", label: "Foods in database" },
                            { val: 30, suffix: "+", label: "Nutrients tracked" },
                            { val: 0, suffix: "", label: "Monthly cost", prefix: "$" },
                            { val: 100, suffix: "%", label: "Open nutrition data" },
                        ].map((s, i) => (
                            <div key={i}>
                                <div className="text-2xl sm:text-3xl font-bold text-white">{s.prefix}<Counter target={s.val} />{s.suffix}</div>
                                <div className="text-xs text-zinc-500 mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───── FEATURES ───── */}
            <section id="features" className="py-20 sm:py-28">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need, nothing you don't</h2>
                        <p className="text-zinc-400 max-w-lg mx-auto">Built for people who care about what they eat — not fiddling with apps. Simple, accurate, and completely free.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Sparkles, color: "violet", title: "AI-Powered Logging", desc: "Describe your meal naturally. Our AI identifies individual foods and maps them to precise USDA nutrition data." },
                            { icon: Calendar, color: "emerald", title: "Calendar Dashboard", desc: "Monthly view with daily calorie summaries and macro progress bars. Click any day to see the full breakdown." },
                            { icon: BarChart, color: "amber", title: "Deep Nutrition Data", desc: "Go beyond calories. Track 30+ nutrients including all vitamins, minerals, and macronutrient splits." },
                            { icon: Zap, color: "cyan", title: "Instant & Lightweight", desc: "Edge-deployed database, server-rendered UI, zero client bloat. Fast on any device, any connection." },
                            { icon: Shield, color: "rose", title: "Private by Design", desc: "Your data stays yours. Secure OAuth login, encrypted sessions, no tracking, no ads, no data selling." },
                            { icon: Leaf, color: "emerald", title: "Raw Foods Focus", desc: "Built around whole, unprocessed ingredients using USDA Foundation Foods — the gold standard in nutrition science." },
                        ].map(({ icon: Icon, color, title, desc }, i) => {
                            const c = {
                                violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
                                emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                                amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                                cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
                                rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
                            }[color];
                            return (
                                <div key={i} className="group bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition-all duration-300">
                                    <div className={`inline-flex p-2.5 rounded-xl border ${c} mb-4`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                                    <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ───── DEMO SECTION ───── */}
            <section id="demo" className="py-20 sm:py-28 bg-zinc-900/30 border-y border-zinc-800/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        <div className="flex-1 order-2 lg:order-1">
                            <div className="float-delay flex justify-center">
                                <TypingDemo />
                            </div>
                        </div>
                        <div className="flex-1 order-1 lg:order-2 text-center lg:text-left">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Log meals in seconds, not minutes</h2>
                            <p className="text-zinc-400 mb-8 leading-relaxed">
                                No more scrolling through endless food lists or weighing every gram. Just type what you ate — our AI handles the rest. Every item is matched to USDA data for research-grade accuracy.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Type naturally: \"chicken breast with rice and broccoli\"",
                                    "AI parses into individual USDA-matched foods",
                                    "Full macro + micro breakdown in under 2 seconds",
                                    "Edit or add more items anytime",
                                ].map((t, i) => (
                                    <div key={i} className="flex items-start gap-3 text-left">
                                        <div className="mt-0.5 p-1 bg-emerald-500/20 rounded-full flex-shrink-0">
                                            <Check className="w-3 h-3 text-emerald-400" />
                                        </div>
                                        <span className="text-sm text-zinc-300">{t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── NUTRITION SHOWCASE ───── */}
            <section id="nutrition" className="py-20 sm:py-28">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">More than just calories</h2>
                        <p className="text-zinc-400 max-w-lg mx-auto">Track 30+ nutrients with daily recommended intake percentages. See exactly where your diet shines — and where it falls short.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-zinc-300 mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                Macronutrients
                            </h3>
                            <div className="space-y-3">
                                <NutrientBar label="Protein" value={96} max={150} color="emerald" unit="g" />
                                <NutrientBar label="Carbs" value={185} max={250} color="amber" unit="g" />
                                <NutrientBar label="Fat" value={52} max={67} color="rose" unit="g" />
                            </div>
                        </div>
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-zinc-300 mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 bg-violet-500 rounded-full" />
                                Vitamins
                            </h3>
                            <div className="space-y-3">
                                <NutrientBar label="Vitamin A" value={780} max={900} color="violet" unit="μg" />
                                <NutrientBar label="Vitamin C" value={65} max={90} color="violet" unit="mg" />
                                <NutrientBar label="Vitamin D" value={8} max={20} color="violet" unit="μg" />
                            </div>
                        </div>
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-zinc-300 mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                                Minerals
                            </h3>
                            <div className="space-y-3">
                                <NutrientBar label="Iron" value={14} max={18} color="cyan" unit="mg" />
                                <NutrientBar label="Calcium" value={820} max={1000} color="cyan" unit="mg" />
                                <NutrientBar label="Potassium" value={2800} max={3400} color="cyan" unit="mg" />
                            </div>
                        </div>
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-zinc-300 mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                                Daily Summary
                            </h3>
                            <div className="text-center py-4">
                                <div className="text-4xl font-bold text-white mb-1">1,847</div>
                                <div className="text-sm text-zinc-500 mb-4">of 2,200 kcal goal</div>
                                <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" style={{ width: "84%" }} />
                                </div>
                                <div className="text-xs text-zinc-500 mt-2">353 kcal remaining</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── HOW IT WORKS ───── */}
            <section className="py-20 sm:py-28 bg-zinc-900/30 border-y border-zinc-800/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Three steps. That's it.</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            { step: "01", title: "Sign in", desc: "One-click GitHub OAuth. No passwords, no email verification, no friction." },
                            { step: "02", title: "Log your meals", desc: "Type what you ate or search the USDA database. AI parses natural language into precise nutrition data." },
                            { step: "03", title: "See the picture", desc: "Your calendar fills with daily summaries. Click any day for the full macro and micronutrient breakdown." },
                        ].map(({ step, title, desc }, i) => (
                            <div key={i} className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm mb-4">{step}</div>
                                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───── FAQ ───── */}
            <section id="faq" className="py-20 sm:py-28">
                <div className="max-w-2xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently asked questions</h2>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
                                <button className="w-full flex items-center justify-between px-5 py-4 text-left" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                                    <span className="text-sm font-medium text-zinc-200 pr-4">{faq.q}</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform duration-200 ${faqOpen === i ? 'rotate-180' : ''}`}>
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </button>
                                <div className={`transition-all duration-300 overflow-hidden ${faqOpen === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-5 pb-4 text-sm text-zinc-400 leading-relaxed">{faq.a}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───── CTA ───── */}
            <section className="py-20 sm:py-28 bg-zinc-900/30 border-t border-zinc-800/50">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
                    <div className="inline-flex p-3 bg-emerald-500/10 rounded-2xl mb-6">
                        <Leaf className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Start eating clean today</h2>
                    <p className="text-zinc-400 mb-8 max-w-md mx-auto">No signup forms, no credit cards, no catch. Just sign in with GitHub and start tracking your nutrition in seconds.</p>
                    <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-emerald-500/25">
                        <Github className="w-4 h-4" />
                        Sign in with GitHub
                    </button>
                </div>
            </section>

            {/* ───── FOOTER ───── */}
            <footer className="border-t border-zinc-800/50 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="p-1 bg-emerald-500/20 rounded-md">
                            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <span className="text-sm font-semibold text-zinc-400">EatClean</span>
                    </div>
                    <div className="text-xs text-zinc-600">Nutrition data sourced from USDA FoodData Central. Built with Next.js & Turso.</div>
                </div>
            </footer>
        </div>
    );
}