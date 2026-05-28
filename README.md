# Vinyl Records Store

> A small e-commerce platform built to learn the NestJS + GraphQL + Prisma stack hands-on.

🇬🇧 English version below — 🇫🇷 version française plus bas

🔗 **Live demo** : [your-url-here]
📦 **Repo** : github.com/EdMkn/Music-Album-Store

---

## 🇬🇧 English

### Why this project

I built Vinyl Records Store to learn three technologies I hadn't used before — NestJS, GraphQL, and Prisma — in a single coherent project rather than through isolated tutorials.

I picked an e-commerce use case on purpose: it forces you to deal with real-world concerns (a typed schema, persistence, payments, async flows) without inventing artificial complexity. The "vinyl records" theme is just there to make the catalog less boring than the usual "products" demo.

This is **not a production product**. It's a working prototype I can run, deploy, and reason about — and a base I keep extending when I want to try something new (auth, observability, testing, etc.).

### What I learned (the honest version)

**GraphQL on both sides was harder than expected.** Wiring up NestJS resolvers with a code-first schema was the easy part. The hard part was on the Angular side: figuring out the right Apollo Client setup, handling cache normalization, and avoiding the trap of re-fetching everything on every navigation. I rewrote the data layer twice before I got something I was comfortable with.

**Prisma's "easy" migrations have a learning curve.** I started using `prisma db push` everywhere because it "just worked". Then I tried to add a column in production-like conditions and realized the difference between `db push` (good for prototyping) and `migrate dev` / `migrate deploy` (what you actually want for real schema changes). Painful but useful lesson.

**SSR + GraphQL + hydration is a real footgun.** Angular SSR works fine until you add GraphQL queries that fire client-side after hydration — then you get flicker, duplicate fetches, and console warnings. I had to learn how to transfer state from server to client properly. Still not perfect.

**Stripe Checkout was the smoothest part.** Choosing Stripe Checkout over Payment Intents was a deliberate trade-off: less UX control, but PCI compliance offloaded entirely. For a portfolio project, that was the right call.

### Architecture

┌──────────────┐       ┌────────────────┐       ┌─────────────────┐
│ Nginx proxy  │───────▶│ Angular 19 SSR │───────▶│ NestJS GraphQL  │
│   port 80    │        │  Apollo Client │        │     API         │
└──────────────┘        └────────────────┘        └────────┬────────┘
│
┌─────────▼─────────┐
│ PostgreSQL        │
│ (Prisma ORM)      │
└───────────────────┘
▲
│  Stripe Checkout (external)

A type-generation script reads the Prisma schema and produces TypeScript interfaces for the frontend, so the contract stays in sync without manual maintenance.

### Tech stack

- **Frontend** — Angular 19 (SSR), Apollo Client, Tailwind + DaisyUI
- **Backend** — NestJS, GraphQL (code-first), Prisma
- **Database** — PostgreSQL
- **Payments** — Stripe Checkout
- **Infra** — Docker Compose, Nginx reverse proxy, Nx monorepo

### How AI was used in this project

I used Claude / Cursor as an assistant for **specific, scoped tasks**: explaining patterns I didn't know (Apollo cache strategies, SSR hydration), suggesting alternatives when I was stuck, and generating boilerplate I'd written before. Architecture decisions, trade-off arbitration, and debugging real bugs stayed mine — those are the parts where the assistant is most likely to be confidently wrong.

### What I'd do differently

- **Add tests from day one.** I have none. Adding them now means working backwards, which is harder than writing them as I go. Top of the backlog.
- **Plan observability earlier.** I only have Docker logs. Sentry + structured logging would have saved me hours of debugging.
- **Reconsider GraphQL.** For a catalog this simple, REST would have been faster to build and easier to cache. GraphQL was the right call for learning, not necessarily for the use case.

### Getting started

**Docker (recommended)**

```bash
git clone <repository-url>
cd vinyl-records-store
cp env.example .env  # fill in Stripe keys
docker-compose up -d
```

The app is then available at `http://localhost`.

**Local development**

```bash
npm install
npm run generate:types
cd apps/vn-record-store-be
npx prisma migrate dev
npx prisma db seed
npx nx serve vn-record-store-be   # terminal 1
npx nx serve vn-record-store-web  # terminal 2
```

See `DOCKER_README.md` for more on the Docker setup.

---

## 🇫🇷 Français

### Pourquoi ce projet

J'ai construit Vinyl Records Store pour apprendre trois technologies que je n'avais jamais utilisées — NestJS, GraphQL et Prisma — dans un même projet cohérent plutôt qu'à travers des tutos isolés.

