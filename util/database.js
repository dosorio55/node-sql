import mongoose from "mongoose";
import { config } from "dotenv";

config()

const dbHost = process.env.SERVER_URL

let db;
// const DB_URL = "mongodb://127.0.0.1:27017/node-complete";

const mongoConnect = async (connectCallback) => {
  try {
    await mongoose.connect(dbHost);

    connectCallback();
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
