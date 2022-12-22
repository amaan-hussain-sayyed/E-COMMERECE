// this file for the authuntication of user for perfoming some task
//the initialization of libarery and importing files 
let {Sequelize,Model,DataTypes,QueryTypes,sequelizelcon}=require("../init/dbconfig")
let bcrypt = require("bcrypt")
let {decrypt}= require("../helper/security")
//the initializaton of libarery and file ends here


//this is the function that verify the permission of user and there authurization....
function auth(permission){
    return  async (req,res,next)=>{

        let token = req.header("x-auth-token")

        if(!token){
            return res.status(400).send({return:"cannot valided auntenticatio"})
        }
    let data = await decrypt(token,"1234").catch((err)=>{return{error:err}})
    console.log(data)
    if(!data||(data && data.error)){
        return res.status(400).send("internal server error")
    }
    let users = await sequelizelcon.query(
        `select users.id,users.name,permissions.permission as permission
         from users LEFT JOIN user_permissions  
         on users.id = user_permissions.user_id 
         left join permissions on 
         user_permissions.permission_id=permissions.id
          where users.id = ${data.id}`,
        QueryTypes.SELECT
    ).catch((err)=>{return{error:err}})

    console.log(users)
    if(!users||(users&&users.error)){
        return res.status(400).send("plese inter the rght info")
    }
    
    let permissions = {}
    for(let row of users ){
        permissions[row.permission] =1
    }

    if(permissions.lenght <= 0 || permissions[permission]){
        return res.status(400).send("internal server error")

    }

    req.userData={id:data.id,
            name:users.name,
        permissions:permission}


        next();
    }
}

//file exportation
    module.exports={auth}