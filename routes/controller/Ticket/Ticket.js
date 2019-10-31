const { Ticket } = require('./../../../model/Ticket');
const { Trip } = require('./../../../model/Trip')

module.exports.createTicket = (req, res, next) => {
    /**
   * @note Trong payload chưa ký :_id
   */
    const userId = req.user._id;
    const { tripId, seatCodes } = req.body;
    // console.log(userId, tripId, seatCodes)
    Trip.findById(tripId)
        .then(trip => {
            if (!trip) return Promise.reject({ status: 404, message: "Trip not found" })
            const availableSeats = trip.seats
                .filter(seat =>!seat.isBook)
                .map(seat => seat.code)
            let errSeats = [];
            seatCodes.forEach(seatCode => {
                if (availableSeats.indexOf(seatCode) === -1) errSeats.push(seatCode)
            });
            if (errSeats.length > 0) return Promise.reject({
                status: 400,
                message: "Some seats not available",
                notAvailableSeats: errSeats
            })
            const newTicket = new Ticket({
                userId, tripId,
                seats: seatCodes.map(seat => ({ code: seat, isBook: true })),
                totalPrice: trip.price * seatCodes.length
            })
            trip.seats = trip.seats.map(seat => {
                if (seatCodes.indexOf(seat.code) > -1) {
                    seat.isBook = true
                    return seat;
                }
                return seat;
            })
            return Promise.all([newTicket.save(), trip.save()])
        })
        .then(result => {
            res.status(200).json(result[0])
        })
        .catch(err => {
            if (err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })

}