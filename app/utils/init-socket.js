const socketIO = require("socket.io");
function initSocket(httpServer){
    const io = socketIO(httpServer, {
        cors: {
            origin: '*'
        }
    })
    return io
}

module.exports = {
    initSocket
}