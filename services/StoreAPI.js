const FirebaseDatasource = require('../lib/apollo-datasource-firebase');

class StoreAPI extends FirebaseDatasource {

  constructor() {
    super();
  }

  async getCountryById(id) {
    const data = await this.getDocumentById('Country', id);
    if (data) {
      return { id, ...data }
    } else {
      throw new UserInputError(
        'id not found',
        { error: `ID ${id} not found` }
      );
    }
  }

  async getAllCountries() {
    return await this.getCollection('Country');
  }

  async getStoreById(id) {
    const data = await this.getDocumentById('Store', id);
    if (data) {
      return { id, ...data }
    } else {
      throw new UserInputError(
        'id not found',
        { error: `ID ${id} not found` }
      );
    }
  }

  async getAllStores() {
    return await this.getCollection('Store');
  }

}


module.exports = StoreAPI;