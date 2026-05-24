import type { SiteImageKey } from "./images";

export type ProgramCardData = {
  title: string;
  ageRange: string;
  description: string;
  imageKey: SiteImageKey;
  accent: "teal" | "purple";
};

export const programCards: ProgramCardData[] = [
  {
    title: "Kids",
    ageRange: "Ages 3–7",
    description:
      "Play-based learning, sensory regulation, and early life skills.",
    imageKey: "kidsProgram",
    accent: "teal",
  },
  {
    title: "School-Age",
    ageRange: "Ages 8–13",
    description:
      "Social skills, executive functioning, and academic support.",
    imageKey: "schoolAgeProgram",
    accent: "purple",
  },
  {
    title: "Teens",
    ageRange: "Ages 14–18",
    description:
      "Independence, life skills, community outings, and self-advocacy.",
    imageKey: "teensProgram",
    accent: "teal",
  },
  {
    title: "Young Adults",
    ageRange: "Ages 19–21+",
    description:
      "Job training, vocational skills, and real-world independence.",
    imageKey: "youngAdultsProgram",
    accent: "purple",
  },
];
