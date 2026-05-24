import { Icon } from "@/components/Icon";

type PageCtaPillProps = {
  lines: string[];
  className?: string;
};

/** Purple gradient tagline pill — matches About “Why” section */
export function PageCtaPill({ lines, className = "" }: PageCtaPillProps) {
  return (
    <div
      className={
        `mx-auto flex w-fit max-w-full flex-row items-center justify-center rounded-[2.75rem] ` +
        `bg-gradient-to-r from-brand-purple-deep via-brand-purple-bright to-brand-purple-deep ` +
        `px-4 py-3.5 shadow-lg max-sm:px-2.5 max-sm:py-3.5 sm:px-5 sm:py-6 lg:px-6 ${className}`
      }
    >
      <div className="flex w-full flex-row items-center justify-center gap-2 sm:w-auto sm:gap-4 lg:gap-5">
        <span className="inline-flex shrink-0 max-sm:[&_svg]:!h-7 max-sm:[&_svg]:!w-7 [&_svg]:!max-h-none [&_svg]:!max-w-none sm:[&_svg]:!h-11 sm:[&_svg]:!w-11">
          <Icon name="heart" className="text-brand-gold" size="2x" />
        </span>
        <p className="min-w-0 flex-1 text-center text-[0.5625rem] font-bold leading-[1.15] tracking-tight text-white min-[390px]:max-sm:text-[0.625rem] sm:flex-none sm:text-base lg:text-lg">
          {lines.map((line) => (
            <span
              key={line}
              className="block max-sm:whitespace-nowrap sm:whitespace-normal"
            >
              {line}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
