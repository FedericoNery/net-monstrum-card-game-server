export class RoomData {
    public gameId: String;
    public player1SocketId: String;
    public player1UserId: String;
    public player1DeckId: String;
    public player2SocketId: String | null;
    public player2UserId: String | null;
    public player2DeckId: String | null;
    public status: String;
    
    constructor(gameId, player1SocketId, player1UserId, player1DeckId) {
        this.gameId = gameId;
        this.player1SocketId = player1SocketId;
        this.player1UserId = player1UserId;
        this.player1DeckId = player1DeckId;
        this.player2SocketId = null;
        this.player2UserId = null;
        this.player2DeckId = null;
        this.status = 'waiting';
    }
}
