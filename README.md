## Contents

- [_Cloudflare D1_](#cloudflare-d1)
  - [Setup](#setup)

- [_Drizzle_](#drizzle)

- [_Better Auth_](#better-auth)

- [_Kaioken+Vike_](#kaioken)
  - [`/pages/+config.ts`](#pagesconfigts)
  - [Routing](#routing)
  - [`/pages/_error/+Page.jsx`](#pages_errorpagejsx)
  - [SSR](#ssr)
  - [HTML Streaming](#html-streaming)

## _Cloudflare D1_

### Setup

Create a D1 database with the following command:

```sh
wrangler d1 create <your-db-name>
```

Then, copy the output to `wrangler.toml`.

Finally, update the `d1:migrate` script (in `package.json`) to replace `YOUR_DATABASE_NAME`, and execute it.

> \[!NOTE]
> For reference, a good database name is:
>
> - Typically a combination of ASCII characters, shorter than 32 characters, and uses dashes (-) instead of spaces.
> - Descriptive of the use-case and environment. For example, “staging-db-web” or “production-db-backend”.
> - Only used for describing the database, and is not directly referenced in code.

## _Drizzle_

Run the following commands to create the database:

```bash
pnpm drizzle:generate # a script that executes drizzle-kit generate.
pnpm drizzle:migrate # a script that executes drizzle-kit migrate.
```

> \[!NOTE]
> The `drizzle-kit generate` command is used to generate SQL migration files based on your Drizzle schema.
>
> The `drizzle-kit migrate` command is used to apply the generated migrations to your database.

Read more on [Drizzle ORM documentation](https://orm.drizzle.team/docs/overview)

## _Better Auth_

Better Auth is a library for authentication and authorization. It's already wired up with the app, so you can use it out of the box - just set up the `AUTH_SECRET` & `BASE_URL` environment variables.

GitHub authentication is also set up out of the box - just create a GitHub app and set up the `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET` environment variables.

## _Kaioken+Vike_

This app is ready to start. It's powered by [Vike](https://vike.dev) and [Kaioken](https://kaioken.dev).

### `/pages/+config.ts`

Such `+` files are [the interface](https://vike.dev/config) between Vike and your code. It defines:

- A default [`<Layout>` component](https://vike.dev/Layout) (that wraps your [`<Page>` components](https://vike.dev/Page)).
- A default [`title`](https://vike.dev/title).
- Global [`<head>` tags](https://vike.dev/head-tags).

### Routing

[Vike's built-in router](https://vike.dev/routing) lets you choose between:

- [Filesystem Routing](https://vike.dev/filesystem-routing) (the URL of a page is determined based on where its `+Page.jsx` file is located on the filesystem)
- [Route Strings](https://vike.dev/route-string)
- [Route Functions](https://vike.dev/route-function)

### `/pages/_error/+Page.jsx`

The [error page](https://vike.dev/error-page) which is rendered when errors occur.

### SSR

SSR is enabled by default. You can [disable it](https://vike.dev/ssr) for all your pages or only for some pages.

### HTML Streaming

You can enable/disable [HTML streaming](https://vike.dev/stream) for all your pages, or only for some pages while still using it for others.
