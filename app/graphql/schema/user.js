import { gql } from 'apollo-server-express';

const User = gql`
  # DATA TYPES

  type User {
    id: ID!
    username: String
    firstName: String
    lastName: String
    isActive: Boolean
    note(limit: Int): [Note]
  }

  # RESPONSE TYPES

  type UsersResponse {
    status: Int!
    message: String!
    data: [User]
  }

  type UserResponse {
    status: Int!
    message: String!
    data: User
  }

  # Input

  input AddNewUserInput {
    id: String
    firstName: String
    lastName: String
    isActive: Boolean
    username: String
  }

  # Query

  extend type Query {
    getAllUsers: UsersResponse!
    getUserById(id: String): UserResponse!
  }

  # mutation
  extend type Mutation {
    addNewUser(data: AddNewUserInput!): UserResponse!
  }
`;

export default User;
