var express = require('express');
var router = express.Router();
const { getUserById } = require('../controllers/User');
const {getCategoryById} = require("../controllers/category");
const {getProductById} = require('../controllers/product');
const{isSignedIn,isAuthenticated,isAdmin} = require('../controllers/authentication')
const{getOrderById,createOrder,getAllOrders,getAnorder,DeleteOrder, UpdateOrderStatus} = require("../controllers/order")

//PARAMS
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);
router.param("productId",getProductById);
router.param("orderId",getOrderById);

//CREATE
router.post("/create/:userId",isSignedIn,isAuthenticated, createOrder);

//READ
//Get all orders
router.get('/allorders/:userId',isSignedIn,isAuthenticated,isAdmin,getAllOrders);

//Get order by user id
router.get("/:orderId",getAnorder);

//UPDATE
router.put("/:orderId/:userId",isSignedIn,isAuthenticated,isAdmin,UpdateOrderStatus);

//DELETE
router.delete("/:orderId/:userId",isSignedIn,isAuthenticated,isAdmin,DeleteOrder);

module.exports=router

