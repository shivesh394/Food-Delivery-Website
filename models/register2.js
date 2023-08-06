const mongoose = require("mongoose");

const contactUs = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    phone : {
        type:String,
        required:true
    },
    message : {
        type:String,
        required:true
    }
});

const Register2 = new mongoose.model("Register2", contactUs);

module.exports = Register2;