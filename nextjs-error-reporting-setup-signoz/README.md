# Base Fullstack App

Akadenia's base fullstack app template.

## Requirements

- node version 20 (lts/iron). You can install this using `nvm` or `fnm`

## Authentication

In this project, it is prepared to have two types of user management. Either using auth0 or native users management.

## Enable the Auth0

Currently all of the needed configurations for the auth0 is there, the only thing there is to add the needed env variables:

- `AUTH0_SECRET`: The secret used by auth0 to communicated with the frontend server, generate it using the following command and put the value there: `openssl rand -hex 32`
- `AUTH0_BASE_URL`: The base url of the current hosting application, in case of local development, it should be `http://localhost:3000`
- `AUTH0_ISSUER_BASE_URL`: The auth0 tenant domain value in the dashboard
- `AUTH0_CLIENT_ID`: The client id in the auth0 dashboard
- `AUTH0_CLIENT_SECRET`: The client secret in the auth0 dashboard.

Please don't forget to:

- Add the callback urls in the settings to be the value of AUTH_BASE_URL and the following path: `/api/auth/callback`
- Add the logout url to the path of the page that handle the user if he is logged out, in this project case it can be the value of AUTH_BASE_URL

## Enable the native user management

Do the following steps:

- Remove the `src/app` folder
- Rename the file `src/pages/archived-index.tsx` to be `src/pages/index.tsx`
- Remove all of the env variables in the `.env` file and the `.env.template`
- Run `npm uninstall @auth0/nextjs-auth0`

That's it.

## How to run project in development

- Copy the content of .env.template into a .env.local file for `packages/client`
- Copy the content of .env.template into a .env.local file for `packages/server`
- Run `npm install` command at root
- Run `npm run migrate` command at root
- From root run `npm run dev` command which will start both the client & server

## Running the project with docker

Alternatively, you can run the project using docker-compose. To do this, you need to have docker and docker-compose installed on your machine. Then run the following commands to build and run the container from the root of the project. This will spin up the app together with a dockerized postgres database.
cp .env.example .env.local
`

    ```
    npm run docker:up
    ```

## Available Scripts

Check the package.json file in the root of the project to see all available scripts. The project uses npm workspaces to manage the client and server packages so some scripts specific to individual packages can be found in the package.json files in the packages/client and packages/server directories.

In the project directory, you can run: `npm install`

Installs all dependencies for client and server packages. `npm run dev`

When developing, run this command to watch for changes on both frontend and backend. The project also makes use of some [shadcn components](https://ui.shadcn.com). Visit the components page for instructions to add new components.

### Running Tests

You can run all the tests in the project using the following command.
`sh
    npm run test
    `

### Running the Server/Backend Tests

In order to prevent the test suite from reverting all the migrations on your main development database, create a dedicated `.env.test` file from `env.test.example` and create a database with the same name as specified in your `.env.test` file. Then you can run all tests in the project using the command below.
`sh
    npm run test:server
    `
