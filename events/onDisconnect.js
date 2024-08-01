function onDisconnect(gamesInSession, gameSocket) {
    var i = gamesInSession.indexOf(gameSocket);
    gamesInSession.splice(i, 1);
}

module.exports = { onDisconnect }