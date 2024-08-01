function drawPhase(gameId, gamesData, io) {
    var gameDataToJoin = gamesData.filter(x => x.getGameId() === gameId)
    gameDataToJoin[0].juego.drawPhase()

    //Buscar juego en array de juegos
    //Buscar por el clientId al jugador o por otra cosa
    //Repartir cartas
    //io.to(data.id).emit('', move);
}

module.exports = { drawPhase }