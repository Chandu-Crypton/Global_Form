const express = require("express");
const connectDB = require("./config/database");
const profileRouter = require("./routes/profileData");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors())

app.use(express.urlencoded({ extended: true }));


app.use("/", profileRouter);

connectDB()
    .then(() => {
        console.log("Connection successfully established");
        app.listen(5555, () => {
            console.log("Server is running on port 5555");
        });
    })
    .catch((err) => {
        console.error("Database connection failed: " + err.message);
    });
