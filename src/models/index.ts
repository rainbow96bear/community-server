import { Sequelize } from "sequelize";
import { databaseConfig } from "./../config/databaseConfig";
import Users from "./Users";

const db: any = { Users };

let sequelize = new Sequelize(
  databaseConfig.development.database,
  databaseConfig.development.username,
  databaseConfig.development.password,
  {
    host: databaseConfig.development.host,
    dialect: "mysql",
  }
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Users = Users.initModel(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
