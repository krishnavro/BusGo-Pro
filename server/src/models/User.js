const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    role: {
      type: String,
      enum: ["Admin","Operator", "Traveller"],
      required: true,
    },

    agencyName: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
},
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;