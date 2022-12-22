let express = require("express");
let app = express()
let {route}= require("./route")

app.use(route);

app.listen(3000,()=>{console.log("done")})
