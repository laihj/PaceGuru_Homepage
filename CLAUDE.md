# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 project called "paceguru" using React 19 RC with Tailwind CSS for styling. The project follows the App Router architecture introduced in Next.js 13+.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Architecture

### App Router Structure
- Uses Next.js App Router with `src/app/` directory
- Root layout: `src/app/layout.js` - defines global HTML structure and fonts
- Main page: `src/app/page.js` - landing page component
- Global styles: `src/app/globals.css`

### Styling
- Tailwind CSS for utility-first styling
- Custom CSS variables for background/foreground colors
- Geist font family (sans and mono variants) loaded locally
- Dark mode support via CSS variables

### Key Files
- `next.config.mjs` - Next.js configuration (currently minimal)
- `tailwind.config.js` - Tailwind configuration with custom color variables
- `jsconfig.json` - JavaScript configuration for path mapping
- `postcss.config.mjs` - PostCSS configuration for Tailwind

### Static Assets
All static assets are in the `public/` directory and include SVG icons for Next.js, Vercel, and UI elements.

## Development Notes

- The project uses JavaScript (not TypeScript)
- ESLint is configured with Next.js recommended rules
- The codebase follows standard Next.js App Router patterns
- Components use modern React patterns with functional components and hooks

## Tasks and Improvements

- 8172AD paceguru 的link 和 手机展示blog时的上下颜色,改成这个