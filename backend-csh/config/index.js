const dotenv = require("dotenv");
dotenv.config()

const Config = {
    port: process.env.PORT ?? "3000",
    mongoUser: process.env.MONGODB_USER ?? "",
    mongoHost: process.env.MONGODB_HOST ?? "localhost",
    mongoCollection: process.env.MONGODB_COLLECTION ?? "CSH",
    origin: process.env.ORIGIN ?? "*"
}

module.exports = { Config } 