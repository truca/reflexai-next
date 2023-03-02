# TypeScript Next.js example

This is a really simple project that shows the usage of Next.js with TypeScript.

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) or preview live with [StackBlitz](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-typescript)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-typescript&project-name=with-typescript&repository-name=with-typescript)

## How to use it?

### Prerequisites

- node installed
- mongo installed

### setup

- clone this repo
- start the mongo service
- add a `.env.local` file in the root folder of the project, with these contents (modify them if you have a different setup)

```
MONGODB_URI=mongodb://127.0.0.1:27017/reflexai
SOCKETS_SERVER_URI=http://127.0.0.1:5000/
REST_SERVER_URI=http://localhost:3000/
```

```
npm install
npm dev
```

## Deploy

Digital Ocean is an option, another option would be to host on any platform that supports docker containers with 3 containers: next, express and mongo. Another option for mongo would be to use Mongo Atlas

## Future improvements

- Add password for users
- Improve the bot responses
- Add Integration/e2e tests
- Add monitoring/logs
- Add storybook for the components
