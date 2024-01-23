// model file of user 
//all imported file is down here
let joi = require('joi');
let { Users } = require("../schema/usersSchema")
let { encrytp } = require("../helper/security")
let bcrypt = require("bcrypt");
let randmonstring = require("randomstring");
let { mailer } = require("../helper/nodemailer")
let { User_permissions } = require("../schema/userPermissionSchema")
//initcialization of file and libeary end here


//joi validation of user registeration...
async function verifyregister(params) {

    /**creating joi schema for  request  format */
    let schema = joi.object({
        email: joi.string().min(10).max(50).required(),
        password: joi.string().min(8).max(12).required(),
        name: joi.string().min(5).max(20).required(),
    })

   /** valiting the schema from request*/
    let verify = schema.validate(params, { abortEarly: true })

    /**cheking the error or the validation in request  */
    if (!verify || (verify && verify.error)) {
        let msg = [];
       
        /** pushing that error in msg veriable */
        for (let i of verify.error.details) {
            msg.push(i.message)
        }

        console.log(msg)

        /** sending the msg veriable that store error masseg*/ 
        return { error: msg }
    }

    /**if there everything is find send the verify that store the value of requset  */
    return { data: verify.value };
}

//verifying user regintration function...
async function userregister(params) {

    /** params store the req.body means request and verifying the request body  */
    let valide = await verifyregister(params).catch((err) => { return { error: err } });

    /**checkin is there request if not proper or some error  */
    if (!valide || (valide && valide.error)) {
        console.log(valide.error)

        /**if there was any problem retrun the error and the stop excuting the code */
        return { error: valide.error , status:400}
    };

    /**find in data base user table is there any user have the same email of the user request */
    let find = await Users.findAll({ wherer: { email: params.email } }).catch(err => {
        return {err}
    })

    /**checkin is any error in find the email in user table  */
    if (find || (find && find.err)) {
         /**if there was any problem retrun the error and the stop excuting the code */
          return{error: "internal server error",status:500}
    }
    
    /**params.pasword contain the password the user enter or send encoding the pasword before saving */
    params.password = await bcrypt.hash(params.password, 10).catch((err) => { return { error: err } })

    /** checkin is there any problem in encoding the password */
    if (!params.password || (params.password && params.password.error)) {
         /**if there was any problem retrun the error and the stop excuting the code */
        return { error:"internal server error" ,status:500}
    }


    /**inserting the user details that we have in params in users Table  */
    let user = await Users.create(params).catch((err) => { return { error: err } });

    /** checkin is there any problem in inserting the user details in users table */
    if (!user || (user && user.error)) {
        console.log(user.error)

         /** if there are some error   */
        return ({ error: "Internal server error",status:500 })
    };


    let permission = await User_permissions.create({ user_id: user.id, permission_id: 1 }).catch((err) => {
        return { error: err }
    })

    if (!permission || permission.error) {
        return { error: "internal server error" }
    }


    return { data: { status: "successfull", profile: { Email: user.email, Name: user.name, Info: user.info } } }
}


