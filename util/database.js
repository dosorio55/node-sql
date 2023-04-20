import { Sequelize } from "sequelize";

const sequelizeEnviroment = new Sequelize("node-complete", "root", "mysql123", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelizeEnviroment;
