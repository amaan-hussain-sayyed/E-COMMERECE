let { userregister, 
    userlogin,
    cpassword,
    forgetPassword,
    resetPassword
         } = require("../model/userModel")



//user  registeration controller...
async function register(req, res) {
    console.log("Params",req.body)
    let data = await userregister(req.body).catch((err) => {

        return { error: err }
    })
    if (!data || (data && data.error)) {
        console.log(data.error)
        return res.status(500).send({ error:data.error})
    }
    return res.status(200).send({ data: data })
}


//user login controller
async function login(req, res) {
    let data = await userlogin(req.body).catch((err) => {

        return { error: err }
    })
    if (!data || (data && data.error)) {
        console.log(data.error)
        return res.status(500).send({ error: data.error? data.error:"internal server error"})
    }
    let token = data.token
    return res.status(200).header("x-auth-token", token).send({ data: data.data })
}


//user change password controller...
async function changepassword(req,res){
    let data = await cpassword(req.body,req.userData).catch((err)=>{
        return{error:err}
    })

    if(!data || data.error){
        console.log("password error",data.error)
        return res.status(400).send({error:data.error? data.error:"internal server error"})
    }
    return res.status(200).send({data:data})
}

//user forteg password controller...
async function forget(req,res){
    let data = await forgetPassword(req.body).catch((err)=>{
        return{error:err}
    })

    if(!data || data.error){
        console.log("password error",data.error)
        return res.status(400).send({error:data.error? data.error:"internal server error"})
    }
    return res.status(200).send({data:data})
}


//user reset password controller...
async function reset(req,res){
    let data = await resetPassword(req.body).catch((err)=>{
        return{error:err}
    })

    if(!data || data.error){
        console.log("password error",data.error)
        return res.status(400).send({error:data.error? data.error:"internal server error"})
    }
    return res.status(200).send({data:data})
}



module.exports = { register, login ,changepassword,forget, reset}
