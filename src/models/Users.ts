import { Model, DataTypes, Sequelize } from "sequelize";

export default class Users extends Model {
  id!: number;
  platform!: string;
  user_id!: string;
  nickname!: string;
  profile_image?: string;
  wallet?: string;

  public static initModel(sequelize: Sequelize) {
    return Users.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        platform: {
          type: DataTypes.STRING,
          allowNull: false,
          // primaryKey: true,
        },
        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
          // primaryKey: true,
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
        indexes: [
          {
            unique: true,
            fields: ["platform", "user_id"],
          },
        ],
      }
    );
  }
}
