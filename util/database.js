import { MongoClient } from "mongodb";

let db;
const DB_URL = "mongodb://127.0.0.1:27017/node-complete";

// const mongoConnect = (callback) => {
//   MongoClient.connect(DB_URL)
//     .then((client) => {
//       db = client.db();
//       callback();
//     })
//     .catch((error) => console.log(error));
// };

const mongoConnect = async (connect) => {
  try {
    const client = await MongoClient.connect(DB_URL);
    db = client.db();

    connect();
  } catch (error) {
    console.log(error);
  }
};

const getDb = () => {
  if (db) return db;
  throw "no DB found";
};

export { getDb };

export default mongoConnect;
