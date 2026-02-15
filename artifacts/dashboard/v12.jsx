import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Flame, Beef, Wheat, Droplets, Plus, Sparkles, Trash2, Check, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const sampleEntries = {
  '2026-01-11': [
    { id: 1, time: '8:30 AM', description: '2 scrambled eggs with toast', calories: 350, protein: 22, carbs: 28, fat: 18, sodium: 180, potassium: 420, calcium: 120, iron: 2, magnesium: 35, zinc: 2, vitaminA: 200, vitaminC: 0, vitaminD: 2, vitaminE: 1, vitaminK: 5, vitaminB1: 0.2, vitaminB2: 0.4, vitaminB3: 3, vitaminB6: 0.3, vitaminB9: 50, vitaminB12: 1 },
    { id: 2, time: '12:45 PM', description: 'Grilled chicken salad with olive oil dressing', calories: 420, protein: 45, carbs: 15, fat: 8, sodium: 210, potassium: 850, calcium: 180, iron: 2, magnesium: 65, zinc: 2, vitaminA: 450, vitaminC: 45, vitaminD: 0, vitaminE: 8, vitaminK: 85, vitaminB1: 0.2, vitaminB2: 0.2, vitaminB3: 12, vitaminB6: 0.8, vitaminB9: 120, vitaminB12: 0.4 },
    { id: 3, time: '7:00 PM', description: 'Salmon with steamed broccoli and rice', calories: 207, protein: 29, carbs: 42, fat: 3, sodium: 99, potassium: 1171, calcium: 219, iron: 0, magnesium: 88, zinc: 1, vitaminA: 250, vitaminC: 45, vitaminD: 13, vitaminE: 6, vitaminK: 30, vitaminB1: 0.8, vitaminB2: 0.7, vitaminB3: 1, vitaminB6: 0.6, vitaminB9: 230, vitaminB12: 1 },
  ],
  '2026-01-10': [
    { id: 1, time: '9:00 AM', description: 'Oatmeal with banana and almonds', calories: 380, protein: 12, carbs: 58, fat: 14, sodium: 150, potassium: 620, calcium: 80, iron: 3, magnesium: 90, zinc: 2, vitaminA: 0, vitaminC: 10, vitaminD: 0, vitaminE: 7, vitaminK: 0, vitaminB1: 0.4, vitaminB2: 0.2, vitaminB3: 2, vitaminB6: 0.5, vitaminB9: 30, vitaminB12: 0 },
    { id: 2, time: '1:00 PM', description: 'Turkey sandwich with avocado', calories: 520, protein: 35, carbs: 42, fat: 24, sodium: 680, potassium: 720, calcium: 120, iron: 3, magnesium: 55, zinc: 3, vitaminA: 80, vitaminC: 12, vitaminD: 0, vitaminE: 3, vitaminK: 25, vitaminB1: 0.3, vitaminB2: 0.3, vitaminB3: 8, vitaminB6: 0.6, vitaminB9: 80, vitaminB12: 1.2 },
    { id: 3, time: '4:00 PM', description: 'Greek yogurt with berries', calories: 180, protein: 15, carbs: 22, fat: 4, sodium: 60, potassium: 380, calcium: 200, iron: 0, magnesium: 25, zinc: 1, vitaminA: 100, vitaminC: 15, vitaminD: 2, vitaminE: 0, vitaminK: 10, vitaminB1: 0.1, vitaminB2: 0.3, vitaminB3: 0, vitaminB6: 0.1, vitaminB9: 20, vitaminB12: 1 },
    { id: 4, time: '7:30 PM', description: 'Beef stir fry with vegetables', calories: 580, protein: 42, carbs: 35, fat: 28, sodium: 820, potassium: 950, calcium: 80, iron: 5, magnesium: 60, zinc: 8, vitaminA: 600, vitaminC: 35, vitaminD: 0, vitaminE: 2, vitaminK: 45, vitaminB1: 0.2, vitaminB2: 0.4, vitaminB3: 9, vitaminB6: 0.7, vitaminB9: 60, vitaminB12: 3 },
    { id: 5, time: '9:00 PM', description: 'Protein shake', calories: 490, protein: 41, carbs: 63, fat: 8, sodium: 290, potassium: 530, calcium: 320, iron: 1, magnesium: 90, zinc: 2, vitaminA: 120, vitaminC: 18, vitaminD: 13, vitaminE: 3, vitaminK: 40, vitaminB1: 0.2, vitaminB2: 0.2, vitaminB3: 5, vitaminB6: 0.3, vitaminB9: 60, vitaminB12: 2.2 },
  ],
  '2026-01-09': [
    { id: 1, time: '8:00 AM', description: 'Smoothie bowl with granola', calories: 420, protein: 18, carbs: 65, fat: 12, sodium: 120, potassium: 680, calcium: 150, iron: 3, magnesium: 70, zinc: 2, vitaminA: 300, vitaminC: 60, vitaminD: 2, vitaminE: 4, vitaminK: 15, vitaminB1: 0.3, vitaminB2: 0.3, vitaminB3: 3, vitaminB6: 0.5, vitaminB9: 80, vitaminB12: 1 },
    { id: 2, time: '12:30 PM', description: 'Quinoa bowl with chickpeas', calories: 480, protein: 22, carbs: 68, fat: 14, sodium: 380, potassium: 720, calcium: 90, iron: 5, magnesium: 110, zinc: 3, vitaminA: 200, vitaminC: 15, vitaminD: 0, vitaminE: 2, vitaminK: 30, vitaminB1: 0.3, vitaminB2: 0.2, vitaminB3: 2, vitaminB6: 0.4, vitaminB9: 150, vitaminB12: 0 },
    { id: 3, time: '6:30 PM', description: 'Grilled fish tacos', calories: 520, protein: 38, carbs: 45, fat: 22, sodium: 650, potassium: 580, calcium: 180, iron: 2, magnesium: 55, zinc: 2, vitaminA: 150, vitaminC: 20, vitaminD: 8, vitaminE: 2, vitaminK: 20, vitaminB1: 0.2, vitaminB2: 0.2, vitaminB3: 6, vitaminB6: 0.5, vitaminB9: 70, vitaminB12: 2.5 },
  ],
  '2026-01-08': [
    { id: 1, time: '7:30 AM', description: 'Eggs benedict', calories: 680, protein: 32, carbs: 38, fat: 42, sodium: 920, potassium: 420, calcium: 200, iron: 3, magnesium: 40, zinc: 3, vitaminA: 350, vitaminC: 2, vitaminD: 3, vitaminE: 2, vitaminK: 10, vitaminB1: 0.3, vitaminB2: 0.5, vitaminB3: 4, vitaminB6: 0.3, vitaminB9: 60, vitaminB12: 1.5 },
    { id: 2, time: '1:00 PM', description: 'Caesar salad with grilled chicken', calories: 450, protein: 38, carbs: 18, fat: 26, sodium: 780, potassium: 650, calcium: 250, iron: 2, magnesium: 45, zinc: 2, vitaminA: 800, vitaminC: 30, vitaminD: 0, vitaminE: 5, vitaminK: 90, vitaminB1: 0.2, vitaminB2: 0.2, vitaminB3: 10, vitaminB6: 0.7, vitaminB9: 100, vitaminB12: 0.5 },
    { id: 3, time: '7:00 PM', description: 'Pasta with meat sauce', calories: 720, protein: 35, carbs: 85, fat: 28, sodium: 980, potassium: 850, calcium: 120, iron: 5, magnesium: 70, zinc: 5, vitaminA: 400, vitaminC: 15, vitaminD: 0, vitaminE: 2, vitaminK: 20, vitaminB1: 0.4, vitaminB2: 0.3, vitaminB3: 8, vitaminB6: 0.5, vitaminB9: 90, vitaminB12: 2.5 },
  ],
};

