const router = require("express").Router()
const {verifyAccessToken} = require("../config/verify")
const {Category} = require("../db/models/categories.model")
const {Product} = require("../db/models/products.model")


// CATEGORIES //
// get all categories - all verified users
router.get("/categories",verifyAccessToken, (req, res) => {
  Category.
  find().sort({"category_name": 1})
  .then((categories) => {
    res.send(categories)
  })
})


// add category - admin only 
router.post("/categories", verifyAccessToken, (req, res) => {
  if (req.user_role !== "admin") 
  return res.status(404).json({err: true, msg: "not authorized user"})

  const newCategory = new Category()
  newCategory.category_name = req.body.category_name
  newCategory.save().then((newCat) => { 
    res.send(newCat)
  })
})

// delete category - admin only
  router.delete("/categories/:categoryId",verifyAccessToken, (req, res) => {
  if (req.user_role !== "admin") 
  return res.status(404).json({err: true, msg: "not authorized user"})
  Category.findByIdAndDelete({_id: req.params.categoryId}).then((removed) => {
    res.send(removed)
})
})


// get products count - all verified users
router.get("/count", verifyAccessToken ,(req, res) => {
  Product.countDocuments().then((count)=> {
    res.send(`${count}`)
  })
})

// get all products - all verified users
router.get("/products", verifyAccessToken, (req, res) => {

  Product
    .find({}).sort({description: 1})
    .then((product) => {
      res.send(product)
    })
})

// product search - all verified users
router.post("/products/search", verifyAccessToken, (req, res) => {
  Product
    .find({$text: { $search: req.body.value,
    $caseSensitive: false,}})
    .then((product) => {
      if (product.length == 0 && req.body.value.length == 0 ) {
        Product.find().then((product) => {
          res.send(product)
        })        
      } else if (product.length == 0) {
        res.send([])
      } else {
        res.send(product)
      }
    })
})


// add a new product - admin only
router.post("/products/new", verifyAccessToken, (req, res) => {
  if (req.user_role !== "admin") 
  return res.status(404).json({err: true, msg: "not authorized user"})
  const newProduct = new Product()
  newProduct.product_maker = req.body.product_maker;
  newProduct.product_name = req.body.product_name;
  newProduct.description = req.body.description;
  newProduct.categoryId = req.body.categoryId;
  newProduct.price = req.body.price;
  newProduct.detail = req.body.detail;
  newProduct.image = req.body.image;
  newProduct.save().then((newPro) => { 
    res.send(newPro)
  })
})

// update a product - admin only
router.put("/products/:productId", verifyAccessToken, (req, res) => {
  if (req.user_role !== "admin") 
  return res.status(404).json({err: true, msg: "not authorized user"})
  Product.findByIdAndUpdate({_id: req.params.productId}, {
    $set: {product_maker: req.body.product_maker, product_name: req.body.product_name, description: req.body.description, price: req.body.price, detail: req.body.detail, image: req.body.image, categoryId: req.body.categoryId}
  }).then((product) => {
    res.send(product)
  })
})

// delete a product - admin only
router.delete("/products/:productId", verifyAccessToken, (req, res) => {
  if (req.user_role !== "admin") 
  return res.status(404).json({err: true, msg: "not authorized user"})
  Product.findByIdAndDelete({_id: req.params.productId}).then((removed) => {
    res.send(removed)
})
})

// get products by category - all verified users
router.get("/products/:categoryId", verifyAccessToken, (req, res) => {
  Product
    .find({categoryId: req.params.categoryId })
    .then((product) => {
      res.send(product)
    })
})

// get products by price - all verified users

router.post("/products/price-sort", verifyAccessToken, (req, res) => {
  Product
    .find()
    .where('price').gt(`${req.body.gt}`).lt(`${req.body.lt}`)
    .then((product) => {
      res.send(product)
    })
})

// get product_maker without duplicates AKA brands list - all verified users
router.get("/brand", verifyAccessToken, (req, res) => {
  Product
    .distinct('product_maker')
    .then((brand) => {
      res.send(brand)
    })
})

// get products by brand name - all verified users
router.get("/brand/:brand", verifyAccessToken, (req, res) => {
  Product
    .find({product_maker: req.params.brand})
    .then((product) => {
      res.send(product)
    })
})

module.exports = router;