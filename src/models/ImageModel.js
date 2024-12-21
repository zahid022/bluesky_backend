const {Schema, model} = require("mongoose")


const ImageSchema = new Schema ({
    url : {
        type: String,
        required : true
    } 
}, {timestamps : true})

const ImageModel = model("Image", ImageSchema)

module.exports = ImageModel