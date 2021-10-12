import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import isEmail from 'isemail';
import { MongoClient } from 'mongodb';

import {schema} from './graphql/schema/schema.js';
import {resolvers} from './graphql/resolvers/resolvers.js';
import {MoviesAPI} from './utils/moviesAPI.js';
import {Users} from './utils/users.js';

dotenv.config();

// Connect to MongoDB
const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_USER_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DB}`)
client.connect();

// Set up any Datasources our resolvers need
const dataSources = () => ({
  moviesApi: new MoviesAPI(),
  users: new Users(client.db().collection('users'))
})

// The function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  const auth = (req.headers && req.headers.authorization) || '';
  const email = Buffer.from(auth, 'base64').toString('ascii');
  if(!isEmail.validate(email)) return { user: null };
  const user = await client.db().collection('users').findOne({email: email});
  // if (!user) throw new AuthenticationError('you must be logged in');
  return { user };
}

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: process.env.PORT }, resolve));
  console.log(`🚀 Server ready at http://${process.env.URL}:${process.env.PORT}${server.graphqlPath}`);
}

startApolloServer(schema, resolvers)