const mongoose = require("mongoose");
const DB = process.env.MONGODB_URI;
mongoose.connect(DB).then(()=>{
    console.log("DataBase Connected");
}).catch((error)=>{
    console.log("error : "+error);
})