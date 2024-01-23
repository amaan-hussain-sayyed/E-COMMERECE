let express = require("express");
let { auth } = require("./middelwayyer/auth");
let config = require("config")
// from user controller...
let { register,
    login,
    changepassword,
    forget,
    reset,
    aboutMe,
    updatedme
} = require("./controller/usersController");

//from permssin controller..
let { addpermission,
    veiwpermission } = require("./controller/permissionController")

//froms userpermission controller...
let { assingPermission,
    veiwuserPermission } = require("./controller/userPermissionController");

// from category controller...
let { addcategory,
    updatedcategory,
    findcategory,
} = require("./controller/categoryController");

//from product controller...
let { productadd,
    productsearch,
    productupdated } = require("./controller/productController");

//from product category controller..
let { assingCategory } = require("./controller/productCategoryController")

//from cart contrroller...
let { addtocart,
    updatecart,
    removecart,
    veiwcart } = require("./controller/cartController");

let route = express();

route.use(express.json())

//user related api...
route.post("/api/v1/register", register);
route.get("/api/v1/login", login);
route.get("/api/v1/aboutme", auth("user"), aboutMe);
route.put("/api/v1/updatedme", auth("user"), updatedme);
route.put("/api/v1/changePassword", auth("user"), changepassword);
route.get("/api/v1/forget/password", forget);
route.put("/api/v1/reset/password", reset);


//permission api...
route.post("/api/v1/permission", auth("add_permissions"), addpermission);
route.get("/api/v1/permission", auth("veiw_permissions"), veiwpermission);


//userpermission...
route.post("/api/v1/userpermission", auth("assing_permission"), assingPermission);
route.get("/api/v1/userpermission", auth("veiw_userpermission"), veiwuserPermission);


//category api...
route.post("/api/v1/category/add", auth("add_categorey"), addcategory);
route.put("/api/v1/category/updated", auth("updated_category"), updatedcategory);
route.get("/api/v1/category/search", findcategory);


//product api...
route.post("/api/v1/product", auth("add_product"), productadd);
route.get("/api/v1/product", productsearch);
route.put("/api/v1/product", auth("updated_product"), productupdated)


//product category api..
route.post("/api/v1/productCategory", auth("assing_category"), assingCategory);


//cart api ..
route.post("/api/v1/cart", auth("user"), addtocart);
route.put("/api/v1/cart", auth("user"), updatecart);
route.get("/api/v1/cart", auth("user"), veiwcart)
route.delete("/api/v1/cart", auth("user"), removecart)

module.exports = { route }