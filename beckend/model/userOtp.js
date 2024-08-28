const mongoose = require("mongoose");
const validator = require("validator");

const userOTPSchema = new mongoose.Schema({
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
    otp:{
        type:String,
        required:true,
    }
})

const userOtp = new mongoose.model("userotps",userOTPSchema);

module.exports = userOtp;