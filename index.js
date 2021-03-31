const express = require("express");
const app = express()
const cors = require("cors")
const mongoose = require("./db/mongoose")
const {load} = require('./config/collectionConfig')
const path = require('path')

// RUN THIS ONCE FOR ADMIN, CATEGORIES AND PRODUCTS.
load()


// MIDDLEWARE
app.use(cors())
app.use(express.json())

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/client'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/client/index.html'));
});


// ROUTES
app.use('/user', require("./routes/user.routes"))
app.use('/auth', require("./routes/auth.routes"))
app.use('/checkout', require("./routes/checkout.routes"))
app.use('/product', require("./routes/product.routes"))
app.use('/cart', require("./routes/cart.routes"))



app.listen(8080, () => {
  console.log("server is running")
})