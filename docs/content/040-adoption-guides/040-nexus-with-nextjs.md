---
title: Nexus With Next.js
---

## Nexus in a Next.js Project

Next.js comes with a feature called [API Routes](https://nextjs.org/docs/api-routes/introduction). With API Routes, we can easily create dedicated endpoints to use in our Next.js applications. These endpoints can then be deployed as serverless functions.

In this guide, we'll see how to work with Next.js API Routes to serve a Nexus Schema GraphQL API and then consume it from the front end.

## Getting Started

Let's start by creating a new Next.js application. If you already have a Next.js app, you can ignore this step.

```bash
npx create-next-app
# Provide a name for your app
```

After installation, we need to opt-in to use TypeScript. To do this, let's create a `tsconfig.json` file at the project root. Next.js will take care of populating this file for us.

```bash
touch tsconfig.json
```

Next, install `typescript` and `@types/react`.

```bash
npm i -D typescript @types/react
```

To finish out the TypeScript setup, run the app in development mode. This will populate the `tsconfig,json` file.

```bash
npm run dev
```

For more information on using TypeScript in Next.js, check out [the docs](https://nextjs.org/docs/basic-features/typescript).

With the Next.js project in place, we now need to install the other dependencies we'll need.

In addition to Nexus Schema, we'll need a server to run the GraphQL API. Nexus Schema works with a range of GraphQL servers. We'll use Apollo Server and opt for the `apollo-server-micro` variety as it is well-suited to serverless environments.

```bash
npm i @nexus/schema apollo-server-micro
```

## Create an API Route

Next.js API routes work on a folder-based convention. Any TypeScript (or JavaScript) file found under the `pages/api` directory will become an API route.

If we wanted to approximate a REST API or otherwise use JSON data endpoints, we could create one file per endpoint in this directory. However, since we're using GraphQL, we just need a single endpoint and, consequently, a single file in this directory.

Create a file under `pages/api` called `graphql.ts`.

```bash
cd pages/api
touch graphql.ts
```

Next.js API routes typically export `handler` function that approximates an express endpoint. The function has `NextApiRequest` and `NextApiResponse` parameters which are used to read information about the incoming request and respond appropriately.

For our GraphQL-based API route, we need to adjust this function slightly. Instead of exporting a `handler` function directly, we'll call the `createHandler` method on our instance of Apollo Server.

Populate the `graphql.ts` file with a simple schema and server. Then, expose the server at a path of `/api/graphql`.

```ts
// pages/api/graphql.ts

import { makeSchema, queryType } from '@nexus/schema'
import { ApolloServer } from 'apollo-server-micro'

const Query = queryType({
  definition(t) {
    t.string('hello', { resolve: () => 'hello world!' })
  },
})

const schema = makeSchema({
  types: [Query],
})

const server = new ApolloServer({
  schema,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default server.createHandler({
  path: '/api/graphql',
})
```

Now if we navigate to `localhost:3000/api/graphql`, we should see the GraphQL Playground and we should be able to make a query for the 'hello world!' message.

![graphql playground with the hello world message](/assets/next-nexus-1.png)

## Create a Schema

When creating a schema with Nexus, we have the option of housing all the parts of the schema in a single file or we can split it out into many files. In either case, it's tempting to place these files near the `graphql.ts` API route. However, since Next.js will create an API route for every file in the `pages/api` directory, we should take care **not** to do this.

It's best to keep all the parts of your schema in a separate directory. Most often, this will be a directory at the root of your project.

Create a diretory called `schema` at the project root.

```bash
mkdir schema
```

Let's start by creating a schema to retrieve some data with the `queryType`.

in the `schema` directory, create a file called `Query.ts`.

```bash
cd schema
touch Query.ts
```

At the very least, this file should export a `queryType` that can be used in our schema.

Let's create and export a `Query` constant, as well as a `Framework` object type to represent a set of front end technologies.

```ts
// schema/Query.ts

import { objectType, queryType } from '@nexus/schema'

export const Framework = objectType({
  name: 'Framework',
  definition(t) {
    t.id('id')
    t.string('name')
  },
})

export const Query = queryType({
  definition(t) {
    t.list.field('frameworks', {
      type: 'Framework',
      resolve: () => {
        return [
          {
            id: '1',
            name: 'React',
          },
          {
            id: '2',
            name: 'Vue',
          },
          {
            id: '3',
            name: 'Angular',
          },
          {
            id: '4',
            name: 'Svelte',
          },
        ]
      },
    })
  },
})
```

Let's now create a barrel file in the `schema` directory which will be responsible for importing all the types in the directory and exporting a constructed schema using `makeSchema`.

```bash
cd schema
touch index.ts
```

In the `index.ts` file, bring in `makeSchema` as well as the types we just created in `Query.ts`.

```ts
// schema/index.ts

import { makeSchema } from '@nexus/schema'
import { Framework, Query } from './Query'

const schema = makeSchema({
  types: [Framework, Query],
})

export default schema
```

Now in the `graphql.ts` for our API route, we can simple pull in the constructed schema and serve it with Apollo Server.

```ts
// pages/api/graphql.ts

import { ApolloServer } from 'apollo-server-micro'
import schema from './../../schema'

const server = new ApolloServer({
  schema,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default server.createHandler({
  path: '/api/graphql',
})
```

If we head back over to `localhost:3000/api/graphql`, we can see results for our call for `frameworks`.

![graphql playground showing a list of front end frameworks from a graphql query](/assets/next-nexus-2.png)

## Call the GraphQL API from the Front End

In a Next.js app, we have several options for producing our pages:

- Server-side rendering using the `getServerSideProps` function
- Static site generation using the `getStaticProps` function
- Client-side rendering

No matter how we want to produce our pages, we can call our API to get data to display.

If we would like to use server-side rendering, we can use a library like `graphql-request` to make an API call.

Start by intalling the `graphql-request` library.

```bash
npm i graphql-request
```

Create a function called `getServerSideProps` and make a call to our GraphQL API. The returned data can be supplied in the returned object which will make it available as a `prop` in the function that produces the page. Next.js will take care of treating this page as a server-side rendered page.

```ts
// pages/index.tsx

import { request, gql } from 'graphql-request'

export async function getServerSideProps() {
  const query = gql`
    {
      frameworks {
        id
        name
      }
    }
  `
  const data = await request('http://localhost:3000/api/graphql', query)
  const { frameworks } = data
  return {
    props: {
      frameworks,
    },
  }
}

export default function Home({ frameworks }) {
  return (
    <div>
      <ul>
        {frameworks.map((f) => (
          <li key={f.id}>{f.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

When the page renders, we'll see a list of the frameworks.

![a next.js page rendered with a list of frameworks](/assets/next-nexus-3.png)

**Note:** Using `graphql-request` to make a server-side call for data from our GraphQL API is good for initially fetching the data but it won't do much for us if we want to have client-side GraphQL features such as caching. If we want additional features like those provided by Apollo Client, it won't work to mix the data retrieved in the `getServerSideProps` function with data managed on the client by Apollo.

## Schema and Type Generation

A GraphQL SDL file and Nexus typings can automatically be generated by configuring the `outputs` option in `makeSchema`. In a typical project, we can tell Nexus where to place these files by using `__dirname` to define a path. That might looks something like this:

```ts
const schema = makeSchema({
  // ...
  outputs: {
    schema: `${__dirname}/generated/schema.graphql`,
    typegen: `${__dirname}/generated/types.ts`,
  },
})
```

Using `__dirname` in this fashion will not work in a Next.js project. Next.js takes control of `__dirname` and overrides it with special behavior which interferes with our ability to use it as we normally would.

The solution is to use `path.join` and `process.cwd` together to describe where to place the generated files.

In the `schema/index.ts` file, configure `makeSchema` to output the generated SDL and typings using `path.join` and `process.cwd`.

```ts diff
import { makeSchema } from '@nexus/schema';
import { Framework, Query } from './Query';
+import path from 'path';

const schema = makeSchema({
  types: [Framework, Query],
+  outputs: {
+    typegen: path.join(
+      process.cwd(),
+      'generated',
+      'nexus-typegen.ts'
+    ),
+    schema: path.join(
+      process.cwd(),
+      'generated',
+      'schema.graphql'
+    )
  }
});

export default schema;
```

## Additional Resources

For more on how to integrate Nexus into a Next.js project, check out these resources:

- [Complete Introduction to Fullstack, Type-Safe GraphQL (feat. Next.js, Nexus, Prisma)](https://dev.to/prisma/complete-introduction-to-fullstack-type-safe-graphql-feat-next-js-nexus-prisma-c5)