type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <header className={`max-w-3xl ${alignClass} ${className}`}>
      <h2 className="text-[1.875rem] font-bold leading-[1.15] tracking-tight text-brand-teal sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-brand-navy/80 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
