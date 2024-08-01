const { drawPhase } = require("./2_drawPhase");

const { startPhase } = require("./3_startPhase");

function finishRound(indexGame, gamesData, io){
    if(gamesData[indexGame].juego.finishedRonda()){
        console.log("FINALIZÓ LA RONDA")
        var socketIdUsuarioA = gamesData[indexGame].socketIdUsuarioA
        var socketIdUsuarioB = gamesData[indexGame].socketIdUsuarioB
        io.to(socketIdUsuarioA).emit("START NEXT ROUND", {gameData: gamesData[indexGame]});
        io.to(socketIdUsuarioB).emit("START NEXT ROUND", {gameData: gamesData[indexGame]});
        gamesData[indexGame].juego.iniciarRonda()
        gamesData[indexGame].juego.mezclarMazos()
        gamesData[indexGame].juego.drawPhase()
        //startPhase(gameId)
        io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", {gameData: gamesData[indexGame]});
        io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", {gameData: gamesData[indexGame]});
    }
}

module.exports = { finishRound }