

const winston =require("winston");

const logger = winston.createLogger({
    level:"error",
    format:winston.format.json(),
    defaultMeta:{service:"user-services"},
    transports:[
        new winston.transports.File({filename:"error.log",level:"error"}),
        new winston.transports.File({filename:"combined.log"}),
        new winston.transports.File({filename:"critical.log",level:"error"}),
        new winston.transports.Console({level:"error"})
    ]
})

module.exports={logger}