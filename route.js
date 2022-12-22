let express = require("express");
let {auth}= require("./middelwayyer/auth")

let {register,
    login,
    changepassword,
    forget,
    reset
        } =require("./controller/usersController")

let {addcategory,
    updatedcategory,
    findcategory,
        }= require("./controller/categoryController")

let route = express();
    
    route.use(express.json())
 //user related api
    route.post("/api/v1/register",register);
    route.get("/api/v1/login",login);
//user password api 
    route.put("/api/v1/changePassword",auth("user"),changepassword);
    route.post("/api/v1/forget/password",forget);
    route.put("/api/v1/reset/password",reset);

 //category api
    route.post("/api/v1/addcategory",auth("creat_category"),addcategory);
    route.put("/api/v1/update/category",auth("updated_category"),updatedcategory);
    route.get("/api/v1/search/category",findcategory);
    module.exports={route}