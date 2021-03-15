const express = require("express");
const app = express()
const cors = require("cors")
const mongoose = require("./db/mongoose")
const {load} = require('./config/collectionConfig')

// RUN THIS ONCE FOR ADMIN, CATEGORIES AND PRODUCTS.
load()


// MIDDLEWARE
app.use(cors())
app.use(express.json())

// ROUTES
app.use('/user', require("./routes/user.routes"))
app.use('/auth', require("./routes/auth.routes"))
app.use('/checkout', require("./routes/checkout.routes"))
app.use('/product', require("./routes/product.routes"))
app.use('/cart', require("./routes/cart.routes"))

app.listen(5000, () => {
  console.log("server is running")
})