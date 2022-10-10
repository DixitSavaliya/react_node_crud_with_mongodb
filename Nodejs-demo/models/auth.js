const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
    email:{
        type:String,required:true
    },
    password:{
        type:String,required:true
    },
    firstname:{
        type:String,required:true
    },
    lastname:{
        type:String,required:true
    }
})

module.exports = mongoose.model('AuthSchema', authSchema);