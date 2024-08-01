const { getIndiceGameData } = require("../services/getIndiceGameData")
const { EMIT_EVENTS } = require("../utils/events")
const { sleep } = require("../utils/sleep")
const { finishRound } = require("./7_finishRound")

async function finishSummonPhase({gameId, usuarioId, cartasId}, gamesData, io){
    var indexGame = getIndiceGameData(gameId, gamesData)
    console.log(indexGame)
    console.log(gamesData[indexGame])
    gamesData[indexGame].juego.finishSummonPhase(usuarioId, cartasId)
    var socketIdUsuarioA = gamesData[indexGame].socketIdUsuarioA
    var socketIdUsuarioB = gamesData[indexGame].socketIdUsuarioB
    console.log(gamesData[indexGame].juego.campo1.zonaJuego)
    console.log(gamesData[indexGame].juego.campo2.zonaJuego)
    io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", {gameData: gamesData[indexGame]});
    io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", {gameData: gamesData[indexGame]});

    if(gamesData[indexGame].juego.finishedSummonPhase()){
        console.log("INVOCARON LAS CARTAS")
        gamesData[indexGame].juego.finishCompilePhase()
        //io.sockets.in(gameId).emit(EMIT_EVENTS.START_COMPILE_PHASE)

        //io.to(socketIdUsuarioA).emit(EMIT_EVENTS.START_BATTLE_PHASE)
        //io.to(socketIdUsuarioB).emit(EMIT_EVENTS.START_BATTLE_PHASE)

        gamesData[indexGame].juego.finalizarRonda()
        gamesData[indexGame].juego.iniciarBatalla()
        io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", {gameData: gamesData[indexGame]});
        io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", {gameData: gamesData[indexGame]});
        await sleep(5000)
        io.to(socketIdUsuarioA).emit(EMIT_EVENTS.FINISH_BATTLE_PHASE, {gameData: gamesData[indexGame]})
        io.to(socketIdUsuarioB).emit(EMIT_EVENTS.FINISH_BATTLE_PHASE, {gameData: gamesData[indexGame]})

        if(gamesData[indexGame].juego.estaFinalizado()){
            console.log("ENTRO A FINISHED GAME")
            io.to(socketIdUsuarioA).emit(EMIT_EVENTS.FINISHED_GAME, {gameData: gamesData[indexGame]})
            io.to(socketIdUsuarioB).emit(EMIT_EVENTS.FINISHED_GAME, {gameData: gamesData[indexGame]})
        }
        else{
            finishRound(indexGame, gamesData, io)
        }
    }

    
}

module.exports = { finishSummonPhase }