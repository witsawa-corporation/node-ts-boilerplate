import { gql } from 'apollo-server-express'
import user from './user'

const root = gql`
  scalar DateTime
  scalar EmailAddress
  scalar NegativeFloat
  scalar NegativeInt
  scalar NonNegativeFloat
  scalar NonNegativeInt
  scalar NonPositiveFloat
  scalar NonPositiveInt
  scalar PhoneNumber
  scalar PositiveFloat
  scalar PositiveInt
  scalar PostalCode
  scalar UnsignedFloat
  scalar UnsignedInt
  scalar URL
  scalar ObjectID
  scalar BigInt
  scalar Long
  scalar GUID
  scalar HexColorCode
  scalar HSL
  scalar HSLA
  scalar IPv4
  scalar IPv6
  scalar ISBN
  scalar MAC
  scalar Port
  scalar RGB
  scalar RGBA
  scalar USCurrency
  scalar JSON
  scalar JSONObject
  scalar Hexadecimal
  scalar IBAN

  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`

const typeDefs = [root, user]

export default typeDefs
