import { Model, DataTypes, Sequelize } from "sequelize";

export default class Users extends Model {
  id!: number;
  nickName!: string;
  name!: string;
  gender!: "F" | "M" | null;
  profileImg?: string;
  birthday?: string;

  public static initModel(sequelize: Sequelize) {
    return Users.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        gender: {
          type: DataTypes.ENUM("F", "M"),
          allowNull: false,
        },
        profileImg: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        birthday: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        wallet: {
          type: DataTypes.STRING(42),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: false,
        modelName: "Users",
        tableName: "users",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
}
