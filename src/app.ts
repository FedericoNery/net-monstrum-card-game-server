import express from 'express'
import HTTP, {createServer} from 'http'
import { Server } from 'socket.io'
import { instrument } from "@socket.io/admin-ui"
//import { initializeGame } from '../old-src/game-logic.js'
import dotenv from 'dotenv';
import { WebSocketServer } from './socket/websocket-server'

dotenv.config();

/* const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer,
  {
    cors: {
      origin: "*",
      credentials: true
    },
    transports: ['websocket'],
    perMessageDeflate: {
      threshold: 1024, // Tamaño en bytes para iniciar compresión
      zlibDeflateOptions: {
        chunkSize: 1024,
        memLevel: 7,
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024,
      },
      // No comprimir si la compresión ya está deshabilitada o el tamaño es menor al umbral
      disableEntitlement: false,
    }
  })

io.on('connection', client => {
  initializeGame(io, client)
})

instrument(io, {
  auth: false,
  mode: "development",
}); */

const app = express()
const httpServer: HTTP.Server = createServer(app)
const webSocketServer = new WebSocketServer(httpServer)
webSocketServer.initialize()
webSocketServer.loadAdminUi()

httpServer.listen(process.env.PORT || 8000, () => {
  console.log(`Socket.IO server running at http://localhost:${process.env.PORT || 8000}/`);
})

/* export { 
  io_from_app: io, 
  server_from_app: httpServer 
} */

/**
 * Backend flow:
 * - check to see if the game ID encoded in the URL belongs to a valid game session in progress. 
 * - if yes, join the client to that game. 
 * - else, create a new game instance. 
 * - '/' path should lead to a new game instance. 
 * - '/game/:gameid' path should first search for a game instance, then join it. Otherwise, throw 404 error.  
 */

// get the gameID encoded in the URL. 
// check to see if that gameID matches with all the games currently in session. 
// join the existing game session. 
// create a new session.  
// run when client connects