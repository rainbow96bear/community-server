import { Model, DataTypes, Sequelize } from "sequelize";

export default class Categories extends Model {
  public category!: string;
  public subcategory!: string;

  public static initModel(sequelize: Sequelize) {
    return Categories.init(
      {
        category: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        subcategory: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: false,
        modelName: "Categories",
        tableName: "categories", // 테이블 이름을 복수형으로 변경
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
}
