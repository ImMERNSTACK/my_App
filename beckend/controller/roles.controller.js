const roles = require("../model/roles");

exports.addRole = async(req,res)=>{
    const role=req.body.role;
    const permissions=req.body.permissions;

    const newRole= await new roles({role,permissions})

    const isSaved =  await newRole.save();
    
    if(isSaved){
        return res.status(200).json({message:"role saved success"});
    }else{
        return res.status(500).json({message:"Server Error"});
    }
}
exports.deleteRole = async(req,res)=>{

}