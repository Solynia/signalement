# Signalement

## Initial steps

Before starting the app the first time, run:

```sh
npx nx run prisma-schema:migrate
```

will initialize your local DB

```sh
npx nx run prisma-schema:generate-types
```

will generate DB types and client used in the backend

## Run tasks

To run the dev servers for your app, use:

```sh
npx nx serve signalement
```

```sh
npx nx serve signalement-api
```

## Model changes

After every changes on a Prisma model, run

```sh
npx nx run prisma-schema:migrate
```

will create a migration script and update your local DB

```sh
npx nx run prisma-schema:generate-types
```

will refresh the generated DB types and client used in the backend
