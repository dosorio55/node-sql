import path from "path";
import express from "express";
// import get404 from "./controllers/error.js";
import shopRoutes from "./routes/shop.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
// import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import mongoConnect from "./util/database.js";
import session from "express-session";
// import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import MongoDBStore from "connect-mongodb-session";
import handleLogin from "./util/sessionHanlder.js";

dotenv.config();

const dbHost = process.env.SERVER_URL;

const server = express();

server.set("view engine", "ejs");
server.set("views", "views");

/* it is use to transform the information incoming from the http requests */
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(express.static(path.join(path.resolve(), "public")));

server.use(cors("*"));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
server.use(express.static(path.join(__dirname, "public")));

const MongoDBStoreSession = MongoDBStore(session);
var store = new MongoDBStoreSession({
  uri: dbHost,
  collection: "sessions",
});

server.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

server.use("/user", userRoutes);
server.use(handleLogin);
server.use("/admin", adminRoutes);
server.use("/cart", shopRoutes);

const PORT = process.env.PORT || 4000;

mongoConnect(() => {
  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
