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

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());



//Routes
app.use("/api",authenticationRoutes);
app.use("/api",UserRoutes);
app.use("/api/category",CategoryRoutes);

port=9000

app.listen(port,()=>{
    console.log(`App is running at port ${port}`)
});