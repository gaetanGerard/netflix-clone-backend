import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

import {schema} from './graphql/schema/schema.js';
import {resolvers} from './graphql/resolvers/resolvers.js';
import {MoviesAPI} from './utils/moviesAPI.js';

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        moviesApi: new MoviesAPI()
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: process.env.PORT }, resolve));
  console.log(`🚀 Server ready at http://${process.env.URL}:${process.env.PORT}${server.graphqlPath}`);
}

startApolloServer(schema, resolvers)