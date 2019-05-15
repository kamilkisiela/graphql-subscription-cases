import { gql } from 'apollo-server';
import pubsub from './pubsub';

const EVENT = 'Hi';

const typeDefs = gql`
  extend type Mutation {
    hi(name: String!): String!
  }

  extend type Subscription {
    hi: Hi!
  }

  type Hi {
    message: String!
  }
`;

const resolvers = {
  Mutation: {
    hi: (_: any, { name }: { name: string }) => {
      const message = `Hi ${name}`;

      // Emits just a string
      pubsub.publish(EVENT, message);

      return message;
    },
  },
  Subscription: {
    hi: {
      subscribe: () => {
        return pubsub.asyncIterator<string>(EVENT);
      },
      // we receive that string as `parent` and resolve the Hi object
      resolve: (parent: string) => {
        return {
          message: parent,
        };
      },
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
