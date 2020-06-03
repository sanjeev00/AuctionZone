const mongoose = require('mongoose')

const Schema  =  mongoose.Schema

const itemSchema  = new Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    seller:{
        type:String,
        required: true
    },
    image:{
        type:String,

    }


},{
    timestamps:true
});


const Item = mongoose.model('Item',itemSchema);
module.exports = Item;