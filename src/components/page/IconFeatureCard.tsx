import { Icon } from "@/components/Icon";
import type { IconName } from "@/data/icons";
import type { BrandIconColor } from "@/lib/iconColors";
import { brandIconColors } from "@/lib/iconColors";

type IconFeatureCardProps = {
  icon: IconName;
  title: string;
  description: string;
  color?: BrandIconColor;
};

export function IconFeatureCard({
  icon,
  title,
  description,
  color = "teal",
}: IconFeatureCardProps) {
  return (
    <article className="flex h-full flex-col items-center rounded-3xl bg-white px-5 py-6 text-center shadow-card ring-1 ring-brand-teal/10 transition hover:-translate-y-0.5 hover:shadow-lg sm:px-6 sm:py-7">
      <span className="inline-flex [&_svg]:!h-9 [&_svg]:!w-9 [&_svg]:!max-h-none [&_svg]:!max-w-none sm:[&_svg]:!h-10 sm:[&_svg]:!w-10">
        <Icon name={icon} size="2x" className={brandIconColors[color]} />
      </span>
      <h3 className="mt-4 text-base font-bold text-brand-teal sm:text-lg">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-navy/85">
        {description}
      </p>
    </article>
  );
}
