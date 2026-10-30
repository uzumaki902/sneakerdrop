# SneakerDrop

A premium sneaker e-commerce showcase built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- Responsive sneaker storefront
- Dynamic product catalogue powered by Supabase
- Individual product detail pages
- Admin authentication and protected dashboard
- Product management (add, edit, delete)
- Product availability management
- Customer waitlist with duplicate submission prevention
- Admin waitlist search

## Tech Stack

- **Frontend:** Next.js 16, React, TypeScript, Tailwind CSS
- **Backend:** Next.js Server Actions and API Route Handlers
- **Database:** Supabase PostgreSQL
- **Authentication:** Supabase Auth
- **Deployment:** Vercel

## Getting Started

Clone the repository:

```bash
git clone https://github.com/uzumaki902/sneakerdrop.git
cd sneakerdrop
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
```

Add your Supabase project credentials.

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Database

The application uses Supabase PostgreSQL with:

- `products` – stores sneaker details, pricing, images, and availability.
- `waitlist` – stores customer email submissions linked to products.

## Architecture

SneakerDrop uses a single Next.js application. Server Components handle data fetching, while Server Actions and API routes handle mutations. Supabase provides database and authentication services.

## Deployment

Deployed using Vercel.

## Author

Developed as a sneaker e-commerce frontend assignment.
