import { v4 } from 'uuid'

function getNewGameId(gamesIdsUsing) {
    let x = null
    while (gamesIdsUsing.length === 0 || !gamesIdsUsing.includes(x)) {
        x = v4();
        if (!gamesIdsUsing.includes(x)) {
            gamesIdsUsing.push(x)
        }
    }
    return x
}

export { getNewGameId }