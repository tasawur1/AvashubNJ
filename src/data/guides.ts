export type Guide = {
  title: string;
  slug: string;
  pdf: string;
  image: string;
  description: string;
  category: string;
  dateAdded: string;
};

export const guides: Guide[] = [
  {
    title: "How to Support Independence at Home",
    slug: "support-independence-at-home",
    pdf: "/guides/support-independence-at-home.pdf",
    image: "/images/guides/support-independence-at-home-guide.png",
    description:
      "Encourage skills that build confidence, participation, and independence at home.",
    category: "Daily Living Skills",
    dateAdded: "2026-06-01",
  },
  {
    title: "Calming Strategies That Work",
    slug: "calming-strategies",
    pdf: "/guides/calming-strategies.pdf",
    image: "/images/guides/calming-strategies-guide.png",
    description:
      "Simple strategies to help children regulate emotions and recover from big moments.",
    category: "Emotional Regulation",
    dateAdded: "2026-05-25",
  },
  {
    title: "Creating Successful Routines",
    slug: "successful-routines",
    pdf: "/guides/successful-routines.pdf",
    image: "/images/guides/successful-routines-guide.png",
    description:
      "Structure, consistency, and carryover ideas for smoother days at home.",
    category: "Routines",
    dateAdded: "2026-05-18",
  },
  {
    title: "Building Social Skills Every Day",
    slug: "building-social-skills",
    pdf: "/guides/building-social-skills.pdf",
    image: "/images/guides/building-social-skills-guide.png",
    description:
      "Easy ways to practice social confidence, communication, and connection.",
    category: "Social Skills",
    dateAdded: "2026-05-11",
  },
];
