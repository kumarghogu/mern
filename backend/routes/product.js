const router = require("express").Router()

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")
const {getProductId, createProduct, getProduct,
        deleteProduct, updateProduct, photo,
        getAllProducts, getAllUniqueCategories} = require("../controllers/product")

router.param("userId", getUserById)
router.param("productId", getProductId)

router.post("/product/create/:userId", 
isSignedIn, isAuthenticated, isAdmin, createProduct)

router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo)

router.delete("/product/:productId/:userId",
isSignedIn,isAuthenticated,isAdmin,deleteProduct)

router.put("/product/:productId/:userId",
isSignedIn,isAuthenticated,isAdmin,updateProduct)

router.get("/products", getAllProducts)

router.get("/products/categories", getAllUniqueCategories)

module.exports = router