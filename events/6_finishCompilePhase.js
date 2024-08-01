const { EMIT_EVENTS } = require("../utils/events")

function finishCompilePhase(gameId, usuarioId, cartasId, gamesData, io){
    var indexGame = getIndiceGameData(gameId, gamesData)
    gamesData[indexGame].finishCompilePhase(usuarioId, cartasId)

    var socketIdUsuarioA = gamesData[indexGame].socketIdUsuarioA
    var socketIdUsuarioB = gamesData[indexGame].socketIdUsuarioB

    if(gamesData[indexGame].finishedCompilePhase()){
        //io.sockets.in(gameId).emit(EMIT_EVENTS.START_BATTLE_PHASE)
        io.to(socketIdUsuarioA).emit(EMIT_EVENTS.START_BATTLE_PHASE)
        io.to(socketIdUsuarioB).emit(EMIT_EVENTS.START_BATTLE_PHASE)

        gamesData[indexGame].startBattlePhaseJugador1()
        gamesData[indexGame].finishBattlePhaseJugador1()
        gamesData[indexGame].startBattlePhaseJugador2()
        gamesData[indexGame].finishBattlePhaseJugador2()
        io.to(socketIdUsuarioA).emit(EMIT_EVENTS.FINISH_BATTLE_PHASE, {gameData: gamesData[indexGame]})
        io.to(socketIdUsuarioB).emit(EMIT_EVENTS.FINISH_BATTLE_PHASE, {gameData: gamesData[indexGame]})
    }
    if(gamesData[indexGame].finishedRonda()){
        gamesData[indexGame].nextRonda()
        io.to(socketIdUsuarioA).emit("START NEXT ROUND", {gameData: gamesData[indexGame]});
        io.to(socketIdUsuarioB).emit("START NEXT ROUND", {gameData: gamesData[indexGame]});
    }
}

module.exports = { finishCompilePhase }