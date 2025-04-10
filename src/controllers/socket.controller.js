// Importar net; nos ayuda con el trabajo de creación de sockets.
const net = require('net')
const {evaluate} = require('../util/parser')

class Socket
{
    start()
    {
        return new Promise(res =>
        {
            this.server = net.createServer(socket =>
            {
                console.log('[SOCKET] [INFO] Cliente conectado.')
                socket.on('data', data =>
                {
                    let result
                    try
                    {
                        result = evaluate(data).toString()
                    } catch (e)
                    {
                       result = e.message
                    }
                    socket.write(result)
                })

                socket.on('end', () =>
                {
                    console.log('[SOCKET] [INFO] Cliente desconectado.')
                })

                socket.on('error', err =>
                {
                    console.log('[SOCKET] [ERROR]', err.message)
                })
            })

            res(this.server)
        })
    }
}

module.exports = Socket