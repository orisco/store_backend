const {model, Schema} = require("mongoose")

const CartSchema = new Schema({
  date: Date,
  description: String,
  userId: String
})

const Cart = model('Cart', CartSchema)


const CartItemSchema = new Schema({
   _productId: [{
    type: Schema.Types.ObjectId,
    ref: "Products"
    }],
    quantity: Number,
    _cartId: String
})


const CartItem = model('CartItem', CartItemSchema)

module.exports = { Cart, CartItem }