//joi validatidon of user login...
async function verifylogin(params) {
    let schema = joi.object({
        email: joi.string().min(10).max(50).required(),
        password: joi.string().min(9).max(12).required()
    })

    let verify = schema.validate(params, { abortEarly: false })
    if (verify.error) {
        let msg = [];

        for (let i of verify.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: verify.value };
}
//verifying of login function...
async function userlogin(params) {

    let valide = await verifylogin(params).catch((err) => { return { error: err } });

    if (valide.error) { return ({ error: valide.error }) };

    let user = await Users.findOne({ where: { email: params.email } }).catch((err) => {
        return { error: err }
    });

    if (!user || (user && user.error)) { return ({ error: "user is not found" }) };

    let check = await bcrypt.compare(params.password, user.password).catch((err) => {
        return { error: err }
    });

    if (!check || (check && check.error)) { return { error: "wrong password" } };

    let token = await encrytp({ id: user.id }, "1234").catch((err) => {
        return { error: err }
    });

    if (token.error) { return ({ error: "internal server error" }) };

    user.token = token;

    let result = await user.save().catch((err) => {
        return { error: err }
    })

    if (result.error) { return ({ error: "internal server error" }) };

    return ({ data: { name: user.name, info: user.info }, token: token })
}


//joi validation for function to change password....
async function verifypassword(params) {
    let schema = joi.object({
        oldPassword: joi.string().min(8).max(12).required(),
        newPassword: joi.string().min(8).max(12).required()
    }).options({ abortEarly: false })

    verify = schema.validate(params)

    if (verify.error) {
        let msg = [];

        for (let i of verify.error.details) {

            msg.push(i.message)

        }
        return { error: msg }
    }

    return { data: verify.value }
}
//verification of changepassword function...
async function cpassword(params, userData) {
    let valide = await verifypassword(params).catch((err) => {
        return { error: err }
    })

    if (valide.error) {
        return { error: valide.error }
    }

    if (params.oldPassword == params.newPassword) {
        return { error: "the old password and new password are same" }
    }

    let user = await Users.findOne({
        where: { id: userData.id }
    }).catch((err) => {
        return { error: err }
    })

    if (!user || user.error) {
        return { error: "cannot find user" }
    }

    let check = await bcrypt.compare(params.oldPassword, user.password
    ).catch((err) => {
        return { error: err }
    })

    if (!check || check.error) {
        return { error: "wrong password" }
    }

    let ps = await bcrypt.hash(params.newPassword, 10
    ).catch((err) => {
        return { error: err }
    })

    if (!ps || ps.error) {
        return { error: "try gain" }
    }

    user.password = ps

    let data = await user.save().catch((err) => {
        return { error: err }
    })

    if (!data || data.error) {
        return { error: "there are some issues" }
    }

    return { data: "password changed succfully" }
}

//joi validation of forget password..
async function verifyforgetPassword(params) {
    let schema = joi.object({
        email: joi.string().min(10).max(50)
    }).options({ abortEarly: false })

    let verify = schema.validate(params)

    if (!verify || verify.error) {
        msg = [];

        for (let i of verify.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: verify.value }

}
//verification of forget password ...
async function forgetPassword(params) {
    let check = await verifyforgetPassword(params).catch((err) => {
        return { error: err }
    })

    if (!check || check.error) {
        return { error: check.error }
    }

    let user = await Users.findOne({
        where: { email: params.email }
    }).catch((err) => {
        return { error: err }
    })

    if (!user || user.error) {
        return { error: "user not found" }
    }

    let otp = randmonstring.generate(6)

    user.otp = otp

    let result = await user.save().catch((err) => {
        return { error: err }
    })

    if (!result || result.error) {
        return { error: result.error }
    }



    let option = {
        from: "hsayyedamaan@gmail.com",
        to: user.email,
        subject: "forget password otp",
        text: `if you want to reset you password use this otp ${otp}`
    }

    let sendmail = await mailer(option).catch((err) => {
        return { error: err }
    })


    if (!sendmail || sendmail.error) {
        return { error: sendmail.error }
    }

    return { data: sendmail }
}

//joi varification for reset password...
async function verifyResetPassword(params) {
    let schema = joi.object({
        otp: joi.string().min(6).max(6).required(),
        creatpassword: joi.string().min(8).max(12).required(),
    }).options({ abortEarly: false });

    let verify = schema.validate(params)

    if (!verify || verify.error) {
        let msg = [];

        for (let i of verify.error.details) {
            msg.push(i.message)
        }
        return { error: msg };
    }
    return { data: verify.value }

}
//verification of reset password function...
async function resetPassword(params) {
    let valide = await verifyResetPassword(params).catch((err) => {
        return { error: err }
    })

    if (!valide || valide.error) {
        return { error: valide.error }
    }

    let user = await Users.findOne({
        where: { otp: params.otp }
    }).catch((err) => {
        return { error: err }
    })

    if (!user || user.error) {
        return { error: user.error }
    }

    let newPassword = await bcrypt.hash(params.creatpassword, 10
    ).catch((err) => {
        return { error: err }
    })

    if (!newPassword || newPassword.error) {
        return { error: "internal server error" }
    }

    user.password = newPassword

    let result = await user.save().catch((err) => {
        return { error: err }
    })

    if (!result || result.error) {
        return { error: "internal server error" }
    }

    return { data: "password reset succefully" }
}

//about me function of....
async function validateaboutMe(userData) {
    let user = await Users.findOne({
        attributes: ['email', "name", "info",
            "mobileNo", "isActive", "isDeleted"],
        where: { id: userData.id }
    }).catch((err) => {
        return { error: err }
    })

    if (!user || user.error) {
        return { error: user.error }
    }

    return { data: user }
}

//joi validation of for user updated...
async function verifyuserUpdated(params) {
    let schema = joi.object({
        email: joi.string().min(10).max(50),
        password: joi.string().min(8).max(12),
        name: joi.string().min(5).max(20),
        info: joi.string().min(3).max(300),
        mobileNo: joi.string().min(10).max(14)
    })
    let verify = schema.validate(params, { abortEarly: true })
    if (verify.error) {
        let msg = [];
        for (let i of verify.error.details) {
            msg.push(i.message)
        }
        console.log(msg)
        return { error: msg }
    }
    return { data: verify.value }

}


async function userUpdated(params, userData) {
    let validate = await verifyuserUpdated(params).catch((err) => {
        return { error: err }
    })

    if (!validate || validate.error) {
        return { error: validate.error }
    }


    let user = await Users.update(params, { where: { id: userData } }).catch((err) => {
        return { error: err }
    })

    if (!user || user.error) {
        return { error: "cannot updated user" }
    }

    return { data: "updated successfully" }

}


//exprot of function 
module.exports = {
    userregister,
    userlogin,
    cpassword,
    forgetPassword,
    resetPassword,
    validateaboutMe,
    userUpdated
}



