# Mohammad Hasan — Haute Digital Engineering Portfolio

An ultra-minimalist, haute-luxury 3D portfolio and digital acquisition system engineered with **Three.js WebGL**, **Tailwind CSS**, **GSAP mechanics**, and **Vercel Serverless Backend Architecture**.

Designed for senior-level international client engagements across the US, UK, Europe, and UAE.

- **Live Production URL:** [https://mohammadhasanportfolio.vercel.app](https://mohammadhasanportfolio.vercel.app)

---

## 💎 Features & Architecture

- **Haute Minimalist Luxury Aesthetic:** Pure Obsidian Black (`#040507`), Liquid Platinum Silver, and Champagne Gold (`#D4AF37`) palette.
- **Three.js Interactive 3D Hero Scene:** Studio-lit champagne gold metallic icosahedron, platinum silver lattice, and 380+ star dust particle nebula reacting smoothly to mouse parallax and mobile touch.
- **Responsive 6-Project Showcase:** Production-grade case studies categorized into SaaS Web, Cross-Platform Mobile (Flutter), and Bespoke Luxury Web.
- **Serverless Inquiry Backend (`/api/contact`):**
  - Production-ready Vercel serverless function with honeypot bot defense, strict input validation, and automatic reference code generation.
  - Pluggable Resend API / Webhook forwarding support (`RESEND_API_KEY`, `WEBHOOK_URL`).
- **Cross-Device Performance:**
  - Zero scroll trapping on mobile with `touch-action: pan-y`.
  - Automatic GPU/battery preservation (adaptive antialiasing and tilt suspension on touch devices).
- **Vercel 1-Click Deploy Ready:** Includes `vercel.json` with enterprise security headers (`X-Frame-Options`, `nosniff`, `Referrer-Policy`) and long-term asset caching.

---

## 🛠️ Local Development

To run locally with live API endpoint support:

```bash
node server.js
# Or double-click start.bat on Windows
```

Open `http://localhost:3001` in your browser.

- Dev Server: `http://localhost:3001`
- Health Endpoint: `http://localhost:3001/api/health`
- Contact API: `http://localhost:3001/api/contact`

---

## 🚀 Deploying to Vercel

1. Log into [Vercel](https://vercel.com).
2. Click **"Add New..." -> "Project"**.
3. Import your GitHub repository (`kingmhz/mohammad-hasan-portfolio`).
4. Keep default settings (Framework: *Other*, Root Directory: `./`).
5. *(Optional)* In Environment Variables, add:
   - `RESEND_API_KEY`: Your Resend API key (if you want direct email delivery).
   - `NOTIFICATION_EMAIL`: `hasanisbest786@gmail.com`
6. Click **Deploy**!

---

## 📬 Contact & Inquiries

- **Lead Consultant:** Mohammad Hasan
- **Email:** [hasanisbest786@gmail.com](mailto:hasanisbest786@gmail.com)
- **LinkedIn:** [linkedin.com/in/mohammadhasantechie](https://linkedin.com/in/mohammadhasantechie)
