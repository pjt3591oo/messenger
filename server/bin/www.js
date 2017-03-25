#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('server:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

var io = require('socket.io')(server);
var snakeGamePlayers = [];

io.on('connection', function(client){
	client.on('testMessage', function(data){
		// 다른 클라이언트들에게 해당 데이터를 보내준다
		client.broadcast.emit('messageReceive', data);
	});

	client.on('connectGame', function(){
		console.log(snakeGamePlayers);
		io.sockets.emit('connectGame', snakeGamePlayers);
	});

	client.on('createdPlayer', function(createdPlayer){
		snakeGamePlayers.push(createdPlayer);	
		console.log(snakeGamePlayers);
		client.broadcast.emit('playerAdd', createdPlayer);
	});

	client.on('bodyChanged', function(changedBodyPlayer){
		snakeGamePlayers.map((snakePlayer, index) => {
			if(changedBodyPlayer['playerName'] == snakePlayer['playerName']){
				console.log(snakePlayer['playBody'], changedBodyPlayer['playSnakeBody']);
				snakeGamePlayers[index]['playBody'] = changedBodyPlayer['playSnakeBody']
				console.log(snakeGamePlayers);
			}
		});
	});

	client.on('playerMove', function(play){
		console.log(play);
		io.sockets.emit('move', play);
	})
});

server.listen(3333, function(){
	console.log('server on ');
});

/**
 * Listen on provided port, on all network interfaces.
 */

//server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
