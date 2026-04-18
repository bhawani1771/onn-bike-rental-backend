const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name :{type : String , required :true},
    description :{type : String , required : true},
})

module.exports = mongoose.model("Onnreview" ,reviewSchema );