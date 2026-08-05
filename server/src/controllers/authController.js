const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, agencyName, profileImage } =
      req.body;

    // Only Traveller and Operator can register
    if (role !== "Admin" && role !== "Traveller" && role !== "Operator") {
      return res.status(400).json({
        success: false,
        message: "Invalid Role",
      });
    }

    // Check Existing User
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      agencyName,
      profileImage,

      // Traveller -> Approved
      // Operator -> Pending
      status: role === "Traveller" ? "Approved" : "Pending",
    });

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find User
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Check Status
    if (user.status !== "Approved") {
      return res.status(400).json({
        success: false,
        message: `Your account is ${user.status}`,
      });
    }

    // Generate Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Profile
const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin Dashboard
const adminDashboard = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  adminDashboard,
};