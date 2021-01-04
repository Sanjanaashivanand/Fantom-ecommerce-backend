const mysqlConnection = require("../sqlconnection");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { check, validationResult } = require("express-validator");
var smartId = require("smart-id");

exports.signup = (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            parameter: errors.array()[0].param
        });
    }

    let sql = `INSERT INTO user(user_id,user_name,email,password,mobile_no) VALUES (?)`
    var id = smartId.make();
    let values = [
        id,
        req.body.user_name,
        req.body.email,
        req.body.password,
        req.body.mobile_no
    ];
    
    mysqlConnection.query(sql,[values], (err,result,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json({
                status:200,
                message:"New user is created successfully"
            })
        }
    })
};

exports.signin = (req,res) =>{
    const errors = validationResult(req);

    const {email,password} = req.body;

    //validation
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            parameter: errors.array()[0].param
        });
    }

    sql='SELECT * FROM user WHERE email= ? AND password = ?';
    mysqlConnection.query(sql, [email,password], (err,user,fields)=>{
        if(err){
            console.log(err)
        }
        else if(user.length==0){
            return res.status(401).json({
                error: "User or/and Password is incorrect"
            })
        }
        //creating a token
        const token = jwt.sign({user_id: user[0].user_id}, "SECRET")
        //put the token in user cookie
        res.cookie("token",token,{expire: new Date() + 9999});

        const{user_id,user_name,email,role}=user[0]
        return res.json({token,user:{user_id,user_name,email,role}})

    })

}

exports.signout = (req,res) => {
    res.clearCookie("token");
    res.json({
        message : "User signned out successfully",
    });
}

//PROTECTING THE ROUTES WHICH CAN BE USED AS MIDDLEWARE
exports.isSignedIn = expressJwt({
    secret: "SECRET",
    userProperty: "auth"
});

//CUSTOM MIDDLEWARE
exports.isAuthenticated = (req,res,next)=>{
    let checker = req.profile && req.auth && req.profile.user_id == req.auth.user_id
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED OKAY"
          });
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role==0){
        return res.status(403).json({
            error: "You are not admin, ACCESS DENIED"
        });
    }
    next();
}
