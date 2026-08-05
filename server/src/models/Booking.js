const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },

    seatNumber: {
      type: Number,
      required: true,
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },

    bookingStatus: {
      type: String,
      enum: ["Booked", "Cancelled"],
      default: "Booked",
    },
  
  price: {
    type: Number,
    required: true,
},
  },
  {
    timestamps: true,
  }
);

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;