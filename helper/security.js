let jwt = require("jsonwebtoken");

        async function encrytp(data,key){
            
        return new Promise((res,rej)=>{

            jwt.sign(data,key,(err,token)=>{

                if(err){  rej(err) }

                    res(token)
            })
        })
    }

    async function decrypt(data,key){
            
        return new Promise((res,rej)=>{

            jwt.verify(data,key,(err,token)=>{

                if(err){  rej(err) }

                    res(token)
            })
        })
    }



    module.exports={encrytp,decrypt}