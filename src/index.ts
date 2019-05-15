import { ApolloServer } from 'apollo-server';
import { merge } from 'lodash';
import modules from './modules';

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

async function main() {
  const { url } = await server.listen();
  
  console.log(`🚀 Server ready at ${url}`);
}

main();
