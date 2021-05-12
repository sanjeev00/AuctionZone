let sock
let io
const { Server } = require("socket.io");

exports.socketConnection = (server) => {
    io = new Server(server,{cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }});

    io.on('connection', (socket) => {
        sock  =socket
        socket.join(socket.handshake.query.room)
        console.log('a user connected');
        //socket.emit('bid',2400)
        socket.on('disconnect',()=>{
            console.log('user disconnected')
        })
        socket.on('bid', (msg) => {
            console.log('incoming bid for '+msg);
        });
    });

};


exports.makebid = (bid)=>{
    io.to(bid.productId).emit('bid',bid)
}
