import { siteImages } from "@/data/images";
import type { ProgramCardData } from "@/data/programs";
import { PlaceholderImage } from "./PlaceholderImage";

type ProgramCardProps = {
  program: ProgramCardData;
};

export function ProgramCard({ program }: ProgramCardProps) {
  const { title, ageRange, description, imageKey, accent } = program;
  const titleColor =
    accent === "teal" ? "text-brand-teal" : "text-brand-purple-deep";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-white to-brand-teal-light/40 shadow-card ring-1 ring-brand-purple-deep/10 transition hover:-translate-y-0.5 hover:shadow-lg lg:rounded-[1.35rem]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-lavender">
        <PlaceholderImage
          src={siteImages[imageKey]}
          alt={`${title} program — ${description.slice(0, 60)}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col px-6 pb-7 pt-5 sm:px-7 sm:pb-8">
        <h3 className={`text-xl font-bold ${titleColor}`}>{title}</h3>
        <p className="mt-1 text-sm font-semibold text-brand-purple-bright">
          {ageRange}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-brand-navy/85">
          {description}
        </p>
      </div>
    </article>
  );
}
