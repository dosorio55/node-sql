import path from "path";
import express from "express";
import get404 from "./controllers/error.js";
import shopRoutes from "./routes/shop.route.js";
import adminRoutes from "./routes/admin.js";
// import bodyParser from "body-parser";
import sequelizeEnviroment from "./util/database.js";
import { fileURLToPath } from 'url';

const server = express();

server.set("view engine", "ejs");
server.set("views", "views");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(express.static(path.join(path.resolve(), "public")));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
server.use(express.static(path.join(__dirname, 'public')));

server.use("/admin", adminRoutes);
server.use(shopRoutes);

server.use(get404);

const PORT = process.env.PORT || 3000;

sequelizeEnviroment.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
