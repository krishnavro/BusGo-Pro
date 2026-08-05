const UserModel = require("../models/User");
const BusModel = require('../models/Bus');
const BookingModel = require('../models/Booking');

const getPendingOperators = async (req, res) => {
  try {
    const operators = await UserModel.find({
      role: "Operator",
      status: "Pending",
    });

    res.status(200).json({
      success: true,
      operators,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const approveOperator = async (req, res) => {
  try {
    const { id } = req.params;

    const operator = await UserModel.findById(id);

    if (!operator) {
      return res.status(404).json({
        success: false,
        message: "Operator Not Found",
      });
    }

    if (operator.role !== "Operator") {
      return res.status(400).json({
        success: false,
        message: "User is not an Operator",
      });
    }

    if (operator.status === "Approved") {
      return res.status(400).json({
        success: false,
        message: "Operator Already Approved",
      });
    }

    operator.status = "Approved";
    await operator.save();

    res.status(200).json({
      success: true,
      message: "Operator Approved Successfully",
      operator,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const rejectOperator = async (req, res) => {
  try {
    const { id } = req.params;

    const operator = await UserModel.findById(id);

    if (!operator) {
      return res.status(404).json({
        success: false,
        message: "Operator Not Found",
      });
    }

    if (operator.role !== "Operator") {
      return res.status(400).json({
        success: false,
        message: "User is not an Operator",
      });
    }

    if (operator.status === "Rejected") {
      return res.status(400).json({
        success: false,
        message: "Operator Already Rejected",
      });
    }

    operator.status = "Rejected";
    await operator.save();

    res.status(200).json({
      success: true,
      message: "Operator Rejected Successfully",
      operator,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");

    res.status(200).json({
      success: true,
      users,
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
    const buses = await BusModel.find().populate(
      "operatorId",
      "name agencyName email"
    );

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

const adminDashboard = async (req, res) => {
  try {

    const totalUsers = await UserModel.countDocuments();

    const totalOperators = await UserModel.countDocuments({
      role: "Operator",
    });

    const pendingOperators = await UserModel.countDocuments({
      role: "Operator",
      status: "Pending",
    });

    const approvedOperators = await UserModel.countDocuments({
      role: "Operator",
      status: "Approved",
    });

    const totalBuses = await BusModel.countDocuments();

    const activeBuses = await BusModel.countDocuments({
      isActive: true,
    });

    const inactiveBuses = await BusModel.countDocuments({
      isActive: false,
    });

    const totalBookings = await BookingModel.countDocuments({
      bookingStatus: "Booked",
    });

    const bookings = await BookingModel.find({
      bookingStatus: "Booked",
    });

    let totalRevenue = 0;

    bookings.forEach((booking) => {
      totalRevenue += booking.price;
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalOperators,
        pendingOperators,
        approvedOperators,
        totalBuses,
        activeBuses,
        inactiveBuses,
        totalBookings,
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

module.exports = {
  getPendingOperators,approveOperator,rejectOperator,getAllUsers,getAllBuses,adminDashboard
};