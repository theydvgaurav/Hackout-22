const MongoClient = require('mongoose');
require('dotenv').config();
module.exports = MongoClient.connect(process.env.DB_CONNECTION, () => { console.log('DB Successfully Connected') });