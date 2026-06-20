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

### 1. Form delivery — Google Sheet + email (**required**)
The site uses its **own custom form** (no Google Forms). Submissions are sent to a free
Google Apps Script Web App that **logs each request to a Google Sheet** and **emails you**.

Setup (one time, ~5 min) — full steps are inside [`google-apps-script.gs`](google-apps-script.gs):
1. Create a blank Google Sheet → **Extensions → Apps Script**.
2. Paste the contents of `google-apps-script.gs`, Save.
3. **Deploy → New deployment → Web app**, Execute as **Me**, Access **Anyone**, Deploy, authorize.
4. Copy the **Web app URL** (ends in `/exec`).
5. Open [`assets/js/main.js`](assets/js/main.js) and paste it into
   `var FORM_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";`
6. `git push` to redeploy. Test the form — a row appears in the Sheet and you get an email.

Until the URL is set, the form shows a "please call us" message instead of losing data.
Both the New Connection form and the Contact form use this same endpoint (separate Sheet tabs).

### 2. Phone numbers ✅ done
Set to `+91 72920 58549` across all pages.

### 3. Email addresses ✅ done
Set to `krishbylbroadband@gmail.com` across all pages.

### 4. Address & map
- Address is set to **Sector 63, Noida, Uttar Pradesh** in `contact.html` and the footers.
- The map currently searches "Sector 63 Noida". For an exact pin: open Google Maps →
  search your precise address → **Share → Embed a map** → copy the iframe and paste it in
  place of the existing `<iframe ... maps ...>` in `contact.html`.

### 5. Plans & pricing ✅ set
Current plans: 100 Mbps ₹600, 200 Mbps ₹710, 300 Mbps ₹900, 1 Gbps ₹2500 (all + GST).
Edit the plan cards in `plans.html` (and the preview in `index.html`) to change these.
**Offer:** "New connection = 2 months extra validity free" is shown on Home, Plans, and
New Connection pages — update the banner text in those files to change/expire it.

### 6. Social links
In every footer, replace the `href="#"` on the social icons with your real
Facebook / Instagram / X / WhatsApp links.

### 7. Form submissions
Handled by the Apps Script in step 1 — both forms log to your Google Sheet and email you.
A hidden honeypot field blocks basic spam bots automatically.

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
