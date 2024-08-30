import { Model, DataTypes, Sequelize, Association } from "sequelize";
import Posts from "./Posts";

export default class Users extends Model {
  public id!: number;
  public platform!: string;
  public user_id!: string;
  public nickname!: string;
  public profile_image?: string;
  public wallet?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public static associations: {
    posts: Association<Users, Posts>;
  };

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
        },
        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nickname: {
          type: DataTypes.STRING(10),
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

  public static associate(models: { Posts: typeof Posts }) {
    Users.hasMany(models.Posts, {
      foreignKey: "userId",
      as: "posts",
    });
  }
}
