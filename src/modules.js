const { gql } = require('apollo-server');
const hi = require('./hi');
const hello = require('./hello');
const hey = require('./hey');

module.exports = [
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
  },
  hi,
  hello,
  hey
];
