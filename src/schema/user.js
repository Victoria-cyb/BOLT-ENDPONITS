const { gql } = require('graphql-tag');

const typeDefs = gql`
  enum Role {
    DRIVER
    COURIER
    RESTAURANT
    STORE
    FLEET_OWNER
    BOLT_BUSINESS
  }

  type User {
    id: ID!
    email: String!
    role: Role!
    name: String!
    phone: String
    licenseDetails: String
    vehicleType: String
    businessName: String
    fleetDetails: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    signupDriver(email: String!, password: String!, name: String!, phone: String, licenseDetails: String!): AuthPayload!
    signupCourier(email: String!, password: String!, name: String!, phone: String, vehicleType: String!): AuthPayload!
    signupRestaurant(email: String!, password: String!, name: String!, phone: String, businessName: String!): AuthPayload!
    signupStore(email: String!, password: String!, name: String!, phone: String, businessName: String!): AuthPayload!
    signupFleetOwner(email: String!, password: String!, name: String!, phone: String, fleetDetails: String!): AuthPayload!
    signupBoltBusiness(email: String!, password: String!, name: String!, phone: String, businessName: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    forgotPassword(email: String!): Boolean!
    resetPassword(otp: String!, newPassword: String!): Boolean!
  }
`;

module.exports = typeDefs;