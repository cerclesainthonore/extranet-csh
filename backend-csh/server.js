const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const {uploadProgram} = require("./utils/upload");
const Grid = require("gridfs-stream");
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
let gfs;
db.on("error", (err) => {
    console.error.bind(console, "connection error:");
    error("MongoDB connection error: " + err);
});
db.once("open", () => {
    log("Connected to MongoDB");

    gfs = Grid(db.db, mongoose.mongo);
    gfs.collection("uploads");
    log("GridFS Stream initialized")
});

app.get("/", (req, res) => {
    log("Received GET /");
    res.send("Hello World!");
});

app.post("/program", uploadProgram().single("file"), async (req, res) => {
    log("Received POST /program");

    try {
        if (!req.file) {
            throw new Error("No file received");
        }

        log(`File received: ${req.file.filename}`);
        res.status(201).json({text: "File uploaded successfully!", file: req.file});
    } catch (err) {
        error(err.message);
        res.status(400).json({
            error: {text: "Unable to upload the file", message: err.message},
        });
    }

    // gfs.remove({ filename: "program_image", root: "uploads" }, (err, gridStore) => {
    //     if (err) {
    //         return res.status(404).json({ err: err });
    //     }
    //     // Rename uploaded file
    //     const file = req.file;
    //     gfs.files.updateOne(
    //         { filename: file.filename },
    //         { $set: { filename: "program_image" } },
    //         (err, updatedFile) => {
    //             if (err) {
    //                 return res.status(500).json({ err: err });
    //             }
    //             res.status(201).json({ file: updatedFile });
    //         }
    //     );
    // });
});
/*
app.get("/program", async (req, res) => {
    log("Received GET /program");

    await gfs.files.find({}, (err, file) => {
        if (!file || file.length === 0) {
            error("Program image not found");
            return res.status(404).json({ err: "Unable to find program image" });
        }

        if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
            const readstream = gfs.createReadStream(file[0].filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({ err: "Not an image" });
            error("Uploaded file is not an image")
        }
    });
});
*/
app.listen(port, () => {
    log(`Server is running on port ${port}`);
});