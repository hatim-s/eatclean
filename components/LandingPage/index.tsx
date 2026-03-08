"use client";

import { useState } from "react";
import {
  CTA_DESCRIPTION,
  CTA_TITLE,
  DAILY_SUMMARY,
  DEMO_DESCRIPTION,
  DEMO_STEPS,
  DEMO_TITLE,
  FAQ_ITEMS,
  FAQ_SECTION_TITLE,
  FEATURES,
  FEATURES_SECTION_DESCRIPTION,
  FEATURES_SECTION_TITLE,
  FOOTER_NOTE,
  HERO_BADGE_TEXT,
  HERO_DESCRIPTION,
  HERO_PRIMARY_CTA_LABEL,
  HERO_SECONDARY_CTA_LABEL,
  HERO_TITLE_HIGHLIGHT,
  HERO_TITLE_PREFIX,
  HERO_TRUST_ITEMS,
  HOW_IT_WORKS_STEPS,
  HOW_IT_WORKS_TITLE,
  MINI_CALENDAR_DATA,
  NAV_ITEMS,
  NUTRITION_GROUPS,
  NUTRITION_SECTION_DESCRIPTION,
  NUTRITION_SECTION_TITLE,
  STATS_ITEMS,
  TYPING_DEMO_ITEMS,
  TYPING_DEMO_PROMPT,
  TYPING_DEMO_TOTAL_CALORIES,
} from "./landing/content";
import {
  CtaSection,
  DemoSection,
  FaqSection,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  LandingFooter,
  LandingNavigation,
  NutritionSection,
  StatsSection,
} from "./landing/sections";

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="landing-v2 min-h-screen bg-background text-foreground">
      <LandingNavigation
        isMobileMenuOpen={mobileMenuOpen}
        items={NAV_ITEMS}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
        onToggleMobileMenu={() => setMobileMenuOpen((open) => !open)}
      />

      <main>
        <HeroSection
          badgeText={HERO_BADGE_TEXT}
          calendarData={MINI_CALENDAR_DATA}
          description={HERO_DESCRIPTION}
          primaryCtaLabel={HERO_PRIMARY_CTA_LABEL}
          secondaryCtaLabel={HERO_SECONDARY_CTA_LABEL}
          titleHighlight={HERO_TITLE_HIGHLIGHT}
          titlePrefix={HERO_TITLE_PREFIX}
          trustItems={HERO_TRUST_ITEMS}
        />

        <StatsSection items={STATS_ITEMS} />

        <FeaturesSection
          description={FEATURES_SECTION_DESCRIPTION}
          items={FEATURES}
          title={FEATURES_SECTION_TITLE}
        />

        <DemoSection
          description={DEMO_DESCRIPTION}
          parsedItems={TYPING_DEMO_ITEMS}
          prompt={TYPING_DEMO_PROMPT}
          steps={DEMO_STEPS}
          title={DEMO_TITLE}
          totalCalories={TYPING_DEMO_TOTAL_CALORIES}
        />

        <NutritionSection
          dailySummary={DAILY_SUMMARY}
          description={NUTRITION_SECTION_DESCRIPTION}
          groups={NUTRITION_GROUPS}
          title={NUTRITION_SECTION_TITLE}
        />

        <HowItWorksSection
          steps={HOW_IT_WORKS_STEPS}
          title={HOW_IT_WORKS_TITLE}
        />

        <FaqSection items={FAQ_ITEMS} title={FAQ_SECTION_TITLE} />

        <CtaSection description={CTA_DESCRIPTION} title={CTA_TITLE} />
      </main>

      <LandingFooter note={FOOTER_NOTE} />
    </div>
  );
}
