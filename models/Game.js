const Field = require("./Field")
const EstadosDeLaPartida = require('./EstadosPartida')

//gameId sería el identificador de la sesión
class Game {
    constructor() {
        this.esTurnoDeJugador1 = true
        this.esTurnoDeJugador2 = false
        this.player1 = null;
        this.player2 = null;
        this.field1 = new Field()
        this.field2 = new Field()
        this.roundsPlayer1 = 0
        this.roundsPlayer2 = 0
        this.numeroJugadorGanador = null
        this.numeroJugadorPerdedor = null
        this.player1SummonCards = false
        this.player2SummonCards = false
        this.estadoDeLaRonda = EstadosDeLaPartida.JUEGO_CREADO
    }

    initGame(){
        this.estadoDeLaRonda = EstadosDeLaPartida.JUEGO_INICIADO
        this.shuffleDecks()
    }

    shuffleDecks(){
        this.field1.deck.mezclar()
        this.field2.deck.mezclar()
    }

    iniciarRonda(){
        this.estadoDeLaRonda = EstadosDeLaPartida.RONDA_INICIADA
    }

    setJugador1(jugador1){
        this.player1 = jugador1
    }

    setJugador2(jugador2){
        this.player2 = jugador2
    }

    setMazo1(mazo1){
        this.field1.setMazo(mazo1)
    }

    setMazo2(mazo2){
        this.field2.setMazo(mazo2)
    }

    repartirCartas() {
        this.estadoDeLaRonda = EstadosDeLaPartida.DRAW_PHASE
        this.field1.repartirCartas(6)
        this.field2.repartirCartas(6)
        this.contarEnergias()
        this.estadoDeLaRonda = EstadosDeLaPartida.LOAD_PHASE
        this.estadoDeLaRonda = EstadosDeLaPartida.SUMMON_PHASE
    }

    contarEnergias() {
        this.field1.contarEnergias()
        this.field2.contarEnergias()
    }

    getCampoByIdJugador(idJugador) {
        if (idJugador == this.player1.numero) {
            return this.field1
        }
        else {
            return this.field2
        }
    }

    invocarCartasPokemon(cartasAInvocar, idJugador) {
        if (idJugador == this.player1.numero) {
            //this.estadoDeLaRonda = EstadosDeLaPartida.SUMMON_PHASE
            this.field1.invocarCartas(cartasAInvocar)
            this.field2.invocarCartasComputadora()
        }
    }

    iniciarBatalla() {
        this.determinarGanadorDeLaRonda()
        this.determinarGanadorPartida()
        if(!this.estaFinalizado()){
            this.estadoDeLaRonda = EstadosDeLaPartida.RONDA_TERMINADA
            this.pasarASiguienteRonda()    
        }
    }

    determinarGanadorDeLaRonda() {
        const ataqueJugador = this.field1.getAtaque()
        const ataqueComputadora = this.field2.getAtaque()
        const defensaJugador = this.field1.getDefensa()
        const defensaComputadora = this.field2.getDefensa()
        const deltaJugador = defensaJugador - ataqueComputadora
        const deltaComputadora = defensaComputadora - ataqueJugador

        const ambosJugadoresQuedaronSinDefensa = deltaJugador <= 0 && deltaComputadora <= 0
        const computadoraPudoDefenderseYJugadorQuedoSinDefensa = deltaComputadora > 0 && deltaJugador <= 0
        const jugadorPudoDefenderseYComputadoraQuedoSinDefensa = deltaJugador > 0 && deltaComputadora <= 0
        const ventajaDeComputadora = deltaJugador > 0 && deltaComputadora > 0 && deltaComputadora > deltaJugador
        const ventajaDeJugador = deltaJugador > 0 && deltaComputadora > 0 && deltaJugador > deltaComputadora

        if (ambosJugadoresQuedaronSinDefensa || computadoraPudoDefenderseYJugadorQuedoSinDefensa || ventajaDeComputadora) {
            this.roundsPlayer2 += 1
        }
        else if (jugadorPudoDefenderseYComputadoraQuedoSinDefensa || ventajaDeJugador) {
            this.roundsPlayer1 += 1
        }
    }

    determinarGanadorPartida() {
        if (this.roundsPlayer1 === 2) {
            this.estadoDeLaRonda = EstadosDeLaPartida.JUEGO_TERMINADO
            this.numeroJugadorGanador = this.player1.numero
            this.numeroJugadorPerdedor = this.player2.numero
        }
        else if (this.roundsPlayer2 === 2) {
            this.estadoDeLaRonda = EstadosDeLaPartida.JUEGO_TERMINADO
            this.numeroJugadorGanador = this.player2.numero
            this.numeroJugadorPerdedor = this.player1.numero
        }
    }

    pasarASiguienteRonda(){
        if(this.estadoDeLaRonda !== EstadosDeLaPartida.JUEGO_TERMINADO){
            console.log("PASÓ A SIGUIENTE RONDA")
            this.field1.descartarCartasMano()
            this.field1.descartarCartasCampo()
            this.field2.descartarCartasMano()
            this.field2.descartarCartasCampo()
            this.player1SummonCards = false
            this.player2SummonCards = false
        }
    }

    finalizarRonda(){
        this.estadoDeLaRonda = EstadosDeLaPartida.RONDA_TERMINADA
    }
    iniciarRonda(){
        this.estadoDeLaRonda = EstadosDeLaPartida.RONDA_INICIADA
    }

    estaFinalizado(){
        return this.estadoDeLaRonda === EstadosDeLaPartida.JUEGO_TERMINADO
    }

    ganoJugador1(){
        return this.roundsPlayer1 == 2
    }

    ganoJugador2(){
        return this.roundsPlayer2 == 2
    }

    startPhase(){
        this.initGame()
        this.iniciarRonda()
    }

    drawPhase(){
        this.repartirCartas()
    }

    finishSummonPhase(usuario, cartasId){
        const { email, nombre_usuario } = usuario
        const { email: emailJugador1, nombre_usuario: nombreUsuarioJugador1 } = this.player1
        const { email: emailJugador2, nombre_usuario: nombreUsuarioJugador2 } = this.player2
        if (email === emailJugador1 && nombre_usuario === nombreUsuarioJugador1){
            this.field1.invocarCartas(cartasId)
            this.player1SummonCards = true
        } 
        if (email === emailJugador2 && nombre_usuario === nombreUsuarioJugador2) {
            this.field2.invocarCartas(cartasId)
            this.player2SummonCards = true
        }
        console.log(this.player1SummonCards)
        console.log(this.player2SummonCards)
    }

    finishedSummonPhase(){
        return this.player1SummonCards && this.player2SummonCards
    }

    finishCompilePhase(){
        console.log(this.estadoDeLaRonda)
        this.estadoDeLaRonda = EstadosDeLaPartida.BATTLE_PHASE
    }

    startBattlePhaseJugador1(){
        this.field1.atacar(this.field2)
    }

    startBattlePhaseJugador2(){
        this.field2.atacar(this.field1)
    }

    finishBattlePhaseJugador1(){

    }

    finishBattlePhaseJugador2(){
        
    }

    finishedRonda(){
        console.log(this.estadoDeLaRonda)
        return this.estadoDeLaRonda === EstadosDeLaPartida.RONDA_TERMINADA
    }
}

module.exports = Game