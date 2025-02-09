const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    company: String,
    phone: String,
    companySite: String,
    country: String,
    language: String,
    timeZone: String,
    currency: String,
    avatar: String,
}, { timestamps: true });

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile

