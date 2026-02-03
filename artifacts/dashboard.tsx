import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Flame, Beef, Wheat, Droplets, Plus, Sparkles, Trash2, Check } from 'lucide-react';

const sampleData = {
  '2026-01-11': { calories: 977, protein: 96, carbs: 85, fat: 29, sodium: 489, potassium: 2441, calcium: 519, iron: 4, magnesium: 188, zinc: 5, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0, vitaminB1: 0, vitaminB2: 0, vitaminB3: 0, vitaminB5: 0, vitaminB6: 0, vitaminB9: 0, vitaminB12: 0 },
  '2026-01-10': { calories: 2150, protein: 145, carbs: 220, fat: 78, sodium: 1200, potassium: 3200, calcium: 800, iron: 12, magnesium: 320, zinc: 11, vitaminA: 900, vitaminC: 90, vitaminD: 15, vitaminE: 15, vitaminK: 120, vitaminB1: 1.2, vitaminB2: 1.3, vitaminB3: 16, vitaminB5: 5, vitaminB6: 1.7, vitaminB9: 400, vitaminB12: 2.4 },
  '2026-01-09': { calories: 1820, protein: 120, carbs: 180, fat: 65, sodium: 980, potassium: 2800, calcium: 650, iron: 9, magnesium: 280, zinc: 9, vitaminA: 700, vitaminC: 75, vitaminD: 10, vitaminE: 12, vitaminK: 100, vitaminB1: 1, vitaminB2: 1.1, vitaminB3: 14, vitaminB5: 4, vitaminB6: 1.5, vitaminB9: 350, vitaminB12: 2 },
  '2026-01-08': { calories: 2340, protein: 160, carbs: 245, fat: 82, sodium: 1450, potassium: 3500, calcium: 900, iron: 14, magnesium: 350, zinc: 12, vitaminA: 1000, vitaminC: 100, vitaminD: 18, vitaminE: 18, vitaminK: 140, vitaminB1: 1.4, vitaminB2: 1.5, vitaminB3: 18, vitaminB5: 6, vitaminB6: 1.9, vitaminB9: 450, vitaminB12: 2.8 },
};

