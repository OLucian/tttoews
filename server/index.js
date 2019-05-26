const http = require('http');
const sockjs = require('sockjs');
const TicTacToe = require('./game');

const config = {
    host: 'localhost',
    port: 8080,
};

let open_sockets = [];
const server = http.createServer();

const serverOptions = {
    prefix: '/sockjs',
    log: function() {},
    disable_cors: false,
    heartbeat_delay: 45000,
    disconnect_delay: 60 * 1000,
    jsessionid: false
};

const sockjsServer = sockjs.createServer(serverOptions);

sockjsServer.on('connection', (socket) => {

    const updateClients = (json) => {
        open_sockets.forEach(socketAvailable => {
            socketAvailable.send(json);
        });
    }

    socket.send = data => {
        socket.write(data);
    };

    socket.on('close', () => {

        open_sockets = open_sockets.filter(item => item.id !== socket.id);   

        if (open_sockets.length === 1) {
            const newData = TicTacToe.resetGame();
            newData.playerNumber = open_sockets.length;
            newData.reset = true;
            const json = JSON.stringify(newData);
            updateClients(json);
        }
        console.log('SESSION IS CLOSED', socket.id);
    });

    socket.on('data', (data) => {
        const request = JSON.parse(data);
        console.log('REQUEST: ', request);
        if (request.getPlayerNumber) {
            const json = JSON.stringify({playerNumber: open_sockets.length});
            socket.send(json);
        }
        if(request.changeGameState) {
            const newData = TicTacToe.getGameStateChange(request);
            newData.changeGameState = true;
            const json = JSON.stringify(newData);
            updateClients(json);
        }        
    });

    if (open_sockets.length >= 2) {
        const newData = {};
        newData.changeGameState = true;
        const json = JSON.stringify(newData);
        socket.send(json);
        socket.close();
        return;
    }

    open_sockets.push(socket);

    console.log('Number of connections: ', open_sockets.length);

    if (open_sockets.length === 2) {
        const newData = TicTacToe.newGame(open_sockets[0].id, open_sockets[1].id);
        newData.startTheGame = true;
        const json = JSON.stringify(newData);
        updateClients(json);
    }
    
});

sockjsServer.installHandlers(server, {prefix: '/sockjs'});
server.listen(config.port, config.host);

console.log("[*] Listening on", config.host + ':' + config.port);
