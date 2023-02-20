# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
git checkout dev-3
```

```
npm install
```

## Running application

Rename .env.example to .env

## Migrations
All migrations generates from src/migrations/typeOrm.config.ts file.

### Scripts
```npm run migration:generate``` - generate new migration file with template {timestamp}-migrations

```npm run migration:run``` - run existing migrations for create tables in database.

