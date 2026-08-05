const express = require('express');
const router = express.Router();

const { bookSeat, cancelBooking, myBookings, getBookedSeats } = require( '../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/book', authMiddleware,roleMiddleware('Traveller'),bookSeat);
router.put('/cancel/:id',authMiddleware,roleMiddleware("Traveller"), cancelBooking);
router.get('/my-bookings',authMiddleware, roleMiddleware("Traveller"),myBookings);
router.get("/booked-seats/:busId",getBookedSeats);

module.exports=router;