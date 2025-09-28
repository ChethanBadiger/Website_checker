
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  url: String,
  errors: [String],
  anomaly: Boolean,
  finalUrl: String,
  screenshotPath: String,
  log: String,
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;