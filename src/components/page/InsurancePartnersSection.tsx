import fs from "node:fs";
import path from "node:path";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";

const LOGOS_DIR = path.join(
  process.cwd(),
  "public/images/home/insurance-logos",
);
const LOGOS_URL_PREFIX = "/images/home/insurance-logos";
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg"]);
const ACRONYMS = new Set(["nj", "bcbs", "uhc", "ddd", "ot"]);

function toLabel(filename: string) {
  return path
    .parse(filename)
    .name.split(/[-_]+/)
    .filter(Boolean)
    .map((word) =>
      ACRONYMS.has(word.toLowerCase())
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

/** Reads whatever logo files are dropped in the folder — no code change needed to add or remove one. */
function getInsuranceLogos() {
  let files: string[] = [];
  try {
    files = fs.readdirSync(LOGOS_DIR);
  } catch {
    return [];
  }

  return files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      src: `${LOGOS_URL_PREFIX}/${file}`,
      alt: toLabel(file),
    }));
}

export function InsurancePartnersSection() {
  const logos = getInsuranceLogos();

  if (logos.length === 0) {
    return null;
  }

  return (
    <section
      className="pb-8 pt-1 xl:pb-12 xl:pt-0"
      aria-labelledby="insurance-partners-heading"
    >
      <SectionContainer>
        <div className="rounded-[1.75rem] bg-white/90 px-6 py-8 text-center shadow-card ring-1 ring-brand-purple-deep/10 sm:px-10 sm:py-9 xl:rounded-[2rem] xl:px-12 xl:py-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-y-7 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-12 sm:gap-y-7 xl:gap-x-14">
            {logos.map((logo) => (
              <div
                key={logo.src}
                className="relative h-10 w-28 shrink-0 sm:h-12 sm:w-32 xl:h-14 xl:w-36"
              >
                <PlaceholderImage
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain object-center opacity-75 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
                  sizes="150px"
                />
              </div>
            ))}
          </div>

          <p
            id="insurance-partners-heading"
            className="mt-7 text-xs font-extrabold uppercase tracking-normal text-brand-navy/50 sm:text-sm"
          >
            Covered by Most Major Insurers
          </p>

          {/* Hidden for now — re-enable when ready.
          <p className="mt-7 text-sm leading-relaxed text-brand-navy/70 xl:mt-8">
            Covered by most major insurers.{" "}
            <a
              href="/contact"
              className="font-bold text-brand-navy underline underline-offset-4"
            >
              Learn more
            </a>
          </p>
          */}
        </div>
      </SectionContainer>
    </section>
  );
}
