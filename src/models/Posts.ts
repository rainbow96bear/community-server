import { Model, DataTypes, Sequelize, Association } from "sequelize";
import Users from "./Users";

export default class Posts extends Model {
  public id!: number;
  public platform!: string;
  public userId!: number;
  public category!: string;
  public subcategory!: string;
  public title!: string;
  public content?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public static associations: {
    user: Association<Posts, Users>;
  };

  public static initModel(sequelize: Sequelize) {
    return Posts.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        subcategory: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: true, // Change this to true
          // Remove references property
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: false,
        modelName: "Posts",
        tableName: "posts",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  public static associate(models: { Users: typeof Users }) {
    Posts.belongsTo(models.Users, {
      foreignKey: "userId",
      as: "user",
    });
  }
}