J'ai choisi un cas d'usage e-commerce volontairement : ça oblige à traiter de vraies problématiques (schéma typé, persistance, paiement, flux async) sans inventer une complexité artificielle. Le thème "vinyles" est juste là pour rendre le catalogue moins ennuyeux que le classique "products".

Ce n'est **pas un produit en prod**. C'est un prototype fonctionnel que je peux faire tourner, déployer et expliquer — et une base que je continue d'étendre quand je veux essayer quelque chose de nouveau (auth, observabilité, tests, etc.).

### Ce que j'ai appris (version honnête)

**GraphQL des deux côtés était plus dur que prévu.** Brancher les resolvers NestJS avec un schéma code-first, c'était la partie facile. Le vrai défi était côté Angular : trouver la bonne configuration d'Apollo Client, gérer la normalisation du cache, et éviter de re-fetcher tout à chaque navigation. J'ai réécrit la couche data deux fois avant d'obtenir un truc qui me satisfaisait.

**Les migrations Prisma "faciles" ont un piège.** J'ai commencé par utiliser `prisma db push` partout parce que "ça marche". Puis j'ai essayé d'ajouter une colonne dans des conditions proches de la prod et j'ai compris la différence entre `db push` (bien pour prototyper) et `migrate dev` / `migrate deploy` (ce qu'il faut vraiment pour faire évoluer un schéma). Leçon douloureuse mais utile.

**SSR + GraphQL + hydratation est un piège classique.** Angular SSR marche très bien jusqu'à ce qu'on ajoute des requêtes GraphQL qui se déclenchent côté client après l'hydratation — là on a du flicker, des fetches en double, et des warnings console. J'ai dû apprendre à transférer l'état du serveur au client proprement. Pas encore parfait.

**Stripe Checkout a été la partie la plus fluide.** Choisir Stripe Checkout plutôt que Payment Intents était un trade-off délibéré : moins de contrôle UX, mais conformité PCI entièrement déchargée. Pour un projet portfolio, c'était le bon choix.

### Architecture
┌──────────────┐       ┌────────────────┐       ┌─────────────────┐
│ Nginx proxy  │───────▶│ Angular 19 SSR │───────▶│ NestJS GraphQL  │
│   port 80    │        │  Apollo Client │        │     API         │
└──────────────┘        └────────────────┘        └────────┬────────┘
│
┌─────────▼─────────┐
│ PostgreSQL        │
│ (Prisma ORM)      │
└───────────────────┘
▲
│  Stripe Checkout (externe)  

Un script de génération de types lit le schéma Prisma et produit les interfaces TypeScript pour le frontend, ce qui maintient le contrat synchronisé sans maintenance manuelle.

### Stack technique

- **Frontend** — Angular 19 (SSR), Apollo Client, Tailwind + DaisyUI
- **Backend** — NestJS, GraphQL (code-first), Prisma
- **Base de données** — PostgreSQL
- **Paiement** — Stripe Checkout
- **Infra** — Docker Compose, Nginx reverse proxy, monorepo Nx

### Comment l'IA a été utilisée

J'ai utilisé Claude / Cursor comme assistant sur des **tâches précises et délimitées** : m'expliquer des patterns que je ne connaissais pas (stratégies de cache Apollo, hydratation SSR), proposer des alternatives quand j'étais bloqué, générer du boilerplate déjà écrit ailleurs. Les décisions d'archi, les arbitrages de trade-offs, et le debugging des vrais bugs sont restés à moi — c'est là que l'assistant est le plus susceptible de se tromper avec confiance.

### Ce que je ferais différemment

- **Ajouter des tests dès le départ.** Je n'en ai pas. Les ajouter maintenant veut dire travailler à rebours, ce qui est plus dur que de les écrire au fil de l'eau. En haut du backlog.
- **Planifier l'observabilité plus tôt.** Je n'ai que les logs Docker. Sentry et des logs structurés m'auraient économisé des heures de debug.
- **Reconsidérer GraphQL.** Pour un catalogue aussi simple, REST aurait été plus rapide à construire et plus facile à mettre en cache. GraphQL était le bon choix pour apprendre, pas forcément pour le cas d'usage.

### Démarrage

**Docker (recommandé)**

```bash
git clone <repository-url>
cd vinyl-records-store
cp env.example .env  # renseigner les clés Stripe
docker-compose up -d
```

L'application est ensuite disponible sur `http://localhost`.

**Développement local**

```bash
npm install
npm run generate:types
cd apps/vn-record-store-be
npx prisma migrate dev
npx prisma db seed
npx nx serve vn-record-store-be   # terminal 1
npx nx serve vn-record-store-web  # terminal 2
```

Voir `DOCKER_README.md` pour plus de détails sur le setup Docker.

---

## License

MIT — see LICENSE file.
