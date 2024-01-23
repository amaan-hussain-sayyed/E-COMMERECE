let mailer = require("nodemailer");


function mail(mailoption) {
    return new Promise((resolve, reject) => {
        let transpoter = mailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "hsayyedamaan@gmail.com",
                pass: "jehnxglatrroxznv"
            }
        })

        transpoter.sendMail(mailoption, (error, info) => {
            if (error) {
                console.log(error)
                reject(false)
            }
            resolve(info)

        })
    })
}


mail({
    from: "hsayyedamaan@gmail.com",
    to: "shavezhussain79a@gmail.com",
    subject: "mail testing",
    text: "hello world the function is runnig"
}).catch(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})
