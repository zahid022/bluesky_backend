const mongoose = require("mongoose")
const config = require(".")

mongoose
    .connect(config.databaseURL)
    .then(() => console.log("Database is connected successfully"))
    .catch(() => console.error("Database connect is failed"))