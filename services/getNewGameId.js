const { v4: uuidv4 } = require('uuid');

function getNewGameId(gamesIdsUsing) {
    let x = null
    while (gamesIdsUsing.length === 0 || !gamesIdsUsing.includes(x)) {
        x = uuidv4();
        if (!gamesIdsUsing.includes(x)) {
            gamesIdsUsing.push(x)
        }
    }
    return x
}

module.exports = { getNewGameId }