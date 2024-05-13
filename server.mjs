import net from 'net'; //imported to create TCP servers and sockets
let sockets = [];  //to store references to all connected sockets.

function broadcast(data) {
    sockets.forEach(socket => {
        socket.write(data);
    })
}

//Inside the callback function, the socket object 
//representing the newly connected client is passed as a parameter.
const server = net.createServer(function (socket) {
    sockets.push(socket);

    //When data is received from a client, the provided callback function is executed
    //The broadcast function then sends this data to all connected sockets,
    // effectively broadcasting the message to all clients currently connected to the server.
    socket.on('data', function (data) {
        broadcast(data);
    });

    socket.on('error', function (err) {
        console.error(err);
    });
})

server.listen(8080, function () {
    console.log("Server is listening");
})