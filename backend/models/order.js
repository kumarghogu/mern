const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            name: String,
            count: Number,
            price: Number
        }
    ],
    transaction_id: {},
    amount: Number,
    address: String,
    status: {
        type: String,
        default: "Received",
        enum: ["Cancelled", "Delivered", "Processing", "Shipped", "Received"]
    },
    updated: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Order", orderSchema)