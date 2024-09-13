import Game from "./Game.js"
import Mazo from "./Deck.js"

class GameData{
    constructor(){
        this.game = new Game()
        this.gameId = null
        this.socketId = null
        //pertenece al jugador 1
        this.socketIdUsuarioA = null
        //pertenece al jugador 2
        this.socketIdUsuarioB = null
    }

    setUsuarioA(usuario){
        this.game.setJugador1(usuario)
    }
    setUsuarioB(usuario){
        this.game.setJugador2(usuario)
    }
    setDeckA(cartas){
        const nuevoMazo = new Mazo(cartas)
        this.game.setMazo1(nuevoMazo)
    }
    setDeckB(cartas){
        const nuevoMazo = new Mazo(cartas)
        this.game.setMazo2(nuevoMazo)
    }
    setGameId(gameId){
        this.gameId = gameId
    }
    setSocketId(socketId){
        this.socketId = socketId
    }
    getGameId(){
        return this.gameId
    }
    setSocketIdUsuarioA(socketIdUsuarioA){
        this.socketIdUsuarioA = socketIdUsuarioA
    }
    setSocketIdUsuarioB(socketIdUsuarioB){
        this.socketIdUsuarioB = socketIdUsuarioB
    }
    getSocketIdUsuarioA(){
        return this.socketIdUsuarioA
    }
    getSocketIdUsuarioB(){
        return this.socketIdUsuarioB
    }
}

export default GameData