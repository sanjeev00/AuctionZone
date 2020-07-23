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

    },
    sellerId:{
        type:String,
        required:true
    },

    latestBid:{
        type:Number,
        default: 0,
    },
    bidOpen:{
        type:Boolean,
        default: true,
    }



},{
    timestamps:true
});


const Item = mongoose.model('Item',itemSchema);
module.exports = Item;