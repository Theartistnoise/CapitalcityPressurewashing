# Capital City Pressure Washing Website

Mid-Missouri's premier exterior cleaning company website. Built with React + Vite, deploys to Vercel.

---

## WHAT'S INCLUDED

✅ Premium hero section with "Transform Your Property" tagline
✅ Five service cards (Pressure Washing, Window Cleaning, Holiday Lighting, Permanent Lighting, Property Shield Plans)
✅ Full Dirt Busters package collection (Grime Fighter, Gunk Eliminator, Slime Slayer, Ghostbuster)
✅ Three-tier residential subscription plans (Shield Basic / Pro / Elite)
✅ Two-tier commercial plans (Standard / Premier)
✅ Before/after gallery (placeholders ready for your photos)
✅ Why Choose Us section (6 trust pillars)
✅ 100% Satisfaction Guarantee callout
✅ Service area display (12+ mid-MO cities)
✅ Lead capture form with email notification
✅ Click-to-call phone number throughout
✅ Mobile-responsive with sticky CTA bar
✅ SEO meta tags + LocalBusiness schema markup

---

## DEPLOYMENT (30 minutes at a real computer)

### STEP 1 — Set up email notifications for the lead form

1. Go to **https://resend.com** (free — 100 emails/day, no credit card)
2. Sign up, then go to **API Keys** → create a new key
3. Copy the key. It starts with `re_...`
4. Save it for Step 3.

### STEP 2 — Push to GitHub

**Option A: GitHub Desktop (recommended)**
1. Download GitHub Desktop from desktop.github.com
2. Sign in
3. File → Add Local Repository → choose this folder
4. Click "Create Repository" when prompted
5. Click "Publish Repository"

**Option B: Terminal**
```bash
cd capital-city-site
git init
git add .
git commit -m "Initial commit"
gh repo create capital-city-site --private --source=. --push
```

### STEP 3 — Deploy to Vercel

1. Go to **https://vercel.com** and sign in with GitHub
2. Click **Add New → Project**
3. Find your `capital-city-site` repo and click **Import**
4. **Before clicking Deploy**, expand Environment Variables and add:
   - `RESEND_API_KEY` = your Resend key from Step 1
   - `NOTIFICATION_EMAIL` = the email you want lead notifications sent to
5. Click **Deploy**
6. Wait ~2 minutes. You'll get a URL like `capital-city-site-xyz.vercel.app`

### STEP 4 — Add your custom domain

1. Buy your domain (recommendations below) — easiest place: **Namecheap.com** or **Vercel itself**
2. In Vercel: project → **Settings → Domains**
3. Add your domain
4. Follow Vercel's instructions to update DNS records at your registrar

**Domain recommendations (in order of strength):**
- `capcitypropertycare.com` — positions you as full-service (recommended for long-term)
- `capitalcityclean.com` — short, covers all services
- `capitalcitypw.com` — short, branded
- `capitalcitypressurewashing.com` — explicit but long

---

## CUSTOMIZING THE SITE

### Adding your real before/after photos

1. Drop photos into `public/gallery/` folder
2. Open `src/App.jsx`
3. Find the `Gallery` function (search for "function Gallery")
4. Replace the placeholder divs with `<img src="/gallery/your-photo.jpg" />` tags

### Adding your logo

1. Drop your logo file into `public/` (e.g., `public/logo.png`)
2. Open `src/App.jsx`
3. Find the `Nav` function — there's a comment marked `Logo placeholder - SWAP IN YOUR ACTUAL LOGO`
4. Replace the placeholder div with `<img src="/logo.png" alt="Capital City" style={{ height: 44 }} />`

### Updating phone number

In `src/App.jsx`, find these constants near the top:
```js
const PHONE = "(573) 418-3221";
const PHONE_RAW = "5734183221";
```
Update both if needed.

### Editing services, packages, or plans

All content lives in arrays at the top of `src/App.jsx`:
- `SERVICES` — the 5 service cards
- `DIRT_BUSTERS_PACKAGES` — the 4 residential packages
- `SHIELD_PLANS` — residential subscriptions
- `COMMERCIAL_PLANS` — commercial subscriptions
- `SERVICE_AREA` — list of cities
- `REASONS` — Why Choose Us bullets

Edit the text directly in those arrays. After saving, push to GitHub and Vercel auto-deploys.

### Adding testimonials

The current build doesn't include a testimonial section yet — add a few real ones and I can wire it in. For now, the trust signals come from the stats bar and the guarantee.

---

## RUNNING LOCALLY (optional)

If you want to preview before deploying:
```bash
npm install
npm run dev
```
Then open `http://localhost:5173`

---

## WHAT TO DO AFTER LAUNCH

1. **Add your Vercel URL to your Google Business Profile** when you get GBP sorted
2. **Update your social media bios** to point at the new domain
3. **Add the URL to your door hangers and trifolds**
4. **Test the contact form yourself** — submit a fake quote request and make sure you get the email
5. **Set up Google Analytics** (Vercel → Analytics tab → free)
6. **Submit to Google Search Console** to start indexing

---

## COSTS

- **Vercel hosting:** Free (generous free tier)
- **Resend (form emails):** Free up to 100/day
- **Domain:** $10-15/year
- **GitHub:** Free

**Total:** ~$15/year. The site itself runs on free infrastructure.

---

## QUESTIONS / ISSUES

When something breaks or you want to add a feature, drop the question to Claude and we'll fix it. The whole site is in one file (`src/App.jsx`) which keeps it easy to modify.

---

**Capital City Pressure Washing & Window Cleaning · (573) 418-3221 · Mid-Missouri**
