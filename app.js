import path from "path";
import express from "express";
import bodyParser from "body-parser";
import get404 from "./controllers/error.js";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import sequelizeEnviroment from "./util/database.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(import.meta.url, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

sequelizeEnviroment
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    error;
  });
