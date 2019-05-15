import { gql } from 'apollo-server';
import pubsub from './pubsub';

const EVENT = 'Hey';

const typeDefs = gql`
  extend type Mutation {
    hey(name: String!): String!
  }

  extend type Subscription {
    hey: Hey!
  }

  type Hey {
    message: String!
  }
`;

const resolvers = {
  Mutation: {
    hey: (_: any, { name }: { name: string }) => {
      const message = `Hey ${name}`;

      // Emits an object with a key matching subscription's name
      // and Hey object as its body.
      pubsub.publish(EVENT, {
        hey: {
          message,
        },
      });

      return message;
    },
  },
  Subscription: {
    hey: {
      // Because subscription's name is the key in emitted event
      // GraphQL matches it with `hey` subscription and resolves with the Hey object
      subscribe: () => {
        return pubsub.asyncIterator(EVENT);
      },
      // no need to use `resolve: parent => parent`
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
