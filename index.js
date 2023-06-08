let express = require("express");
let app = express()
let { route } = require("./route")

app.use(route);

app.listen(3001, () => { console.log("done") })
