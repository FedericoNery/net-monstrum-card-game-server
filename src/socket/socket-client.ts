import { Server, Socket } from "socket.io";
import { EMIT_EVENTS, SUBSCRIPTIONS_EVENTS } from "../utils/events.js";
import { RoomsManager } from "../state/rooms-manager.js";
import { DefaultEventsMap } from "socket.io/dist/typed-events.js";

export class SocketClient {
    private io: Server;
    private roomManager: RoomsManager;
    private client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;

    constructor(io, client, roomManager) {
        this.io = io;
        this.client = client;
        this.roomManager = roomManager;
    }

    attachListeners() {
        this.client.addListener(SUBSCRIPTIONS_EVENTS.CREATE_NEW_GAME, this.createGame.bind(this));
        this.client.addListener(SUBSCRIPTIONS_EVENTS.PLAYER_JOIN_GAME, this.createGame.bind(this));
    }

    createGame({userId, deckId}) {
        // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
        try {
            const gameId = this.roomManager.createRoom(this.client.id, deckId, userId);

            // Join the Room and wait for the other player
            this.client.join(gameId)

            // Guardar información del usuario y el mazo a utilizar que hizo join de la sesión
           /*  var gameData = new GameData()
            gameData.setGameId(gameId)
            gameData.setSocketId(gameSocket.id)
            gameData.setSocketIdUsuarioA(gameSocket.id)
            console.log("CREATED GAME gameSocket.id", gameSocket.id)

            gameData.setUsuarioA(user)
            gameData.setDeckA(deck) */
            /* gamesData.push(gameData) */

            this.client.emit(EMIT_EVENTS.NEW_GAME_CREATED, JSON.stringify({ gameId: gameId, mySocketId: this.client.id }));
        }
        catch (ex) {
            console.log(ex)
        }
    }

    joinGame({ gameId, userId, deckId }) {
        try {
            this.roomManager.joinRoom(this.client.id, gameId, userId, deckId);
            this.client.join(gameId);
            this.client.emit(EMIT_EVENTS.JOINED_GAME, JSON.stringify({ gameId: gameId, mySocketId: this.client.id }));
        } catch (ex) {
            console.log(ex);
        }
    }

    getAvailableRooms(){}


    
}