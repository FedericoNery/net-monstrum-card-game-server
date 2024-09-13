import { getIndiceGameData, getGameIdBySocketId } from "../services/getIndiceGameData.js"

async function finishSummonPhase({socketId, usuarioId, cardDigimonsToSummonIds}, gamesData, io){
    var gameId = getGameIdBySocketId(socketId, gamesData)
    var indexGame = getIndiceGameData(gameId, gamesData)
    var socketIdUsuarioA = gamesData[indexGame].socketIdUsuarioA
    var socketIdUsuarioB = gamesData[indexGame].socketIdUsuarioB

    gamesData[indexGame].game.finishSummonPhase(usuarioId, cardDigimonsToSummonIds, socketId, socketIdUsuarioA, socketIdUsuarioB)



    if(gamesData[indexGame].game.finishedSummonPhase()){
        //io.sockets.in(gameId).emit(EMIT_EVENTS.START_COMPILE_PHASE)

        //io.to(socketIdUsuarioA).emit(EMIT_EVENTS.START_BATTLE_PHASE)
        //io.to(socketIdUsuarioB).emit(EMIT_EVENTS.START_BATTLE_PHASE)

        gamesData[indexGame].game.toUpgradePhase();
        io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
        io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));    


        /* gamesData[indexGame].game.iniciarBatalla()
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
        } */
    }
    else{
        io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
        io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
    }

    
}

export { finishSummonPhase }