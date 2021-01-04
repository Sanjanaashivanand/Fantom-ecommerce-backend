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
        const usertable = "create table if not exists user(user_id varchar(25) primary key,user_name varchar(60),email varchar(50) unique,password varchar(40),role integer(1) default 0,mobile_no bigint(10))";

        mysqlConnection.query(usertable, (err, result) => {
            if (err) throw err;
            console.log("User Table created");

        });
    }
})



module.exports = mysqlConnection;