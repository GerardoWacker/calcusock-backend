/**
 * calcusock-server
 * @author Gerardo Wacker
 */

// En el caso de que exista una variable de entorno que contenga el puerto, tomamos esa. Caso contrario, tomamos al
// mejor número del mundo.
const port = process.env.PORT || 1301

// Importar la clase y crear el objeto de Socket.
const Socket = require('./controllers/socket.controller')
const socket = new Socket()

// Iniciar el servidor.
socket.start().then(server =>
{
    server.listen(port, () =>
    {
        console.log('🚀 calcusock-server iniciado con éxito en el puerto ' + port + '.')
    })
})