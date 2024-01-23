let mail = require("nodemailer");

function mailer(mailoption) {
    return new Promise((resolve, reject) => {
        let transpoter = mail.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "hsayyedamaan@gmail.com",
                pass: "ioikhovgzzjothdk"
            }

        })

        transpoter.sendMail(mailoption, (error, info) => {

            if (error) {
                console.log(error)
                reject("please try again")
            }

            console.log(info)
            resolve(" send mail ")

        })
    })
}

mailer({
    from: "hsayyedamaan@gmail.com",
    to: "hsayyedamaan@gmail.com",
    subject: "mail testing",
    text: "hello world the function is runnig"
}).catch(data => {
    console.log(data)
}).catch(err => {
    console.log(data)
})



module.exports = { mailer }