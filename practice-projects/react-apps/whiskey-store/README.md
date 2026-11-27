# Dramshop — whisky e-commerce

A full-stack online whisky shop: browse and filter the catalog, save favorites, review bottles, manage a cart and saved addresses, and pay with Stripe (test mode).

**Live demo:** https://REPLACE-ME · **Test card:** `4242 4242 4242 4242`, any future date, any CVC

> The API runs on a free instance that sleeps when idle, so the first request after a quiet spell can take up to a minute.

## Features

- **Catalog**: faceted filters (style, brand, region, country, age, volume, tasting notes, availability, price) kept in the URL, sorting, pagination, search
- **Product page**: specs, tasting notes that link to filtered lists, related bottles, reviews (one per user, editable)
- **Cart**: server-side cart, drawer + full page, free-delivery threshold, add-to-cart notifications
- **Checkout**: saved address book with a default address, Stripe Checkout (embedded Elements), webhook-confirmed payment, order history
- **Accounts**: JWT access tokens + rotating refresh tokens in an httpOnly cookie, protected routes, redirect back after sign-in
- **Design system**: Tailwind v4 tokens, light and dark themes, accessible primitives (native `<dialog>` sheets, real radio/checkbox inputs, focus rings), mobile-first layouts

## Stack

| | |
|---|---|
| Frontend | React 19, TypeScript, Vite, React Router, TanStack Query, Zustand, Tailwind CSS v4 |
| Backend | Node.js, Express, Prisma 7 (PostgreSQL), Joi, JWT, bcrypt |
| Payments | Stripe Checkout Sessions + webhooks |
| Hosting | Vercel (frontend, proxies `/api`), Render (API), Neon (Postgres) |

## Architecture

```
browser ──► Vercel (React build)
              └─ /api/*  ──proxy──►  Render (Express API) ──► Neon (Postgres)
Stripe ──webhook──────────────────►  Render /api/stripe/webhook
```

The browser only ever talks to one origin. Vercel forwards `/api/*` to the API, so the refresh-token cookie is first-party (`SameSite=Lax`) and no CORS is involved in production.

## Run it locally

Requirements: Node 20+, PostgreSQL, a Stripe test account (and the Stripe CLI for webhooks).

```bash
# API
cd api
cp .env.example .env          # fill in the values
npm install
npx prisma migrate dev        # creates the tables
npx prisma generate
npx prisma db seed            # 70 products, demo users, reviews
npm start                     # http://localhost:3000

# Stripe webhooks (second terminal) — copy the whsec_… it prints into api/.env
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Frontend (third terminal)
cd ui
cp .env.example .env.development
npm install
npm run dev                   # http://localhost:5173
```

## Project structure

```
api/   Express routes → controllers → Prisma; Joi validators; prisma/ schema, migrations, seed
ui/    src/features/<feature>/ (components, hooks, services, types)
       src/shared/ (ui primitives, layout, stores, services)
```
