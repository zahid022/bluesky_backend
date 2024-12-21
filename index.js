const config = require("./src/config")
require("./src/config/database")
const express = require("express")
const cors = require("cors")
const router = require("./src/routers")
const errorMiddleware = require("./src/middlewares/error.middleware")

const app = express()

app.use(express.json())

app.use(cors())

app.use("/api", router)

app.use(errorMiddleware)

app.listen(config.port, () => {
    console.log(`Application is running http://localhost:${config.port}`)
})