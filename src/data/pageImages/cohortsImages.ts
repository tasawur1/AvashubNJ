import { resolvePublicImage as r } from "@/lib/resolvePublicImage";

/**
 * Cohorts page image paths — resolved at server render time.
 *
 * Drop your image into the matching folder with any of these extensions
 * and the path is picked up automatically: .jpg  .jpeg  .png  .webp
 *
 * Folder layout:
 *   public/images/cohorts/              ← main cohorts page images
 *   public/images/cohorts/adventure/    ← Adventure session cards + hero
 *   public/images/cohorts/life-ready/   ← Life Ready category cards
 */
export const cohortsImages = {
  // ── Main cohorts page ───────────────────────────────────────────────────────
  hero:              r("/images/cohorts/hero-cohorts"),
  heroMobile:        r("/images/cohorts/hero-cohorts"),

  // Overview cards (section 2 — "Find the Right Cohort")
  adventureOverview: r("/images/cohorts/adventure-overview"),
  lifeReadyOverview: r("/images/cohorts/life-ready-overview"),

  // ── Adventure Cohorts sub-page hero ─────────────────────────────────────────
  adventureHero:       r("/images/cohorts/adventure/hero-adventure"),
  adventureHeroMobile: r("/images/cohorts/adventure/hero-adventure"),

  // ── Adventure cohort session cards ──────────────────────────────────────────
  carWashCrew:     r("/images/cohorts/adventure/car-wash-crew"),
  bakeryBrigade:   r("/images/cohorts/adventure/bakery-brigade"),
  gardenExplorers: r("/images/cohorts/adventure/garden-explorers"),
  marketMasters:   r("/images/cohorts/adventure/market-masters"),
  petCareAcademy:  r("/images/cohorts/adventure/pet-care-academy"),
  rescueRangers:   r("/images/cohorts/adventure/rescue-rangers"),

  // ── Life Ready category cards ────────────────────────────────────────────────
  lifeReadySelfCare:         r("/images/cohorts/life-ready/self-care-grooming"),
  lifeReadyHomeIndependence: r("/images/cohorts/life-ready/home-independence"),
  lifeReadyKitchen:          r("/images/cohorts/life-ready/kitchen-confidence"),
  lifeReadyCommunity:        r("/images/cohorts/life-ready/community-money-skills"),
  lifeReadyJobReady:         r("/images/cohorts/life-ready/job-ready"),
};
