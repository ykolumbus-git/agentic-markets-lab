# Agentic Markets Lab

Public website for Agentic Markets Lab at The Hebrew University of Jerusalem.

## Updating the site

- Edit the main page text in `app/page.tsx`.
- Edit research areas, contact details, and links in `app/content.ts`.
- Edit the other pages in their matching folders under `app/`.
- Edit layout and typography in `app/lab.module.css` and `app/globals.css`.

Every change pushed to `main` is checked, built, and published automatically to:

<https://ykolumbus-git.github.io/agentic-markets-lab/>

## Local preview

```bash
npm ci
npm run dev
```

Then open <http://localhost:3000>.

## Pre-publish check

```bash
npm run check
```
