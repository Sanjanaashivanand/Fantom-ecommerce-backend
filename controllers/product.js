const mysqlConnection = require("../sqlconnection");
const formidable = require("formidable");
var smartId = require("smart-id");
const _ = require("lodash");

//TO SEARCH PRODUCT BY PARAMS
exports.getProductById = (req,res,next,id) => {
    sql="SELECT * FROM product WHERE p_id=?"
    mysqlConnection.query(sql,[id],(err,rows,fields)=>{
        if(err || rows.length==0){
            return res.status(400).json({
                error: "No product was found in DB"
              });
        }
        req.product = rows[0];
        next();
    })
}

//CREATE PRODUCT FUNCTION
exports.createProduct = (req,res) =>{
    let sql=`INSERT INTO product(p_id,p_name,image,unit_price,stock,description,category_id) VALUES (?)`;
    var id=smartId.make();
    let values = [
        id,
        req.body.p_name,
        req.body.image,
        req.body.unit_price,
        req.body.stock,
        req.body.description,
        req.body.category_id
    ]

    mysqlConnection.query(sql,[values],(err,result,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json({
                status:200,
                message:"New Product created"
            })
        }
    })
}

//GET ALL PRODUCTS
exports.getAllProducts = (req,res) => {
    mysqlConnection.query("SELECT * from product",(err,rows,fields)=>{
        if(err){
            console.log("ERROR CAUGHT",err);
        }
        else{
            res.send(rows);
        }
    })
}

//GET PRODUCT BY PARAMS
exports.getAProduct = (req,res) => {
    return res.json(req.product);
}

//TODO- GET PRODUCTS BY CATEGORY 
exports.getProductsByCategory = (req,res)=>{
    
}

//UPDATE PRODUCT
exports.UpdateProduct = (req,res) => {
    let sql=`REPLACE into product (p_id,p_name,image,unit_price,stock,description,quant_unit,category_id) value (?)`;

    let product = req.product;
    product = _.extend(product, req.body);
    let value = Object.values(product)
    
    mysqlConnection.query(sql,[value],(err,result,fields)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                error:"Update Failed"
            })
        }
        res.json({
            status:200,
            message: "Update successful"
        })
    })
}

//DELETE PRODUCT
exports.DeleteProduct = (req,res) => {
    let sql = `DELETE FROM product WHERE p_id= ?`;
    const id = req.product.p_id
    mysqlConnection.query(sql,[id],(err,result,fields)=>{
        if(err){
            return res.status(400).json({
                error:"Deletion Failed"
            })
        }
        res.json({
            status:200,
            message: "Successfully deleted"
        })
    })
}