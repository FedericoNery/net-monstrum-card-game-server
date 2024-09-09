const { EMIT_EVENTS } = require("../utils/events");

function finishRound(indexGame, gamesData, io){
    if(gamesData[indexGame].game.finishedRonda()){
        /* console.log("FINALIZÓ LA RONDA") */
        var socketIdUsuarioA = gamesData[indexGame].socketIdUsuarioA
        var socketIdUsuarioB = gamesData[indexGame].socketIdUsuarioB
        io.to(socketIdUsuarioA).emit("START NEXT ROUND", JSON.stringify({gameData: gamesData[indexGame]}));
        io.to(socketIdUsuarioB).emit("START NEXT ROUND", JSON.stringify({gameData: gamesData[indexGame]}));
        gamesData[indexGame].game.iniciarRonda()

        gamesData[indexGame].game.resetCheckOfActionsByPlayers()
        gamesData[indexGame].game.resetStateOfFields()
        
        setTimeout(() => {
            gamesData[indexGame].game.startDrawPhase()
            io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
            io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
            
            setTimeout(() => {
                gamesData[indexGame].game.startCompilePhase()
                io.sockets.in(socketIdUsuarioA).emit(EMIT_EVENTS.START_COMPILE_PHASE)
                io.sockets.in(socketIdUsuarioB).emit(EMIT_EVENTS.START_COMPILE_PHASE)
            },2000)

        },2000)
    }
}

module.exports = { finishRound }