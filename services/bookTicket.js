const nodemailer = require('nodemailer')

module.exports.sendSuccessfulRegisterEmail = () => {
    const transport = {
       service:'gmail',
        auth: {
            user: "16110304@student.hcmute.edu.vn",
            pass: ""
        }
    }
    const transporter = nodemailer.createTransport(transport);
    const mailOptions = {
        from: "16110304@student.hcmute.edu.vn",
        to: "nguyendataht@gmail.com",
        subject: "Mail xác nhận mua vé!",
        html: "Cảm ơn bạn đã mua vé"
    }
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return console.log(error.message)
        }
        console.log("success")
    })
    

}