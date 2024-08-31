const { getIndiceGameData, getGameIdBySocketId } = require("../services/getIndiceGameData")
const { EMIT_EVENTS } = require("../utils/events")
const { sleep } = require("../utils/sleep")
const { finishRound } = require("./7_finishRound")

async function finishUpgradePhase({socketId, usuarioId, cardDigimonsToSummonIds}, gamesData, io){
    var gameId = getGameIdBySocketId(socketId)
    var indexGame = getIndiceGameData(gameId, gamesData)

    gamesData[indexGame].game.finishUpgradePhase(usuarioId, cardDigimonsToSummonIds)
    var socketIdUsuarioA = gamesData[indexGame].socketIdUsuarioA
    var socketIdUsuarioB = gamesData[indexGame].socketIdUsuarioB

    io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", {gameData: gamesData[indexGame]});
    io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", {gameData: gamesData[indexGame]});

    if(gamesData[indexGame].game.finishedUpgradePhase()){
        io.to(socketIdUsuarioA).emit("START_BATTLE", {gameData: gamesData[indexGame]});
        io.to(socketIdUsuarioB).emit("START_BATTLE", {gameData: gamesData[indexGame]});
    
        gamesData[indexGame].game.iniciarBatalla()
        io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", {gameData: gamesData[indexGame]});
        io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", {gameData: gamesData[indexGame]});
        await sleep(5000)
        io.to(socketIdUsuarioA).emit(EMIT_EVENTS.FINISH_BATTLE_PHASE, {gameData: gamesData[indexGame]})
        io.to(socketIdUsuarioB).emit(EMIT_EVENTS.FINISH_BATTLE_PHASE, {gameData: gamesData[indexGame]})

        if(gamesData[indexGame].game.estaFinalizado()){
            console.log("ENTRO A FINISHED GAME")
            io.to(socketIdUsuarioA).emit(EMIT_EVENTS.FINISHED_GAME, {gameData: gamesData[indexGame]})
            io.to(socketIdUsuarioB).emit(EMIT_EVENTS.FINISHED_GAME, {gameData: gamesData[indexGame]})
        }
        else{
            finishRound(indexGame, gamesData, io)
        }
    }

    
}

module.exports = { finishUpgradePhase }