import {
  BarChart3,
  CalendarDays,
  Leaf,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import type {
  DailySummary,
  DemoParsedItem,
  FaqItem,
  FeatureItem,
  HeroTrustItem,
  HowItWorksStep,
  MiniCalendarData,
  NavItem,
  NutrientGroup,
  StatItem,
} from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#demo" },
  { label: "Nutrition", href: "#nutrition" },
  { label: "FAQ", href: "#faq" },
];

export const HERO_BADGE_TEXT = "AI-powered nutrition tracking";
export const HERO_TITLE_PREFIX = "Track what you eat,";
export const HERO_TITLE_HIGHLIGHT = "not spreadsheets";
export const HERO_DESCRIPTION =
  "Just describe your meal in plain English. EatClean's AI breaks it down into detailed nutrition - calories, macros, vitamins, minerals - all backed by USDA data. Free forever.";
export const HERO_PRIMARY_CTA_LABEL = "Get Started - It's Free";
export const HERO_SECONDARY_CTA_LABEL = "See it in action";

export const HERO_TRUST_ITEMS: HeroTrustItem[] = [
  { label: "No credit card" },
  { label: "No ads" },
  { label: "USDA sourced" },
];

export const MINI_CALENDAR_DATA: MiniCalendarData = {
  monthLabel: "February 2026",
  weekdays: ["S", "M", "T", "W", "T", "F", "S"],
  weeks: [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, null],
  ],
  filledCalories: {
    3: 1850,
    4: 2100,
    5: 1920,
    6: 1750,
    7: 2200,
    8: 1900,
    9: 2050,
    10: 2150,
    11: 977,
    12: 1680,
    13: 1920,
    14: 2100,
    15: 1800,
  },
  goalCalories: 2200,
  highlightedDay: 15,
  legend: [
    { label: "Protein", tone: "amber" },
    { label: "Carbs", tone: "orange" },
    { label: "Fat", tone: "rose" },
  ],
};

export const STATS_ITEMS: StatItem[] = [
  { value: 8700, suffix: "+", label: "Foods in database" },
  { value: 30, suffix: "+", label: "Nutrients tracked" },
  { value: 0, prefix: "$", label: "Monthly cost" },
  { value: 100, suffix: "%", label: "Open nutrition data" },
];

export const FEATURES: FeatureItem[] = [
  {
    icon: Sparkles,
    tone: "violet",
    title: "AI-Powered Logging",
    description:
      "Describe your meal naturally. Our AI identifies individual foods and maps them to precise USDA nutrition data.",
  },
  {
    icon: CalendarDays,
    tone: "amber",
    title: "Calendar Dashboard",
    description:
      "Monthly view with daily calorie summaries and macro progress bars. Click any day to see the full breakdown.",
  },
  {
    icon: BarChart3,
    tone: "amber",
    title: "Deep Nutrition Data",
    description:
      "Go beyond calories. Track 30+ nutrients including all vitamins, minerals, and macronutrient splits.",
  },
  {
    icon: Zap,
    tone: "cyan",
    title: "Instant & Lightweight",
    description:
      "Edge-deployed database, server-rendered UI, zero client bloat. Fast on any device, any connection.",
  },
  {
    icon: Shield,
    tone: "rose",
    title: "Private by Design",
    description:
      "Your data stays yours. Secure OAuth login, encrypted sessions, no tracking, no ads, no data selling.",
  },
  {
    icon: Leaf,
    tone: "amber",
    title: "Raw Foods Focus",
    description:
      "Built around whole, unprocessed ingredients using USDA Foundation Foods - the gold standard in nutrition science.",
  },
];

export const DEMO_TITLE = "Log meals in seconds, not minutes";
export const DEMO_DESCRIPTION =
  "No more scrolling through endless food lists or weighing every gram. Just type what you ate - our AI handles the rest. Every item is matched to USDA data for research-grade accuracy.";

export const DEMO_STEPS = [
  'Type naturally: "chicken breast with rice and broccoli"',
  "AI parses into individual USDA-matched foods",
  "Full macro + micro breakdown in under 2 seconds",
  "Edit or add more items anytime",
];

export const TYPING_DEMO_PROMPT =
  "2 scrambled eggs, toast with butter, and a glass of orange juice";

