const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name Must Be Provided"]
    },
    price: {
        type: Number,
        required: [true, "Product Price Must Be Provided"]
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 2.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type: String,
        enum: {
            values: ["ikea", "liddy","caressa","marcos"],
            message: `{VALUE} is not supported`
        } 
    }
})

module.exports = mongoose.model("Product", productsSchema)




