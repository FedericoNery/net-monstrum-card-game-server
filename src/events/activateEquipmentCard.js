import { getGameIdBySocketId, getIndiceGameData } from "../services/getIndiceGameData.js"

function activateEquipmentCard({socketId, userId, cardDigimonId, cardEquipmentId}, gamesData, io) {
    var gameId = getGameIdBySocketId(socketId, gamesData)
    var indexGame = getIndiceGameData(gameId, gamesData)
    var socketIdUsuarioA = gamesData[indexGame].socketIdUsuarioA
    var socketIdUsuarioB = gamesData[indexGame].socketIdUsuarioB

    if (socketIdUsuarioA == socketId){
        gamesData[indexGame].game.activateEquipmentCardJugador1(cardDigimonId, cardEquipmentId)
        io.to(socketIdUsuarioA).emit("AFTER ACTIVATED EQUIPMENT", JSON.stringify({cardEquipmentId, cardDigimonId}));
    }
    if(socketIdUsuarioB == socketId){
        gamesData[indexGame].game.activateEquipmentCardJugador2(cardDigimonId, cardEquipmentId)
        io.to(socketIdUsuarioB).emit("AFTER ACTIVATED EQUIPMENT", JSON.stringify({cardEquipmentId, cardDigimonId}));
    }

    setTimeout(() => {
        io.to(socketIdUsuarioA).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
        io.to(socketIdUsuarioB).emit("UPDATE GAME DATA", JSON.stringify({gameData: gamesData[indexGame]}));
    }, 1000)
    
}

export { activateEquipmentCard }