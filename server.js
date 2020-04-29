const { ApolloServer } = require('apollo-server');

const typeDefs = require("./_typeDefs");
const resolvers = require("./_resolvers");
const StoreAPI = require("./services/StoreAPI");

const env = process.env.ENV;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        StoreAPI: new StoreAPI()
    }),
    introspection: env === "development",
    playground: env === "development",
});


server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});