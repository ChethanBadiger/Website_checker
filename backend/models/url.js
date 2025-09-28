// backend/models/url.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  url: { type: String, required: true, unique: true },
}, { timestamps: true });

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;