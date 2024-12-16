import { getIndiceGameData, getGameIdBySocketId } from "../services/getIndiceGameData.js"
import { EMIT_EVENTS } from "../utils/events.js"
import { finishRound } from "./7_finishRound.js"

async function finishUpgradePhase({socketId, usuarioId, cardDigimonsToSummonIds}, gamesData, io){
    var gameId = getGameIdBySocketId(socketId, gamesData)
    var indexGame = getIndiceGameData(gameId, gamesData)

    var socketIdUsuarioA = gamesData[indexGame].socketIdUsuarioA
    var socketIdUsuarioB = gamesData[indexGame].socketIdUsuarioB

    gamesData[indexGame].game.finishUpgradePhase(usuarioId, cardDigimonsToSummonIds, socketId, socketIdUsuarioA, socketIdUsuarioB)



    if(gamesData[indexGame].game.isFinishedUpgradePhase()){
        io.to(socketIdUsuarioA).emit("START_BATTLE", JSON.stringify({gameData: gamesData[indexGame]}));
        io.to(socketIdUsuarioB).emit("START_BATTLE", JSON.stringify({gameData: gamesData[indexGame]}));
        //gamesData[indexGame].game.iniciarBatalla(); //VER SI ESTO SIRVE
        
        setTimeout(() => {
            gamesData[indexGame].game.player1AttacksPlayer2()
            io.to(socketIdUsuarioA).emit("PLAYER 1 ATTACKS", JSON.stringify({gameData: gamesData[indexGame]}));
            io.to(socketIdUsuarioB).emit("PLAYER 1 ATTACKS", JSON.stringify({gameData: gamesData[indexGame]}));
    
            setTimeout(() => {
                gamesData[indexGame].game.player2AttacksPlayer1()
                io.to(socketIdUsuarioA).emit("PLAYER 2 ATTACKS", JSON.stringify({gameData: gamesData[indexGame]}));
                io.to(socketIdUsuarioB).emit("PLAYER 2 ATTACKS", JSON.stringify({gameData: gamesData[indexGame]}));

                setTimeout(() => {
                    gamesData[indexGame].game.resolveWinner()
                    gamesData[indexGame].game.resolveIfGameIsFinished()
                    io.to(socketIdUsuarioA).emit(EMIT_EVENTS.FINISH_BATTLE_PHASE, JSON.stringify({gameData: gamesData[indexGame]}))
                    io.to(socketIdUsuarioB).emit(EMIT_EVENTS.FINISH_BATTLE_PHASE, JSON.stringify({gameData: gamesData[indexGame]}))

                    setTimeout(() => {
                        if(gamesData[indexGame].game.estaFinalizado()){
                            console.log("ENTRO A FINISHED GAME")
                            io.to(socketIdUsuarioA).emit(EMIT_EVENTS.FINISHED_GAME, JSON.stringify({gameData: gamesData[indexGame]}))
                            io.to(socketIdUsuarioB).emit(EMIT_EVENTS.FINISHED_GAME, JSON.stringify({gameData: gamesData[indexGame]}))

                            gamesData.splice(indexGame, 1);
                            //TODO :: HACER LO MISMO PARA LOS GAMES IDS USING
                        }
                        else{
                            finishRound(indexGame, gamesData, io)
                        }
                    }, 5000)

                }, 5000)

            }, 6000)
            
        }, 6000); 
    }
    else{
        io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
        io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
    }

    
}

export { finishUpgradePhase }