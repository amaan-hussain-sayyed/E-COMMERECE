let { Sequelize, Model, DataTypes, QueryTypes, Op, sequelizelcon } = require("../init/dbconfig")

class Users extends Model { }

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: true
    },

    info: {
      type: DataTypes.STRING,
      allowNull: true
    },

    token: {
      type: DataTypes.STRING,
      allowNull: true
    },

    otp: {
      type: DataTypes.STRING,
      allowNull: true
    },

    mobile_no: {
      type: DataTypes.STRING,
      allowNull: true
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }

  }, {
  tableName: "Users", modelName: "Users", sequelize: sequelizelcon
}
)


module.exports = { Users, Op }