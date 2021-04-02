const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://orisayag:Os6852265@cluster0.shiiw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false}).then(()=> {
  console.log("connected to db")
}).catch((error) => {
  console.log(`connection error ${error}`)
})


module.exports = {mongoose}