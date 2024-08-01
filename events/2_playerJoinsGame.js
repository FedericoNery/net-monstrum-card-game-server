const { EMIT_EVENTS } = require("../utils/events")
const { drawPhase } = require("./2_drawPhase")
const { startPhase } = require("./3_startPhase")

function playerJoinsGame({gameIdToJoin, user, deck}, io, gamesData, gameSocket) {
    /**
     * Joins the given socket to a session with it's gameId
     */

    // A reference to the player's Socket.IO socket object

    // Look up the room ID in the Socket.IO manager object.
    var room = io.sockets.adapter.rooms.get(gameIdToJoin)

    // If the room exists...
    if (room === undefined) {
        gameSocket.emit('status', "This game session does not exist.");
        return
    }
    if (room.size < 2) {

        // Join the room
        gameSocket.join(gameIdToJoin);

        // Guardar información del usuario y el mazo a utilizar que hizo join de la sesión
        var gamesIdsList = gamesData.map(x => x.getGameId())
        var indexGame = gamesIdsList.indexOf(gameIdToJoin)
        gamesData[indexGame].set_usuario_b(user)
        gamesData[indexGame].set_mazo_b(deck)
        gamesData[indexGame].setSocketIdUsuarioB(gameSocket.id)


        // Emit an event notifying the clients that the player has joined the room.
        //NO TIENE SENTIDO ESTE EVENTO
        //io.sockets.in(gameIdToJoin).emit(EMIT_EVENTS.PLAYER_JOINED_ROOM, { gameId: gameIdToJoin, socketId: sock.id });
        console.log(io.sockets.in(gameIdToJoin))
    } else {
        // Otherwise, send an error message back to the player.
        gameSocket.emit('status', "There are already 2 people playing in this room.");
    }
    if (room.size === 2) {
        //Emitir al cliente para que seleccione a Calumon o al otro Digimon

        //Crear Juego y guardarlo en el array de juegos
        //Que Juego se encargue de mezclar el mazo
        console.log("ENTRO A JOINS GAME")
        var gameDataArray = gamesData.filter(x => x.getGameId() === gameIdToJoin)
        
        io.sockets.in(gameDataArray[0].socketIdUsuarioA).emit(EMIT_EVENTS.START_GAME, {gameData: gameDataArray[0]})
        io.sockets.in(gameDataArray[0].socketIdUsuarioB).emit(EMIT_EVENTS.START_GAME, {gameData: gameDataArray[0]}) // Ver que pasarle al evento
        startPhase(gameIdToJoin, gamesData, io)
        drawPhase(gameIdToJoin, gamesData, io)
        
        gameDataArray = gamesData.filter(x => x.getGameId() === gameIdToJoin)
        io.sockets.in(gameDataArray[0].socketIdUsuarioA).emit(EMIT_EVENTS.START_GAME, {gameData: gameDataArray[0]})
        io.sockets.in(gameDataArray[0].socketIdUsuarioB).emit(EMIT_EVENTS.START_GAME, {gameData: gameDataArray[0]})
    }
}

module.exports = { playerJoinsGame }