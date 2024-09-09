const { EMIT_EVENTS } = require("../utils/events")
const { drawPhase } = require("./2_drawPhase")
const { startPhase } = require("./3_startPhase")
const {startDrawPhase} = require("./3_startDrawPhase")

function playerJoinsGame({gameIdToJoin, user, deck, socketId}, io, gamesData, gameSocket) {
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
        gamesData[indexGame].setUsuarioB(user)
        gamesData[indexGame].setDeckB(deck)
        gamesData[indexGame].setSocketIdUsuarioB(gameSocket.id)
        console.log("JOIN GAME gameSocket.id", gameSocket.id)


        // Emit an event notifying the clients that the player has joined the room.
        //NO TIENE SENTIDO ESTE EVENTO
        //io.sockets.in(gameIdToJoin).emit(EMIT_EVENTS.PLAYER_JOINED_ROOM, { gameId: gameIdToJoin, socketId: sock.id });
        //console.log(io.sockets.in(gameIdToJoin))
    } else {
        // Otherwise, send an error message back to the player.
        gameSocket.emit('status', "There are already 2 people playing in this room.");
    }
    if (room.size === 2) {
        //Emitir al cliente para que seleccione a Calumon o al otro Digimon

        //Crear Juego y guardarlo en el array de juegos
        //Que Juego se encargue de mezclar el mazo
        //console.log("ENTRO A JOINS GAME")
        var gameDataArray = gamesData.filter(x => x.getGameId() === gameIdToJoin)
        
        io.sockets.in(gameDataArray[0].socketIdUsuarioA).emit(EMIT_EVENTS.START_GAME, JSON.stringify({gameData: gameDataArray[0]}))
        io.sockets.in(gameDataArray[0].socketIdUsuarioB).emit(EMIT_EVENTS.START_GAME, JSON.stringify({gameData: gameDataArray[0]})) // Ver que pasarle al evento


        setTimeout(() => {
            startDrawPhase(gameIdToJoin, gamesData, io) 
            let array = gamesData.filter(x => x.getGameId() === gameIdToJoin)
            const gameData = array[0]

            io.sockets.in(gameData.socketIdUsuarioA).emit("UPDATE GAME DATA", JSON.stringify({gameData: gameData}))
            io.sockets.in(gameData.socketIdUsuarioB).emit("UPDATE GAME DATA", JSON.stringify({gameData: gameData}))

            
            setTimeout(() => {
                var gameDataToJoin = gamesData.filter(x => x.getGameId() === gameIdToJoin)
                gameDataToJoin[0].game.startCompilePhase()
    
                io.sockets.in(gameData.socketIdUsuarioA).emit(EMIT_EVENTS.START_COMPILE_PHASE)
                io.sockets.in(gameData.socketIdUsuarioB).emit(EMIT_EVENTS.START_COMPILE_PHASE)
            }, 1000)
            
        }, 3000); 

        //EMIT START PHASE EVENT -> cambiar estado en cliente 
        /* startPhase(gameIdToJoin, gamesData, io) */

        //EMIT DRAW PHASE EVENT -> pasarle el mazo, la mano, estado de partida
        /* drawPhase(gameIdToJoin, gamesData, io) */
        
        //EMIT COUNT ENERGIES EVENT -> pasarle las energias calculadas de la mano
        /* gameDataArray = gamesData.filter(x => x.getGameId() === gameIdToJoin)
        io.sockets.in(gameDataArray[0].socketIdUsuarioA).emit(EMIT_EVENTS.START_GAME, {gameData: gameDataArray[0]})
        io.sockets.in(gameDataArray[0].socketIdUsuarioB).emit(EMIT_EVENTS.START_GAME, {gameData: gameDataArray[0]}) */
    }
}

module.exports = { playerJoinsGame }