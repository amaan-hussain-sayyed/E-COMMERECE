let { Sequelize, Model, DataTypes, QueryTypes, sequelizelcon, Op } = require("../init/dbconfig");

class Products extends Model { }
Products.init({
    id: {
        type: DataTypes.INTEGER, allowNull: false,
        primaryKey: true, autoIncrement: true
    },
    name: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    details: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock_alert: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    discount: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    discount_types: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    amount_after_discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    images: {
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
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, { tableName: "Products", modelName: "Products", sequelize: sequelizelcon })


module.exports = {
    Products, Op
}