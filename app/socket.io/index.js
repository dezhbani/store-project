const namespaceSocket = require("./namespace.socket")

module.exports = {
    socketHandler: (io) => {
        new namespaceSocket(io).initConnection()
        new namespaceSocket(io).createNamespacesConnection()
    }
}