export const TYPING_DEMO_ITEMS: DemoParsedItem[] = [
  {
    name: "Scrambled eggs (2)",
    calories: 182,
    protein: 12,
    carbs: 2,
    fat: 14,
  },
  {
    name: "Toast with butter",
    calories: 167,
    protein: 4,
    carbs: 20,
    fat: 8,
  },
  {
    name: "Orange juice (1 glass)",
    calories: 112,
    protein: 2,
    carbs: 26,
    fat: 0,
  },
];

export const TYPING_DEMO_TOTAL_CALORIES = 461;

export const NUTRITION_GROUPS: NutrientGroup[] = [
  {
    title: "Macronutrients",
    tone: "amber",
    items: [
      { label: "Protein", value: 96, max: 150, tone: "amber", unit: "g" },
      { label: "Carbs", value: 185, max: 250, tone: "orange", unit: "g" },
      { label: "Fat", value: 52, max: 67, tone: "rose", unit: "g" },
    ],
  },
  {
    title: "Vitamins",
    tone: "violet",
    items: [
      { label: "Vitamin A", value: 780, max: 900, tone: "violet", unit: "mcg" },
      { label: "Vitamin C", value: 65, max: 90, tone: "violet", unit: "mg" },
      { label: "Vitamin D", value: 8, max: 20, tone: "violet", unit: "mcg" },
    ],
  },
  {
    title: "Minerals",
    tone: "cyan",
    items: [
      { label: "Iron", value: 14, max: 18, tone: "cyan", unit: "mg" },
      { label: "Calcium", value: 820, max: 1000, tone: "cyan", unit: "mg" },
      { label: "Potassium", value: 2800, max: 3400, tone: "cyan", unit: "mg" },
    ],
  },
];

export const DAILY_SUMMARY: DailySummary = {
  consumed: 1847,
  goal: 2200,
};

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: "01",
    title: "Sign in",
    description:
      "One-click GitHub OAuth. No passwords, no email verification, no friction.",
  },
  {
    step: "02",
    title: "Log your meals",
    description:
      "Type what you ate or search the USDA database. AI parses natural language into precise nutrition data.",
  },
  {
    step: "03",
    title: "See the picture",
    description:
      "Your calendar fills with daily summaries. Click any day for the full macro and micronutrient breakdown.",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is EatClean really free?",
    answer:
      "Yes. EatClean runs on free-tier infrastructure and open-source technology. There are no premium plans, no ads, and no hidden fees. The USDA nutrition database we use is public domain.",
  },
  {
    question: "How does the AI food logging work?",
    answer:
      'Just type what you ate in plain English - like "2 eggs with toast and OJ" - and our AI powered by Llama 3.3 parses it into individual food items with full nutritional breakdown using USDA data.',
  },
  {
    question: "What nutrition data do you track?",
    answer:
      "Calories, macronutrients (protein, carbs, fat), 6 minerals (sodium, potassium, calcium, iron, magnesium, zinc), and 12 vitamins (A, C, D, E, K, and all B vitamins).",
  },
  {
    question: "Where does the nutrition data come from?",
    answer:
      "We use the USDA FoodData Central database - specifically Foundation Foods and SR Legacy datasets. This is the same data used by researchers and healthcare professionals.",
  },
  {
    question: "Is my data private?",
    answer:
      "Your data is stored securely in an edge database and is only accessible by you. We use GitHub OAuth for authentication - we never see or store your password.",
  },
];

export const FEATURES_SECTION_TITLE = "Everything you need, nothing you don't";
export const FEATURES_SECTION_DESCRIPTION =
  "Built for people who care about what they eat - not fiddling with apps. Simple, accurate, and completely free.";

export const NUTRITION_SECTION_TITLE = "More than just calories";
export const NUTRITION_SECTION_DESCRIPTION =
  "Track 30+ nutrients with daily recommended intake percentages. See exactly where your diet shines - and where it falls short.";

export const HOW_IT_WORKS_TITLE = "Three steps. That's it.";

export const FAQ_SECTION_TITLE = "Frequently asked questions";

export const CTA_TITLE = "Start eating clean today";
export const CTA_DESCRIPTION =
  "No signup forms, no credit cards, no catch. Just sign in with GitHub and start tracking your nutrition in seconds.";

export const FOOTER_NOTE =
  "Nutrition data sourced from USDA FoodData Central. Built with Next.js & Turso.";
