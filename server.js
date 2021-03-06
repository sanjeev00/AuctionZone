const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const path = require('path');
const bodyParser = require('body-parser');
const { socketConnection } = require('./sockethelper');
const fileUpload = require('express-fileupload')
const http =  require("http")
require('dotenv').config();

const app = express();


const port  = process.env.PORT || 5000;
const server =http.createServer(app);
socketConnection(server)


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




server.listen(port,()=>{
    console.log("server is running")
})
console.log(port)
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build",
        "index.html"));
});

