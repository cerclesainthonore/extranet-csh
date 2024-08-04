const {GridFsStorage} = require("multer-gridfs-storage");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const {log, error} = require("./logging");

dotenv.config();

const dbHost = process.env.MONGODB_HOST;
const dbUsername = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;

function uploadProgram() {
    const mongoURI = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:27017/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
    const storage = new GridFsStorage({
        url: mongoURI,
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                const fileInfo = {
                    filename: `program_${Date.now()}${path.extname(file.originalname)}`,
                    bucketName: "uploads",
                };
                resolve(fileInfo);
            });
        },
    });

    storage.on("connection", (db) => {
        log("GridFsStorage connected to DB");
    });

    storage.on("error", (err) => {
        error("GridFsStorage error", err);
    });

    return multer({storage});
}

module.exports = {uploadProgram};
