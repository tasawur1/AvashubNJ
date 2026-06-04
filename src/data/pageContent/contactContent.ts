import type { IconName } from "@/data/icons";
import type { PageIntroContent } from "./types";

export const contactHero: PageIntroContent = {
  heading: "We\u2019re Here to Help",
  subheading: "Simple, friendly, and responsive.",
  description:
    "Whether you\u2019re ready to enroll, schedule a tour, or ask a question about programs and insurance, our team is happy to connect with you.",
  cta: { label: "Call (908) 758-4692", href: "tel:+19087584692" },
};

export const contactCards: {
  icon: IconName;
  title: string;
  detail: string;
  href?: string;
}[] = [
  {
    icon: "phone",
    title: "Phone",
    detail: "(908) 758-4692",
    href: "tel:+19087584692",
  },
  {
    icon: "email",
    title: "Email",
    detail: "info@avashub.com",
    href: "mailto:info@avashub.com",
  },
  {
    icon: "location",
    title: "Visit Us",
    detail: "280 S Harrison Street, Suite 311, East Orange, NJ",
  },
];

export const officeHours = [
  { day: "Monday - Friday", hours: "8:00 AM - 8:00 PM" },
  { day: "Saturday - Sunday", hours: "10:00 AM - 4:00 PM" },
];

export const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=280+S+Harrison+St,+East+Orange,+NJ+07018&z=15&output=embed";
