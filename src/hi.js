const { gql } = require('apollo-server');
const pubsub = require('./pubsub');

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
    hi: (_, { name }) => {
      const message = `Hi ${name}`;

      // Emits just a string
      pubsub.publish(EVENT, message);

      return message;
    },
  },
  Subscription: {
    hi: {
      subscribe: () => {
        return pubsub.asyncIterator(EVENT);
      },
      // we receive that string as `parent` and resolve the Hi object
      resolve: parent => {
        return {
          message: parent,
        };
      },
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
