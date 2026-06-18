# Sri Adhinarayana Swamy Rajayogashramam Website

Premium devotional website and admin dashboard built with Next.js, React, Tailwind CSS, Framer Motion, Node.js, Express, MongoDB, JWT, Razorpay, and Cloudinary-ready configuration.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Backend API

```bash
cp .env.example .env
npm run server:dev
```

The Express API runs on `http://localhost:5000` by default.

## Admin

Visit `/admin`. Demo login accepts credentials from `.env` in the backend scaffold. The frontend dashboard includes responsive cards, charts, tables, filters, content management panels, notification controls, and dark mode.

## Production Notes

- Add real MongoDB, Razorpay, and Cloudinary secrets in `.env`.
- Replace demo images and contact details with official Ashramam assets.
- Configure domain, analytics, and notification providers before launch.
- Run `npm run build` before deployment to Vercel or Netlify.
