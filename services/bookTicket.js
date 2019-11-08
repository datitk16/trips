const nodemailer = require('nodemailer');
const fs = require('fs');
const hogan = require('hogan.js')

const template = fs.readFileSync('services/bookTicket.hjs', 'utf-8');
const compiled = hogan.compile(template)
const keys=require('./../config/index')
module.exports.sendSuccessfulRegisterEmail = (ticket, trip, user) => {
    const transport = {
        service: 'gmail',
        auth: {
            user: keys.email,
            pass: keys.password
        }
    }
    const transporter = nodemailer.createTransport(transport);
    const mailOptions = {
        from: keys.email,
        to: user.email,
        subject: "Mail xác nhận mua vé!",
        html: compiled.render({
            email: "devdao2604@gmail.com",
            fromStation: `${trip.fromStation.name},${trip.fromStation.province}`,
            toStation: `${trip.toStation.name},${trip.toStation.province}`,
            price: trip.price,
            seats: ticket.seats.map(e => e.code).toString(),
            amount: ticket.seats.length,
            total: ticket.seats.length * trip.price,
        })
    }
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return console.log(error.message)
        }
        console.log("success")
    })


}