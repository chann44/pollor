# 4-4chan

pollor is a crowd-sourced polling app created with React and Nodejs. pollor lets you create edit, update, delete public polls and vote on them publicly.

## Demo Video (click to watch):

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/DUu94GFzigw/0.jpg)](https://www.youtube.com/watch?v=DUu94GFzigw)

## Get Started

Clone the repo to your local machine

```bash
git git@github.com:chann44/pollor.git
```

### NPM Commands

Install all the dependencies

```bash
cd client
yarn
```

Start the client on localhost:5173

```bash
cd client
yarn dev
```

Install all server side dependencies

```bash
cd server
yarn
```

create a .env file and add a DATABASE_URL and JWT_TOKEN_SECRET variable and put your postgres db url and secrete phrase there

create and seed the db

```bash
cd server
npx prisma migrate dev

```

Start the server on localhost:5000

```bash
cd server
yarn dev
```

## Tools Used

- [React](https://reactjs.org)
- [Vite](https://vitejs.dev/)
- [Nodejs](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Axios](https://github.com/axios/axios)
- [Prisma](https://www.prisma.io/)
- [Postgres](https://www.postgresql.org/)
- [Tailwind](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)

Made with :heart: and Typescript
