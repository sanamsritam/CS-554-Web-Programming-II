const MongoClient = require("mongodb").MongoClient;
const mongoConfig = {
  serverUrl:
    "mongodb+srv://admin:root@cluster0-yn6h4.mongodb.net/test?retryWrites=true&w=majority",
  database: "Sanam_Jena_Mongoose_Test",
};

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true,
    });
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;
};
