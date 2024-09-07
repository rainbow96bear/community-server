import { Config } from "@_types/index";
import dotenv from "dotenv";

dotenv.config();

export const databaseConfig: Config = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME || "its-playground",
    host: "localhost",
    port: process.env.DB_PORT || 3306,
  },
  test: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME || "its-playground",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
  },
  production: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME || "its-playground",
    host: process.env.PRODUCT_DB_HOST || "community-mysql",
    port: process.env.DB_PORT || 3306,
  },
};
