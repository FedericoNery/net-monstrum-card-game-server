const { EMIT_EVENTS } = require("../utils/events");
const { drawPhase } = require("./2_drawPhase");

const { startPhase } = require("./3_startPhase");

function finishRound(indexGame, gamesData, io){
    if(gamesData[indexGame].game.finishedRonda()){
        /* console.log("FINALIZÓ LA RONDA") */
        var socketIdUsuarioA = gamesData[indexGame].socketIdUsuarioA
        var socketIdUsuarioB = gamesData[indexGame].socketIdUsuarioB
        io.to(socketIdUsuarioA).emit("START NEXT ROUND", {gameData: gamesData[indexGame]});
        io.to(socketIdUsuarioB).emit("START NEXT ROUND", {gameData: gamesData[indexGame]});
        gamesData[indexGame].game.iniciarRonda()
        gamesData[indexGame].game.mezclarMazos()

        setTimeout(() => {
            gamesData[indexGame].game.drawPhase()
            gamesData[indexGame].game.startCompilePhase()
            io.sockets.in(socketIdUsuarioA).emit(EMIT_EVENTS.START_COMPILE_PHASE)
            io.sockets.in(socketIdUsuarioB).emit(EMIT_EVENTS.START_COMPILE_PHASE)
        },1000)
        /* io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", {gameData: gamesData[indexGame]});
        io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", {gameData: gamesData[indexGame]}); */
    }
}

module.exports = { finishRound }