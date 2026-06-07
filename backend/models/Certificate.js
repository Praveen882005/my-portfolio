const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  title: String,

  issuer: String,

  year: String,
});

module.exports = mongoose.model("Certificate", certificateSchema);
