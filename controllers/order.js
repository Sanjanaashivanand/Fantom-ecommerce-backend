const mysqlConnection = require("../sqlconnection");
const formidable = require("formidable");
var smartId = require("smart-id");
const _ = require("lodash");

//TO SEARCG PRODUCT BY PARAMS
exports.getOrderById= (req,res,next,id) => {
    sql="SELECT * FROM orders WHERE order_id=?";
    mysqlConnection.query(sql,[id],(err,rows,fields)=>{
        if(err || rows.length==0){
            return res.status(400).json({
                error: "No Order was found in DB"
              });
        }
        req.order = rows[0];
        next();
    })
}

//CREATE
exports.createOrder = (req,res) => {
    sql="INSERT INTO orders(order_id,user_id,products,total_bill,address) VALUES (?)";
    var id=smartId.make();
    let values = [
        id,
        req.profile.user_id,
        JSON.stringify(req.body.products),
        req.body.total, //user_id: "lSZdF0VCuH", products: Array(3), total: 3000, address: "#69, my heart street, amsterdam"
        req.body.address
    ]
    console.log("Backend values",values)
    console.log(req.body)

    mysqlConnection.query(sql,[values],(err,result,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json({
                status:200,
                message:"Order placed"
            })
        }
    })

}

//READ
exports.getAllOrders =(req,res) => {
    mysqlConnection.query("SELECT * FROM orders join user on orders.user_id=user.user_id; ",(err,rows,fields)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(rows);
        }
    })
}

exports.getAnorder = (req,res) => {
    return res.json(res.order);
}

//UPDATE
exports.UpdateOrderStatus = (req,res) => {
    let sql = `UPDATE orders SET status = ? WHERE order_id= ?`;
    const id = req.order.order_id;
    const status = req.body.status;
    mysqlConnection.query(sql,[status,id],(err,result,fields)=>{
        if(err){
            console.log(err)
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

//DELETE
exports.DeleteOrder = (req,res) => {
    let sql = `DELETE FROM orders WHERE order_id= ?`;
    const id = req.order.order_id;
    mysqlConnection.query(sql,[id],(err,result,fields)=>{
        if(err){
            return res.status(400).json({
                error:"Deletion Failed"
            })
        }
        console.log(result)
        res.json({
            status:200,
            message: "Successfully deleted"
        })
    })
}
