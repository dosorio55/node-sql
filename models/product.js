import { Sequelize } from "sequelize";
import sequelizeEnviroment from "../util/database.js";

const Product = sequelizeEnviroment.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: { type: Sequelize.STRING, allowNull: true },
});

export default Product;
