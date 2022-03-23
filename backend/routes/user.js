const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById, getUser, getAllUsers, updateUser } = require("../controllers/user")

const router = require("express").Router()

router.param("userId", getUserById)

router.get("/user/:userId",isSignedIn,isAuthenticated, getUser)
.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)
router.get("/users",getAllUsers)

module.exports = router