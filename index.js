const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const faunaClient = require('./fauna');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');
const { typeDefs, resolvers } = require('./graphql');
const {
    ApolloServer,
    ApolloError,
    ValidationError,
    gql
} = require('apollo-server-express')



async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const port = process.env.PORT || 3001;
    app.use(cors());
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    server.applyMiddleware({ app });

    await new Promise(resolve => httpServer.listen({ port: port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);