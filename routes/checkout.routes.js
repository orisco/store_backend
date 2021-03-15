const router = require("express").Router()
const {Checkout} = require("../db/models/checkout.model")
const {verifyAccessToken} = require("../config/verify")
const fs = require("fs");
const path = require("path")


// get checkout counts
router.get("/count", verifyAccessToken ,(req, res) => {
  Checkout.countDocuments().then((count)=> {
    res.send(`${count}`)
  })
})


// add checkout summary
router.post("/checkout-summary", verifyAccessToken,(req, res) => {
  const newCheckout = new Checkout()
  newCheckout.customer_name  = req.body.customer_name;
  newCheckout.delivery_city = req.body.delivery_city;
  newCheckout.delivery_street = req.body.delivery_street;
  newCheckout.cartId = req.body.cartId;
  newCheckout.orderDate = req.body.orderDate;
  newCheckout.final_price = req.body.final_price;
  newCheckout.delivery_date = req.body.delivery_date;
  newCheckout.cc = req.body.cc;
  
  newCheckout.save().then((addedProduct) => { 
    res.send(addedProduct)
  })

})


// block date if more than 3 orders on the same date.
router.get("/dates", verifyAccessToken ,(req, res) => {
  Checkout
      .aggregate([
      {$group: { _id: {date: "$delivery_date"}, count: {$sum : 1}}},
      {$match: {count : {"$gt": 2} } }
      ])
      .then((date) => {
         res.send(date)
    }).catch((err)=> {
        res.send(err)
    })
  })
    



// write a receipt - all verified users
router.get("/:checkoutId", verifyAccessToken ,(req, res) => {

      Checkout
      .find({_id: req.params.checkoutId})
      .then((checkoutSum) => {
        const summary = `
        révéler - The beauty store.
        ----------------------------------
        Purchase Summary
        Order Date: ${checkoutSum[0].orderDate}
        Delivered To: ${checkoutSum[0].customer_name}
        City: ${checkoutSum[0].delivery_city}
        Street: ${checkoutSum[0].delivery_street}
        Final Price: ${checkoutSum[0].final_price}
        Last 4 Digits of Credit Card: ${checkoutSum[0].cc}
        Delivery Date: ${checkoutSum[0].delivery_date}`
      
        
        fs.writeFile('checkout-summary.txt', summary, function (err) {
          if (err) throw err;
          res.sendFile(path.join(__dirname, '../checkout-summary.txt'));

        });
      })
  });




module.exports = router;