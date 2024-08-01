function getIndiceGameData(gameId, gamesData){
    var gamesIdsList = gamesData.map(x => x.getGameId())
    var indexGame = gamesIdsList.indexOf(gameId)
    return indexGame
}

module.exports = { getIndiceGameData }