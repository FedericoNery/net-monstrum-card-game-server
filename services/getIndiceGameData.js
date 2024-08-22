function getIndiceGameData(gameId, gamesData){
    var gamesIdsList = gamesData.map(x => x.getGameId())
    var indexGame = gamesIdsList.indexOf(gameId)
    return indexGame
}

function getGameIdBySocketId(socketId, gamesData){
    const game = gamesData.filter(x => x.socketIdUsuarioA === socketId || x.socketIdUsuarioB === socketId)[0]
    return game.getGameId()
}

module.exports = { getIndiceGameData, getGameIdBySocketId }