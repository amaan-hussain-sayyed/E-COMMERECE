let { Sequelize, Model, DataTypes, QueryTypes, sequelizelcon, Op } = require("../init/dbconfig");

class Product_category extends Model { }

Product_category.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, primaryKey: true,
        autoIncrement: true
    },

    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, { tableName: "products_category", modelName: "Product_category", sequelize: sequelizelcon })

module.exports = { Product_category, Op }
