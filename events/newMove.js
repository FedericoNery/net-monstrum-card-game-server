function newMove(move) {
    /**
     * First, we need to get the room ID in which to send this message. 
     * Next, we actually send this message to everyone except the sender
     * in this room. 
     */

    const gameId = move.gameId

    io.to(gameId).emit('opponent move', move);
}

module.exports = { newMove }