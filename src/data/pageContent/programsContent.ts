import type { IconName } from "@/data/icons";
import type { ProblemIconColor } from "@/data/aboutContent";
import type { PageIntroContent } from "./types";

export const programsHero: PageIntroContent = {
  heading: "Programs for Every Stage of Life",
  subheading: "Real-life skills. Lasting independence.",
  description:
    "From early play-based learning to vocational readiness, Ava\u2019s Hub offers occupational therapy\u2013based programs that help children, teens, and young adults build confidence at home, in school, and in the community.",
  tagline:
    "Every program is individualized, evidence-based, and designed for real-world outcomes.",
  cta: { label: "Schedule a Tour", href: "/contact" },
};

export const therapyServices: {
  icon: IconName;
  title: string;
  description: string;
  color: ProblemIconColor;
}[] = [
  {
    icon: "child",
    color: "teal",
    title: "Pediatric OT",
    description:
      "Sensory regulation, fine motor skills, and daily routines tailored to each child\u2019s needs.",
  },
  {
    icon: "communication",
    color: "purple",
    title: "Social & Communication",
    description:
      "Practicing conversation, friendship skills, and confidence in group settings.",
  },
  {
    icon: "independence",
    color: "gold",
    title: "Life Skills Training",
    description:
      "Cooking, hygiene, organization, money skills, and self-care for greater independence.",
  },
  {
    icon: "community",
    color: "teal",
    title: "Community Participation",
    description:
      "Outings and real-world practice to build comfort navigating everyday environments.",
  },
];

export const vocationalItems: {
  icon: IconName;
  title: string;
  description: string;
  color: ProblemIconColor;
}[] = [
  {
    icon: "vocational",
    color: "purple",
    title: "Job Readiness",
    description:
      "Interview practice, workplace expectations, and task completion for teens and young adults.",
  },
  {
    icon: "confidence",
    color: "teal",
    title: "Vocational Exploration",
    description:
      "Discovering strengths, interests, and pathways toward meaningful work.",
  },
];

export const supportServices: {
  icon: IconName;
  title: string;
  description: string;
  color: ProblemIconColor;
}[] = [
  {
    icon: "family",
    color: "gold",
    title: "Family Collaboration",
    description:
      "Partnering with parents and caregivers to reinforce skills at home.",
  },
  {
    icon: "school",
    color: "teal",
    title: "School Coordination",
    description:
      "Supporting IEP goals, classroom strategies, and school\u2013home consistency.",
  },
  {
    icon: "insurance",
    color: "purple",
    title: "Benefits Guidance",
    description:
      "Help navigating insurance, NJ FamilyCare, and enrollment questions.",
  },
];

export const programsCtaPill = [
  "Ready to find the right fit for your child?",
  "We\u2019re here to guide you every step of the way.",
];
