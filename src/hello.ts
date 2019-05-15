import { gql } from 'apollo-server';
import pubsub from './pubsub';

const EVENT = 'Hello';

const typeDefs = gql`
  extend type Mutation {
    hello(name: String!): String!
  }

  extend type Subscription {
    hello: Hello!
  }

  type Hello {
    message: String!
  }
`;

const resolvers = {
  Mutation: {
    hello: (_: any, { name }: { name: string }) => {
      const message = `Hello ${name}`;

      // Emits Hello object
      pubsub.publish(EVENT, {
        message,
      });

      return message;
    },
  },
  Subscription: {
    hello: {
      // GraphQL can't resolve the subscription
      // but if we would implement a simple resolver like this `resolve: parent => parent`
      // it will work...
      subscribe: () => {
        return pubsub.asyncIterator(EVENT);
      },
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
