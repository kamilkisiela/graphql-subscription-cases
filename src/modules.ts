import { gql } from 'apollo-server';
import hi from './hi';
import hello from './hello';
import hey from './hey';

export default [
  {
    typeDefs: gql`
      type Query {
        _dummy: Boolean
      }

      type Mutation {
        _dummy: Boolean
      }

      type Subscription {
        _dummy: Boolean
      }
    `,
    resolvers: {},
  },
  hi,
  hello,
  hey,
];
