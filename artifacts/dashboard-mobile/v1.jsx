import { useState, useRef, useEffect } from "react";

// ─── Icons (inline SVG for zero deps) ───
const Icon = ({ d, className = "w-4 h-4", sw = 2 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className}>
        {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
    </svg>
);
const ChevLeft = ({ className }) => <Icon className={className} d="M15 18l-6-6 6-6" />;
const ChevRight = ({ className }) => <Icon className={className} d="M9 18l6-6-6-6" />;
const ChevDown = ({ className }) => <Icon className={className} d="M6 9l6 6 6-6" />;
const Plus = ({ className }) => <Icon className={className} d={["M12 5v14", "M5 12h14"]} />;
const X = ({ className }) => <Icon className={className} d={["M18 6L6 18", "M6 6l12 12"]} />;
const User = ({ className }) => <Icon className={className} d={["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2", "M12 3a4 4 0 100 8 4 4 0 000-8z"]} />;
const Sparkles = ({ className }) => <Icon className={className} d={["M12 3l-1.9 5.8a2 2 0 01-1.3 1.3L3 12l5.8 1.9a2 2 0 011.3 1.3L12 21l1.9-5.8a2 2 0 011.3-1.3L21 12l-5.8-1.9a2 2 0 01-1.3-1.3L12 3z", "M5 3v4", "M19 17v4", "M3 5h4", "M17 19h4"]} />;
const Settings = ({ className }) => <Icon className={className} d={["M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z", "M12 8a4 4 0 100 8 4 4 0 000-8z"]} />;
const LogOut = ({ className }) => <Icon className={className} d={["M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4", "M16 17l5-5-5-5", "M21 12H9"]} />;
const Utensils = ({ className }) => <Icon className={className} d={["M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2", "M7 2v20", "M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"]} />;
const Target = ({ className }) => <Icon className={className} d={["M12 2a10 10 0 100 20 10 10 0 000-20z", "M12 6a6 6 0 100 12 6 6 0 000-12z", "M12 10a2 2 0 100 4 2 2 0 000-4z"]} />;
const TrendUp = ({ className }) => <Icon className={className} d={["M22 7l-8.5 8.5-5-5L2 17", "M16 7h6v6"]} />;
const Clock = ({ className }) => <Icon className={className} d={["M12 2a10 10 0 100 20 10 10 0 000-20z", "M12 6v6l4 2"]} />;
const ListIcon = ({ className }) => <Icon className={className} d={["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"]} />;
const CalIcon = ({ className }) => <Icon className={className} d={["M8 2v4", "M16 2v4", "M3 10h18", "M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"]} />;

// ─── Data ───
const today = new Date(2026, 1, 22); // Feb 22, 2026
const goals = { calories: 2000, protein: 150, carbs: 250, fat: 65 };

const micronutrientData = {
    vitamins: [
        { name: 'Vitamin A', amount: 780, unit: 'mcg', dv: 900 },
        { name: 'Vitamin C', amount: 65, unit: 'mg', dv: 90 },
        { name: 'Vitamin D', amount: 12, unit: 'mcg', dv: 20 },
        { name: 'Vitamin E', amount: 11, unit: 'mg', dv: 15 },
        { name: 'Vitamin K', amount: 95, unit: 'mcg', dv: 120 },
        { name: 'Thiamin (B1)', amount: 1.0, unit: 'mg', dv: 1.2 },
        { name: 'Riboflavin (B2)', amount: 1.1, unit: 'mg', dv: 1.3 },
        { name: 'Niacin (B3)', amount: 14, unit: 'mg', dv: 16 },
        { name: 'Vitamin B6', amount: 1.5, unit: 'mg', dv: 1.7 },
        { name: 'Vitamin B12', amount: 2.0, unit: 'mcg', dv: 2.4 },
        { name: 'Folate', amount: 320, unit: 'mcg', dv: 400 },
    ],
    minerals: [
        { name: 'Calcium', amount: 850, unit: 'mg', dv: 1300 },
        { name: 'Iron', amount: 14, unit: 'mg', dv: 18 },
        { name: 'Magnesium', amount: 310, unit: 'mg', dv: 420 },
        { name: 'Phosphorus', amount: 980, unit: 'mg', dv: 1250 },
        { name: 'Potassium', amount: 2800, unit: 'mg', dv: 4700 },
        { name: 'Sodium', amount: 1800, unit: 'mg', dv: 2300 },
        { name: 'Zinc', amount: 8.5, unit: 'mg', dv: 11 },
    ]
};

const sampleEntries = {
    '2026-02-22': [
        { id: 1, time: '8:30 AM', description: '2 scrambled eggs with toast and butter', calories: 380, protein: 22, carbs: 28, fat: 20, meal: 'Breakfast' },
        { id: 2, time: '12:45 PM', description: 'Grilled chicken salad with olive oil dressing', calories: 420, protein: 45, carbs: 15, fat: 18, meal: 'Lunch' },
        { id: 3, time: '7:00 PM', description: 'Salmon with steamed broccoli and rice', calories: 520, protein: 38, carbs: 42, fat: 18, meal: 'Dinner' },
    ],
    '2026-02-21': [
        { id: 1, time: '9:00 AM', description: 'Oatmeal with banana and almonds', calories: 380, protein: 12, carbs: 58, fat: 14, meal: 'Breakfast' },
        { id: 2, time: '1:00 PM', description: 'Turkey sandwich with avocado', calories: 520, protein: 35, carbs: 42, fat: 24, meal: 'Lunch' },
        { id: 3, time: '7:30 PM', description: 'Beef stir fry with vegetables', calories: 580, protein: 42, carbs: 35, fat: 28, meal: 'Dinner' },
    ],
    '2026-02-20': [
        { id: 1, time: '8:00 AM', description: 'Smoothie bowl with granola', calories: 420, protein: 18, carbs: 65, fat: 12, meal: 'Breakfast' },
        { id: 2, time: '12:30 PM', description: 'Quinoa bowl with chickpeas', calories: 480, protein: 22, carbs: 68, fat: 14, meal: 'Lunch' },
        { id: 3, time: '6:30 PM', description: 'Grilled fish tacos', calories: 520, protein: 38, carbs: 45, fat: 22, meal: 'Dinner' },
    ],
    '2026-02-19': [
        { id: 1, time: '7:30 AM', description: 'Eggs benedict', calories: 680, protein: 32, carbs: 38, fat: 42, meal: 'Breakfast' },
        { id: 2, time: '1:00 PM', description: 'Caesar salad with grilled chicken', calories: 450, protein: 38, carbs: 18, fat: 26, meal: 'Lunch' },
    ],
    '2026-02-18': [
        { id: 1, time: '8:30 AM', description: 'Greek yogurt parfait', calories: 320, protein: 22, carbs: 42, fat: 8, meal: 'Breakfast' },
        { id: 2, time: '12:00 PM', description: 'Chicken wrap with hummus', calories: 490, protein: 35, carbs: 48, fat: 16, meal: 'Lunch' },
        { id: 3, time: '6:00 PM', description: 'Pasta with marinara sauce', calories: 580, protein: 18, carbs: 82, fat: 14, meal: 'Dinner' },
    ],
    '2026-02-17': [
        { id: 1, time: '10:00 AM', description: 'Avocado toast with poached eggs', calories: 450, protein: 20, carbs: 35, fat: 28, meal: 'Brunch' },
        { id: 2, time: '3:00 PM', description: 'Protein shake with banana', calories: 280, protein: 30, carbs: 32, fat: 4, meal: 'Snack' },
        { id: 3, time: '7:00 PM', description: 'Baked chicken thighs with sweet potato', calories: 620, protein: 45, carbs: 52, fat: 22, meal: 'Dinner' },
    ],
    '2026-02-16': [
        { id: 1, time: '9:00 AM', description: 'Pancakes with maple syrup', calories: 520, protein: 12, carbs: 78, fat: 18, meal: 'Breakfast' },
        { id: 2, time: '1:30 PM', description: 'Tuna poke bowl', calories: 480, protein: 35, carbs: 55, fat: 12, meal: 'Lunch' },
        { id: 3, time: '7:00 PM', description: 'Lamb chops with roasted vegetables', calories: 650, protein: 42, carbs: 28, fat: 38, meal: 'Dinner' },
    ],
    '2026-02-15': [
        { id: 1, time: '8:00 AM', description: 'Granola bar and coffee', calories: 220, protein: 6, carbs: 32, fat: 8, meal: 'Breakfast' },
        { id: 2, time: '12:00 PM', description: 'Ramen noodle soup', calories: 580, protein: 28, carbs: 65, fat: 22, meal: 'Lunch' },
    ],
    '2026-02-10': [
        { id: 1, time: '8:30 AM', description: 'French toast with berries', calories: 420, protein: 14, carbs: 58, fat: 16, meal: 'Breakfast' },
        { id: 2, time: '12:30 PM', description: 'BBQ chicken sandwich', calories: 580, protein: 38, carbs: 52, fat: 22, meal: 'Lunch' },
        { id: 3, time: '7:00 PM', description: 'Shrimp scampi with pasta', calories: 520, protein: 32, carbs: 55, fat: 18, meal: 'Dinner' },
    ],
    '2026-02-05': [
        { id: 1, time: '9:00 AM', description: 'Acai bowl', calories: 380, protein: 8, carbs: 62, fat: 12, meal: 'Breakfast' },
        { id: 2, time: '1:00 PM', description: 'Grilled cheese with tomato soup', calories: 520, protein: 18, carbs: 58, fat: 24, meal: 'Lunch' },
        { id: 3, time: '6:30 PM', description: 'Teriyaki salmon with rice', calories: 580, protein: 40, carbs: 52, fat: 18, meal: 'Dinner' },
    ],
};

const formatDate = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
const getDaySummary = (entries) => {
    if (!entries?.length) return null;
    return entries.reduce((a, e) => ({
        calories: a.calories + e.calories, protein: a.protein + e.protein,
        carbs: a.carbs + e.carbs, fat: a.fat + e.fat, count: a.count + 1
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, count: 0 });
};

// ─── Circular Progress ───
const CircleProgress = ({ value, max, size = 80, strokeWidth = 6, color = "#f59e0b" }) => {
    const r = (size - strokeWidth) / 2;
    const circ = 2 * Math.PI * r;
    const pct = Math.min(value / max, 1);
    return (
        <svg width={size} height={size} className="transform -rotate-90">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#27272a" strokeWidth={strokeWidth} />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
                strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
        </svg>
    );
};

// ─── Macro Bar ───
const MacroBar = ({ label, value, max, color, small }) => {
    const pct = Math.min((value / max) * 100, 100);
    const colors = { emerald: 'bg-emerald-500', amber: 'bg-amber-500', rose: 'bg-rose-500' };
    return (
        <div className={small ? "space-y-0.5" : "space-y-1"}>
            <div className="flex justify-between items-baseline">
                <span className={`${small ? 'text-[10px]' : 'text-xs'} text-zinc-400`}>{label}</span>
                <span className={`${small ? 'text-[10px]' : 'text-xs'} font-medium text-zinc-300`}>{value}g <span className="text-zinc-600">/ {max}g</span></span>
            </div>
            <div className={`w-full ${small ? 'h-1' : 'h-1.5'} bg-zinc-800 rounded-full overflow-hidden`}>
                <div className={`h-full ${colors[color]} rounded-full`} style={{ width: `${pct}%`, transition: 'width 0.5s ease' }} />
            </div>
        </div>
    );
};

// ─── Mobile View Mode Selector ───
const ViewModeToggle = ({ mode, setMode }) => (
    <div className="flex bg-zinc-800/50 rounded-xl p-1 gap-1">
        {[
            { key: 'timeline', icon: Clock, label: 'Timeline' },
            { key: 'calendar', icon: CalIcon, label: 'Calendar' },
        ].map(({ key, icon: Ic, label }) => (
            <button key={key} onClick={() => setMode(key)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${mode === key ? 'bg-amber-500/15 text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
                    }`}>
                <Ic className="w-3.5 h-3.5" />{label}
            </button>
        ))}
    </div>
);

// ─── Day Cell for Calendar Grid ───
const DayCell = ({ day, data, isToday, onClick, compact }) => {
    if (!day) return <div className={compact ? "h-10" : "h-14 sm:h-20"} />;
    const hasData = !!data;
    return (
        <button onClick={() => onClick(day)}
            className={`relative ${compact ? 'h-10' : 'h-14 sm:h-20'} rounded-lg transition-all text-left flex flex-col items-center justify-center
        ${isToday ? 'ring-1 ring-amber-500/60 bg-amber-500/10' : hasData ? 'bg-zinc-800/40 hover:bg-zinc-800/70' : 'hover:bg-zinc-800/30'}
      `}>
            <span className={`text-xs font-medium ${isToday ? 'text-amber-400' : hasData ? 'text-zinc-200' : 'text-zinc-600'}`}>{day}</span>
            {hasData && !compact && (
                <span className="text-[9px] text-zinc-500 mt-0.5">{data.calories >= 1000 ? `${(data.calories / 1000).toFixed(1)}k` : data.calories}</span>
            )}
            {hasData && compact && <span className="w-1 h-1 bg-amber-500 rounded-full mt-0.5" />}
            {hasData && !compact && (
                <div className="flex gap-px mt-0.5">
                    <div className="w-2 h-0.5 bg-emerald-500 rounded-full" style={{ opacity: Math.min(data.protein / goals.protein, 1) }} />
                    <div className="w-2 h-0.5 bg-amber-500 rounded-full" style={{ opacity: Math.min(data.carbs / goals.carbs, 1) }} />
                    <div className="w-2 h-0.5 bg-rose-500 rounded-full" style={{ opacity: Math.min(data.fat / goals.fat, 1) }} />
                </div>
            )}
        </button>
    );
};

// ─── Timeline View (Mobile Alternative to Calendar) ───
const TimelineView = ({ entries, onDayClick, onAddFood }) => {
    const sortedDates = Object.keys(entries).sort((a, b) => b.localeCompare(a));
    const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

    return (
        <div className="space-y-3">
            {/* Today quick-add card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h3 className="text-sm font-semibold text-white">Today</h3>
                        <p className="text-xs text-zinc-500">{today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                    </div>
                    <button onClick={() => onAddFood(todayStr)} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold rounded-lg transition-colors">
                        <Plus className="w-3.5 h-3.5" />Log Food
                    </button>
                </div>
                {entries[todayStr] ? (() => {
                    const sum = getDaySummary(entries[todayStr]);
                    return (
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="relative">
                                    <CircleProgress value={sum.calories} max={goals.calories} size={56} strokeWidth={5} />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-sm font-bold text-white">{sum.calories}</span>
                                        <span className="text-[8px] text-zinc-500">kcal</span>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-1.5">
                                    <MacroBar label="Protein" value={sum.protein} max={goals.protein} color="emerald" small />
                                    <MacroBar label="Carbs" value={sum.carbs} max={goals.carbs} color="amber" small />
                                    <MacroBar label="Fat" value={sum.fat} max={goals.fat} color="rose" small />
                                </div>
                            </div>
                            <div className="space-y-2">
                                {entries[todayStr].map(e => (
                                    <div key={e.id} className="flex items-center gap-3 py-2 px-3 bg-zinc-800/40 rounded-xl">
                                        <div className="text-[10px] text-zinc-500 w-12 flex-shrink-0">{e.time}</div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-zinc-200 truncate">{e.description}</p>
                                            <p className="text-[10px] text-zinc-500">{e.calories} kcal</p>
                                        </div>
                                        <span className="text-[9px] text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded">{e.meal}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })() : (
                    <div className="text-center py-6 text-zinc-600 text-sm">No meals logged yet today</div>
                )}
            </div>

            {/* Past days timeline */}
            {sortedDates.filter(d => d !== todayStr).map(dateStr => {
                const ents = entries[dateStr];
                const sum = getDaySummary(ents);
                const d = new Date(dateStr + 'T12:00:00');
                const dayDiff = Math.floor((today - d) / 86400000);
                const label = dayDiff === 1 ? 'Yesterday' : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

                return (
                    <button key={dateStr} onClick={() => onDayClick(dateStr)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-left hover:border-zinc-700 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-medium text-zinc-200">{label}</span>
                                    <span className="text-xs text-zinc-500">{sum.count} meal{sum.count !== 1 ? 's' : ''}</span>
                                </div>
                                <div className="flex items-center gap-3 text-[10px] text-zinc-500">
                                    <span className="text-amber-400/80 font-medium">{sum.calories} kcal</span>
                                    <span><span className="text-emerald-400/60">P</span> {sum.protein}g</span>
                                    <span><span className="text-amber-400/60">C</span> {sum.carbs}g</span>
                                    <span><span className="text-rose-400/60">F</span> {sum.fat}g</span>
                                </div>
                            </div>
                            <ChevRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                        </div>
                        {/* Mini calorie bar */}
                        <div className="mt-2 h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500/50 rounded-full" style={{ width: `${Math.min(sum.calories / goals.calories * 100, 100)}%` }} />
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

// ─── Today Summary Widget ───
const TodaySummaryWidget = ({ entries }) => {
    const sum = getDaySummary(entries) || { calories: 0, protein: 0, carbs: 0, fat: 0 };
    const remaining = Math.max(goals.calories - sum.calories, 0);
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <h3 className="text-xs font-medium text-zinc-400 mb-3 flex items-center gap-1.5"><Target className="w-3.5 h-3.5" />Today's Summary</h3>
            <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                    <CircleProgress value={sum.calories} max={goals.calories} size={72} strokeWidth={6} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-base font-bold text-white">{sum.calories}</span>
                        <span className="text-[9px] text-zinc-500">/ {goals.calories}</span>
                    </div>
                </div>
                <div className="flex-1 space-y-2">
                    <MacroBar label="Protein" value={sum.protein} max={goals.protein} color="emerald" small />
                    <MacroBar label="Carbs" value={sum.carbs} max={goals.carbs} color="amber" small />
                    <MacroBar label="Fat" value={sum.fat} max={goals.fat} color="rose" small />
                </div>
            </div>
            <div className="mt-3 text-center text-xs text-zinc-500">{remaining} kcal remaining</div>
        </div>
    );
};

// ─── Weekly Trend Widget ───
const WeeklyTrendWidget = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const vals = [1480, 1520, 1420, 1130, 1390, 1650, 1320];
    const max = Math.max(...vals);
    const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-medium text-zinc-400 flex items-center gap-1.5"><TrendUp className="w-3.5 h-3.5" />This Week</h3>
                <span className="text-[10px] text-zinc-500">avg {avg} kcal</span>
            </div>
            <div className="flex items-end gap-1.5 h-20">
                {vals.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-zinc-800 rounded-t-sm relative flex-1 flex items-end">
                            <div className={`w-full rounded-t-sm transition-all ${v >= goals.calories ? 'bg-amber-500' : 'bg-amber-500/40'}`}
                                style={{ height: `${(v / max) * 100}%` }} />
                        </div>
                        <span className="text-[9px] text-zinc-600">{days[i]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Goals Widget ───
const GoalsWidget = () => (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-medium text-zinc-400">Daily Goals</h3>
            <button className="text-[10px] text-amber-400 hover:text-amber-300">Edit</button>
        </div>
        <div className="grid grid-cols-2 gap-2">
            {[
                { label: 'Calories', val: `${goals.calories} kcal`, c: 'text-amber-400' },
                { label: 'Protein', val: `${goals.protein}g`, c: 'text-emerald-400' },
                { label: 'Carbs', val: `${goals.carbs}g`, c: 'text-amber-400' },
                { label: 'Fat', val: `${goals.fat}g`, c: 'text-rose-400' },
            ].map(g => (
                <div key={g.label} className="bg-zinc-800/40 rounded-lg px-3 py-2">
                    <span className="text-[10px] text-zinc-500 block">{g.label}</span>
                    <span className={`text-sm font-semibold ${g.c}`}>{g.val}</span>
                </div>
            ))}
        </div>
    </div>
);

// ─── Recent Meals Widget ───
const RecentMealsWidget = ({ entries }) => {
    const allEntries = Object.entries(entries).sort(([a], [b]) => b.localeCompare(a)).flatMap(([date, ents]) =>
        ents.map(e => ({ ...e, date }))
    ).slice(0, 4);
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <h3 className="text-xs font-medium text-zinc-400 mb-3 flex items-center gap-1.5"><Utensils className="w-3.5 h-3.5" />Recent Meals</h3>
            <div className="space-y-2">
                {allEntries.map((e, i) => (
                    <div key={i} className="flex items-center gap-2 py-1.5">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-zinc-200 truncate">{e.description}</p>
                            <p className="text-[10px] text-zinc-500">{e.time} · {e.calories} kcal</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Day Summary Modal ───
const DaySummaryModal = ({ entries, date, onClose, onAddEntry }) => {
    const [tab, setTab] = useState('entries');
    const [microTab, setMicroTab] = useState('vitamins');
    const [expandedEntry, setExpandedEntry] = useState(null);
    const sum = getDaySummary(entries);
    const dateObj = new Date(date + 'T12:00:00');
    const formatted = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center z-50" onClick={onClose}>
            <div className="bg-zinc-900 border border-zinc-800 sm:rounded-2xl rounded-t-2xl w-full sm:max-w-lg max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="p-4 border-b border-zinc-800 flex items-center justify-between flex-shrink-0">
                    <div>
                        <h2 className="text-base font-semibold text-white">{formatted}</h2>
                        <p className="text-xs text-zinc-500">{sum.calories} kcal · {entries.length} meals</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => { onClose(); onAddEntry && onAddEntry(); }} className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-500/15 text-amber-400 text-xs font-medium rounded-lg hover:bg-amber-500/25 transition-colors">
                            <Plus className="w-3 h-3" />Add
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"><X className="w-4 h-4 text-zinc-400" /></button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-zinc-800 flex-shrink-0">
                    {['entries', 'summary'].map(t => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`flex-1 py-2.5 text-xs font-medium transition-colors ${tab === t ? 'text-amber-400 border-b-2 border-amber-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
                            {t === 'entries' ? 'Entries' : 'Summary'}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {tab === 'entries' ? (
                        <div className="space-y-2">
                            {entries.map(e => (
                                <div key={e.id}>
                                    <button onClick={() => setExpandedEntry(expandedEntry === e.id ? null : e.id)}
                                        className="w-full text-left bg-zinc-800/40 hover:bg-zinc-800/60 rounded-xl p-3 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] text-zinc-500">{e.time}</span>
                                                    {e.meal && <span className="text-[9px] text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded">{e.meal}</span>}
                                                </div>
                                                <p className="text-sm text-zinc-200 mt-1">{e.description}</p>
                                            </div>
                                            <div className="text-right ml-3 flex-shrink-0">
                                                <span className="text-sm font-medium text-amber-400">{e.calories}</span>
                                                <span className="text-[10px] text-zinc-500 ml-0.5">kcal</span>
                                            </div>
                                        </div>
                                        {expandedEntry === e.id && (
                                            <div className="mt-3 pt-3 border-t border-zinc-700/50 grid grid-cols-3 gap-3">
                                                {[
                                                    { label: 'Protein', val: e.protein, c: 'text-emerald-400' },
                                                    { label: 'Carbs', val: e.carbs, c: 'text-amber-400' },
                                                    { label: 'Fat', val: e.fat, c: 'text-rose-400' },
                                                ].map(m => (
                                                    <div key={m.label} className="text-center">
                                                        <span className="text-[10px] text-zinc-500 block">{m.label}</span>
                                                        <span className={`text-sm font-semibold ${m.c}`}>{m.val}g</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Macro overview */}
                            <div className="space-y-2.5">
                                <MacroBar label="Protein" value={sum.protein} max={goals.protein} color="emerald" />
                                <MacroBar label="Carbs" value={sum.carbs} max={goals.carbs} color="amber" />
                                <MacroBar label="Fat" value={sum.fat} max={goals.fat} color="rose" />
                            </div>

                            {/* Micronutrients */}
                            <div className="pt-3 border-t border-zinc-800">
                                <h4 className="text-xs font-medium text-zinc-300 mb-2">Micronutrients</h4>
                                <div className="flex gap-1 mb-3">
                                    {['vitamins', 'minerals'].map(t => (
                                        <button key={t} onClick={() => setMicroTab(t)}
                                            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${microTab === t ? 'bg-amber-500/15 text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
                                                }`}>{t === 'vitamins' ? 'Vitamins' : 'Minerals'}</button>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    {micronutrientData[microTab].map(n => {
                                        const pct = Math.min((n.amount / n.dv) * 100, 100);
                                        return (
                                            <div key={n.name}>
                                                <div className="flex justify-between mb-0.5">
                                                    <span className="text-[11px] text-zinc-400">{n.name}</span>
                                                    <span className={`text-[11px] font-medium ${pct === 0 ? 'text-zinc-600' : pct >= 80 ? 'text-emerald-400' : 'text-zinc-300'}`}>
                                                        {n.amount}{n.unit} <span className="text-zinc-600">/ {n.dv}{n.unit}</span>
                                                    </span>
                                                </div>
                                                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full transition-all ${pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-zinc-600'}`}
                                                        style={{ width: `${pct}%` }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── Add Food Modal ───
const AddFoodModal = ({ date, onClose }) => {
    const [mode, setMode] = useState('ai');
    const [prompt, setPrompt] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [manualItems, setManualItems] = useState([{ food: '', quantity: '' }]);

    const dateObj = new Date(date + 'T12:00:00');
    const formatted = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    const handleSubmit = () => {
        setIsProcessing(true);
        setTimeout(() => { setIsProcessing(false); onClose(); }, 1500);
    };
    const addItem = () => setManualItems([...manualItems, { food: '', quantity: '' }]);
    const removeItem = (i) => setManualItems(manualItems.filter((_, idx) => idx !== i));
    const updateItem = (i, f, v) => { const u = [...manualItems]; u[i][f] = v; setManualItems(u); };
    const hasValid = manualItems.some(item => item.food.trim() && item.quantity.trim());

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center z-50" onClick={onClose}>
            <div className="bg-zinc-900 border border-zinc-800 sm:rounded-2xl rounded-t-2xl w-full sm:max-w-md max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-zinc-800 flex items-center justify-between flex-shrink-0">
                    <div>
                        <h2 className="text-base font-semibold text-white">Log Food</h2>
                        <p className="text-xs text-zinc-500">{formatted}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"><X className="w-4 h-4 text-zinc-400" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {mode === 'ai' ? (
                        <div className="space-y-3">
                            <div className="relative">
                                <textarea value={prompt} onChange={e => setPrompt(e.target.value)}
                                    placeholder={'Describe what you ate...\n\ne.g. "2 scrambled eggs with toast and a glass of orange juice"'}
                                    className="w-full h-32 bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm resize-none focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600" />
                                <Sparkles className="absolute bottom-3 right-3 w-3.5 h-3.5 text-zinc-600" />
                            </div>
                            <button onClick={handleSubmit} disabled={!prompt.trim() || isProcessing}
                                className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 disabled:text-zinc-500 text-black font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                                {isProcessing ? <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />Processing...</> : <><Sparkles className="w-4 h-4" />Analyze with AI</>}
                            </button>
                            <button onClick={() => setMode('manual')} className="w-full text-center text-[11px] text-zinc-500 hover:text-zinc-400 transition-colors py-1">
                                or enter items manually
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="space-y-2">
                                {manualItems.map((item, i) => (
                                    <div key={i} className="flex gap-2 items-start">
                                        <div className="flex-1 space-y-1.5">
                                            <input value={item.food} onChange={e => updateItem(i, 'food', e.target.value)}
                                                placeholder="Food name" className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-600" />
                                            <input value={item.quantity} onChange={e => updateItem(i, 'quantity', e.target.value)}
                                                placeholder="Quantity (e.g. 200g, 1 cup)" className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-600" />
                                        </div>
                                        {manualItems.length > 1 && (
                                            <button onClick={() => removeItem(i)} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors mt-1"><X className="w-3.5 h-3.5 text-zinc-500" /></button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button onClick={addItem} className="w-full py-2 border border-dashed border-zinc-700 rounded-xl text-xs text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-colors flex items-center justify-center gap-1">
                                <Plus className="w-3.5 h-3.5" />Add another item
                            </button>
                            <button onClick={handleSubmit} disabled={!hasValid || isProcessing}
                                className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 disabled:text-zinc-500 text-black font-semibold rounded-xl transition-colors text-sm">
                                {isProcessing ? 'Processing...' : 'Log Items'}
                            </button>
                            <button onClick={() => setMode('ai')} className="w-full text-center text-[11px] text-zinc-500 hover:text-zinc-400 transition-colors py-1 flex items-center justify-center gap-1">
                                <Sparkles className="w-3 h-3" />switch to AI input
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── Main App ───
export default function EatCleanDashboard() {
    const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDay, setSelectedDay] = useState(null);
    const [addingFoodDay, setAddingFoodDay] = useState(null);
    const [userMenu, setUserMenu] = useState(false);
    const [mobileView, setMobileView] = useState('timeline');

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

    const cells = [];
    for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEntries = sampleEntries[todayStr];

    const handleDayClick = (day) => {
        const ds = formatDate(year, month, day);
        const entries = sampleEntries[ds];
        if (entries) {
            setSelectedDay({ day, date: ds, entries });
        } else {
            setAddingFoodDay(ds);
        }
    };

    const handleTimelineDayClick = (dateStr) => {
        const entries = sampleEntries[dateStr];
        if (entries) setSelectedDay({ day: parseInt(dateStr.split('-')[2]), date: dateStr, entries });
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* ─── Header ─── */}
            <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
                            <span className="text-black font-bold text-sm">E</span>
                        </div>
                        <span className="font-semibold text-white text-sm hidden sm:block">EatClean</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Mobile: always show log food button in header */}
                        <button onClick={() => setAddingFoodDay(todayStr)}
                            className="sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold rounded-lg transition-colors flex">
                            <Plus className="w-3.5 h-3.5" /><span className="hidden sm:inline">Log Food</span>
                        </button>
                        <div className="relative">
                            <button onClick={() => setUserMenu(!userMenu)} className="w-8 h-8 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors">
                                <User className="w-4 h-4 text-zinc-400" />
                            </button>
                            {userMenu && (
                                <div className="absolute right-0 top-10 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl py-1 w-40 z-50">
                                    <button className="w-full px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 flex items-center gap-2 text-left"><Settings className="w-3.5 h-3.5 text-zinc-500" />Preferences</button>
                                    <button className="w-full px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 flex items-center gap-2 text-left"><LogOut className="w-3.5 h-3.5 text-zinc-500" />Sign Out</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* ─── Content ─── */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                <div className="flex flex-col xl:flex-row gap-6">

                    {/* Center - Main content area */}
                    <div className="flex-1 min-w-0">
                        {/* Mobile: View mode toggle + Today summary */}
                        <div className="xl:hidden space-y-3 mb-4">
                            <TodaySummaryWidget entries={todayEntries || []} />
                            <ViewModeToggle mode={mobileView} setMode={setMobileView} />
                        </div>

                        {/* Mobile: Timeline View */}
                        {mobileView === 'timeline' && (
                            <div className="xl:hidden">
                                <TimelineView entries={sampleEntries} onDayClick={handleTimelineDayClick} onAddFood={(d) => setAddingFoodDay(d)} />
                            </div>
                        )}

                        {/* Calendar View - always visible on xl, toggled on mobile */}
                        <div className={`${mobileView === 'calendar' ? 'block' : 'hidden'} xl:block`}>
                            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 sm:p-6">
                                <div className="flex items-center justify-between mb-4 sm:mb-5">
                                    <h2 className="text-base sm:text-lg font-semibold text-white">{monthName}</h2>
                                    <div className="flex gap-1">
                                        <button onClick={prevMonth} className="p-1.5 sm:p-2 hover:bg-zinc-800 rounded-lg transition-colors"><ChevLeft className="w-4 h-4 text-zinc-400" /></button>
                                        <button onClick={() => setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))}
                                            className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors font-medium">Today</button>
                                        <button onClick={nextMonth} className="p-1.5 sm:p-2 hover:bg-zinc-800 rounded-lg transition-colors"><ChevRight className="w-4 h-4 text-zinc-400" /></button>
                                    </div>
                                </div>

                                {/* Day headers */}
                                <div className="grid grid-cols-7 gap-1 mb-1 sm:mb-2">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                        <div key={i} className="text-center text-[10px] sm:text-xs text-zinc-500 font-medium py-1">
                                            <span className="sm:hidden">{d}</span>
                                            <span className="hidden sm:inline">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar grid - compact on mobile */}
                                <div className="grid grid-cols-7 gap-1">
                                    {cells.map((day, i) => {
                                        const ds = day ? formatDate(year, month, day) : null;
                                        const entries = ds ? sampleEntries[ds] : null;
                                        const summary = getDaySummary(entries);
                                        return (
                                            <div key={i} className="sm:hidden">
                                                <DayCell day={day} data={summary} isToday={isCurrentMonth && day === today.getDate()} onClick={handleDayClick} compact />
                                            </div>
                                        );
                                    })}
                                    {cells.map((day, i) => {
                                        const ds = day ? formatDate(year, month, day) : null;
                                        const entries = ds ? sampleEntries[ds] : null;
                                        const summary = getDaySummary(entries);
                                        return (
                                            <div key={`d-${i}`} className="hidden sm:block">
                                                <DayCell day={day} data={summary} isToday={isCurrentMonth && day === today.getDate()} onClick={handleDayClick} />
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 sm:mt-4 text-[10px] sm:text-xs text-zinc-500">
                                    <span className="flex items-center gap-1"><span className="w-2 sm:w-3 h-0.5 sm:h-1 bg-emerald-500 rounded-full" />Protein</span>
                                    <span className="flex items-center gap-1"><span className="w-2 sm:w-3 h-0.5 sm:h-1 bg-amber-500 rounded-full" />Carbs</span>
                                    <span className="flex items-center gap-1"><span className="w-2 sm:w-3 h-0.5 sm:h-1 bg-rose-500 rounded-full" />Fat</span>
                                </div>
                            </div>

                            {/* Mobile: below-calendar widgets (only when calendar view active) */}
                            <div className="xl:hidden grid sm:grid-cols-2 gap-3 mt-3">
                                <WeeklyTrendWidget />
                                <GoalsWidget />
                                <RecentMealsWidget entries={sampleEntries} />
                            </div>
                        </div>
                    </div>

                    {/* Right sidebar - desktop only */}
                    <aside className="hidden xl:flex flex-col gap-4 w-72 shrink-0">
                        <TodaySummaryWidget entries={todayEntries || []} />
                        <WeeklyTrendWidget />
                        <GoalsWidget />
                        <RecentMealsWidget entries={sampleEntries} />
                    </aside>
                </div>
            </main>

            {/* ─── Modals ─── */}
            {selectedDay && (
                <DaySummaryModal entries={selectedDay.entries} date={selectedDay.date} onClose={() => setSelectedDay(null)}
                    onAddEntry={() => { setSelectedDay(null); setAddingFoodDay(selectedDay.date); }} />
            )}
            {addingFoodDay && (
                <AddFoodModal date={addingFoodDay} onClose={() => setAddingFoodDay(null)} />
            )}
            {userMenu && <div className="fixed inset-0 z-30" onClick={() => setUserMenu(false)} />}
        </div>
    );
}