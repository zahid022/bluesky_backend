const jwt = require("jsonwebtoken")
const config = require("../config")


const encodePayload = (payload) => {
    return jwt.sign(payload, config.jwtSECRET, {expiresIn : "1d"})
}

const decode = (token) => {
    try {
        return jwt.verify(token, config.jwtSECRET)
    } catch {
        return false
    }
}

module.exports = {
    encodePayload,
    decode
}