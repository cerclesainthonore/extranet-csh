const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbHost = process.env.MONGODB_HOST;
const dbUsername = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const mongoURI = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:27017/${process.env.MONGODB_DATABASE}`

// Middleware
app.use(cors());
app.use(express.json());

function log(message) {
    console.log(`${new Date().toLocaleString()} - [INFO] - ${message}`);
}

function error(message) {
    console.log(`${new Date().toLocaleString()} - [ERROR] - ${message}`);
}

// Connexion à MongoDB
mongoose.connect(mongoURI);

const db = mongoose.connection;
let gfs;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    log("Connected to MongoDB");

    gfs = Grid(db.db, mongoose.mongo);
    gfs.collection("uploads");
    log("GridFS Stream initialized")
});

const programStorage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return {
            filename: `program_${Date.now()}${path.extname(file.originalname)}`,
            bucketName: "uploads",
        };
    },
});

const programUpload = multer({ storage: programStorage });

app.get("/", (req, res) => {
    log("Received GET /");
    res.send("Hello World!");
});

app.post("/program", programUpload.single("file"), (req, res) => {
    log("Received POST /program");

    gfs.remove({ filename: "program_image", root: "uploads" }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        }
        // Rename uploaded file
        const file = req.file;
        gfs.files.updateOne(
            { _id: file.id },
            { $set: { filename: "program_image" } },
            (err, updatedFile) => {
                if (err) {
                    return res.status(500).json({ err: err });
                }
                res.status(201).json({ file: updatedFile });
            }
        );
    });
});

app.get("/program", (req, res) => {
    log("Received GET /program");

    gfs.files.findOne({ filename: "program_image" }, (err, file) => {
        if (!file || file.length === 0) {
            error("Program image not found");
            return res.status(404).json({ err: "Unable to find program image" });
        }

        if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({ err: "Not an image" });
            error("Uploaded file is not an image")
        }
    });
});

app.listen(port, () => {
    log(`Server is running on port ${port}`);
});