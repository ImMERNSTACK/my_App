const mongoose = require("mongoose");
const rolesSchema = new mongoose.Schema({
    role:String,
    permissions:[
        {
            type:String
        }
    ]
})
const roles = new mongoose.model("Roles",rolesSchema)

module.exports = roles;

