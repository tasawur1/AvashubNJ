import type { IconName } from "./icons";

export type ProblemIconColor = "teal" | "purple" | "gold";

export const problemIconColors: Record<ProblemIconColor, string> = {
  teal: "text-brand-teal",
  purple: "text-brand-purple-deep",
  gold: "text-brand-gold",
};

export const problemItems: {
  icon: IconName;
  color: ProblemIconColor;
  text: string;
}[] = [
  {
    icon: "family",
    color: "teal",
    text: "Families feel overwhelmed and unsure where to turn.",
  },
  {
    icon: "puzzlePiece",
    color: "purple",
    text: "Therapy doesn\u2019t always translate to real life.",
  },
  {
    icon: "child",
    color: "gold",
    text: "Kids and teens struggle with daily tasks and independence.",
  },
  {
    icon: "clock",
    color: "teal",
    text: "There aren\u2019t enough programs that build real-life skills for the future.",
  },
  {
    icon: "heart",
    color: "purple",
    text: "Families worry about their child\u2019s future and independence.",
  },
  {
    icon: "community",
    color: "gold",
    text: "Children and individuals with special needs often experience loneliness and difficulty building friendships and social connections.",
  },
];

export const approachItems = [
  "Evidence-based, functional, and individualized programs that focus on real-life outcomes.",
  "A warm, inclusive environment where kids feel understood, supported, and motivated.",
  "Skill-building that extends beyond the therapy room and into everyday life.",
  "Collaborating with families, schools, and communities to support long-term success.",
];

export const whyItems = [
  "We\u2019ve seen the frustration: Families navigate a maze of services with little guidance.",
  "We\u2019ve felt the worry: Parents fear their child won\u2019t be independent or prepared for the future.",
  "We understand the gap: There aren\u2019t enough places that teach the skills that truly matter in everyday life.",
  "We\u2019re here to change that: By providing real-life skills, support, and opportunities that make independence possible.",
];
