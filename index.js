const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysqlConnection = require("./sqlconnection");
const cookieParser = require("cookie-parser");
var router = express.Router();

//ROUTES
const authenticationRoutes = require("./routes/authentication");
const UserRoutes = require("./routes/user")
const CategoryRoutes = require("./routes/category")
const ProductRoutes=require("./routes/product")
const OrderRoutes=require("./routes/order")

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());



//Routes
app.use("/api",authenticationRoutes);
app.use("/api",UserRoutes);
app.use("/api/category",CategoryRoutes);
app.use("/api/product",ProductRoutes);
app.use("/api/order",OrderRoutes)

port=9000

app.listen(port,()=>{
    console.log(`App is running at port ${port}`)
});