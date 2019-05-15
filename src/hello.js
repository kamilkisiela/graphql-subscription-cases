const { gql } = require('apollo-server');
const pubsub = require('./pubsub');

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
    hello: (_, { name }) => {
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

module.exports = {
  typeDefs,
  resolvers,
};
