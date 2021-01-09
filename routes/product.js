var express = require('express');
var router = express.Router();
const { getUserById } = require('../controllers/User');
const {getCategoryById} = require("../controllers/category");
const { createProduct,getAllProducts,getAProduct, getProductById,UpdateProduct,DeleteProduct} = require('../controllers/product');
const{isSignedIn,isAuthenticated,isAdmin} = require('../controllers/authentication')


//PARAMS
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);
router.param("productId",getProductById)

//CREATE
router.post("/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);

//READ
//get all products
router.get('/',getAllProducts);
//get products by category
//router.get('/:categoryId',getProductsByCategory);
//get a product
router.get("/:productId",getAProduct);

//UPDATE
router.put("/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,UpdateProduct);

// //DELETE
router.delete("/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,DeleteProduct);

module.exports = router