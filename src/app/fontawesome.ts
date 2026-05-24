import { config } from "@fortawesome/fontawesome-svg-core";

/** Prevent duplicate injected stylesheet; we import FA CSS via globals.css */
config.autoAddCss = false;
