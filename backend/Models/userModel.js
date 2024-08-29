const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["admin", "user", "guest"],
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
