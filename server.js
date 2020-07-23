const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const path = require('path');
const bodyParser = require('body-parser');

const fileUpload = require('express-fileupload')
require('dotenv').config();

const app = express();
const port  = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true , useCreateIndex:true,useUnifiedTopology:true})
const connection =  mongoose.connection;
connection.once('open',()=>{
    console.log('mongodb  connection success')
})

const userRouter = require('./routes/user');
const itemRouter = require('./routes/item');
const bidRouter  = require('./routes/bid')

app.use('/api/user',userRouter);
app.use('/api/item',itemRouter);
app.use('/api/bid',bidRouter);
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static('./client/build'));


app.listen(port,()=>{
    console.log("server is running")
})
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build",
        "index.html"));
});
