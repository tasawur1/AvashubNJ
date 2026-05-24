import type { IconName } from "@/data/icons";
import type { ProblemIconColor } from "@/data/aboutContent";
import type { PageIntroContent, JourneyStep } from "./types";

export const familiesHero: PageIntroContent = {
  heading: "For Families Who Want More Than Answers",
  subheading: "You\u2019re not alone on this journey.",
  description:
    "We walk beside parents and caregivers with warmth, clarity, and practical support\u2014so your child can grow skills, confidence, and connection in everyday life.",
  tagline:
    "Compassionate guidance. Real progress. A community that understands.",
  cta: { label: "Talk With Our Team", href: "/contact" },
};

export const familyJourneySteps: JourneyStep[] = [
  {
    icon: "phone",
    title: "Reach Out",
    description:
      "Call or message us. We\u2019ll listen and help you understand options.",
  },
  {
    icon: "calendar",
    title: "Visit & Tour",
    description:
      "Tour Ava\u2019s Hub, meet our team, and see programs in action.",
  },
  {
    icon: "family",
    title: "Personalized Plan",
    description:
      "Together we build goals that fit your child and your family.",
  },
  {
    icon: "heart",
    title: "Grow Together",
    description:
      "Skills build at the Hub and carry into home, school, and community.",
  },
];

export const familySupportCards: {
  icon: IconName;
  title: string;
  description: string;
  color: ProblemIconColor;
}[] = [
  {
    icon: "support",
    color: "teal",
    title: "Emotional Support",
    description:
      "A welcoming space where families feel heard, respected, and encouraged.",
  },
  {
    icon: "communication",
    color: "purple",
    title: "Clear Communication",
    description:
      "Regular updates and honest conversations about progress and next steps.",
  },
  {
    icon: "training",
    color: "gold",
    title: "Parent Training",
    description:
      "Strategies you can use at home to reinforce skills and routines.",
  },
  {
    icon: "resources",
    color: "teal",
    title: "Helpful Resources",
    description:
      "Guides, referrals, and tools to navigate services and school supports.",
  },
];

export const familiesCtaPill = [
  "Your family deserves a partner who believes in your child\u2019s potential.",
  "Let\u2019s build their pathway together.",
];
