# Partner logos

Drop each organisation's logo here, then point at it from `src/data/partners.json`:

```json
"logo": "/assets/partners/canadia-bank.svg"
```

Until then leave `"logo": null`. The section renders a wordmark tile instead, so a partner
with no artwork yet still appears with its name and relationship — nothing looks broken, and
each logo can land on its own without waiting for the rest.

## What to ask for

| | |
|---|---|
| Format | **SVG** if the organisation has one. Otherwise PNG with a transparent background. |
| Size | At least **360 × 144 px** for PNG — tiles render at 56 px tall and up to 2× for retina. |
| Version | The **full-colour logo on a light background**. The section is light-themed. |
| Naming | The entry's `id` from `partners.json` — `canadia-bank.svg`, `ifa.png`. |

## Rules

**Use the file the organisation supplies.** Do not redraw, recolour, crop or trace a logo —
including tracing one out of an event photo. This is the same rule the acquiring bank sets
for the payment marks in `company.json`.

**Get permission in writing before publishing**, and keep the email. Most organisations have
brand guidelines that say where their mark may appear; a vendor's partner wall is exactly the
case those guidelines are written for.

**Government marks are different.** `caminv.png` here is the **CamInv brand wordmark**, taken
from `https://e-invoice.gov.kh/images/logo.png`. The same site also serves `mef-logo.png`, the
Ministry of Economy and Finance state emblem — **do not use that one**. A state emblem on a
commercial page reads as official endorsement no matter what the caption says. Keep the written
permission for the CamInv mark on file.

## What is here now

| File | Organisation | Taken from |
|---|---|---|
| `fii-associates.png` | Fii & Associates | `fii-a.com` |
| `canadia-bank.jpg` | Canadia Bank | site navigation, `canadiabank.com.kh` |
| `ifa.png` | Institute of Finance and Accounting | `ifa.edu.kh/web/img/logo.png` |
| `kicpaa.png` | KICPAA | `kicpaa.org/wp-content/uploads/2023/07/kicpaas-logo.png` |
| `caminv.png` | Cambodia E-Invoicing | `e-invoice.gov.kh/images/logo.png` |
| `ccc.png` | Cambodia Chamber of Commerce | `ccc.org.kh/assets/img/ccc_logo_v1.png` |

All downloaded 2026-08-16 from each organisation's own site. **Downloading a public asset is
not the same as being licensed to display it as a partner mark** — get written permission for
each and keep the emails.

Two to improve when you can:

- **`canadia-bank.jpg`** is 200 × 68, a JPEG with the mark on its solid red background, taken
  from the site's navigation bar. It is genuine but low resolution and not transparent. Ask the
  bank for its brand pack.
- **GIZ ICONE** has no artwork yet and renders a wordmark. Request it from the programme team.

## Checked on every build

`scripts/check-content.mjs` fails the build if a `logo` path does not resolve to a file in
`public/`. A partner tile can be missing artwork, but it can never be a broken image.
