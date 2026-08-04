# CU Daily Schedule

A modern, responsive daily schedule application built with Next.js 15, React, TypeScript, and Tailwind CSS.

## Features
- **Local Data Driven**: Uses a local `timetable.json` file to manage class schedules. No backend required.
- **Auto-Detection**: Automatically detects today's date and shows only today's classes.
- **Modern UI**: Implements glassmorphism, rounded cards, soft shadows, and dynamic animated hover effects.
- **Dark Mode Support**: Adapts automatically to system preferences.
- **Empty States**: Displays a festive message with a lucide-react illustration on weekends (Saturday/Sunday) or days without classes.

## Tech Stack
- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS v4
- date-fns
- lucide-react

## Local Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Vercel (Recommended)
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and import the project.
3. Vercel will automatically detect Next.js and configure the build settings (`npm run build`).
4. Click Deploy. Your site will be live in minutes.
