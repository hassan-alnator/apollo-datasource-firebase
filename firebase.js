const admin = require('firebase-admin');

const serviceAccount = require('./freemmerce-firebase-adminsdk-b46s0-99e03d464d.json');

 admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://freemmerce.firebaseio.com"
});

module.exports = admin;