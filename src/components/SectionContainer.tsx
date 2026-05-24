import type { ElementType, ReactNode } from "react";
import { sectionContainerClass } from "@/lib/sectionLayout";

type SectionContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export function SectionContainer({
  children,
  className = "",
  as: Component = "div",
}: SectionContainerProps) {
  return (
    <Component className={`${sectionContainerClass} ${className}`.trim()}>
      {children}
    </Component>
  );
}
