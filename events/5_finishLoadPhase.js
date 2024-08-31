const { getIndiceGameData, getGameIdBySocketId } = require("../services/getIndiceGameData")
const { EMIT_EVENTS } = require("../utils/events")

function finishLoadPhase({usuarioId, socketId}, gamesData, io) { 
    var gameId = getGameIdBySocketId(socketId, gamesData)
    var indexGame = getIndiceGameData(gameId, gamesData)

    var socketIdUsuarioA = gamesData[indexGame].socketIdUsuarioA
    var socketIdUsuarioB = gamesData[indexGame].socketIdUsuarioB

    gamesData[indexGame].game.finishLoadPhaseBy(usuarioId, socketId)

    if(socketId === socketIdUsuarioA){
        io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
    }

    if(socketId === socketIdUsuarioB){
        io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
    }

    if(gamesData[indexGame].game.finishedLoadPhase()){
        gamesData[indexGame].game.startSummonPhase()
        io.sockets.in(gameId).emit(EMIT_EVENTS.START_SUMMON_PHASE)
        
        io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
        io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
    }
}

module.exports = { finishLoadPhase }