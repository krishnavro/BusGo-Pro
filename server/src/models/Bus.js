const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busName: {
      type: String,
      required: true,
    },

    busNumber: {
      type: String,
      required: true,
      unique: true,
    },

    operatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    from: {
      type: String,
      required: true,
    },

    to: {
      type: String,
      required: true,
    },
    journeyDate: {
      type: Date,
      required: true,
    },

    departureTime: {
      type: String,
      required: true,
    },

    arrivalTime: {
      type: String,
      required: true,
    },

    totalSeats: {
      type: Number,
      required: true,
    },

    availableSeats: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    busType: {
      type: String,
      enum: ["AC", "Non-AC", "Sleeper", "Seater"],
      required: true,
    },
    isActive: {
  type: Boolean,
  default: true,
},

  },
  {
    timestamps: true,
  }
);

const BusModel = mongoose.model("Bus", busSchema);

module.exports = BusModel;