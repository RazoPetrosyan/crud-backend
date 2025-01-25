import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import Users from "./Users.js";

class Blogs extends Model {
}

Blogs.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mediaPath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'blogs',
    modelName: 'blogs',
  }
)

Blogs.belongsTo(Users, {
  foreignKey: 'userId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  as: 'users',
});

export default Blogs;
