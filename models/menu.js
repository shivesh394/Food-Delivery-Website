const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    order : {
        type:Array,
        required:true
    }
});



const Menu = new mongoose.model("Menu", menuSchema);


module.exports = Menu;