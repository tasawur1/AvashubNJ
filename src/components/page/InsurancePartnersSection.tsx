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
        <div className="rounded-[1.75rem] border-2 border-brand-lavender bg-white/90 px-6 py-8 text-center shadow-card sm:px-10 sm:py-9 xl:rounded-[2rem] xl:px-12 xl:py-10">
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            <span className="h-px w-10 bg-brand-purple-deep/30 sm:w-16 xl:w-20" />
            <p
              id="insurance-partners-heading"
              className="text-lg font-extrabold uppercase tracking-wide text-brand-purple-deep sm:text-xl xl:text-2xl"
            >
              In-Network With
            </p>
            <span className="h-px w-10 bg-brand-purple-deep/30 sm:w-16 xl:w-20" />
          </div>
          <p className="mt-3 text-base text-brand-navy/70 sm:text-lg xl:text-xl">
            We proudly accept:
          </p>

          <div className="mt-8 flex w-full flex-col items-center gap-y-9 md:flex-row md:flex-nowrap md:justify-center md:gap-x-10 xl:gap-x-14">
            {logos.map((logo) => (
              <div
                key={logo.src}
                className="relative h-14 w-36 shrink-0 md:h-16 md:w-40 xl:h-24 xl:w-56"
              >
                <PlaceholderImage
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain object-center"
                  sizes="230px"
                />
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
