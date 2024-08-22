const { getGameIdBySocketId, getIndiceGameData } = require("../services/getIndiceGameData")

function activateEnergyCard({socketId, username, cardId}, gamesData, io) {
    var gameId = getGameIdBySocketId(socketId, gamesData)
    var indexGame = getIndiceGameData(gameId, gamesData)
    var socketIdUsuarioA = gamesData[indexGame].socketIdUsuarioA
    var socketIdUsuarioB = gamesData[indexGame].socketIdUsuarioB

    if (socketIdUsuarioA == socketId){
        gamesData[indexGame].game.activateEnergyCardJugador1(cardId)
    }
    if(socketIdUsuarioB == socketId){
        gamesData[indexGame].game.activateEnergyCardJugador2(cardId)
    }

    io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
    io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
}

module.exports = { activateEnergyCard }