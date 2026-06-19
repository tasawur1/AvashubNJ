const SITE_URL = process.env.SITE_URL ?? 'https://avashub-nj.vercel.app';

// Logo served from the same host — email clients block base64 data URIs
const LOGO_URL = `${SITE_URL}/images/logo.png`;

// Brand palette (from tailwind.config.ts)
const C = {
  navy:         '#171347',
  purpleDeep:   '#906398',
  purpleBright: '#BD7ABB',
  teal:         '#007C89',
  lavender:     '#FAEFF9',
  gold:         '#FDBA2D',
} as const;

/** Escape user-supplied strings for safe HTML embedding. */
export function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Convert newline-separated text into styled HTML paragraphs. */
export function nl2p(text: string): string {
  const p = (s: string) =>
    `<p style="margin:0 0 10px;font-size:14px;line-height:1.75;color:#3a3a3a;">${esc(s).replace(/\n/g, '<br>')}</p>`;
  return text.split(/\n\n+/).map(p).join('');
}

export type EmailOptions = {
  heading: string;
  bodyHtml: string;
  ctaHtml: string;
  footerNote?: string;
  headerEmail?: string;
};

export function buildEmail({ heading, bodyHtml, ctaHtml, footerNote, headerEmail = 'hello@avashubnj.com' }: EmailOptions): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${heading}</title>
</head>
<body style="margin:0;padding:0;background:#f5f3f8;font-family:'Helvetica Neue',Arial,sans-serif;color:${C.navy};">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3f8;padding:32px 16px;">
<tr><td align="center">
<table width="100%" style="max-width:580px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 24px rgba(23,19,71,0.08);">
  <!-- Header -->
  <tr><td style="background:${C.lavender};padding:22px 28px 18px;border-bottom:2px solid ${C.purpleBright}55;">
    <img src="${LOGO_URL}" alt="Ava's Hub" height="46" style="display:block;max-width:160px;height:auto;">
    <p style="margin:8px 0 0;font-size:11px;color:${C.purpleDeep};">East Orange, NJ &nbsp;·&nbsp; ${headerEmail}</p>
  </td></tr>
  <!-- Body -->
  <tr><td style="padding:28px 28px 24px;">
    <h1 style="margin:0 0 16px;font-size:21px;font-weight:700;color:${C.navy};line-height:1.3;">${heading}</h1>
    ${bodyHtml}
    <div style="margin-top:24px;">${ctaHtml}</div>
  </td></tr>
  <!-- Footer -->
  <tr><td style="background:${C.lavender};padding:18px 28px;border-top:2px solid ${C.purpleBright}33;">
    <p style="margin:0;font-size:12px;line-height:1.5;color:${C.purpleDeep};font-weight:700;">Ava's Hub &nbsp;·&nbsp; Tony &amp; Ava LLC DBA Ava's Hub</p>
    <p style="margin:6px 0 0;font-size:11.5px;line-height:1.7;color:#666;">
      280 S Harrison St, Suite 311, East Orange NJ 07018<br>
      <a href="mailto:hello@avashubnj.com" style="color:${C.purpleDeep};text-decoration:none;">hello@avashubnj.com</a>
      &nbsp;·&nbsp;
      <a href="tel:+19732232950" style="color:${C.purpleDeep};text-decoration:none;">(973) 223-2950</a>
    </p>
    ${footerNote ? `<p style="margin:10px 0 0;font-size:10.5px;color:#aaa;line-height:1.6;">${footerNote}</p>` : ''}
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

/** Three full-width buttons linking directly to the standalone intake form pages. */
export function intakeFormButtonsHtml(): string {
  const buttons: { label: string; sub: string; path: string; bg: string; }[] = [
    { label: 'Occupational Therapy', sub: 'Start OT intake form',  path: '/forms/ot-intake.html',  bg: C.purpleBright },
    { label: 'Physical Therapy',     sub: 'Start PT intake form',  path: '/forms/pt-intake.html',  bg: C.purpleDeep   },
    { label: 'Speech Therapy',       sub: 'Start SLP intake form', path: '/forms/slp-intake.html', bg: C.teal         },
  ];
  const rows = buttons.map(({ label, sub, path, bg }) => `
    <tr><td style="padding-bottom:10px;">
      <a href="${SITE_URL}${path}" style="display:block;background:${bg};border-radius:8px;padding:14px 20px;text-decoration:none;color:#fff;width:100%;box-sizing:border-box;">
        <span style="display:block;font-size:15px;font-weight:700;line-height:1.2;">${label}</span>
        <span style="display:block;font-size:11px;font-weight:400;opacity:0.7;margin-top:3px;">${sub}</span>
      </a>
    </td></tr>`).join('');
  return `<table cellpadding="0" cellspacing="0" style="width:100%;">${rows}</table>`;
}

/** Single "Schedule Your Evaluation" full-width button for post-intake emails. */
export function scheduleButtonHtml(): string {
  return `<table cellpadding="0" cellspacing="0" style="width:100%;"><tr><td>
    <a href="${SITE_URL}/contact" style="display:block;background:${C.purpleBright};border-radius:8px;padding:14px 20px;color:#fff;font-size:15px;font-weight:700;text-decoration:none;text-align:center;">
      Schedule Your Evaluation →
    </a>
  </td></tr></table>`;
}

/** Inline reply prompt used in operational notification emails to Marilyn. */
export function replyPromptHtml(): string {
  return `<p style="margin:0;font-size:13px;color:#888;font-style:italic;">Reply to this email to respond directly to the sender.</p>`;
}
