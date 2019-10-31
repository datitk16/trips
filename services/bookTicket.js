const nodemailer = require('nodemailer')

module.exports.sendSuccessfulRegisterEmail = () => {
    const transport = {
       service:'gmail',
        auth: {
            user: "16110304@student.hcmute.edu.vn",
            pass: "nguyendinhdat977"
        }
    }
    const transporter = nodemailer.createTransport(transport);
    const mailOptions = {
        from: "datndd2604@gmail.com",
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