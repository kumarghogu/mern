const router = require("express").Router()

const {getUserById, pushOrderInPurchasesList} = require("../controllers/user")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const {updateStock} = require("../controllers/product")

const {getOrderById, createOrder, getAllOrders, 
    getOrderStatus, updateOrderStatus} = require("../controllers/order")

// params
router.param("userId", getUserById)
router.param("orderId", getOrderById)

// actual routes
router.post("/order/create/:userId",
isSignedIn, isAuthenticated, pushOrderInPurchasesList, updateStock, createOrder)

router.get("/order/all/:userId",
isSignedIn, isAuthenticated, isAdmin, getAllOrders)

router.get("/order/status/:userId",
isSignedIn, isAuthenticated, isAdmin, getOrderStatus)

router.put("/order/:orderId/status/:userId",
isSignedIn, isAuthenticated, isAdmin, updateOrderStatus)

module.exports = router