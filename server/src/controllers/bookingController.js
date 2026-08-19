const BookingModel = require("../models/Booking");
const BusModel = require("../models/Bus");

const bookSeat = async (req, res) => {
  try {
    const { busId, seatNumber } = req.body;

    
    const bus = await BusModel.findById(busId);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus Not Found",
      });
    }

   
    if (seatNumber > bus.totalSeats || seatNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid Seat Number",
      });
    }

    
    const alreadyBooked = await BookingModel.findOne({
      busId,
      seatNumber,
      bookingStatus: "Booked",
    });

    if (alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: "Seat Already Booked",
      });
    }

    
    const booking = await BookingModel.create({
      userId: req.user.id,
      busId,
      seatNumber,
      price: bus.price,
    });

    
    bus.availableSeats -= 1;
    await bus.save();

    res.status(201).json({
      success: true,
      message: "Seat Booked Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await BookingModel.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    if (booking.bookingStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking Already Cancelled",
      });
    }

    const bus = await BusModel.findById(booking.busId);

    booking.bookingStatus = "Cancelled";
    await booking.save();

    bus.availableSeats += 1;
    await bus.save();

    res.status(200).json({
      success: true,
      message: "Booking Cancelled Successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const myBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find({
      userId: req.user.id,
    }).populate(
      "busId",
      "busName busNumber from to departureTime arrivalTime"
    );

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookedSeats = async (req, res) => {
  try {

    const { busId } = req.params;

    const bookings = await BookingModel.find({
      busId,
      bookingStatus: "Booked",
    }).select("seatNumber");

    res.status(200).json({
      success: true,
      bookedSeats: bookings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = { bookSeat, cancelBooking, myBookings, getBookedSeats };