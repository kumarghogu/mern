const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        
    },
    price: {
        type: Number,
        required: true,    
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    stock: {
        type: Number,
        default: 0

    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema)