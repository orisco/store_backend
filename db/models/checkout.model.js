const {model, Schema} = require("mongoose")

const CheckoutSchema = new Schema({
  customer_name: String,
  delivery_city: String,
  delivery_street: String,
  cartId: String,
  orderDate: Date,
  final_price: Number,
  delivery_date: Date,
  cc: String
})


const Checkout = model('Checkout', CheckoutSchema)

module.exports = { Checkout }