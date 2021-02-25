const mysql = require("mysql");

//DB CONNECTION
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"rsraju@01",
    database:"Fantom",
    multipleStatements:true,
    port:3306
})

mysqlConnection.connect((err)=>{
    if(err){
        console.log("CONNECTION FAILED",err)
    }
    else{
        console.log("Connection Successful");

        //CREATING USER TABLE
        const usertable = "create table if not exists user(user_id varchar(25) primary key,user_name varchar(60),email varchar(50) unique,password varchar(40),role integer(1) default 0,mobile_no bigint(10) unique)"

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


        //CREATING ORDER TABLE
        const ordertable = " create table if not exists orders(order_id varchar(25) primary key,user_id varchar(25) references user(user_id),products json,total_bill integer,address varchar(225),status varchar(25),placed_on date)";

        mysqlConnection.query(ordertable,(err, result) => {
            if (err) throw err;
            console.log("Order Table created");
        });

        //TRIGGERS
        
        // const trigger_one  = `delimiter $$
        // create if not existstrigger insert_on_order 
        // after insert 
        // on orders for each row 
        // begin 
        //     declare productList json ; 
        //     declare i int default 0 ; 
        //     set @productList = (new.products) ; 
        //     set @i =0; 
        //     while @i<json_length(@productList) do 
        //         update product set quant_unit = quant_unit + json_extract(@productList, concat('$[',@i,'].count')) where p_id = json_extract(@productList, concat('$[',@i,'].p_id')) ; 
        //         set @i = @i + 1; 
        //     end while ; 
        //     end ; 
        //     delimiter ;`
        
        // mysqlConnection.query(trigger_one,(err, result) => {
        //     if (err) throw err;
        //     console.log("Trigger 1 set");
        // });

        //

        // const trigger_two = `delimiter $$
        // create trigger set_placed_on
        // before insert on orders
        // for each row 
        // begin
        // set new.placed_on = now();
        // end ;`

        //    mysqlConnection.query(trigger_two,(err, result) => {
        //     if (err) throw err;
        //     console.log("Trigger 2 set");
        // });

        // STORED PROCEDURE 
        // const stored = `delimiter //
        // create procedure productByid
        // (in id varchar(25))
        // begin 
        // select * from product p natural join category c where p.id=id;
        // end ;`

           // mysqlConnection.query(stored,(err, result) => {
        //     if (err) throw err;
        //     console.log("Stored procedure");
        // });

    }
})



module.exports = mysqlConnection;