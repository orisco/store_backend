const {model, Schema} = require("mongoose")

const ProductsSchema = new Schema({
  product_maker: String,
  product_name: {
    type: String,
    unique: true,
  },
  description: String,
  categoryId: String,
  detail: String,
  price: Number,
  image: String,
})

ProductsSchema.index({
  product_maker: 'text',
  product_name: 'text',
  description: 'text'
})

const Product = model('Products', ProductsSchema)

module.exports = { Product }