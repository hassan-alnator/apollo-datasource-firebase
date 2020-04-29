const { gql } = require('apollo-server');

const typeDefs = gql`


type Country {
	id: ID!
	name: String!
	iso: String!
}

type Store {
	id: ID!
	name: String!
	country: [Country]!
}

type StoreTemplate {
	id: ID!
	name: String!
	logo: String!
	store: Store!
}


type StoreCategories {
	id: ID!
	name: String!
	store: Store!
}


type StoreProducts {
	id: ID!
	name: String!
	category: StoreCategories!
	store: Store!
}

type ProductAttributes {
	id: ID!
	name: String!
	value: String!
	product: StoreProducts!
	store: Store!
}

type ProductImages {
	id: ID!
	image: String!
	product: StoreProducts!
	store: Store!
}

type StoreUser {
	id: ID!
	email: String!
	name: String!
	phone: String!
	address: [UserAddress]!
	oauth: String!
	country: Country!
}


type UserAddress {
	id: ID!
	country: Country!
	street: String!
	city: String!
	area: String!
	landmark: String!
}


type Query {
  store(id: ID!): Store
  country(id: ID!): Country
}



input CreateCountryInput {
	name: String!
	iso: String!
}

input UpdateCountryInput {
	id: ID!
	name: String
	iso: String
}


input DeleteCountryInput {
	id: ID!
}



input CreateStoreInput {
	name: String!
}


input UpdateStoreInput {
	id: ID!
	name: String
}


input DeleteStoreInput {
	id: ID!
}

type Mutation {
  createCountry(input: CreateCountryInput!): Country
  updateCountry(input: UpdateCountryInput!): Country
  deleteCountry(input: DeleteCountryInput!): Country
  createStore(input: CreateStoreInput!): Store
  updateStore(input: UpdateStoreInput!): Store
  deleteStore(input: DeleteStoreInput!): Store

 

}


`;

module.exports = typeDefs;
