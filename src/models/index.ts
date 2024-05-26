import { Sequelize } from "sequelize";
import { databaseConfig } from "./../config/databaseConfig";

export const sequelize = new Sequelize(
  databaseConfig.development.database,
  databaseConfig.development.username,
  databaseConfig.development.password,
  {
    host: databaseConfig.development.host,
    dialect: "mysql",
  }
);
