let { Sequelize, Model, DataTypes, QueryTypes, Op } = require("sequelize")
let sequelizelcon = new Sequelize("mysql://root@localhost/e-com");

sequelizelcon.authenticate().then((data) => {
        console.log("connected to DB")
}).catch(
        (err) => { console.log("not connected to DB") })

// sequelizelcon.sync({alter:true}).then((data) => {
//         console.log(data)
// }).catch((err) => {
//         console.log("data base not connected")
// })


module.exports = { Sequelize, Model, DataTypes, QueryTypes, sequelizelcon, Op }