type SectionHeadingDecoratedProps = {
  title: string;
  subtitle?: string;
  className?: string;
  id?: string;
};

export function SectionHeadingDecorated({
  title,
  subtitle,
  className = "",
  id,
}: SectionHeadingDecoratedProps) {
  return (
    <header className={`mx-auto max-w-3xl text-center ${className}`}>
      <div
        className="mb-5 flex items-center justify-center gap-3 sm:mb-6"
        aria-hidden
      >
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-brand-teal sm:w-14" />
        <span className="h-2 w-2 rounded-full bg-brand-gold" />
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-brand-purple-bright sm:w-14" />
      </div>
      <h2
        id={id}
        className="text-[1.875rem] font-bold leading-[1.15] tracking-tight text-brand-teal sm:text-4xl lg:text-[2.75rem]"
      >
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
