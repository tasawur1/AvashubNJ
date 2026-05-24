import type { IconName } from "@/data/icons";
import type { ProblemIconColor } from "@/data/aboutContent";
import type { PageIntroContent } from "./types";

export const resourcesHero: PageIntroContent = {
  heading: "Resources for Families",
  subheading: "Helpful tools at your fingertips.",
  description:
    "Browse guides, printable tools, and trusted links to support your child\u2019s growth at home, in school, and in the community.",
  cta: { label: "Contact Our Team", href: "/contact" },
};

export const resourceCategories: {
  icon: IconName;
  title: string;
  description: string;
  color: ProblemIconColor;
}[] = [
  {
    icon: "bookOpen",
    color: "teal",
    title: "Parent Guides",
    description:
      "Practical tips for routines, behavior support, and skill-building at home.",
  },
  {
    icon: "school",
    color: "purple",
    title: "School Supports",
    description:
      "Information on IEPs, accommodations, and collaborating with educators.",
  },
  {
    icon: "insurance",
    color: "gold",
    title: "Insurance & Benefits",
    description:
      "Understanding coverage, NJ FamilyCare, and how to get started.",
  },
  {
    icon: "community",
    color: "teal",
    title: "Community Links",
    description:
      "Trusted local and national organizations for additional support.",
  },
];

export const printableTools = [
  {
    title: "Daily Routine Chart",
    description: "Visual schedule template for mornings, after school, and bedtime.",
  },
  {
    title: "Sensory Strategies Sheet",
    description: "Quick reference for calming and focusing techniques.",
  },
  {
    title: "Goal-Setting Worksheet",
    description: "Family-friendly worksheet to track short-term skill goals.",
  },
];

export const featuredGuides = [
  {
    title: "Starting Services at Ava\u2019s Hub",
    description:
      "What to expect from your first call through enrollment and your child\u2019s first sessions.",
  },
  {
    title: "Building Independence at Home",
    description:
      "Simple ways to practice life skills during everyday routines.",
  },
];

export const helpfulLinks = [
  { label: "New Jersey Early Intervention", href: "https://www.nj.gov/health/fhs/eis/" },
  { label: "NJ FamilyCare", href: "https://www.njfamilycare.org/" },
  { label: "CDC Autism Resources", href: "https://www.cdc.gov/autism/" },
];
