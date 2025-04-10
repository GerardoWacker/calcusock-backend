/**
 * calcusock-server
 * @author Gerardo Wacker
 */

const port = process.env.PORT || 1301

const Socket = require('./controllers/socket.controller')

const socket = new Socket()

socket.start().then(server =>
{
    server.listen(port, () =>
    {
        console.log('🚀 calcusock-server iniciado con éxito en el puerto ' + port + '.')
    })
})