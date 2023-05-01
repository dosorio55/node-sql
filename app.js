import path from "path";
import express from "express";
// import get404 from "./controllers/error.js";
import shopRoutes from "./routes/shop.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cors from "cors";
// import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import mongoConnect from "./util/database.js";

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

server.use("/admin", adminRoutes);
server.use(shopRoutes);

// server.use(get404);

const PORT = process.env.PORT || 4000;

mongoConnect(() => {
  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
