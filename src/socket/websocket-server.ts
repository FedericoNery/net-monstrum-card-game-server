import HTTP from 'http'
import { Server, ServerOptions } from 'socket.io'
import { SocketClient } from './socket-client';
import { instrument } from '@socket.io/admin-ui';
import { RoomsManager } from '../state/rooms-manager';

const SOCKET_IO_SERVER_OPTIONS: Partial<ServerOptions> = {
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
}

export class WebSocketServer {
    private httpServer: HTTP.Server;
    private io: Server;
    private roomManager: RoomsManager;

    constructor(httpServer) {
        this.httpServer = httpServer;
        this.io = new Server(this.httpServer, SOCKET_IO_SERVER_OPTIONS)
        this.roomManager = new RoomsManager()

    }

    initialize() {
        this.io.on('connection', client => {
            const socketClient = new SocketClient(this.io, client, this.roomManager)
            socketClient.attachListeners()
            this.io.on('disconnect', () => {
                client.disconnect(true)
            });
        })
    }

    loadAdminUi(){
        instrument(this.io, {
            auth: false,
            mode: "development",
          });
    }
}