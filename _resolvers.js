

const resolvers = {
  Query: {
    country: async (_, { id }, { dataSources: { StoreAPI } }) => {
      return await StoreAPI.getCountryById(id)
    },
    store: async (_, { id }, { dataSources: { StoreAPI } }) => {
      return await StoreAPI.getStoreById(id)
    },
  },
  Store: {
    country: async (parent, __, { dataSources: { StoreAPI } }) => {
      const c = await StoreAPI.getCountryById(parent.country[0])
      return [c]
    }
  }
};

module.exports = resolvers;
