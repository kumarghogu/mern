require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// importing routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripePayment");
const paymentBRoutes = require("./routes/paymentBRoutes");

// DB connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DATABASE CONNECTED"))
  .catch((error) => {
    console.log(error);
  });

// middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use("/api/", authRoutes);
app.use("/api/", userRoutes);
app.use("/api/", categoryRoutes);
app.use("/api/", productRoutes);
app.use("/api/", orderRoutes);
app.use("/api/", stripeRoutes);
app.use("/api/", paymentBRoutes);

// port
const port = 8000;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
