<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


# NestJS Project: Library Management

This project is a RESTful API developed with NestJS that allows the management of tournaments.
video games (esports) at the Colombian level. The API is designed following REST conventions and is documented using Swagger..

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Execute the Project](#execute-the-project)
- [API Documentation](#api-documentation)
- [Available Scripts](#available-scripts)
- [Contribute](#contribute)
- [License](#license)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Vercel for deployment (optional)

## Facility

1. Clone the repository:

     ´´´bash
   git clone https://github.com/holas1356/Tournaments.git
   cd tournament
   ´´´

2.Install the dependencies:

   ´´´bash
   npm install
   ´´´

## Environment Variables

Create a `.env` file in the project root and add the following variables:

´´´env
DB_PORT="5432"
POSTGRES_USER="default"
POSTGRES_HOST="ejemplo"
POSTGRES_PASSWORD="ejemplo"
POSTGRES_DATABASE="ejemplo"
DB_SSL=true
´´´

## Execute the Project

1.Run the migrations to configure the database:

   ´´´bash
   npm run typeorm migration:run
   ´´´

2. Start the development server:

   ´´´bash
   npm run start:dev
   ´´´

   The API will be available in`http://localhost:3000`.

## API documentation

The API documentation is generated with Swagger. To access it, open `http://localhost:3000/api` in your browser.

## Available Scripts

- `start`: Start the server in production mode.
- `start:dev`: Start the server in development mode.
- `start:debug`: Start the server in debug mode.
- `build`: Compile the project.
- `test`: Run the tests.
- `typeorm migration:run`: Run database migrations.

## Contribute

1. Create a new branch (`git checkout -b feature/new-feature`)
2. Make the necessary changes and commit (`git commit -m 'Add new functionality'`)
3. Upload the changes (`git push origin feature/new-feature`)
4. Open a Pull Request