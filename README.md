# Project Name

## Description

This project is built with a NestJS backend to provide robust and customizable APIs, moving beyond the limitations of a mock API. The frontend is an Angular application that leverages NgRx entity stores to simplify network management and maintain scalability. The development is organized within an Nx monorepository to streamline scaffolding, enforce best practices, and enable potential code sharing across apps and layers. TailwindCSS and Angular Material components are chosen to ease development of responsive and beautiful UI, providing great UX.

## Features

- **NestJS Backend**: Author and Signalement full CRUD APIs.
- **Angular Frontend**: The latest version of Angular allows to build complex apps quickly and efficiently, leveraging the latest features to make the DX smooth.
- **NgRx Entity Stores**: Abstracts network management in the Angular app for cleaner code and efficient state handling, sharing of data thanks to the centralized repository.
- **Nx Monorepository**: Automate the creation of components and services following guidelines defined by the team. Ability reduce CI cost with their cloud tech.
- **Dedicated Pages for Entities**: Two main pages manage separate entities effectively, utilizing reusable components for user input across domains while keeping code modular and domain-specific.

## Remaining Work

1. **DTO Validation**: Strengthen the backend by ensuring consistent and secure data validation.
2. **Error Management**: Enhance backend error handling for meaningful user-facing error messages.
3. **Feature Store for Signalement Form**: Implement a store to maintain user session data, allowing work continuity even when navigating away from the form page.

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
