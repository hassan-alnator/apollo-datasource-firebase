const admin = require('firebase-admin');
const { DataSource } = require('apollo-datasource');
const { UserInputError } = require('apollo-server');

const serviceAccount = require('<path_to_service_account_file>');
const databaseURL = "<database_url>";

class FirebaseDatasource extends DataSource {

  constructor() {

    super();

    // initialize App only once cased by the IntrospectionQuery operation
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL
      });

      this.admin = admin;
    }

    if (!this.db) {
      this.db = admin.firestore();
    };
  }

/**
 * Input error when record not found
 *
 * @param {*} id
 * @memberof FirebaseDatasource
 */
idNotFound(id) {
    throw new UserInputError(
        'id not found',
        { error: `ID ${id} not found` }
      );
  }

  /**
   * get a collection from database 
   *
   * @param {*} collection
   * @returns
   * @memberof StoreAPI
   */
  async getCollection(collection) {
    let snapshot = await this.db.collection(collection).get();
    
    return snapshot.map((doc) => {
      const data = doc.data();
      return { id: doc.id, ...data };
    });
  }

  /**
   * get a collection record by Id
   *
   * @param {*} collection
   * @param {*} id
   * @returns
   * @memberof StoreAPI
   */
  async getDocumentById(collection, id) {
    let ref = this.db.collection(collection).doc(id);
    let getDoc = await ref.get().catch(e => { throw Error(e) });
    let data = getDoc.data()

    if(!data) {
        this.idNotFound(id)
    }

    return data;
  }

  

}


module.exports = FirebaseDatasource;
