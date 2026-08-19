// One-off setup script — creates the two Supabase Storage buckets the
// Printables feature needs. Safe to re-run (already-exists errors are
// swallowed). Run with:
//   node --env-file=.env.local scripts/create-printables-buckets.cjs

const { createClient } = require("@supabase/supabase-js");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !secretKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in the environment.");
  process.exit(1);
}

const supabase = createClient(url, secretKey, { auth: { persistSession: false } });

const buckets = [
  {
    name: "printable-images",
    options: {
      public: true,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
      fileSizeLimit: "5MB",
    },
  },
  {
    name: "printable-files",
    options: {
      public: true,
      allowedMimeTypes: ["application/pdf", "text/html"],
      fileSizeLimit: "20MB",
    },
  },
];

async function main() {
  for (const bucket of buckets) {
    const { error } = await supabase.storage.createBucket(bucket.name, bucket.options);
    if (error) {
      if (/already exists/i.test(error.message)) {
        console.log(`✓ Bucket "${bucket.name}" already exists — skipping.`);
      } else {
        console.error(`✗ Failed to create bucket "${bucket.name}": ${error.message}`);
        process.exitCode = 1;
      }
    } else {
      console.log(`✓ Created bucket "${bucket.name}".`);
    }
  }
}

main();
