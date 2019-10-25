const mongoose = require('mongoose')

const SeatSchema = new mongoose.Schema({
    code: { type: String, required: true },
    isBook: { type: Boolean, default: false }
})
const Seat = mongoose.model('Seat', SeatSchema, 'Seat');

module.exports = {
    Seat,
    SeatSchema
}