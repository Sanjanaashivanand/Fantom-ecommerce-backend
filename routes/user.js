var express = require('express');
const app = express()
const mysqlConnection = require('../sqlconnection');
var router = express.Router();
const {AllUsers,getUserById,getUser} = require("../controllers/User");
const { isSignedIn, isAuthenticated,isAdmin } = require('../controllers/authentication');

router.param("id",getUserById)

//GET ALL USER DATA
router.get("/allusers",AllUsers);

router.get('/user/:id',isSignedIn, isAuthenticated, getUser)



module.exports = router;