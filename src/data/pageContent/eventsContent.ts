import type { IconName } from "@/data/icons";
import type { ProblemIconColor } from "@/data/aboutContent";
import type { PageIntroContent, EventCategory } from "./types";

export const eventsHero: PageIntroContent = {
  heading: "Community, Connection & Fun",
  subheading: "Events that bring families together.",
  description:
    "From social groups and family nights to seasonal celebrations, Ava\u2019s Hub hosts events that help kids and teens practice skills while building friendships.",
  cta: { label: "View Upcoming Events", href: "#upcoming-events" },
};

export const eventCategories: EventCategory[] = [
  {
    id: "social",
    label: "Social Groups",
    icon: "community",
    description:
      "Structured activities that encourage conversation, teamwork, and friendship-building in a supportive setting.",
  },
  {
    id: "family",
    label: "Family Events",
    icon: "family",
    description:
      "Welcoming gatherings where families connect, celebrate milestones, and share experiences.",
  },
  {
    id: "seasonal",
    label: "Seasonal Celebrations",
    icon: "calendar",
    description:
      "Holiday parties, summer outings, and themed events that make learning fun and memorable.",
  },
  {
    id: "workshops",
    label: "Workshops",
    icon: "training",
    description:
      "Parent workshops and skill-building sessions on topics that matter to your family.",
  },
];

export const upcomingHighlights: {
  icon: IconName;
  title: string;
  date: string;
  description: string;
  color: ProblemIconColor;
}[] = [
  {
    icon: "calendar",
    color: "teal",
    title: "After-School Social Club",
    date: "Weekly · School year",
    description:
      "Games, crafts, and peer connection for school-age participants.",
  },
  {
    icon: "heart",
    color: "purple",
    title: "Family Connection Night",
    date: "Monthly",
    description:
      "An evening for families to meet staff, connect with each other, and celebrate progress.",
  },
  {
    icon: "community",
    color: "gold",
    title: "Community Outing",
    date: "Seasonal",
    description:
      "Real-world outings to practice independence and social skills together.",
  },
];
