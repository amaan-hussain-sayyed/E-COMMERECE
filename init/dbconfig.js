let { Sequelize, Model, DataTypes, QueryTypes,Op } = require("sequelize")
let sequelizelcon = new Sequelize("mysql://root@localhost/e-com");

sequelizelcon.authenticate().then((data) => { console.log("connected") }).catch((err) => { console.log("not connected") })

module.exports = { Sequelize, Model, DataTypes, QueryTypes, sequelizelcon ,Op}