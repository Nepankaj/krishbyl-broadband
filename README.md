# Krishbyl Broadband — Website

A fast, responsive, **static** website for an ISP / fiber broadband business.
No build tools, no frameworks — just HTML, CSS, and a little JavaScript. It works
on any web host (Netlify, Vercel, GitHub Pages, cPanel/shared hosting, S3, etc.).

## Pages

| File | Page | Purpose |
|------|------|---------|
| `index.html` | Home | Hero, features, plan preview, "how it works", CTA |
| `plans.html` | Plans & Pricing | 4 broadband plans, what's included, business plans, FAQ |
| `new-connection.html` | New Connection | **Google Form embed** + a quick enquiry fallback form |
| `about.html` | About Us | Story, mission/vision, values, stats |
| `contact.html` | Contact Us | Contact details, message form, map |
| `assets/css/style.css` | — | All styling (brand colors, layout, responsive) |
| `assets/js/main.js` | — | Mobile menu, active nav, form handling |

## Preview locally

Just open `index.html` in a browser. Or run a tiny local server (recommended, so
the Google Form iframe behaves):

```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000
```

```powershell
# PowerShell alternative (Python installed)
python -m http.server 8000
```

---

## ✅ Before you go live — fill in these placeholders

Everything below uses obvious placeholders. Search the project for each and replace it.

### 1. Google Form (New Connection) — **required**
In `new-connection.html`, find the iframe with:
```
src="https://docs.google.com/forms/d/e/REPLACE_WITH_YOUR_FORM_ID/viewform?embedded=true"
```
Steps:
1. Build your form in [Google Forms](https://forms.google.com) (Name, Phone, Address, Plan, etc.).
2. Click **Send → `< >` (Embed HTML)**.
3. Copy the `src="..."` URL (it ends in `?embedded=true`).
4. Paste it into the iframe `src`.

### 2. Phone numbers
Replace every `+91 00000 00000` / `+910000000000` (in all 5 pages + footer).

### 3. Email addresses
Replace `care@krishbyl.com` and `sales@krishbyl.com`.

### 4. Address & map
- Replace the address text in `contact.html` and the footers.
- In `contact.html`, replace the Google Maps iframe: open Google Maps → search your
  address → **Share → Embed a map** → copy the iframe and paste it in place of the
  existing `<iframe ... maps ...>`.

### 5. Plans & pricing
Edit the plan cards in `plans.html` (and the preview in `index.html`) — change
speeds, prices, and features to your real offers.

### 6. Social links
In every footer, replace the `href="#"` on the social icons with your real
Facebook / Instagram / X / WhatsApp links.

### 7. (Optional) Make the contact/quick forms actually send
The contact form and quick enquiry form are front-end only. Pick one:
- **Easiest:** point users to the Google Form (already embedded on New Connection).
- **Formspree:** create a form at [formspree.io](https://formspree.io), then set the
  `<form>` to `action="https://formspree.io/f/yourid" method="POST"` and remove the
  `id="contactForm"` (or keep the JS for validation).
- **Your CRM / email:** wire the submit to your own endpoint.

---

## Deploy

### Netlify (drag & drop — fastest)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the entire `website` folder onto the page. Done — you get a live URL.
3. (Optional) Add your custom domain in **Site settings → Domain**.

### Vercel
`npm i -g vercel` → run `vercel` inside the `website` folder → follow prompts.

### GitHub Pages
1. Push this folder to a GitHub repo.
2. **Settings → Pages → Source: `main` / root** → Save.
3. Site goes live at `https://<user>.github.io/<repo>/`.

### Shared hosting / cPanel
Upload all files (keep the `assets/` folder structure) into `public_html/`.

---

## Customizing the look

All colors live at the top of `assets/css/style.css` under `:root`:

```css
--brand: #1f3bb3;   /* main blue   */
--accent: #00c2a8;  /* teal accent */
```

Change those two values to re-skin the whole site instantly.

---

© Krishbyl Broadband. Template built to be edited — make it yours.
