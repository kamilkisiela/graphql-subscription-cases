const { ApolloServer } = require('apollo-server');
const { merge } = require('lodash');
const modules = require('./modules');

const server = new ApolloServer({
  typeDefs: modules.map(m => m.typeDefs),
  resolvers: merge(
    {},
    ...modules.filter(m => m.resolvers).map(m => m.resolvers),
  ),
  rootValue: {
    version: 42,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
