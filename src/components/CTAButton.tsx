import Link from "next/link";
import type { ReactNode } from "react";

type CTAButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "goldOutline";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  primary:
    "bg-brand-purple-bright text-white shadow-md hover:bg-brand-purple-deep focus-visible:outline-brand-purple-bright",
  secondary:
    "border-2 border-brand-purple-deep bg-white text-brand-purple-deep hover:bg-brand-lavender focus-visible:outline-brand-purple-deep",
  goldOutline:
    "border-2 border-brand-gold bg-transparent text-brand-navy hover:bg-brand-gold/15 focus-visible:outline-brand-gold",
};

export function CTAButton({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
}: CTAButtonProps) {
  const styles = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} onClick={onClick}>
      {children}
    </button>
  );
}
