"use client";

import type { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconName, icons } from "@/data/icons";

type IconProps = {
  name: IconName;
  className?: string;
  /** FontAwesome size (e.g. `xs`, `sm`, `lg`, `1x`) */
  size?: SizeProp;
};

/**
 * Wrapper constrains SVG size even if FA stylesheet is delayed or missing
 * (prevents full-width “giant icon” layout breaks).
 */
export function Icon({ name, className, size = "1x" }: IconProps) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center leading-none [&>svg]:max-h-[2rem] [&>svg]:max-w-[2rem]">
      <FontAwesomeIcon
        icon={icons[name]}
        size={size}
        className={className}
        aria-hidden
      />
    </span>
  );
}
