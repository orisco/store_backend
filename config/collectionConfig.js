const {Product} = require('../db/models/products.model')
const {Category} = require('../db/models/categories.model')
const {User} = require('../db/models/user.model')


const load = () =>  {
  User.create({_id:"11223344", firstName: "admin", lastName: "admin", email: 'admin@gmail.com', password: "12345", city: 'tel aviv', street: '11', role: 'admin' }).then(() => {
    Category.insertMany([ 
      { category_name: 'Bath & Body'}, 
      { category_name: 'Skin Care'}, 
      { category_name: 'Hair Care'}, 
      { category_name: 'Supplements'}, 
    ]).then(() => { 
      Category.findOne({category_name: 'Bath & Body'}).then((category) => {
        Product.insertMany([   
          { product_maker: "Ursa Major", product_name:  "Sublime Sage Spray Deordorant", description: "1.79 oz", detail: "This instantly-refreshing herbal deodorant neutralizes odor-producing bacteria with a powerful blend of plants, minerals and enzymes, keeping you fresh and funk-free. The lightweight, on-the-go natural spray deodorant delivers long-lasting protection and a sublime scent of sage, geranium, sandalwood and lemon myrtle.", categoryId: category._id, price: 18.50, image: "assets/img/products/ursa_major_spray.jpg" },
          { product_maker: "REN", product_name:  "Moroccan Rose Otto Body Wash", description: "6.8 oz", detail: "Saturate your skin with this all-natural body wash from REN that's jam-packed with top-of-the-line essential oils that provide a deep, soothing clean. The key ingredient, Moroccan rose otto oil, aids hydration, reduces inflammation, and relieves stress — everything you want to end your evening with, except maybe a bottle of wine.", categoryId: category._id, price: 21.50, image: "assets/img/products/10362572-2004526262730254.jpeg" },
          { product_maker: "OUAI", product_name:  "Scalp & Body Scrub", description: "8.8 oz", detail: "OUAI's deep-cleansing, foaming Scalp & Body Scrub is like a trip to rehab for your scalp and skin. A weekly detox powered by gently exfoliating sugar crystals to cleanse and soften skin and a dose of probiotics to leave your skin's natural defenses on high alert.", categoryId: category._id, price: 21.50, image: "assets/img/products/UK300052940_OUAI.jpeg" },
    
        ]).then(() => {
          Category.findOne({category_name: 'Skin Care'}).then((category) => {
          Product.insertMany([
            
            { product_maker: "Herbivore", product_name:  "Blue Tansy - Resurfacing Clarity Mask", description: "60 ml", detail: "A truly natural mask that gently clarifies acne-prone skin with Fruit Enzymes, White Willow Bark, Aloe, and Blue Tansy Essential Oil to soothe the appearance of redness.", categoryId: category._id, price: 48.00, image: "assets/img/products/herbivore-blue-tansy-mask-1.jpg" },
            { product_maker: "Herbivore", product_name:  "Bakuchiol Retinol Alternative Smoothing Serum", description: "30 ml", detail: "Bakuchiol Serum is a naturally derived retinol-alternative treatment to help smooth the appearance of fine lines and wrinkles while sealing in hydration. Bakuchiol, the key ingredient, is sourced sustainably from the Ayurvedic Babchi plant.", categoryId: category._id, price: 54.00, image: "assets/img/products/herbivore-bakuchiol-serum.jpg" },
            
    
            { product_maker: "Ursa Major", product_name:  "Brighten Up Vitamin C Serum", description: "1 oz", detail: "Ursa Major Brighten Up Vitamin C Serum features a highly-stable form of Vitamin C to ensure peak freshness and potency over time. This featherweight face serum goes deep to provide instant hydration while brightening and smoothing skin's tone and appearance.", categoryId: category._id, price: 55.00, image: "assets/img/products/ursa_major_vitamin_c.jpeg" },
    
    { product_maker: "Follain", product_name:  "Eye Cream", description: "0.5 oz", detail: "Firm + Brighten – Bakuchiol (Retinol-alternative), Peptide, Caffeine, Vitamin C – Improve the look of fine lines and wrinkles – All Skin Types – Clean Beauty, Vegan", categoryId: category._id, price: 36.00, image: "assets/img/products/follain_eye_cream.jpg" }, 
    
    { product_maker: "Follain", product_name: "Toning Mist: Balance + Prime", description: "4 oz", detail: "Instant, soothing hydration - Chamomile and Aloe soothe skin and infuse it with hydration that helps follow-up moisturizers work harder. Balance and tone - Rosewater helps balance skin, control excess oil post-cleansing, and delight senses with its soft floral scent. ", categoryId: category._id, price: 18.00, image: "assets/img/products/follain_toning_mist.jpg" }, 
    
         
          ])
        })
      }).then(() => {
        Category.findOne({category_name: 'Hair Care'}).then((category) => {
        Product.insertMany([
          { product_maker: "Pattern", product_name:  "Jojoba Oil Hair Serum", description: "115 ml", detail: "This hair serum contains all the best oils (jojoba, rosehip, and lavender to name just a few) to give curly, coily, and tight textures moisture and nourishment. You can also use it on your scalp to reduce any flaking and itchiness.  ", categoryId: category._id, price: 25.00, image: "assets/img/products/2552748.jpeg" },
          { product_maker: "Loving Culture", product_name:  "Revitalizing Organic Hair Oil", description: "59 ml", detail: "Rich in vitamins B,C, and, E and omega fatty-acids, this hair oil will will restore moisture to your curls and scalp to promote healthy and strong hair.", categoryId: category._id, price: 35.00, image: "assets/img/products/1593200048-lovingculture-1593199993.jpeg" },
        ])
      })
    }).then(() => {
      Category.findOne({category_name: 'Supplements'}).then((category) => {
      Product.insertMany([
        { product_maker: "The Beauty Chef", product_name:  "Probiotic Skin Refiner", description: "100 ml", detail: "By encouraging cellular turnover, this wholefood formula improves tone and texture, smooths fine lines and helps prevent the signs of ageing, sun damage and pigmentation while strengthening the skin’s protective barrier.", categoryId: category._id, price: 75.00, image: "assets/img/products/probiotic-skin-refiner.jpg" },
        { product_maker: "The Beauty Chef", product_name:  "GLOW", description: "5.3 oz", detail: "A daily beauty powder for radiant skin* and gut health. With 18 wholefoods including bio-fermented maqui berries, queen garnet plum and pomegranate fruit peel extract, vitamin C to help boost collagen production and zinc to support healthy hair and nails.", categoryId: category._id, price: 65.00, image: "assets/img/products/glow-inner-beauty-essential-the-beauty-chef_1400x.png" }
      ])
    })
    })
    })
  })
}).catch((error) => { 
  console.log("ran this function once already")      // Failure 
}); 
}


module.exports = {load}