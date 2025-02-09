const express = require("express");
const profileData = require("../models/profile");
const multer = require("multer");

const profileRouter = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

profileRouter.post("/api/profile", upload.single("avatar"), async (req, res) => {
    try {
        const { firstName, lastName, company, phone, companySite, country, language, timeZone, currency } = req.body;


        const avatar = req.file ? req.file.buffer.toString("base64") : null;

        const sample = new profileData({
            avatar,
            firstName,
            lastName,
            company,
            phone,
            companySite,
            country,
            language,
            timeZone,
            currency,
        });

        await sample.save();
        res.json({ message: "User data added successfully" });
    } catch (err) {
        console.error("Error saving data:", err.message);
        res.status(400).json({ error: "Error saving the data: " + err.message });
    }
});

module.exports = profileRouter;
