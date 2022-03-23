const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0],
    });
  }

  const user = await User.create(req.body);
  user.save((err, user) => {
    if (!user) {
      return res.status(400).json({
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0],
    });
  }

  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User email doesn't exist",
      });
    }

    if (!user.isAuthenticate(password)) {
      return res.status(401).json({
        error: "Incorrect password",
      });
    }

    // creating token
    const token = jwt.sign({ id: user._id }, process.env.SECRET);

    // putting token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    // sending response
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: {
        _id,
        name,
        email,
        role,
      },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");

  res.json({
    message: "Signed out successfully",
  });
};

// protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

exports.isAuthenticated = (req, res, next) => {
  // console.log("profile ", req.profile, "auth ", req.auth);
  let checker = req.profile && req.auth && req.profile._id == req.auth.id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You aren't allowed for this resource, you aren't admin",
    });
  }

  next();
};
