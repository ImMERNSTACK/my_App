const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const SECRET_KEY ="yfhgfdgjkjllkj"
const userSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true, 
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not Valid Email");
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ]

    
})

userSchema.pre("save",async function(next) {
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,12);
    }
    next();
})

userSchema.methods.generateAuthToken =async function(){
     try {
        let newtoken = jwt.sign({_id:this._id},SECRET_KEY,{
            expiresIn:"1d"
        })

        this.tokens=this.tokens.concat({token:newtoken});
        await this.save();
        return newtoken;
     } catch (error) {
         res.status(400).json(error); 
     }
}

const users = new mongoose.model("Users",userSchema)

module.exports = users;