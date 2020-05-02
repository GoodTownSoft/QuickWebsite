const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  boughtTicketsToShow: {
    type: String,
    required: true,
  },
  joinDate: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
