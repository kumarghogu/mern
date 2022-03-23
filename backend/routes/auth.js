const { signout, signup, signin, isSignedIn } = require("../controllers/auth")
const {check} = require("express-validator")
const router = require("express").Router()


router.post("/signup",[
    
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({min:3}),

],signup)

router.post("/signin",[
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({min:1}),

],signin)

router.route("/signout").get(signout)

router.get("/test", isSignedIn, (req, res) => {
    res.send("A protected route")
})

module.exports = router