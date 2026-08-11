# Insurance Logo Images

Drop insurance company logo files here for the "Covered by Most Major Insurers" section on the home page (rendered just below the hero).

## How it works

This folder is read automatically — no code changes needed. Every image file placed here is picked up and shown in the logo row, in alphabetical order by filename. Add 3, add 10, doesn't matter — the row wraps and fills itself in.

- If the folder is empty, the whole section stays hidden.
- The filename becomes the image's alt text (e.g. `horizon-nj-health.png` → "Horizon NJ Health"), so name files after the company.
- Supported formats: `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`.
- This file (`README.md`) is ignored — it's not an image.

Because the home page is statically generated, a new deploy/build is needed after adding or removing files for the change to go live (same as any other image on the site).

## Image Guidelines

- Use PNG with a transparent background so logos sit cleanly on the white card.
- Roughly 400x160px (2.5:1) works well — logos are displayed at a max height of ~48px on desktop.
- Keep reasonable side padding baked into the source art if the logo is very wide or very tall, so it doesn't look cramped next to the others.
