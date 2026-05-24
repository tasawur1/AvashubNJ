import { Icon } from "@/components/Icon";

const highlightCards = [
  {
    image: "/images/events/column-1.png",
    title: "Parent Training Series",
    subtitle: "Every Month",
    description:
      "Practical tools and strategies to support your child and your family.",
    buttonLabel: "Register Today",
    tone: "purple",
  },
  {
    image: "/images/events/column-2.png",
    title: "Family Fun Saturdays",
    subtitle: "May 3 & 17",
    description:
      "Join us for fun, connection, and community every first and third Saturday.",
    buttonLabel: "Bring the Whole Family",
    tone: "teal",
  },
  {
    image: "/images/events/column-3.png",
    title: "Community Outings",
    subtitle: "May 10 & 24",
    description:
      "Getting out, exploring, and building real-world skills together.",
    buttonLabel: "Let's Explore",
    tone: "teal",
  },
  {
    image: "/images/events/column-4.png",
    title: "Sensory Play Day",
    subtitle: "May 1",
    description:
      "A morning of sensory exploration, play, and connection for all ages.",
    buttonLabel: "Come Play With Us",
    tone: "purple",
  },
] as const;

const valueItems = [
  { icon: "puzzlePiece", label: "Build Skills" },
  { icon: "community", label: "Make Friends" },
  { icon: "calendar", label: "Create Memories" },
  { icon: "heart", label: "Strengthen Families" },
  { icon: "confidence", label: "Celebrate Abilities" },
] as const;

export function EventsHighlightsShowcase() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {highlightCards.map((card) => (
          <article
            key={card.title}
            className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-brand-teal/15"
          >
            <div
              className="aspect-[4/3] bg-brand-teal-light bg-cover bg-center"
              style={{ backgroundImage: `url(${card.image})` }}
              aria-label={card.title}
              role="img"
            />
            <div className="flex min-h-56 flex-col p-5">
              <p className="text-xs font-bold uppercase tracking-normal text-brand-purple-bright">
                {card.subtitle}
              </p>
              <h3 className="mt-2 text-base font-bold leading-snug text-brand-teal">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-navy/80">
                {card.description}
              </p>
              <div className="mt-auto pt-5">
                <span
                  className={
                    `block rounded-full px-4 py-2 text-center text-sm font-bold text-white shadow-sm ` +
                    (card.tone === "purple"
                      ? "bg-brand-purple-deep"
                      : "bg-brand-teal")
                  }
                >
                  {card.buttonLabel}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="grid overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-brand-teal/15 lg:grid-cols-[1.25fr_3fr]">
        <div className="flex items-center gap-4 bg-brand-purple-deep px-6 py-6 text-white">
          <Icon name="heart" className="text-brand-gold" size="2x" />
          <p className="text-base font-bold leading-snug sm:text-lg">
            Every event is an opportunity to learn, grow, and belong.
          </p>
        </div>
        <div className="grid grid-cols-2 divide-brand-teal/15 sm:grid-cols-5 sm:divide-x">
          {valueItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center gap-3 px-4 py-6 text-center"
            >
              <Icon
                name={item.icon}
                className="text-brand-teal"
                size="2x"
              />
              <span className="text-sm font-semibold text-brand-navy">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
