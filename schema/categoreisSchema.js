let {Sequelize,Model,DataTypes,QueryTypes,sequelizelcon,Op}=require("../init/dbconfig")
const { updated } = require("../model/categotirsModel")

class Categories extends Model{}
Categories.init({
    id:{type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true},

    name:{type:DataTypes.STRING,
        allowNull:false},

    pid:{type:DataTypes.INTEGER,
        allowNull:false},

    description:{type:DataTypes.STRING,
        allowNull:false},

    isActive:{type:DataTypes.BOOLEAN,
        allowNull:true},

    isDeleted:{type:DataTypes.BOOLEAN,
        allowNull:true},

    createdBy:{type:DataTypes.INTEGER,
        allowNull:false},

    updatedBy:{type:DataTypes.INTEGER,
        allowNull:false}

},{tableName:'Categories',modelName:"Categories",sequelize:sequelizelcon,Sequelize})

module.exports={Categories,Op}