const { getIndiceGameData, getGameIdBySocketId } = require("../services/getIndiceGameData")
const { EMIT_EVENTS } = require("../utils/events")
const { sleep } = require("../utils/sleep")
const { finishRound } = require("./7_finishRound")

async function finishUpgradePhase({socketId, usuarioId, cardDigimonsToSummonIds}, gamesData, io){
    var gameId = getGameIdBySocketId(socketId)
    var indexGame = getIndiceGameData(gameId, gamesData)

    var socketIdUsuarioA = gamesData[indexGame].socketIdUsuarioA
    var socketIdUsuarioB = gamesData[indexGame].socketIdUsuarioB

    gamesData[indexGame].game.finishUpgradePhase(usuarioId, cardDigimonsToSummonIds, socketId, socketIdUsuarioA, socketIdUsuarioB)



    if(gamesData[indexGame].game.finishedUpgradePhase()){
        io.to(socketIdUsuarioA).emit("START_BATTLE", {gameData: gamesData[indexGame]});
        io.to(socketIdUsuarioB).emit("START_BATTLE", {gameData: gamesData[indexGame]});
        gamesData[indexGame].game.iniciarBatalla(); //VER SI ESTO SIRVE
        
        setTimeout(() => {
            gamesData[indexGame].game.player1AttacksPlayer2()
            io.to(socketIdUsuarioA).emit("PLAYER 1 ATTACKS", {gameData: gamesData[indexGame]});
            io.to(socketIdUsuarioB).emit("PLAYER 1 ATTACKS", {gameData: gamesData[indexGame]});
    
            setTimeout(() => {
                gamesData[indexGame].game.player2AttacksPlayer1()
                io.to(socketIdUsuarioA).emit("PLAYER 2 ATTACKS", {gameData: gamesData[indexGame]});
                io.to(socketIdUsuarioB).emit("PLAYER 2 ATTACKS", {gameData: gamesData[indexGame]});

                setTimeout(() => {
                    gamesData[indexGame].game.resolveWinner()
                    io.to(socketIdUsuarioA).emit(EMIT_EVENTS.FINISH_BATTLE_PHASE, {gameData: gamesData[indexGame]})
                    io.to(socketIdUsuarioB).emit(EMIT_EVENTS.FINISH_BATTLE_PHASE, {gameData: gamesData[indexGame]})

                    setTimeout(() => {
                        if(gamesData[indexGame].game.estaFinalizado()){
                            console.log("ENTRO A FINISHED GAME")
                            io.to(socketIdUsuarioA).emit(EMIT_EVENTS.FINISHED_GAME, {gameData: gamesData[indexGame]})
                            io.to(socketIdUsuarioB).emit(EMIT_EVENTS.FINISHED_GAME, {gameData: gamesData[indexGame]})
                        }
                        else{
                            finishRound(indexGame, gamesData, io)
                        }
                    }, 1000)

                }, 1000)

            }, 1000)
            
        }, 1000); 
    }
    else{
        io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", {gameData: gamesData[indexGame]});
        io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", {gameData: gamesData[indexGame]});
    }

    
}

module.exports = { finishUpgradePhase }