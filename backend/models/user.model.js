const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password:{
        type: String,
        required: true,
    },
    mobile:{
        type: String,
        required:true,
        minlength: 10
    },
    mail:{
        type: String,
        required:true,
    }



},{
    timestamps:true,

});

const User = mongoose.model('User',userSchema);
module.exports = User;