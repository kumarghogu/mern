const Order = require("../models/order")
const User = require("../models/user")

exports.getUserById = async (req, res, next, id) => {
    const user = await User.findById(id)
    if (!user) {
        return res.status(403).json({
            error: "User not found"
        })
    }

    req.profile = user
    next()
}

exports.getUser = (req, res) => {

    //TODO: need to check this
    req.profile.salt = undefined
    req.profile.hashed_password = undefined
    return res.json(req.profile)
}

exports.getAllUsers = async(req, res) => {
    const users = await User.find()
    if (!users) {
        return res.status(403).json({
            error: "No user found"
        })
    }
   
    for (let i=0; i < users.length; i++) {
        users[i].salt = undefined
        users[i].hashed_password = undefined
    }
    return res.status(200).json({
        users: users
    })
}

exports.updateUser = (req, res) => {
     User.findByIdAndUpdate(
        {_id: req.profile._id},
        { $set: req.body },
        {new: true, useFindAndModify: false},
        (err,user) => {
            if (!user) {
                return res.status(400).json({
                    error: "You aren't authorized"
                })
            }
            user.salt = undefined
            user.hashed_password = undefined
            res.json(user)
        }
    )
}

exports.userPurchaseList = (req, res) => {
    Order.find({user: req.profile._id})
    .populate("user","_id name")
    .exec((err, order) => {
        if (!order) {
            return res.status(400).json({
                error: "No order in this account"
            })
        }
        return res.json(order)
    })
}

exports.pushOrderInPurchasesList = (req, res, next) => {
    
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err,item) => {
            if (!item) {
                return res.status(400).json({
                    error: "Unable to save purchase list"
                })
            }

            next()
        }
    )
}