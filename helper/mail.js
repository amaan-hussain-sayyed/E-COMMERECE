let mailing = require("nodemailer");

sub = "forget pSSWORD"
masg="thuhkjhhfdkksk"
function mail(user,av,masg){
    return new Promise((resolve,reject)=>{
      let transpoter= mail.createTransport({
         service:"gmail",
         auth:{
                User:"hsayyedamaan@gmail.com",
                pass:"ioikhovgzzjothdk"
         }   })

      let mailoption ={
    from:transpoter.auth.User,
    to:user.email,
    subject:sub,
    text:masg
}
        

        transpoter.sendMail(mailoption,(error,info)=>{
            if(error){
                reject(false)
            }
            resolve(" send mail "+true)

        })
    })
}

av = "jjhkharehflk"
module.exports={mail}