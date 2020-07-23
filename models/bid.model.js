const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bidSchema = new Schema({

    cost: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    productId:{
        type: String,

    },
    userId:{
        type: String,
        required: true
    },
    bidTime:{
        type:Number,

    }

},{timestamps:true})

const Bid = mongoose.model('Bid',bidSchema);
module.exports = Bid;