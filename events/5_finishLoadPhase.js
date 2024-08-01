const { getIndiceGameData } = require("../services/getIndiceGameData")

function finishLoadPhase(gameId, usuarioId, cartasId, gamesData, io) { 
    var indexGame = getIndiceGameData(gameId, gamesData)
    gamesData[indexGame].finishLoadPhase(usuarioId, cartasId)
    if(gamesData[indexGame].finishedLoadPhase()){
        gamesData[indexGame].startSummonPhase()
        io.sockets.in(gameId).emit(EMIT_EVENTS.START_SUMMON_PHASE)
    }
}

module.exports = { finishLoadPhase }