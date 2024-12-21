const dotenv = require("dotenv")
const path = require("path")

const envPath = path.join(__dirname, "../../.env")

dotenv.config({ path: envPath })

module.exports = {
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_URL,
    jwtSECRET: process.env.JWT_SECRET,
    cloudNAME: process.env.CLOUDINARY_CLOUD_NAME,
    cloudKey: process.env.CLOUDINARY_API_KEY,
    cloudSECRET: process.env.CLOUDINARY_API_SECRET
}