const BusModel = require("../models/Bus");
const BookingModel = require('../models/Booking');

const registerBus = async (req, res) => {
  try {
    const {
      runsDaily,
      journeyDate,
    } = req.body;

    // One-time buses must have a journey date
    if (!runsDaily && !journeyDate) {
      return res.status(400).json({
        success: false,
        message: "Journey date is required for non-daily buses",
      });
    }

    const bus = await BusModel.create({
      ...req.body,

      // Daily bus does not need a journey date
      journeyDate: runsDaily ? null : journeyDate,

      operatorId: req.user.id,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "Bus Registered Successfully",
      bus,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getAllBuses = async (req, res) => {
  try {

    const buses = await BusModel.find()
      .populate("operatorId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      buses,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const searchBus = async (req, res) => {
  try {

    const { from, to, date } = req.query;

    const query = {
      isActive: true,
    };

    if (from) {
      query.from = {
        $regex: from,
        $options: "i",
      };
    }

    if (to) {
      query.to = {
        $regex: to,
        $options: "i",
      };
    }

    /*
      If traveller searches for a particular date:

      1. Show one-time buses whose journeyDate matches that date
      2. Show buses where runsDaily = true
    */

    if (date) {

      const start = new Date(date);

      const end = new Date(date);
      end.setDate(end.getDate() + 1);

      query.$or = [

        // One-time bus for this specific date
        {
          runsDaily: false,
          journeyDate: {
            $gte: start,
            $lt: end,
          },
        },

        // Daily bus
        {
          runsDaily: true,
        },

      ];

    }

    const buses = await BusModel.find(query);

    res.status(200).json({
      success: true,
      buses,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getMyBuses = async (req, res) => {
  try {
    const buses = await BusModel.find({
      operatorId: req.user.id,
    });

    res.status(200).json({
      success: true,
      buses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBus = async (req, res) => {
    try {

        const { id } = req.params;

        const bus = await BusModel.findById(id);

        if (!bus) {
            return res.status(404).json({
                success: false,
                message: "Bus Not Found",
            });
        }

        if (bus.operatorId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        Object.assign(bus, req.body);

        if (bus.runsDaily) {
            bus.journeyDate = null;
        }

        const updatedBus = await bus.save();

        res.status(200).json({
            success: true,
            message: "Bus Updated Successfully",
            updatedBus,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getPassengers = async (req, res) => {
  try {
    const { id } = req.params;

    const passengers = await BookingModel.find({
      busId: id,
    }).populate("userId", "name email phone");

    res.status(200).json({
      success: true,
      passengers,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBusDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const bus = await BusModel.findById(id)
    .populate("operatorId", "name agencyName phone");

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus Not Found",
      });
    }

    res.status(200).json({
      success: true,
      bus,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deactivateBus = async (req, res) => {
  try {
    const { id } = req.params;

    const bus = await BusModel.findById(id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus Not Found",
      });
    }

    if (bus.operatorId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const activeBookings = await BookingModel.countDocuments({
      busId: id,
      bookingStatus: "Booked",
    });

    if (activeBookings > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot Deactivate Bus With Active Bookings",
      });
    }

    if (!bus.isActive) {
      return res.status(400).json({
        success: false,
        message: "Bus Already Inactive",
      });
    }

    bus.isActive = false;
    await bus.save();

    res.status(200).json({
      success: true,
      message: "Bus Deactivated Successfully",
      bus,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const operatorDashboard = async (req, res) => {
  try {

    const operatorId = req.user.id;

    // Get all buses of this operator
    const buses = await BusModel.find({ operatorId });

    const totalBuses = buses.length;

    const activeBuses = buses.filter(bus => bus.isActive).length;

    const inactiveBuses = buses.filter(bus => !bus.isActive).length;

    let totalSeats = 0;
    let availableSeats = 0;

    buses.forEach((bus) => {
      totalSeats += bus.totalSeats;
      availableSeats += bus.availableSeats;
    });

    const bookedSeats = totalSeats - availableSeats;

    const busIds = buses.map(bus => bus._id);

    const bookings = await BookingModel.find({
      busId: { $in: busIds },
      bookingStatus: "Booked",
    });

    let totalRevenue = 0;

    bookings.forEach((booking) => {
      totalRevenue += booking.price;
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalBuses,
        activeBuses,
        inactiveBuses,
        totalSeats,
        availableSeats,
        bookedSeats,
        totalRevenue,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getLocations = async (req, res) => {
  try {
    const buses = await BusModel.find({ isActive: true });

    const from = [...new Set(buses.map((bus) => bus.from))].sort();

    const to = [...new Set(buses.map((bus) => bus.to))].sort();

    res.status(200).json({
      success: true,
      from,
      to,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { registerBus,getAllBuses,searchBus, getMyBuses, updateBus, getPassengers, getBusDetails, deactivateBus,operatorDashboard, getLocations };