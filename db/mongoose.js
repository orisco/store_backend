const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/theStore", {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false}).then(()=> {
  console.log("connected to db")
}).catch((error) => {
  console.log(`connection error ${error}`)
})


module.exports = {mongoose}