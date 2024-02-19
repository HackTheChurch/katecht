# KA✞ECHT

> ✨ "Pray'n'play" ✨

- [PREZENTACE](https://www.canva.com/design/DAF8_taEjHM/gokPa9zZH3mYRzFolEGaYw/edit)

Jsi téměř vyhořelý katecht, který by chtěl atraktivním způsobem zaujmout mladé pro prohlubování znalostí v otázkách víry a církve? Aplikace Katecht je tu přesně pro tebe!

## Motivace & Jaký problém řešíme

Rozhodli jsme vytvořit hru, která by měla být využitelná jak pro katechety na běžnou výuku náboženství, tak i pro společenství mladých a nebo i klidně pro větší akce jako CSM apod. K hraní vás může motivovat jak celkové top skóre nebo jen soutěžení ve vaší skupině.

Chceme nabídnout i možnost vytvoření svých vlastních okruhů otázek nebo využití okruhů, co vytvořili už i ostatní uživatelé. Mladším generacím chceme přiblížit nedělní evangelium, ke kterému vždy vyjde týdenní okruh a k němu bychom chtěli přidat komentář kněze.
Hlavním cílem je nadchnout mladé k poznávání a vytvořit pro ně atraktivní formu výuky a také usnadnit práci katechetům.

Využití najde u:

- katechetů a animátorů, kteří připravují program svým svěřencům
- duchovních, kteří chtějí atraktivní formou ověřit znalosti svých farníků
- pořadatele masových akcí pro mládež, kteří chtějí spestřit svou apikaci zábavnou hrou
- všem mladým i méně mladým, kteří chtějí prohloubit svoje znalosti v oblastech víry i církve

## Contains

- Docker container for Postgresql
- JS Frameworks
  - NextJS 14
  - Prisma
  - NextAuth
  - shadcn/ui
  - Tailwind

## Setup

1. Setup GoogleAuth - follow [official documentation](https://next-auth.js.org/providers/google)
1. OpenAI API
1. `mv .env.example .env` - and fill environment variables
1. Run docker image with database
   - `docker compose up -d`
1. Run script to initialize tables for NextAuth
   - `npx prisma generate && npx prisma migrate dev`
1. Basic npm stuff
   - Install dependencies - `npm install`
   - Run server - `npm run dev`

## Frameworks + Tools

### Prisma

Prisma provides the best experience for your team to work and interact with databases. Scheme is defined in `prisma/schema.prisma`. It defines database in "pseudo code", which is easy to read and write and it provides types to Typescript.

#### Commands

1. `npx prisma generate` - [link](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client)
2. `npx prisma dev` - migrate changes from `schema` to database

### Auth.js

It take cares about session :) Thats all - you can add providers (Github, MS), so far it is setup with Google

Check `./auth.ts` for more info or [official documentation](https://authjs.dev/getting-started/introduction)

**Note:** After some time of development, it starts failing due too many clients to DB. I tried to fix it by adding prisma into singleton, but it didn't help. If you know how to resolve it, please fill the PR for it. 🙏

### shadcn/ui

For quick and keep some styling, this template use [shadcn/ui](https://ui.shadcn.com/) components.

So far, this template has these components: `Avatar`, `Button`, `DropdownMenu`.

For new components, check components on official page and follow installation instructions.

### Tailwind

Template use [Tailwind](https://tailwindcss.com/docs/installation), so please check it to.

**Tip:** If you need to figure out some layouts or something, check [Flowbite](flowbite.com)

### Prettier + Husky

1. I use it everywhere and it force format style in project.

## Project structure

Check [NextJS app structure](https://nextjs.org/docs/getting-started/project-structure)

**TLDR:**

- `app/layout.tsx` is wrapper around all pages in folder
- `app/page.tsx` is like `index` for folder.
  - `/app/contact/page.tsx` is `localhost:3000/contact`
  - `/app/contact/[id]/page.tsx` is `localhost:3000/contact/someId`
  - `/app/contact/layout/` is used for all ^^ these pages
- `components` - folder for UI components (shadcn/ui + tailwind)
- `app/api` is special folder for API responses

Check how you can handle `notFound`, `error` and [others pages](https://nextjs.org/docs/getting-started/project-structure#app-routing-conventions) - it is super simple.
**Hint**

```jsx

import { notFound } from "next/navigation";

export default async function RemoteMdxPage({ params }: { params: { id: string } }) {
  // pseudoCode - if it is not found, display notFound page
  if(isInDatabase(params.id)){
    return notFound();
  }
  return (
    <SomeSuperComponent></SomeSuperComponent>
  );
}
```

```jsx
// app/not-found.tsx
export default function NotFound() {
  return (
    <main className="relative mt-16 flex w-full flex-col items-center justify-center">
      <h1>404</h1>
      <div>Nenalezeno</div>
    </main>
  );
}
```
