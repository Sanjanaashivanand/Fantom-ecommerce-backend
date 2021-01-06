const mysql = require("mysql");

//DB CONNECTION
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"rsraju@01",
    database:"Fantom",
    multipleStatements:true
})

mysqlConnection.connect((err)=>{
    if(err){
        console.log("CONNECTION FAILED",err)
    }
    else{
        console.log("Connection Successful");

        //CREATING USER TABLE
        const usertable = "create table if not exists user(user_id varchar(25) primary key,user_name varchar(60),email varchar(50) unique,password varchar(40),role integer(1) default 0,mobile_no bigint(10))"

        mysqlConnection.query(usertable, (err, result) => {
            if (err) throw err;
            console.log("User Table created");

        });

        //CREATING CATEGORY TABLE
        const categorytable = "create table if not exists category(category_id varchar(25) primary key,category_name varchar(40) unique)";

        mysqlConnection.query(categorytable,(err, result) => {
            if (err) throw err;
            console.log("Category Table created");
        });

        //CREATING PRODUCT TABLE
        const producttable = "create table if not exists product(p_id varchar(25) primary key,p_name varchar(50),image varchar(2083),unit_price integer,stock integer,description varchar(5000),quant_unit integer default 0,category_id varchar(25) references category(category_id))"
            
        mysqlConnection.query(producttable,(err, result) => {
            if (err) throw err;
            console.log("Product Table created");
        });


        //CREATING CART TABLE
        const carttable = " create table if not exists cart(cart_id varchar(25) primary key,user_id varchar(25) references user(user_id),p_name varchar(50) references product(p_name),p_number integer,total_bill integer)";

        mysqlConnection.query(carttable,(err, result) => {
            if (err) throw err;
            console.log("Cart Table created");
        });
        
    }
})



module.exports = mysqlConnection;