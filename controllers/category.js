const mysqlConnection = require("../sqlconnection");
var smartId = require("smart-id");

//TO SEARCH CATEGORY BY PARAMS 
exports.getCategoryById = (req,res,next,id) => {
    console.log(id)
    sql="SELECT * FROM category WHERE category_id=?"
    mysqlConnection.query(sql,[id],(err,rows,fields)=>{
        if(err || rows.length==0){
            return res.status(400).json({
                error: "No category was found in DB"
              });
        }
        req.category = rows[0];
        console.log(req.category);
        next();
    })

}

//CREATE CATEGORY FUNCTION
exports.createCategory = (req,res) => {
    let sql = `INSERT INTO category(category_id,category_name) VALUES (?)`;
    var id = smartId.make();
    let values = [
        id,
        req.body.category_name
    ]

    mysqlConnection.query(sql,[values], (err,result,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json({
                status:200,
                message:"New Category created"
            })
        }
    })

}

//GET ALL CATEGORIES FUNCTION
exports.getAllCategories = (req,res) => {
    mysqlConnection.query("SELECT * from category",(err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows);
        }
    })
}

//GET A CATEGORY BY PARAMS
exports.getACategory = (req,res) => {
    return res.json(req.category);
}

//UPDATE CATEGORY
exports.UpdateCategory = (req,res) => {
    let sql = `UPDATE category SET category_name = ? WHERE category_id= ?`;
    const id = req.category.category_id;
    const newCat = req.body.category_name;
    mysqlConnection.query(sql,[newCat,id],(err,result,fields)=>{
        if(err){
            return res.status(400).json({
                error:"Update Failed"
            })
        }
        res.json({
            status:200,
            message: "Updated successfully"
        })
    })
}

//DELETE CATEGORY
exports.DeleteCategory = (req,res) => {
    let sql = `DELETE FROM category WHERE category_id= ?`;
    const id = req.category.category_id;
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