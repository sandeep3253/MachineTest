const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: {
      values: ["Male", "Female", "Other"],
      message: "Gender is invalid",
    },
  },
  photourl: {
    type: String,
    validate: {
      validator: validator.isURL,
      message: "Invalid photo URL",
    },
    default: "https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg",
  },
});

module.exports = mongoose.model("User", userSchema);
