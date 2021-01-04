var express = require('express');
const mysqlConnection = require('../sqlconnection');
var router = express.Router();

const { check } = require('express-validator');
const{signup,signin,signout} = require("../controllers/authentication")


router.post("/signup",[
    check("user_name","Name should atleast 3 characters").isLength({min:3}),
    check("email","Email is required").isEmail(),
    check("password","Password should be have 5 characters").isLength({min:5})
],signup);

router.post("/signin",[
    check("email","Email is required").isEmail(),
    check("password","Password is required").isLength({min:5})
],signin);

router.get("/signout",signout);

module.exports = router;