const getDaySummary = (entries) => {
  if (!entries) return null;
  return entries.reduce((acc, e) => ({
    calories: acc.calories + e.calories,
    protein: acc.protein + e.protein,
    carbs: acc.carbs + e.carbs,
    fat: acc.fat + e.fat,
    sodium: acc.sodium + (e.sodium || 0),
    potassium: acc.potassium + (e.potassium || 0),
    calcium: acc.calcium + (e.calcium || 0),
    iron: acc.iron + (e.iron || 0),
    magnesium: acc.magnesium + (e.magnesium || 0),
    zinc: acc.zinc + (e.zinc || 0),
    vitaminA: acc.vitaminA + (e.vitaminA || 0),
    vitaminC: acc.vitaminC + (e.vitaminC || 0),
    vitaminD: acc.vitaminD + (e.vitaminD || 0),
    vitaminE: acc.vitaminE + (e.vitaminE || 0),
    vitaminK: acc.vitaminK + (e.vitaminK || 0),
    vitaminB1: acc.vitaminB1 + (e.vitaminB1 || 0),
    vitaminB2: acc.vitaminB2 + (e.vitaminB2 || 0),
    vitaminB3: acc.vitaminB3 + (e.vitaminB3 || 0),
    vitaminB6: acc.vitaminB6 + (e.vitaminB6 || 0),
    vitaminB9: acc.vitaminB9 + (e.vitaminB9 || 0),
    vitaminB12: acc.vitaminB12 + (e.vitaminB12 || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0, sodium: 0, potassium: 0, calcium: 0, iron: 0, magnesium: 0, zinc: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0, vitaminB1: 0, vitaminB2: 0, vitaminB3: 0, vitaminB6: 0, vitaminB9: 0, vitaminB12: 0 });
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
                  className="w-full h-32 bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm resize-none focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                />
                <div className="absolute bottom-3 right-3">
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

function EntryCard({ entry, isExpanded, onToggle }) {
  return (
    <div className="bg-zinc-800/50 rounded-xl overflow-hidden">
      <button onClick={onToggle} className="w-full p-3 flex items-start gap-3 text-left hover:bg-zinc-800/70 transition-colors">
        <div className="flex items-center gap-1.5 text-zinc-500 text-xs mt-0.5 shrink-0">
          <Clock size={12} />
          {entry.time}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white truncate">{entry.description}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs font-medium text-orange-400">{entry.calories} kcal</span>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="text-emerald-400">{entry.protein}g P</span>
              <span className="text-amber-400">{entry.carbs}g C</span>
              <span className="text-rose-400">{entry.fat}g F</span>
            </div>
          </div>
        </div>
        {isExpanded ? <ChevronUp size={16} className="text-zinc-500 mt-1" /> : <ChevronDown size={16} className="text-zinc-500 mt-1" />}
      </button>
      {isExpanded && (
        <div className="px-3 pb-3 pt-0 border-t border-zinc-700/50">
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[
              { label: 'Calories', value: entry.calories, unit: 'kcal', color: 'text-orange-400' },
              { label: 'Protein', value: entry.protein, unit: 'g', color: 'text-emerald-400' },
              { label: 'Carbs', value: entry.carbs, unit: 'g', color: 'text-amber-400' },
              { label: 'Fat', value: entry.fat, unit: 'g', color: 'text-rose-400' },
            ].map(({ label, value, unit, color }) => (
              <div key={label} className="text-center p-2 bg-zinc-900/50 rounded-lg">
                <div className={`text-sm font-semibold ${color}`}>{value}</div>
                <div className="text-[10px] text-zinc-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DaySummaryModal({ entries, date, onClose, onAddEntry }) {
  const [expandedEntry, setExpandedEntry] = useState(null);
  const [viewMode, setViewMode] = useState('entries');
  
  const summary = getDaySummary(entries);
  const dateObj = new Date(date + 'T00:00:00');
  const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  
  const calPct = Math.round((summary.calories / goals.calories) * 100);
  
  const macros = [
    { label: 'Protein', value: summary.protein, unit: 'g', goal: goals.protein, color: 'emerald', icon: Beef },
    { label: 'Carbs', value: summary.carbs, unit: 'g', goal: goals.carbs, color: 'amber', icon: Wheat },
    { label: 'Fat', value: summary.fat, unit: 'g', goal: goals.fat, color: 'rose', icon: Droplets },
  ];
  
  const minerals = [
    { label: 'Sodium', value: summary.sodium, unit: 'mg' },
    { label: 'Potassium', value: summary.potassium, unit: 'mg' },
    { label: 'Calcium', value: summary.calcium, unit: 'mg' },
    { label: 'Iron', value: summary.iron, unit: 'mg' },
    { label: 'Magnesium', value: summary.magnesium, unit: 'mg' },
    { label: 'Zinc', value: summary.zinc, unit: 'mg' },
  ];
  
  const vitamins = [
    { label: 'Vitamin A', value: summary.vitaminA, unit: 'mcg' },
    { label: 'Vitamin C', value: summary.vitaminC, unit: 'mg' },
    { label: 'Vitamin D', value: summary.vitaminD, unit: 'mcg' },
    { label: 'Vitamin E', value: summary.vitaminE, unit: 'mg' },
    { label: 'Vitamin K', value: summary.vitaminK, unit: 'mcg' },
    { label: 'B1 (Thiamin)', value: Math.round(summary.vitaminB1 * 10) / 10, unit: 'mg' },
    { label: 'B2 (Riboflavin)', value: Math.round(summary.vitaminB2 * 10) / 10, unit: 'mg' },
    { label: 'B3 (Niacin)', value: summary.vitaminB3, unit: 'mg' },
    { label: 'B6', value: Math.round(summary.vitaminB6 * 10) / 10, unit: 'mg' },
    { label: 'B9 (Folate)', value: summary.vitaminB9, unit: 'mcg' },
    { label: 'B12', value: Math.round(summary.vitaminB12 * 10) / 10, unit: 'mcg' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-white">{formattedDate}</h2>
            <p className="text-sm text-zinc-500">{entries.length} entr{entries.length === 1 ? 'y' : 'ies'} logged</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <X size={20} className="text-zinc-400" />
          </button>
        </div>
        
        <div className="flex border-b border-zinc-800 shrink-0">
          <button
            onClick={() => setViewMode('entries')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${viewMode === 'entries' ? 'text-white border-b-2 border-emerald-500' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Entries
          </button>
          <button
            onClick={() => setViewMode('summary')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${viewMode === 'summary' ? 'text-white border-b-2 border-emerald-500' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Summary
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
          {viewMode === 'entries' ? (
            <div className="space-y-2">
              {entries.map((entry) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  isExpanded={expandedEntry === entry.id}
                  onToggle={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-800/30 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Flame size={20} className="text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">{summary.calories}</span>
                      <span className="text-zinc-500">/ {goals.calories} kcal</span>
                    </div>
                  </div>
                  <div className={`text-sm font-medium px-2 py-1 rounded-full ${calPct >= 90 && calPct <= 110 ? 'bg-emerald-500/20 text-emerald-400' : calPct < 90 ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {calPct}%
                  </div>
                </div>
                <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full" style={{ width: `${Math.min(calPct, 100)}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
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
              
              <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-2">Minerals</h3>
                <div className="grid grid-cols-2 gap-2">
                  {minerals.map(({ label, value, unit }) => (
                    <div key={label} className="flex justify-between items-center py-1.5 px-3 bg-zinc-800/30 rounded-lg">
                      <span className="text-sm text-zinc-400">{label}</span>
                      <span className={`text-sm font-medium ${value > 0 ? 'text-white' : 'text-zinc-600'}`}>{Math.round(value)} <span className="text-zinc-500">{unit}</span></span>
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
          )}
        </div>
        
        <div className="p-4 border-t border-zinc-800 shrink-0">
          <button
            onClick={onAddEntry}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Entry
          </button>
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
  const selectedEntries = selectedDate ? sampleEntries[selectedDate] : null;
  const addingFoodDate = addingFoodDay ? formatDate(year, month, addingFoodDay) : null;

  const handleDayClick = (day) => {
    const dateStr = formatDate(year, month, day);
    if (sampleEntries[dateStr]) {
      setSelectedDay(day);
    } else {
      setAddingFoodDay(day);
    }
  };
  
  const handleAddEntryFromSummary = () => {
    const day = selectedDay;
    setSelectedDay(null);
    setTimeout(() => setAddingFoodDay(day), 100);
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
          {days.map((day, i) => {
            const dateStr = day ? formatDate(year, month, day) : null;
            const entries = dateStr ? sampleEntries[dateStr] : null;
            const summary = getDaySummary(entries);
            return (
              <DayCell
                key={i}
                day={day}
                data={summary}
                isToday={isCurrentMonth && day === today.getDate()}
                onClick={handleDayClick}
              />
            );
          })}
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

      {selectedDay && selectedEntries && (
        <DaySummaryModal 
          entries={selectedEntries} 
          date={selectedDate} 
          onClose={() => setSelectedDay(null)}
          onAddEntry={handleAddEntryFromSummary}
        />
      )}
      
      {addingFoodDay && (
        <AddFoodModal date={addingFoodDate} onClose={() => setAddingFoodDay(null)} />
      )}
    </div>
  );
}