import { Model, DataTypes, Sequelize } from "sequelize";

export default class Users extends Model {
  platform!: string;
  id!: string;
  nickname!: string;
  profile_image?: string;
  wallet?: string;

  public static initModel(sequelize: Sequelize) {
    return Users.init(
      {
        platform: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true, // Primary Key 설정
        },
        id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true, // Primary Key 설정
        },
        nickname: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        profile_image: {
          type: DataTypes.STRING,
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
