import { getIndiceGameData, getGameIdBySocketId } from "../services/getIndiceGameData.js"
import { EMIT_EVENTS } from "../utils/events.js"

function finishLoadPhase({usuarioId, socketId}, gamesData, io) { 
    var gameId = getGameIdBySocketId(socketId, gamesData)
    var indexGame = getIndiceGameData(gameId, gamesData)

    var socketIdUsuarioA = gamesData[indexGame].socketIdUsuarioA
    var socketIdUsuarioB = gamesData[indexGame].socketIdUsuarioB

    gamesData[indexGame].game.finishLoadPhaseBy(usuarioId, socketId, socketIdUsuarioA, socketIdUsuarioB)

    if(gamesData[indexGame].game.finishedLoadPhase()){
        console.log("ENTRO FINISH A Y B")
        gamesData[indexGame].game.startSummonPhase()
        io.sockets.in(gameId).emit(EMIT_EVENTS.START_SUMMON_PHASE)
        
        io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
        io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
    }
    else{
        io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
        io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
    }
}

export { finishLoadPhase }