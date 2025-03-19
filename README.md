# Kaioken Fullstack Boilerplate

This is a fullstack app powered by:

- [Hono](https://hono.dev)
- [Lucia](https://lucia-auth.com)
- [Drizzle](https://orm.drizzle.team)
- [Vike](https://vike.dev)
- [Telefunc](https://telefunc.com)
- [Kaioken](https://kaioken.dev)

## _Setup_

First, ensure that `DATABASE_URL` is configured in `.env` file.

```bash
DATABASE_URL="db.sqlite"
```

Then, run the following commands:

```bash
pnpm install # install dependencies
pnpm drizzle:generate # a script that executes drizzle-kit generate.
pnpm drizzle:migrate # a script that executes drizzle-kit migrate.
```

> \[!NOTE]
> The `drizzle-kit generate` command is used to generate SQL migration files based on your Drizzle schema.
>
> The `drizzle-kit migrate` command is used to apply the generated migrations to your database.
>
> Read more on [Drizzle ORM documentation](https://orm.drizzle.team/docs/overview)

---

### _OAuth Configuration_

#### See [GitHub documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) to configure your GitHub OAuth app, then set up the following environment variables:

```bash
GITHUB_CLIENT_ID = #your-github-client-id
GITHUB_CLIENT_SECRET = #your-github-client-secret
```

---

### You're ready to go! 🎉

```bash
pnpm dev # start the development server
pnpm build # build the production app
pnpm preview # preview the production app
```
