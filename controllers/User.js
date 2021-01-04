const mysqlConnection = require("../sqlconnection");

//ALL USERS
exports.AllUsers= (req,res)=>{
    mysqlConnection.query("SELECT * from user",(err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows);
        }
    })
}

//SEARCH User by Id and set user profile
exports.getUserById = (req,res,next,id)=>{
    console.log(id)
    sql="SELECT * FROM user WHERE user_id=?"
    mysqlConnection.query(sql,[id],(err,rows,fields)=>{
        if(err || rows.length==0){
            return res.status(400).json({
                error: "No user was found in DB"
              });
        }
        req.profile = rows[0];
        console.log(req.profile);
        next();
        
    });
}

//GET USER BY ID 
exports.getUser = (req,res)=>{
    req.profile.password=undefined;
    return res.json(req.profile)
}