const goals = { calories: 2000, protein: 150, carbs: 250, fat: 65 };

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();
  const days = [];
  for (let i = 0; i < startingDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

function formatDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function MacroBar({ value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function DayCell({ day, data, isToday, onClick }) {
  if (!day) return <div className="aspect-square" />;
  const hasData = !!data;
  const calPct = hasData ? Math.round((data.calories / goals.calories) * 100) : 0;
  
  return (
    <button
      onClick={() => onClick(day)}
      className={`aspect-square p-1.5 sm:p-2 rounded-xl border transition-all text-left flex flex-col
        ${isToday ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/50'}
        ${hasData ? 'hover:bg-zinc-800/50' : 'hover:bg-zinc-900'}`}
    >
      <span className={`text-xs sm:text-sm font-medium ${isToday ? 'text-emerald-400' : 'text-zinc-400'}`}>{day}</span>
      {hasData && (
        <div className="flex-1 flex flex-col justify-end gap-1 mt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-sm sm:text-lg font-semibold text-white">{data.calories}</span>
            <span className="text-[10px] text-zinc-500 hidden sm:inline">kcal</span>
          </div>
          <div className="space-y-0.5 hidden sm:block">
            <MacroBar value={data.protein} max={goals.protein} color="bg-emerald-500" />
            <MacroBar value={data.carbs} max={goals.carbs} color="bg-amber-500" />
            <MacroBar value={data.fat} max={goals.fat} color="bg-rose-500" />
          </div>
          <div className="flex gap-0.5 sm:hidden">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          </div>
        </div>
      )}
      {!hasData && (
        <div className="flex-1 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Plus size={16} className="text-zinc-600" />
        </div>
      )}
    </button>
  );
}

function AddFoodModal({ date, onClose }) {
  const [mode, setMode] = useState('ai');
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [manualItems, setManualItems] = useState([{ food: '', quantity: '' }]);
  
  const dateObj = new Date(date + 'T00:00:00');
  const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  
  const handleSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
    }, 1500);
  };
  
  const addManualItem = () => setManualItems([...manualItems, { food: '', quantity: '' }]);
  const removeManualItem = (i) => setManualItems(manualItems.filter((_, idx) => idx !== i));
  const updateManualItem = (i, field, value) => {
    const updated = [...manualItems];
    updated[i][field] = value;
    setManualItems(updated);
  };
  
  const hasValidManualItems = manualItems.some(item => item.food.trim() && item.quantity.trim());

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Log Food</h2>
            <p className="text-sm text-zinc-500">{formattedDate}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <X size={20} className="text-zinc-400" />
          </button>
        </div>
        
        <div className="p-4">
          {mode === 'ai' ? (
            <div className="space-y-3">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you ate...

e.g. &quot;2 scrambled eggs with toast and a glass of orange juice&quot; or &quot;chicken salad with about 150g grilled chicken, mixed greens, tomatoes, and olive oil dressing&quot;"
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm resize-none focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <Sparkles size={14} className="text-zinc-600" />
                </div>
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={!prompt.trim() || isProcessing}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Log with AI
                  </>
                )}
              </button>
              
              <button
                onClick={() => setMode('manual')}
                className="w-full text-center text-xs text-zinc-500 hover:text-zinc-400 transition-colors py-1"
              >
                or enter items manually
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {manualItems.map((item, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={item.food}
                        onChange={(e) => updateManualItem(i, 'food', e.target.value)}
                        placeholder="Food name (e.g. chicken breast)"
                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-600"
                      />
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) => updateManualItem(i, 'quantity', e.target.value)}
                        placeholder="Quantity (e.g. 150g, 1 cup, 2 pieces)"
                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-600"
                      />
                    </div>
                    {manualItems.length > 1 && (
                      <button
                        onClick={() => removeManualItem(i)}
                        className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors mt-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <button
                onClick={addManualItem}
                className="w-full py-2 border border-dashed border-zinc-700 hover:border-zinc-600 text-zinc-400 hover:text-zinc-300 text-sm rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus size={14} />
                Add another item
              </button>
              
              <button
                onClick={handleSubmit}
                disabled={!hasValidManualItems || isProcessing}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Log {manualItems.filter(i => i.food.trim() && i.quantity.trim()).length || ''} Item{manualItems.filter(i => i.food.trim() && i.quantity.trim()).length !== 1 ? 's' : ''}
                  </>
                )}
              </button>
              
              <button
                onClick={() => setMode('ai')}
                className="w-full text-center text-xs text-zinc-500 hover:text-zinc-400 transition-colors py-1 flex items-center justify-center gap-1"
              >
                <Sparkles size={12} />
                use AI input instead
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryModal({ data, date, onClose }) {
  if (!data) return null;
  
  const macros = [
    { label: 'Protein', value: data.protein, unit: 'g', goal: goals.protein, color: 'emerald', icon: Beef },
    { label: 'Carbs', value: data.carbs, unit: 'g', goal: goals.carbs, color: 'amber', icon: Wheat },
    { label: 'Fat', value: data.fat, unit: 'g', goal: goals.fat, color: 'rose', icon: Droplets },
  ];
  
  const minerals = [
    { label: 'Sodium', value: data.sodium, unit: 'mg' },
    { label: 'Potassium', value: data.potassium, unit: 'mg' },
    { label: 'Calcium', value: data.calcium, unit: 'mg' },
    { label: 'Iron', value: data.iron, unit: 'mg' },
    { label: 'Magnesium', value: data.magnesium, unit: 'mg' },
    { label: 'Zinc', value: data.zinc, unit: 'mg' },
  ];
  
  const vitamins = [
    { label: 'Vitamin A', value: data.vitaminA, unit: 'mcg' },
    { label: 'Vitamin C', value: data.vitaminC, unit: 'mg' },
    { label: 'Vitamin D', value: data.vitaminD, unit: 'mcg' },
    { label: 'Vitamin E', value: data.vitaminE, unit: 'mg' },
    { label: 'Vitamin K', value: data.vitaminK, unit: 'mcg' },
    { label: 'B1 (Thiamin)', value: data.vitaminB1, unit: 'mg' },
    { label: 'B2 (Riboflavin)', value: data.vitaminB2, unit: 'mg' },
    { label: 'B3 (Niacin)', value: data.vitaminB3, unit: 'mg' },
    { label: 'B6', value: data.vitaminB6, unit: 'mg' },
    { label: 'B9 (Folate)', value: data.vitaminB9, unit: 'mcg' },
    { label: 'B12', value: data.vitaminB12, unit: 'mcg' },
  ];

  const calPct = Math.round((data.calories / goals.calories) * 100);
  const dateObj = new Date(date + 'T00:00:00');
  const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">{formattedDate}</h2>
            <p className="text-sm text-zinc-500">Daily Summary</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <X size={20} className="text-zinc-400" />
          </button>
        </div>
        
        <div className="p-5 overflow-y-auto max-h-[calc(85vh-80px)]">
          <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-800/30 rounded-xl p-4 mb-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Flame size={20} className="text-orange-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">{data.calories}</span>
                  <span className="text-zinc-500">/ {goals.calories} kcal</span>
                </div>
              </div>
              <div className={`text-sm font-medium px-2 py-1 rounded-full ${calPct >= 90 && calPct <= 110 ? 'bg-emerald-500/20 text-emerald-400' : calPct < 90 ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'}`}>
                {calPct}%
              </div>
            </div>
            <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all" style={{ width: `${Math.min(calPct, 100)}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {macros.map(({ label, value, unit, goal, color, icon: Icon }) => {
              const pct = Math.round((value / goal) * 100);
              const colors = {
                emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', bar: 'bg-emerald-500' },
                amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', bar: 'bg-amber-500' },
                rose: { bg: 'bg-rose-500/20', text: 'text-rose-400', bar: 'bg-rose-500' },
              }[color];
              return (
                <div key={label} className="bg-zinc-800/50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 ${colors.bg} rounded-md`}>
                      <Icon size={14} className={colors.text} />
                    </div>
                    <span className="text-xs text-zinc-400">{label}</span>
                  </div>
                  <div className="text-xl font-semibold text-white mb-1">{value}<span className="text-sm text-zinc-500 ml-0.5">{unit}</span></div>
                  <div className="h-1 bg-zinc-700 rounded-full overflow-hidden">
                    <div className={`h-full ${colors.bar} rounded-full`} style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{pct}% of {goal}{unit}</div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-2">Minerals</h3>
              <div className="grid grid-cols-2 gap-2">
                {minerals.map(({ label, value, unit }) => (
                  <div key={label} className="flex justify-between items-center py-1.5 px-3 bg-zinc-800/30 rounded-lg">
                    <span className="text-sm text-zinc-400">{label}</span>
                    <span className="text-sm font-medium text-white">{value} <span className="text-zinc-500">{unit}</span></span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-2">Vitamins</h3>
              <div className="grid grid-cols-2 gap-2">
                {vitamins.map(({ label, value, unit }) => (
                  <div key={label} className="flex justify-between items-center py-1.5 px-3 bg-zinc-800/30 rounded-lg">
                    <span className="text-sm text-zinc-400">{label}</span>
                    <span className={`text-sm font-medium ${value > 0 ? 'text-white' : 'text-zinc-600'}`}>{value} <span className="text-zinc-500">{unit}</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 12));
  const [selectedDay, setSelectedDay] = useState(null);
  const [addingFoodDay, setAddingFoodDay] = useState(null);
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getCalendarDays(year, month);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const prevMonth = () => setCurrentDate(new Date(year, month - 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1));
  
  const selectedDate = selectedDay ? formatDate(year, month, selectedDay) : null;
  const selectedData = selectedDate ? sampleData[selectedDate] : null;
  const addingFoodDate = addingFoodDay ? formatDate(year, month, addingFoodDay) : null;

  const handleDayClick = (day) => {
    const dateStr = formatDate(year, month, day);
    if (sampleData[dateStr]) {
      setSelectedDay(day);
    } else {
      setAddingFoodDay(day);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">{monthName}</h1>
          <div className="flex items-center gap-1">
            <button onClick={prevMonth} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
              <ChevronLeft size={20} className="text-zinc-400" />
            </button>
            <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
              Today
            </button>
            <button onClick={nextMonth} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
              <ChevronRight size={20} className="text-zinc-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map(day => (
            <div key={day} className="text-center text-xs font-medium text-zinc-500 py-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {days.map((day, i) => (
            <DayCell
              key={i}
              day={day}
              data={day ? sampleData[formatDate(year, month, day)] : null}
              isToday={isCurrentMonth && day === today.getDate()}
              onClick={handleDayClick}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1 bg-emerald-500 rounded-full" />
            <span>Protein</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1 bg-amber-500 rounded-full" />
            <span>Carbs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1 bg-rose-500 rounded-full" />
            <span>Fat</span>
          </div>
        </div>
      </div>

      {selectedDay && (
        <SummaryModal data={selectedData} date={selectedDate} onClose={() => setSelectedDay(null)} />
      )}
      
      {addingFoodDay && (
        <AddFoodModal date={addingFoodDate} onClose={() => setAddingFoodDay(null)} />
      )}
    </div>
  );
}