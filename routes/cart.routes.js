const router = require("express").Router()
const {Cart, CartItem} = require("../db/models/cart.model")
const {verifyAccessToken} = require("../config/verify")



// get cart for user.

router.get("/", verifyAccessToken, (req, res) => {
Cart.findOne({userId: req.user_id}).then((cart) => {
  // if cart doesn't exist, create a new cart
  if (!cart) {
    const newCart = new Cart()
    newCart.date = new Date()
    newCart.description = "new cart"
    newCart.userId = req.user_id
    newCart.save().then((cart) => {
      res.send(cart)
    })
  } else {
    res.send(cart)
  }
})
})

// delete cart
router.delete("/:cartId", verifyAccessToken, (req, res) => {
  Cart.findByIdAndDelete({_id: req.params.cartId}).then((removed) => {
    res.send(removed)
})
})

// get all items - all verified users
router.get("/:cartId", verifyAccessToken ,(req, res) => {
  
  CartItem
    .find({_cartId: req.params.cartId})
    .populate('_productId')
    .exec()
    .then((items) => {
      res.send(items)
    })
})

// update all cart items 
router.post("/update/:cartId", (req, res) => {
  // delete them at first
  CartItem.deleteMany({_cartId: req.params.cartId}).then(() => { 
  req.body.map((item) => {
    const newCartItem = new CartItem()
    newCartItem._productId = item._productId;
    newCartItem.quantity = item.quantity;
    newCartItem._cartId = item._cartId;
    newCartItem.save()
    })
  })
  })


// add product

router.post("/addproduct", verifyAccessToken,(req, res) => {
  const newCartItem = new CartItem()
  newCartItem._productId = req.body._productId;
  newCartItem.quantity = req.body.quantity;
  newCartItem._cartId = req.body._cartId;
  newCartItem.save().then((addedProduct) => { 
    res.send(addedProduct)
  })
})

// update quantity for a product
router.put("/update/:_id", verifyAccessToken, (req, res) => {
  CartItem.updateOne({_id: req.params._id}, {$set: { quantity: req.body.quantity}}).then((update) => {
    res.send(update)
})
})



// delete product
router.delete("/products/:_id", verifyAccessToken, (req, res) => {
  CartItem.deleteOne({_id: req.params._id}).then((removed) => {
    res.send(removed)
})
})


// delete all products from the cart when deleting a cart
router.delete("/all/:cartId", verifyAccessToken, (req, res) => {
  CartItem.deleteMany({_cartId: req.params.cartId}).then((removed) => {
    res.send(removed)
})
})



module.exports = router;