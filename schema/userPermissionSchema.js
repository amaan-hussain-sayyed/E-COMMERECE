let { Sequelize, Model, DataTypes, QueryTypes, Op, sequelizelcon } = require("../init/dbconfig")

class User_permissions extends Model { }
User_permissions.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },

  user_id: {
    type: DataTypes.
      INTEGER, allowNull: false
  },

  permission_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, { tableName: "User_permissions", modelName: "User_permissions", sequelize: sequelizelcon })


module.exports = { User_permissions, Op }