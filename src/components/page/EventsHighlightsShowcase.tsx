import { Icon } from "@/components/Icon";
import { eventsImages } from "@/data/pageImages/eventsImages";

const highlightCards = [
  {
    image: eventsImages.mobileEventCard1,
    title: "Parent Training Series",
    subtitle: "Every Month",
    description:
      "Practical tools and strategies to support your child and your family.",
    buttonLabel: "Learn More",
    tone: "purple",
  },
  {
    image: eventsImages.mobileEventCard2,
    title: "Family Fun Saturdays",
    subtitle: "May 3 & 17",
    description:
      "Join us for fun, connection, and community every first and third Saturday.",
    buttonLabel: "Learn More",
    tone: "teal",
  },
  {
    image: eventsImages.mobileEventCard3,
    title: "Community Outings",
    subtitle: "May 10 & 24",
    description:
      "Getting out, exploring, and building real-world skills together.",
    buttonLabel: "Learn More",
    tone: "teal",
  },
  {
    image: eventsImages.mobileEventCard4,
    title: "Sensory Play Day",
    subtitle: "May 1",
    description:
      "A morning of sensory exploration, play, and connection for all ages.",
    buttonLabel: "Learn More",
    tone: "purple",
  },
] as const;

const valueItems = [
  {
    icon: "puzzlePiece",
    label: "Build Skills",
    text: "Practice real-world routines through joyful community activities.",
    tone: "teal",
  },
  {
    icon: "community",
    label: "Make Friends",
    text: "Create space for peer connection, belonging, and confidence.",
    tone: "purple",
  },
  {
    icon: "calendar",
    label: "Create Memories",
    text: "Turn everyday participation into meaningful family moments.",
    tone: "gold",
  },
  {
    icon: "heart",
    label: "Strengthen Families",
    text: "Support shared experiences that help everyone feel included.",
    tone: "purple",
  },
  {
    icon: "confidence",
    label: "Celebrate Abilities",
    text: "Honor progress, participation, and every child's strengths.",
    tone: "teal",
  },
] as const;

const valueToneStyles = {
  purple: "bg-brand-lavender text-brand-purple-bright",
  teal: "bg-brand-teal-light text-brand-teal",
  gold: "bg-brand-gold/25 text-brand-navy",
} as const;

export function EventsHighlightsShowcase() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {highlightCards.map((card) => (
          <article
            key={card.title}
            className="overflow-hidden rounded-[1.75rem] bg-white shadow-card ring-1 ring-brand-teal/15"
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

      <div>
        <div className="px-1">
          <h3 className="text-2xl font-extrabold leading-tight text-brand-navy">
            Why Families Love Our Events
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
            Every activity is designed to support connection, confidence, and
            real-life participation.
          </p>
        </div>
        <div className="-mx-6 mt-6 overflow-x-auto px-6 pb-2 sm:mx-0 sm:px-0">
          <div className="flex min-w-max snap-x snap-mandatory gap-4 sm:grid sm:min-w-0 sm:grid-cols-2 lg:grid-cols-5">
            {valueItems.map((item) => (
              <article
                key={item.label}
                className="w-[72vw] max-w-[18rem] snap-start rounded-[1.75rem] bg-white/95 p-6 text-center shadow-card ring-1 ring-brand-teal/10 sm:w-auto sm:max-w-none"
              >
                <span
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${valueToneStyles[item.tone]}`}
                >
                  <Icon name={item.icon} size="lg" />
                </span>
                <h4 className="mt-5 text-lg font-extrabold leading-tight text-brand-navy">
                  {item.label}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/70">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
