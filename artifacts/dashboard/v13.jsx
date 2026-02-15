import { useState, useRef, useEffect } from "react";

// ─── Icons ───
const Icon = ({ d, className = "w-4 h-4", strokeWidth = 2 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>{typeof d === 'string' ? <path d={d} /> : d}</svg>
);
const ChevLeft = (p) => <Icon d="m15 18-6-6 6-6" {...p} />;
const ChevRight = (p) => <Icon d="m9 18 6-6-6-6" {...p} />;
const ChevDown = (p) => <Icon d="m6 9 6 6 6-6" {...p} />;
const ChevUp = (p) => <Icon d="m18 15-6-6-6 6" {...p} />;
const XIcon = (p) => <Icon d={<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>} {...p} />;
const PlusIcon = (p) => <Icon d={<><path d="M5 12h14" /><path d="M12 5v14" /></>} {...p} />;
const Flame = (p) => <Icon d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" {...p} />;
const Beef = (p) => <Icon d={<><circle cx="12.5" cy="8.5" r="2.5" /><path d="M12.5 2a6.5 6.5 0 0 0-6.5 6.5c0 3.5 2 5 4 6.5s4 3 4 6.5a6.5 6.5 0 0 0 6.5-6.5c0-3.5-2-5-4-6.5S12.5 5.5 12.5 2Z" /></>} {...p} />;
const Wheat = (p) => <Icon d={<><path d="M2 22 16 8" /><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" /><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" /><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" /><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" /><path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" /><path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" /><path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" /></>} {...p} />;
const Droplets = (p) => <Icon d={<><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" /><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" /></>} {...p} />;
const Sparkles = (p) => <Icon d={<><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></>} {...p} />;
const Check = (p) => <Icon d="M20 6 9 17l-5-5" strokeWidth={2.5} {...p} />;
const Trash = (p) => <Icon d={<><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></>} {...p} />;
const Clock = (p) => <Icon d={<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>} {...p} />;
const Leaf = (p) => <Icon d={<><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 1c1 2 2 4.5 2 8 0 5.5-4.5 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></>} {...p} />;
const TrendUp = (p) => <Icon d={<><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></>} {...p} />;
const Target = (p) => <Icon d={<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>} {...p} />;
const User = (p) => <Icon d={<><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>} {...p} />;
const LogOut = (p) => <Icon d={<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></>} {...p} />;
const Settings = (p) => <Icon d={<><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></>} {...p} />;

// ─── Data ───
const goals = { calories: 2200, protein: 150, carbs: 250, fat: 67 };

const sampleEntries = {
    '2026-02-03': [
        { id: 1, time: '8:30 AM', description: 'Oatmeal with banana and almonds', calories: 380, protein: 12, carbs: 58, fat: 14, sodium: 10, potassium: 420, calcium: 80, iron: 3, magnesium: 60, zinc: 2, vitaminA: 5, vitaminC: 10, vitaminD: 0, vitaminE: 3, vitaminK: 2, vitaminB1: 0.3, vitaminB2: 0.1, vitaminB3: 1, vitaminB6: 0.4, vitaminB9: 30, vitaminB12: 0 },
        { id: 2, time: '1:00 PM', description: 'Grilled chicken salad with olive oil dressing', calories: 420, protein: 45, carbs: 15, fat: 8, sodium: 580, potassium: 650, calcium: 120, iron: 2, magnesium: 45, zinc: 3, vitaminA: 800, vitaminC: 30, vitaminD: 0, vitaminE: 5, vitaminK: 90, vitaminB1: 0.2, vitaminB2: 0.2, vitaminB3: 10, vitaminB6: 0.7, vitaminB9: 100, vitaminB12: 0.5 },
        { id: 3, time: '7:00 PM', description: 'Salmon with steamed broccoli and rice', calories: 520, protein: 38, carbs: 42, fat: 18, sodium: 380, potassium: 780, calcium: 100, iron: 2, magnesium: 55, zinc: 2, vitaminA: 200, vitaminC: 65, vitaminD: 15, vitaminE: 3, vitaminK: 120, vitaminB1: 0.3, vitaminB2: 0.4, vitaminB3: 8, vitaminB6: 0.8, vitaminB9: 90, vitaminB12: 4 },
    ],
    '2026-02-04': [
        { id: 1, time: '9:00 AM', description: '2 scrambled eggs with toast', calories: 350, protein: 22, carbs: 28, fat: 18, sodium: 420, potassium: 200, calcium: 80, iron: 2, magnesium: 20, zinc: 2, vitaminA: 300, vitaminC: 0, vitaminD: 2, vitaminE: 1, vitaminK: 5, vitaminB1: 0.2, vitaminB2: 0.4, vitaminB3: 3, vitaminB6: 0.2, vitaminB9: 50, vitaminB12: 1 },
        { id: 2, time: '12:45 PM', description: 'Turkey sandwich with avocado', calories: 520, protein: 35, carbs: 42, fat: 24, sodium: 780, potassium: 550, calcium: 100, iron: 3, magnesium: 40, zinc: 3, vitaminA: 100, vitaminC: 12, vitaminD: 0, vitaminE: 3, vitaminK: 25, vitaminB1: 0.3, vitaminB2: 0.3, vitaminB3: 8, vitaminB6: 0.5, vitaminB9: 80, vitaminB12: 1.5 },
        { id: 3, time: '4:00 PM', description: 'Greek yogurt with berries', calories: 180, protein: 15, carbs: 22, fat: 4, sodium: 60, potassium: 300, calcium: 200, iron: 0, magnesium: 20, zinc: 1, vitaminA: 50, vitaminC: 15, vitaminD: 0, vitaminE: 1, vitaminK: 5, vitaminB1: 0.1, vitaminB2: 0.3, vitaminB3: 1, vitaminB6: 0.1, vitaminB9: 20, vitaminB12: 1 },
        { id: 4, time: '7:30 PM', description: 'Beef stir fry with vegetables', calories: 580, protein: 42, carbs: 35, fat: 28, sodium: 920, potassium: 700, calcium: 80, iron: 5, magnesium: 50, zinc: 6, vitaminA: 600, vitaminC: 40, vitaminD: 0, vitaminE: 2, vitaminK: 40, vitaminB1: 0.2, vitaminB2: 0.3, vitaminB3: 8, vitaminB6: 0.6, vitaminB9: 60, vitaminB12: 3 },
    ],
    '2026-02-05': [
        { id: 1, time: '8:00 AM', description: 'Smoothie bowl with granola', calories: 420, protein: 18, carbs: 65, fat: 12, sodium: 50, potassium: 500, calcium: 150, iron: 2, magnesium: 50, zinc: 2, vitaminA: 100, vitaminC: 45, vitaminD: 0, vitaminE: 4, vitaminK: 15, vitaminB1: 0.2, vitaminB2: 0.2, vitaminB3: 2, vitaminB6: 0.5, vitaminB9: 60, vitaminB12: 0 },
        { id: 2, time: '12:30 PM', description: 'Quinoa bowl with chickpeas', calories: 480, protein: 22, carbs: 68, fat: 14, sodium: 380, potassium: 600, calcium: 100, iron: 5, magnesium: 80, zinc: 3, vitaminA: 200, vitaminC: 20, vitaminD: 0, vitaminE: 2, vitaminK: 30, vitaminB1: 0.3, vitaminB2: 0.2, vitaminB3: 3, vitaminB6: 0.4, vitaminB9: 120, vitaminB12: 0 },
        { id: 3, time: '6:30 PM', description: 'Grilled fish tacos', calories: 520, protein: 38, carbs: 45, fat: 22, sodium: 650, potassium: 450, calcium: 120, iron: 2, magnesium: 40, zinc: 2, vitaminA: 150, vitaminC: 15, vitaminD: 5, vitaminE: 2, vitaminK: 10, vitaminB1: 0.2, vitaminB2: 0.2, vitaminB3: 6, vitaminB6: 0.4, vitaminB9: 50, vitaminB12: 2 },
    ],
    '2026-02-06': [
        { id: 1, time: '7:30 AM', description: 'Eggs benedict', calories: 680, protein: 32, carbs: 38, fat: 42, sodium: 920, potassium: 420, calcium: 200, iron: 3, magnesium: 40, zinc: 3, vitaminA: 350, vitaminC: 2, vitaminD: 3, vitaminE: 2, vitaminK: 10, vitaminB1: 0.3, vitaminB2: 0.5, vitaminB3: 4, vitaminB6: 0.3, vitaminB9: 60, vitaminB12: 1.5 },
        { id: 2, time: '1:00 PM', description: 'Caesar salad with grilled chicken', calories: 450, protein: 38, carbs: 18, fat: 26, sodium: 780, potassium: 650, calcium: 250, iron: 2, magnesium: 45, zinc: 2, vitaminA: 800, vitaminC: 30, vitaminD: 0, vitaminE: 5, vitaminK: 90, vitaminB1: 0.2, vitaminB2: 0.2, vitaminB3: 10, vitaminB6: 0.7, vitaminB9: 100, vitaminB12: 0.5 },
        { id: 3, time: '7:00 PM', description: 'Pasta with meat sauce', calories: 720, protein: 35, carbs: 85, fat: 28, sodium: 980, potassium: 850, calcium: 120, iron: 5, magnesium: 70, zinc: 5, vitaminA: 400, vitaminC: 15, vitaminD: 0, vitaminE: 2, vitaminK: 20, vitaminB1: 0.4, vitaminB2: 0.3, vitaminB3: 8, vitaminB6: 0.5, vitaminB9: 90, vitaminB12: 2.5 },
    ],
    '2026-02-07': [
        { id: 1, time: '8:00 AM', description: 'Protein pancakes with maple syrup', calories: 450, protein: 30, carbs: 55, fat: 12, sodium: 380, potassium: 300, calcium: 150, iron: 2, magnesium: 30, zinc: 2, vitaminA: 100, vitaminC: 0, vitaminD: 1, vitaminE: 1, vitaminK: 3, vitaminB1: 0.2, vitaminB2: 0.3, vitaminB3: 2, vitaminB6: 0.2, vitaminB9: 40, vitaminB12: 0.5 },
        { id: 2, time: '1:00 PM', description: 'Tuna poke bowl', calories: 510, protein: 40, carbs: 50, fat: 15, sodium: 720, potassium: 550, calcium: 60, iron: 3, magnesium: 55, zinc: 2, vitaminA: 300, vitaminC: 10, vitaminD: 5, vitaminE: 2, vitaminK: 15, vitaminB1: 0.3, vitaminB2: 0.2, vitaminB3: 12, vitaminB6: 0.6, vitaminB9: 30, vitaminB12: 3 },
    ],
    '2026-02-08': [
        { id: 1, time: '9:30 AM', description: 'Avocado toast with poached eggs', calories: 420, protein: 18, carbs: 30, fat: 28, sodium: 350, potassium: 500, calcium: 60, iron: 2, magnesium: 35, zinc: 1, vitaminA: 200, vitaminC: 10, vitaminD: 2, vitaminE: 4, vitaminK: 30, vitaminB1: 0.2, vitaminB2: 0.3, vitaminB3: 2, vitaminB6: 0.3, vitaminB9: 80, vitaminB12: 0.8 },
        { id: 2, time: '1:30 PM', description: 'Lentil soup with bread', calories: 380, protein: 20, carbs: 55, fat: 8, sodium: 680, potassium: 600, calcium: 60, iron: 5, magnesium: 60, zinc: 2, vitaminA: 400, vitaminC: 15, vitaminD: 0, vitaminE: 1, vitaminK: 10, vitaminB1: 0.3, vitaminB2: 0.2, vitaminB3: 3, vitaminB6: 0.4, vitaminB9: 150, vitaminB12: 0 },
        { id: 3, time: '7:00 PM', description: 'Grilled lamb chops with roasted vegetables', calories: 650, protein: 45, carbs: 25, fat: 42, sodium: 500, potassium: 700, calcium: 80, iron: 4, magnesium: 45, zinc: 5, vitaminA: 500, vitaminC: 30, vitaminD: 0, vitaminE: 3, vitaminK: 50, vitaminB1: 0.2, vitaminB2: 0.3, vitaminB3: 8, vitaminB6: 0.4, vitaminB9: 40, vitaminB12: 3 },
    ],
    '2026-02-09': [
        { id: 1, time: '8:00 AM', description: 'Cottage cheese with pineapple', calories: 220, protein: 24, carbs: 18, fat: 5, sodium: 400, potassium: 200, calcium: 150, iron: 0, magnesium: 15, zinc: 1, vitaminA: 50, vitaminC: 40, vitaminD: 0, vitaminE: 0, vitaminK: 3, vitaminB1: 0.1, vitaminB2: 0.2, vitaminB3: 0, vitaminB6: 0.1, vitaminB9: 20, vitaminB12: 0.5 },
        { id: 2, time: '12:00 PM', description: 'Chicken burrito bowl', calories: 620, protein: 42, carbs: 60, fat: 22, sodium: 850, potassium: 600, calcium: 200, iron: 4, magnesium: 60, zinc: 4, vitaminA: 300, vitaminC: 25, vitaminD: 0, vitaminE: 2, vitaminK: 20, vitaminB1: 0.3, vitaminB2: 0.3, vitaminB3: 10, vitaminB6: 0.6, vitaminB9: 80, vitaminB12: 1 },
        { id: 3, time: '6:00 PM', description: 'Baked cod with sweet potato', calories: 450, protein: 35, carbs: 45, fat: 12, sodium: 350, potassium: 800, calcium: 60, iron: 2, magnesium: 50, zinc: 1, vitaminA: 1200, vitaminC: 20, vitaminD: 8, vitaminE: 2, vitaminK: 5, vitaminB1: 0.2, vitaminB2: 0.1, vitaminB3: 5, vitaminB6: 0.5, vitaminB9: 40, vitaminB12: 2 },
    ],
    '2026-02-10': [
        { id: 1, time: '8:30 AM', description: 'Whole grain cereal with milk', calories: 300, protein: 10, carbs: 50, fat: 6, sodium: 250, potassium: 350, calcium: 300, iron: 8, magnesium: 40, zinc: 3, vitaminA: 250, vitaminC: 0, vitaminD: 3, vitaminE: 2, vitaminK: 2, vitaminB1: 0.5, vitaminB2: 0.5, vitaminB3: 6, vitaminB6: 0.6, vitaminB9: 150, vitaminB12: 2 },
        { id: 2, time: '12:30 PM', description: 'Shrimp stir fry with noodles', calories: 480, protein: 30, carbs: 55, fat: 16, sodium: 900, potassium: 400, calcium: 80, iron: 3, magnesium: 40, zinc: 2, vitaminA: 200, vitaminC: 20, vitaminD: 0, vitaminE: 2, vitaminK: 15, vitaminB1: 0.2, vitaminB2: 0.1, vitaminB3: 4, vitaminB6: 0.3, vitaminB9: 40, vitaminB12: 1.5 },
        { id: 3, time: '7:00 PM', description: 'Chicken tikka with naan and raita', calories: 680, protein: 40, carbs: 60, fat: 30, sodium: 800, potassium: 500, calcium: 150, iron: 3, magnesium: 40, zinc: 3, vitaminA: 300, vitaminC: 10, vitaminD: 0, vitaminE: 1, vitaminK: 10, vitaminB1: 0.3, vitaminB2: 0.3, vitaminB3: 8, vitaminB6: 0.5, vitaminB9: 50, vitaminB12: 1 },
    ],
    '2026-02-11': [
        { id: 1, time: '7:30 AM', description: 'Boiled eggs and fruit salad', calories: 280, protein: 18, carbs: 30, fat: 10, sodium: 180, potassium: 400, calcium: 60, iron: 1, magnesium: 25, zinc: 1, vitaminA: 200, vitaminC: 50, vitaminD: 2, vitaminE: 2, vitaminK: 10, vitaminB1: 0.1, vitaminB2: 0.3, vitaminB3: 1, vitaminB6: 0.2, vitaminB9: 40, vitaminB12: 1 },
        { id: 2, time: '1:00 PM', description: 'Mediterranean wrap with hummus', calories: 420, protein: 18, carbs: 50, fat: 18, sodium: 650, potassium: 350, calcium: 80, iron: 3, magnesium: 40, zinc: 2, vitaminA: 300, vitaminC: 15, vitaminD: 0, vitaminE: 3, vitaminK: 40, vitaminB1: 0.2, vitaminB2: 0.1, vitaminB3: 3, vitaminB6: 0.3, vitaminB9: 60, vitaminB12: 0 },
        { id: 3, time: '7:30 PM', description: 'Steak with mashed potatoes and asparagus', calories: 750, protein: 50, carbs: 45, fat: 40, sodium: 600, potassium: 900, calcium: 60, iron: 5, magnesium: 55, zinc: 7, vitaminA: 400, vitaminC: 20, vitaminD: 0, vitaminE: 2, vitaminK: 80, vitaminB1: 0.3, vitaminB2: 0.4, vitaminB3: 12, vitaminB6: 0.8, vitaminB9: 120, vitaminB12: 4 },
    ],
    '2026-02-12': [
        { id: 1, time: '8:00 AM', description: 'Peanut butter banana smoothie', calories: 350, protein: 15, carbs: 45, fat: 14, sodium: 150, potassium: 550, calcium: 100, iron: 1, magnesium: 60, zinc: 1, vitaminA: 30, vitaminC: 15, vitaminD: 0, vitaminE: 3, vitaminK: 2, vitaminB1: 0.1, vitaminB2: 0.2, vitaminB3: 3, vitaminB6: 0.5, vitaminB9: 30, vitaminB12: 0.5 },
        { id: 2, time: '12:00 PM', description: 'Grilled chicken wrap', calories: 450, protein: 35, carbs: 40, fat: 16, sodium: 700, potassium: 400, calcium: 100, iron: 2, magnesium: 35, zinc: 2, vitaminA: 150, vitaminC: 10, vitaminD: 0, vitaminE: 2, vitaminK: 20, vitaminB1: 0.2, vitaminB2: 0.2, vitaminB3: 8, vitaminB6: 0.5, vitaminB9: 50, vitaminB12: 0.5 },
    ],
    '2026-02-13': [
        { id: 1, time: '8:30 AM', description: 'French toast with berries', calories: 400, protein: 12, carbs: 55, fat: 16, sodium: 350, potassium: 250, calcium: 100, iron: 2, magnesium: 20, zinc: 1, vitaminA: 150, vitaminC: 20, vitaminD: 1, vitaminE: 1, vitaminK: 5, vitaminB1: 0.2, vitaminB2: 0.3, vitaminB3: 2, vitaminB6: 0.1, vitaminB9: 40, vitaminB12: 0.5 },
        { id: 2, time: '1:00 PM', description: 'Falafel plate with tabbouleh', calories: 550, protein: 20, carbs: 65, fat: 24, sodium: 700, potassium: 500, calcium: 120, iron: 4, magnesium: 60, zinc: 2, vitaminA: 300, vitaminC: 25, vitaminD: 0, vitaminE: 3, vitaminK: 100, vitaminB1: 0.3, vitaminB2: 0.2, vitaminB3: 3, vitaminB6: 0.4, vitaminB9: 100, vitaminB12: 0 },
        { id: 3, time: '7:00 PM', description: 'Roasted chicken with vegetables', calories: 580, protein: 45, carbs: 30, fat: 32, sodium: 500, potassium: 700, calcium: 60, iron: 2, magnesium: 40, zinc: 3, vitaminA: 500, vitaminC: 30, vitaminD: 0, vitaminE: 2, vitaminK: 50, vitaminB1: 0.2, vitaminB2: 0.3, vitaminB3: 12, vitaminB6: 0.7, vitaminB9: 40, vitaminB12: 1 },
    ],
    '2026-02-14': [
        { id: 1, time: '9:00 AM', description: 'Açaí bowl', calories: 350, protein: 8, carbs: 55, fat: 12, sodium: 30, potassium: 400, calcium: 80, iron: 2, magnesium: 40, zinc: 1, vitaminA: 100, vitaminC: 30, vitaminD: 0, vitaminE: 3, vitaminK: 5, vitaminB1: 0.1, vitaminB2: 0.1, vitaminB3: 1, vitaminB6: 0.3, vitaminB9: 25, vitaminB12: 0 },
        { id: 2, time: '12:30 PM', description: 'Lobster bisque with sourdough', calories: 480, protein: 22, carbs: 40, fat: 26, sodium: 950, potassium: 350, calcium: 120, iron: 1, magnesium: 30, zinc: 2, vitaminA: 400, vitaminC: 5, vitaminD: 0, vitaminE: 2, vitaminK: 8, vitaminB1: 0.2, vitaminB2: 0.2, vitaminB3: 3, vitaminB6: 0.2, vitaminB9: 30, vitaminB12: 1 },
        { id: 3, time: '7:30 PM', description: 'Filet mignon with truffle risotto', calories: 850, protein: 45, carbs: 60, fat: 48, sodium: 700, potassium: 600, calcium: 100, iron: 4, magnesium: 40, zinc: 6, vitaminA: 200, vitaminC: 5, vitaminD: 0, vitaminE: 1, vitaminK: 10, vitaminB1: 0.3, vitaminB2: 0.4, vitaminB3: 10, vitaminB6: 0.6, vitaminB9: 50, vitaminB12: 4 },
    ],
};

const formatDate = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

const getDaySummary = (entries) => {
    if (!entries) return null;
    return entries.reduce((a, e) => {
        const keys = Object.keys(a);
        const r = {};
        keys.forEach(k => r[k] = a[k] + (e[k] || 0));
        return r;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, sodium: 0, potassium: 0, calcium: 0, iron: 0, magnesium: 0, zinc: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0, vitaminB1: 0, vitaminB2: 0, vitaminB3: 0, vitaminB6: 0, vitaminB9: 0, vitaminB12: 0 });
};

// ─── Small Components ───
const MacroBar = ({ value, max, color }) => (
    <div className="h-1 bg-zinc-700 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${Math.min((value / max) * 100, 100)}%` }} />
    </div>
);

const CircularProgress = ({ value, max, size = 80, stroke = 6, color = "stroke-amber-500" }) => {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const pct = Math.min(value / max, 1);
    return (
        <svg width={size} height={size} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-zinc-800" />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} strokeLinecap="round" className={color} strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} style={{ transition: 'stroke-dashoffset 1s ease' }} />
        </svg>
    );
};

// ─── DayCell ───
function DayCell({ day, data, isToday, onClick }) {
    if (!day) return <div />;
    const has = !!data;
    return (
        <button onClick={() => onClick(day)} className={`aspect-square p-1 sm:p-1.5 rounded-xl border transition-all text-left flex flex-col ${isToday ? 'border-amber-500/50 bg-amber-500/10' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/50'} ${has ? 'hover:bg-zinc-800/50' : 'hover:bg-zinc-900'}`}>
            <span className={`text-[11px] sm:text-xs font-medium ${isToday ? 'text-amber-400' : 'text-zinc-400'}`}>{day}</span>
            {has && (
                <div className="flex-1 flex flex-col justify-end gap-0.5 mt-0.5">
                    <span className="text-xs sm:text-sm font-semibold text-white leading-none">{data.calories}</span>
                    <span className="text-[9px] text-zinc-500 hidden sm:block">kcal</span>
                    <div className="space-y-px hidden sm:block mt-0.5">
                        <MacroBar value={data.protein} max={goals.protein} color="bg-emerald-500" />
                        <MacroBar value={data.carbs} max={goals.carbs} color="bg-amber-500" />
                        <MacroBar value={data.fat} max={goals.fat} color="bg-rose-500" />
                    </div>
                </div>
            )}
        </button>
    );
}

// ─── Entry Card ───
function EntryCard({ entry, isExpanded, onToggle }) {
    return (
        <div className="bg-zinc-800/50 rounded-xl border border-zinc-700/50 overflow-hidden">
            <button onClick={onToggle} className="w-full flex items-center gap-3 p-3 text-left hover:bg-zinc-800/80 transition-colors">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        <span className="text-[11px] text-zinc-500">{entry.time}</span>
                    </div>
                    <p className="text-sm text-zinc-200 truncate">{entry.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                    <div className="text-sm font-semibold text-white">{entry.calories}</div>
                    <div className="text-[10px] text-zinc-500">kcal</div>
                </div>
                {isExpanded ? <ChevUp className="w-4 h-4 text-zinc-500" /> : <ChevDown className="w-4 h-4 text-zinc-500" />}
            </button>
            {isExpanded && (
                <div className="px-3 pb-3 grid grid-cols-3 gap-2">
                    {[
                        { l: 'Protein', v: entry.protein, u: 'g', c: 'text-emerald-400' },
                        { l: 'Carbs', v: entry.carbs, u: 'g', c: 'text-amber-400' },
                        { l: 'Fat', v: entry.fat, u: 'g', c: 'text-rose-400' },
                    ].map(m => (
                        <div key={m.l} className="bg-zinc-900/60 rounded-lg p-2 text-center">
                            <div className={`text-sm font-semibold ${m.c}`}>{m.v}{m.u}</div>
                            <div className="text-[10px] text-zinc-500">{m.l}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Add Food Modal ───
function AddFoodModal({ date, onClose }) {
    const [mode, setMode] = useState('ai');
    const [prompt, setPrompt] = useState('');
    const [processing, setProcessing] = useState(false);
    const [items, setItems] = useState([{ food: '', qty: '' }]);
    const dateObj = new Date(date + 'T00:00:00');
    const fmt = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    const submit = () => { setProcessing(true); setTimeout(() => { setProcessing(false); onClose(); }, 1500); };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                    <div>
                        <h3 className="text-base font-semibold text-white">Log Food</h3>
                        <p className="text-xs text-zinc-500">{fmt}</p>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-zinc-800 rounded-lg"><XIcon className="w-4 h-4 text-zinc-400" /></button>
                </div>

                <div className="p-4">
                    {mode === 'ai' ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 bg-violet-500/20 rounded-md"><Sparkles className="w-3.5 h-3.5 text-violet-400" /></div>
                                <span className="text-xs font-medium text-zinc-300">AI Input</span>
                            </div>
                            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder='e.g. "2 scrambled eggs, toast with butter, orange juice"' className="w-full h-24 bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white placeholder-zinc-600 resize-none focus:outline-none focus:border-amber-500/50" />
                            <button onClick={submit} disabled={!prompt.trim() || processing} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-zinc-950 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                                {processing ? <><div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />Analyzing...</> : <><Sparkles className="w-4 h-4" />Log with AI</>}
                            </button>
                            <button onClick={() => setMode('manual')} className="w-full text-center text-xs text-zinc-500 hover:text-zinc-400 py-1">or enter items manually</button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <span className="text-xs font-medium text-zinc-300">Manual Entry</span>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {items.map((it, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input value={it.food} onChange={e => { const n = [...items]; n[i].food = e.target.value; setItems(n); }} placeholder="Food name" className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50" />
                                        <input value={it.qty} onChange={e => { const n = [...items]; n[i].qty = e.target.value; setItems(n); }} placeholder="Qty" className="w-20 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50" />
                                        {items.length > 1 && <button onClick={() => setItems(items.filter((_, j) => j !== i))} className="p-2 text-zinc-500 hover:text-rose-400"><Trash className="w-3.5 h-3.5" /></button>}
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setItems([...items, { food: '', qty: '' }])} className="w-full py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:border-zinc-600 hover:text-zinc-400 flex items-center justify-center gap-1"><PlusIcon className="w-3 h-3" />Add another</button>
                            <button onClick={submit} disabled={!items.some(i => i.food.trim()) || processing} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-zinc-950 rounded-xl text-sm font-semibold transition-colors">
                                {processing ? 'Processing...' : `Log ${items.filter(i => i.food.trim()).length} Item${items.filter(i => i.food.trim()).length !== 1 ? 's' : ''}`}
                            </button>
                            <button onClick={() => setMode('ai')} className="w-full text-center text-xs text-zinc-500 hover:text-zinc-400 py-1 flex items-center justify-center gap-1"><Sparkles className="w-3 h-3" />use AI input instead</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Day Summary Modal ───
function DaySummaryModal({ entries, date, onClose, onAddEntry }) {
    const [expanded, setExpanded] = useState(null);
    const [tab, setTab] = useState('entries');
    const summary = getDaySummary(entries);
    const dateObj = new Date(date + 'T00:00:00');
    const fmt = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const calPct = Math.round((summary.calories / goals.calories) * 100);

    const macros = [
        { label: 'Protein', value: summary.protein, unit: 'g', goal: goals.protein, color: 'emerald', icon: Beef },
        { label: 'Carbs', value: summary.carbs, unit: 'g', goal: goals.carbs, color: 'amber', icon: Wheat },
        { label: 'Fat', value: summary.fat, unit: 'g', goal: goals.fat, color: 'rose', icon: Droplets },
    ];

    const minerals = [
        { label: 'Sodium', value: summary.sodium, unit: 'mg' }, { label: 'Potassium', value: summary.potassium, unit: 'mg' },
        { label: 'Calcium', value: summary.calcium, unit: 'mg' }, { label: 'Iron', value: Math.round(summary.iron * 10) / 10, unit: 'mg' },
        { label: 'Magnesium', value: summary.magnesium, unit: 'mg' }, { label: 'Zinc', value: Math.round(summary.zinc * 10) / 10, unit: 'mg' },
    ];

    const vitamins = [
        { label: 'Vitamin A', value: summary.vitaminA, unit: 'mcg' }, { label: 'Vitamin C', value: Math.round(summary.vitaminC), unit: 'mg' },
        { label: 'Vitamin D', value: Math.round(summary.vitaminD * 10) / 10, unit: 'mcg' }, { label: 'Vitamin E', value: Math.round(summary.vitaminE * 10) / 10, unit: 'mg' },
        { label: 'Vitamin K', value: Math.round(summary.vitaminK), unit: 'mcg' }, { label: 'B1', value: Math.round(summary.vitaminB1 * 10) / 10, unit: 'mg' },
        { label: 'B2', value: Math.round(summary.vitaminB2 * 10) / 10, unit: 'mg' }, { label: 'B3', value: Math.round(summary.vitaminB3), unit: 'mg' },
        { label: 'B6', value: Math.round(summary.vitaminB6 * 10) / 10, unit: 'mg' }, { label: 'B9', value: Math.round(summary.vitaminB9), unit: 'mcg' },
        { label: 'B12', value: Math.round(summary.vitaminB12 * 10) / 10, unit: 'mcg' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-zinc-800">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base font-semibold text-white">{fmt}</h3>
                        <button onClick={onClose} className="p-1.5 hover:bg-zinc-800 rounded-lg"><XIcon className="w-4 h-4 text-zinc-400" /></button>
                    </div>
                    <p className="text-xs text-zinc-500">{entries.length} entr{entries.length === 1 ? 'y' : 'ies'} logged</p>
                    <div className="flex gap-1 mt-3">
                        {['entries', 'summary'].map(t => (
                            <button key={t} onClick={() => setTab(t)} className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${tab === t ? 'bg-amber-500/20 text-amber-400' : 'text-zinc-500 hover:text-zinc-300'}`}>{t === 'entries' ? 'Entries' : 'Summary'}</button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {tab === 'entries' ? (
                        entries.map(e => <EntryCard key={e.id} entry={e} isExpanded={expanded === e.id} onToggle={() => setExpanded(expanded === e.id ? null : e.id)} />)
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-zinc-300">Calories</span>
                                    <span className="text-sm font-semibold text-white">{summary.calories} <span className="text-zinc-500 font-normal">/ {goals.calories}</span></span>
                                </div>
                                <div className="h-2.5 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500" style={{ width: `${Math.min(calPct, 100)}%` }} />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {macros.map(({ label, value, unit, goal, color, icon: Ic }) => {
                                    const p = Math.round((value / goal) * 100);
                                    const cls = { emerald: { bg: 'bg-emerald-500/20', t: 'text-emerald-400', b: 'bg-emerald-500' }, amber: { bg: 'bg-amber-500/20', t: 'text-amber-400', b: 'bg-amber-500' }, rose: { bg: 'bg-rose-500/20', t: 'text-rose-400', b: 'bg-rose-500' } }[color];
                                    return (
                                        <div key={label} className="bg-zinc-800/50 rounded-xl p-2.5">
                                            <div className="flex items-center gap-1.5 mb-1.5"><div className={`p-1 ${cls.bg} rounded`}><Ic className={`w-3 h-3 ${cls.t}`} /></div><span className="text-[10px] text-zinc-400">{label}</span></div>
                                            <div className="text-lg font-semibold text-white">{value}<span className="text-xs text-zinc-500 ml-0.5">{unit}</span></div>
                                            <div className="h-1 bg-zinc-700 rounded-full overflow-hidden mt-1"><div className={`h-full ${cls.b} rounded-full`} style={{ width: `${Math.min(p, 100)}%` }} /></div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div>
                                <h4 className="text-xs font-medium text-zinc-400 mb-2">Minerals</h4>
                                <div className="grid grid-cols-3 gap-1.5">
                                    {minerals.map(m => (
                                        <div key={m.label} className="bg-zinc-800/40 rounded-lg px-2 py-1.5 text-center">
                                            <div className={`text-xs font-semibold ${m.value ? 'text-zinc-200' : 'text-zinc-600'}`}>{m.value} {m.unit}</div>
                                            <div className="text-[9px] text-zinc-500">{m.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-medium text-zinc-400 mb-2">Vitamins</h4>
                                <div className="grid grid-cols-3 gap-1.5">
                                    {vitamins.map(v => (
                                        <div key={v.label} className="bg-zinc-800/40 rounded-lg px-2 py-1.5 text-center">
                                            <div className={`text-xs font-semibold ${v.value ? 'text-zinc-200' : 'text-zinc-600'}`}>{v.value} {v.unit}</div>
                                            <div className="text-[9px] text-zinc-500">{v.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-3 border-t border-zinc-800">
                    <button onClick={onAddEntry} className="w-full py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"><PlusIcon className="w-4 h-4" />Add Entry</button>
                </div>
            </div>
        </div>
    );
}

// ─── Sidebar Widgets ───
function TodaySummaryWidget({ entries }) {
    const summary = getDaySummary(entries);
    if (!summary) return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-zinc-300 mb-3">Today</h3>
            <p className="text-xs text-zinc-500 text-center py-4">No food logged yet today</p>
        </div>
    );
    const calPct = Math.min(summary.calories / goals.calories, 1);
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-zinc-300">Today</h3>
                <span className="text-[11px] text-zinc-500">{entries.length} entr{entries.length === 1 ? 'y' : 'ies'}</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                    <CircularProgress value={summary.calories} max={goals.calories} size={72} stroke={5} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-sm font-bold text-white">{Math.round(calPct * 100)}%</span>
                    </div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-white">{summary.calories}</div>
                    <div className="text-xs text-zinc-500">of {goals.calories} kcal</div>
                    <div className="text-xs text-amber-400 mt-1">{goals.calories - summary.calories > 0 ? `${goals.calories - summary.calories} remaining` : 'Goal reached!'}</div>
                </div>
            </div>
            <div className="space-y-2">
                {[
                    { l: 'Protein', v: summary.protein, g: goals.protein, c: 'bg-emerald-500', t: 'text-emerald-400' },
                    { l: 'Carbs', v: summary.carbs, g: goals.carbs, c: 'bg-amber-500', t: 'text-amber-400' },
                    { l: 'Fat', v: summary.fat, g: goals.fat, c: 'bg-rose-500', t: 'text-rose-400' },
                ].map(m => (
                    <div key={m.l}>
                        <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[11px] text-zinc-400">{m.l}</span>
                            <span className={`text-[11px] font-medium ${m.t}`}>{m.v}g / {m.g}g</span>
                        </div>
                        <MacroBar value={m.v} max={m.g} color={m.c} />
                    </div>
                ))}
            </div>
        </div>
    );
}

function WeeklyTrendWidget() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const cals = [1320, 1630, 1420, 1850, 960, 1450, 1680];
    const maxCal = Math.max(...cals);
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-zinc-300">This Week</h3>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400"><TrendUp className="w-3 h-3" />On track</div>
            </div>
            <div className="flex items-end gap-1.5 h-24">
                {cals.map((c, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-t-md bg-zinc-800 relative overflow-hidden" style={{ height: '100%' }}>
                            <div className={`absolute bottom-0 w-full rounded-t-md transition-all duration-700 ${i === 6 ? 'bg-amber-500' : 'bg-amber-500/40'}`} style={{ height: `${(c / maxCal) * 100}%` }} />
                        </div>
                        <span className={`text-[9px] ${i === 6 ? 'text-amber-400 font-medium' : 'text-zinc-500'}`}>{days[i]}</span>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800">
                <span className="text-xs text-zinc-500">Weekly avg</span>
                <span className="text-sm font-semibold text-white">{Math.round(cals.reduce((a, b) => a + b, 0) / cals.length)} kcal</span>
            </div>
        </div>
    );
}

function GoalsWidget() {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-zinc-300">Daily Goals</h3>
                <button className="text-[11px] text-amber-400 hover:text-amber-300">Edit</button>
            </div>
            <div className="space-y-2">
                {[
                    { l: 'Calories', v: `${goals.calories} kcal`, icon: Flame, c: 'text-orange-400 bg-orange-500/15' },
                    { l: 'Protein', v: `${goals.protein}g`, icon: Beef, c: 'text-emerald-400 bg-emerald-500/15' },
                    { l: 'Carbs', v: `${goals.carbs}g`, icon: Wheat, c: 'text-amber-400 bg-amber-500/15' },
                    { l: 'Fat', v: `${goals.fat}g`, icon: Droplets, c: 'text-rose-400 bg-rose-500/15' },
                ].map(g => (
                    <div key={g.l} className="flex items-center gap-3 bg-zinc-800/40 rounded-lg px-3 py-2">
                        <div className={`p-1.5 rounded-md ${g.c.split(' ')[1]}`}><g.icon className={`w-3.5 h-3.5 ${g.c.split(' ')[0]}`} /></div>
                        <span className="flex-1 text-xs text-zinc-400">{g.l}</span>
                        <span className="text-xs font-medium text-zinc-200">{g.v}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RecentMealsWidget({ entries }) {
    const allEntries = Object.entries(entries).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 2);
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-zinc-300 mb-3">Recent Meals</h3>
            <div className="space-y-2">
                {allEntries.flatMap(([date, ents]) => ents.slice(-1).map(e => (
                    <div key={`${date}-${e.id}`} className="flex items-center gap-3 bg-zinc-800/40 rounded-lg px-3 py-2">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-zinc-200 truncate">{e.description}</p>
                            <p className="text-[10px] text-zinc-500">{e.time} · {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                        <span className="text-xs font-medium text-zinc-300 flex-shrink-0">{e.calories} kcal</span>
                    </div>
                )))}
            </div>
        </div>
    );
}

// ─── Main Dashboard ───
export default function Dashboard() {
    const today = new Date(2026, 1, 15);
    const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1));
    const [selectedDay, setSelectedDay] = useState(null);
    const [addingFoodDay, setAddingFoodDay] = useState(null);
    const [userMenu, setUserMenu] = useState(false);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEntries = sampleEntries[todayStr] || null;

    const selectedDate = selectedDay ? formatDate(year, month, selectedDay) : null;
    const selectedEntries = selectedDate ? sampleEntries[selectedDate] : null;
    const addingFoodDate = addingFoodDay ? formatDate(year, month, addingFoodDay) : null;

    const handleDayClick = (day) => {
        const ds = formatDate(year, month, day);
        if (sampleEntries[ds]) setSelectedDay(day);
        else setAddingFoodDay(day);
    };

    const handleAddEntryFromSummary = () => {
        const day = selectedDay;
        setSelectedDay(null);
        setAddingFoodDay(day);
    };

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* ─── Header ─── */}
            <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-amber-500/20 rounded-lg"><Leaf className="w-4 h-4 text-amber-400" /></div>
                        <span className="text-base font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">EatClean</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setAddingFoodDay(today.getDate())} className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-xl text-xs font-semibold transition-colors">
                            <PlusIcon className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Log Food</span>
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
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <div className="flex flex-col xl:flex-row gap-6">
                    {/* Center - Calendar */}
                    <div className="flex-1 min-w-0">
                        {/* Mobile: Today summary card above calendar */}
                        <div className="xl:hidden mb-4">
                            <TodaySummaryWidget entries={todayEntries || []} />
                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-lg font-semibold text-white">{monthName}</h2>
                                <div className="flex gap-1">
                                    <button onClick={prevMonth} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"><ChevLeft className="w-4 h-4 text-zinc-400" /></button>
                                    <button onClick={() => setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))} className="px-3 py-1.5 text-xs text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors font-medium">Today</button>
                                    <button onClick={nextMonth} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"><ChevRight className="w-4 h-4 text-zinc-400" /></button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="text-center text-[10px] sm:text-xs text-zinc-500 font-medium py-1">{d}</div>)}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {cells.map((day, i) => {
                                    const ds = day ? formatDate(year, month, day) : null;
                                    const entries = ds ? sampleEntries[ds] : null;
                                    const summary = getDaySummary(entries);
                                    return <DayCell key={i} day={day} data={summary} isToday={isCurrentMonth && day === today.getDate()} onClick={handleDayClick} />;
                                })}
                            </div>

                            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-zinc-500">
                                <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-emerald-500 rounded-full" />Protein</span>
                                <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-amber-500 rounded-full" />Carbs</span>
                                <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-rose-500 rounded-full" />Fat</span>
                            </div>
                        </div>

                        {/* Mobile: below calendar widgets */}
                        <div className="xl:hidden grid sm:grid-cols-2 gap-4 mt-4">
                            <WeeklyTrendWidget />
                            <GoalsWidget />
                            <RecentMealsWidget entries={sampleEntries} />
                        </div>
                    </div>

                    {/* Right sidebar - all widgets (hidden on mobile, shown on xl) */}
                    <aside className="hidden xl:flex flex-col gap-4 w-72 flex-shrink-0">
                        <TodaySummaryWidget entries={todayEntries || []} />
                        <WeeklyTrendWidget />
                        <GoalsWidget />
                        <RecentMealsWidget entries={sampleEntries} />
                    </aside>
                </div>
            </main>

            {/* ─── Modals ─── */}
            {selectedDay && selectedEntries && (
                <DaySummaryModal entries={selectedEntries} date={selectedDate} onClose={() => setSelectedDay(null)} onAddEntry={handleAddEntryFromSummary} />
            )}
            {addingFoodDay && (
                <AddFoodModal date={addingFoodDate} onClose={() => setAddingFoodDay(null)} />
            )}
            {userMenu && <div className="fixed inset-0 z-30" onClick={() => setUserMenu(false)} />}
        </div>
    );
}