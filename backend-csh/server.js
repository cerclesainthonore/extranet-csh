const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const {log, error} = require("./utils/logging");

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbHost = process.env.MONGODB_HOST;
const dbUsername = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const mongoURI = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:27017/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Connexion à MongoDB
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on("error", (err) => {
    console.error.bind(console, "connection error:");
    error("MongoDB connection error: " + err);
});
db.once("open", () => {
    log("Connected to MongoDB");
});

app.get("/", (req, res) => {
    log("Received GET /");
    res.send("Hello World!");
});

app.listen(port, () => {
    log(`Server is running on port ${port}`);
});