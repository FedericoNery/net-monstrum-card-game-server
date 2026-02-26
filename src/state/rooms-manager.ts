import { v4 } from 'uuid'
import { RoomData } from './room-data';

export class RoomsManager {
    private rooms: Map<string, RoomData>; 
    private gamesData;
    private gamesIdsUsing: string[]; 
    private waitingRooms: string[]; 

    constructor() {
        this.rooms = new Map(); // Store rooms with their IDs
        this.gamesData = []; // Store game data
        this.gamesIdsUsing = []; // Store game IDs in use
        this.waitingRooms = []; // Store rooms with only one player
    }

    addRoom(roomId, roomData) {
        this.rooms.set(roomId, roomData);
    }

    getRoom(roomId) {
        return this.rooms.get(roomId);
    }

    removeRoom(roomId) {
        this.rooms.delete(roomId);
    }

    createRoom(playerSocketId, deckId, userId){
        const gameId = this._getNewGameId();
        let roomData = new RoomData(gameId, playerSocketId, userId, deckId);
        this.addRoom(gameId, roomData);
        return gameId;
    }

    joinRoom(playerSocketId, gameId, userId, deckId){
        let roomData: RoomData = this.getRoom(gameId);
        if (roomData) {
            if (roomData.player2SocketId === null) {
                roomData.player2SocketId = playerSocketId;
                roomData.player2UserId = userId;
                roomData.player2DeckId = deckId;
                roomData.status = 'started';
                this.waitingRooms = this.waitingRooms.filter(room => room !== gameId);
            } else {
                throw new Error('Room is already full');
            }
        } else {
            throw new Error('Room not found');
        }
    }

    _getNewGameId() {
        let x = null;
        while (this.gamesIdsUsing.length === 0 || !this.gamesIdsUsing.includes(x)) {
            x = v4();
            if (!this.gamesIdsUsing.includes(x)) {
                this.gamesIdsUsing.push(x);
            }
        }
        return x;
    }
}   