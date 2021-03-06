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


// ROUTES
app.use('/api/user', require("./routes/user.routes"))
app.use('/api/auth', require("./routes/auth.routes"))
app.use('/api/checkout', require("./routes/checkout.routes"))
app.use('/api/product', require("./routes/product.routes"))
app.use('/api/cart', require("./routes/cart.routes"))

if (process.env.NODE_ENV === 'production') {
  // Serve only the static files form the dist directory
  app.use(express.static(__dirname + '/frontend/client/dist/client'));
  app.get('/*', function(req,res) {  
  res.sendFile(path.join(__dirname+'/frontend/client/dist/client/index.html'));
  });
}

const PORT = process.env.PORT || 80

app.listen(PORT, () => {
  console.log("server is running on " + PORT)
})