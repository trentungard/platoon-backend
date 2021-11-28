const { gql } = require('apollo-server-express');
const { faunaClient, getUser, addUser, removeUser } = require('../fauna');

exports.typeDefs = gql`
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields for every book in our data source.
    type User {
        firstName: String!,
        lastName: String!,
        userName: String!,
        uid: String!,
        undercover: String!,
        setupComplete: Boolean!
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        user: User
    }

    type Mutation {
        addUser(
            firstName: String,
            lastName: String,
            userName: String,
            uid: String,
            undercover: String,
            setupComplete: Boolean
        ): User
    }
    
    type Mutation {
        removeUser(
            uid: String
        ): User
    }
`;

exports.resolvers = {
    Query: {
      user() {
        return {
            firstName: getUser()
        };
      }
    },
    Mutation: {
        addUser( parent, args ) {
            console.log('args', args)
            const query = addUser(args);
            console.log(query);
            // return user;
        }
    },
    Mutation: {
        removeUser( parent, args){
            console.log('args', args);
            const query = removeUser(args);
            console.log(query);
        }
    }
};