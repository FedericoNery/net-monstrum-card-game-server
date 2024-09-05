const Field = require("./Field")
const EstadosDeLaPartida = require('./EstadosPartida')
const {EquipmentCard} = require('./EquipmentEffect') 
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
        this.player1FinishedLoadPhase = false
        this.player2FinishedLoadPhase = false
        this.player1FinishedUpgradePhase = false
        this.player2FinishedUpgradePhase = false
        this.player1SummonCards = false
        this.player2SummonCards = false
        this.estadoDeLaRonda = EstadosDeLaPartida.GAME_CREATED
    }

    initGame(){
        this.estadoDeLaRonda = EstadosDeLaPartida.GAME_STARTED
        this.shuffleDecks()
    }

    shuffleDecks(){
        this.field1.deck.mezclar()
        this.field2.deck.mezclar()
    }

    iniciarRonda(){
        this.estadoDeLaRonda = EstadosDeLaPartida.ROUND_STARTED
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
        //this.estadoDeLaRonda = EstadosDeLaPartida.SUMMON_PHASE
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
            this.estadoDeLaRonda = EstadosDeLaPartida.FINISHED_ROUND
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
            this.estadoDeLaRonda = EstadosDeLaPartida.FINISHED_GAME
            this.numeroJugadorGanador = this.player1.numero
            this.numeroJugadorPerdedor = this.player2.numero
        }
        else if (this.roundsPlayer2 === 2) {
            this.estadoDeLaRonda = EstadosDeLaPartida.FINISHED_GAME
            this.numeroJugadorGanador = this.player2.numero
            this.numeroJugadorPerdedor = this.player1.numero
        }
    }

    pasarASiguienteRonda(){
        if(this.estadoDeLaRonda !== EstadosDeLaPartida.FINISHED_GAME){
            /* console.log("PASÓ A SIGUIENTE RONDA") */
            this.field1.descartarCartasMano()
            this.field1.descartarCartasCampo()
            this.field2.descartarCartasMano()
            this.field2.descartarCartasCampo()
            this.player1SummonCards = false
            this.player2SummonCards = false
        }
    }

    finalizarRonda(){
        this.estadoDeLaRonda = EstadosDeLaPartida.FINISHED_ROUND
    }

    estaFinalizado(){
        return this.estadoDeLaRonda === EstadosDeLaPartida.FINISHED_GAME
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

    startDrawPhase(){
        this.estadoDeLaRonda = EstadosDeLaPartida.GAME_STARTED
        this.shuffleDecks()
        this.estadoDeLaRonda = EstadosDeLaPartida.ROUND_STARTED
        this.repartirCartas()
    }

    startCompilePhase(){
        this.estadoDeLaRonda = EstadosDeLaPartida.COMPILATION_PHASE
    }

    drawPhase(){
        this.repartirCartas()
    }

    finishSummonPhase(usuario, cartasId, socketId, socketIdUsuarioA, socketIdUsuarioB){
        const { username: nombreUsuarioJugador1 } = this.player1
        const { username: nombreUsuarioJugador2 } = this.player2
        if ( socketId === socketIdUsuarioA){
            this.field1.invocarCartas(cartasId)
            this.player1SummonCards = true
        } 
        if (socketId === socketIdUsuarioB ) {
            this.field2.invocarCartas(cartasId)
            this.player2SummonCards = true
        }
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

    finishLoadPhaseBy(usuarioId, socketId, socketIdUsuarioA, socketIdUsuarioB){
        if (socketId === socketIdUsuarioA){
            this.player1FinishedLoadPhase = true
        }
        if(socketId === socketIdUsuarioB){
            this.player2FinishedLoadPhase = true
        }
    }
    
    finishedLoadPhase(){
        return this.player1FinishedLoadPhase && this.player2FinishedLoadPhase
    }

    startSummonPhase(){
        this.estadoDeLaRonda = EstadosDeLaPartida.SUMMON_PHASE
    }

    activateEnergyCardJugador1(cardId){
        const energyCard = this.field1.hand.cartas.filter(x => x.uniqueIdInGame === cardId)[0]
        const color = energyCard.color
        const energyCount = energyCard.energyCount
        //Si es menor a cero aplica al rival
        if(energyCount < 0){
            this.field2.quitarEnergiasPor(energyCard);
        }
        else{
            this.field1.agregarEnergiaPor(energyCard);
        }
        this.field1.hand.cartas = this.field1.hand.cartas.filter(x => x.uniqueIdInGame !== cardId)
        
    }

    activateEnergyCardJugador2(cardId){
        const energyCard = this.field2.hand.cartas.filter(x => x.uniqueIdInGame === cardId)[0]
        const color = energyCard.color
        const energyCount = energyCard.energyCount

        if(energyCount < 0){
            this.field1.quitarEnergiasPor(energyCard);
        }
        else{
            this.field2.agregarEnergiaPor(energyCard);
        }
        this.field2.hand.cartas = this.field2.hand.cartas.filter(x => x.uniqueIdInGame !== cardId)
    }

    activateEquipmentCardJugador1(cardDigimonId, cardEquipmentId){
        const {name, attackPoints, healthPoints, quantityOfTargets, targetScope} = this.field1.hand.getCardById(cardEquipmentId)
        const cardEquipment = new EquipmentCard(name, attackPoints, healthPoints, quantityOfTargets, targetScope)
        
        const cardDigimon = this.field1.digimonZone.getCardById(cardDigimonId)
        cardEquipment.applyTo([cardDigimon.uniqueIdInGame], this.field1.digimonZone)
        //VER CASO DE PARTIAL Y ALL
    }

    activateEquipmentCardJugador2(cardDigimonId, cardEquipmentId){
        const {name, attackPoints, healthPoints, quantityOfTargets, targetScope} = this.field1.hand.getCardById(cardEquipmentId)
        const cardEquipment = new EquipmentCard(name, attackPoints, healthPoints, quantityOfTargets, targetScope)
        
        const cardDigimon = this.field2.digimonZone.getCardById(cardDigimonId)
        cardEquipment.applyTo([cardDigimon.uniqueIdInGame], this.field2.digimonZone)
        //VER CASO DE PARTIAL Y ALL
    }

    finishedRonda(){
        console.log(this.estadoDeLaRonda)
        return this.estadoDeLaRonda === EstadosDeLaPartida.FINISHED_ROUND
    }

    finishUpgradePhase(usuarioId, cardDigimonsToSummonIds, socketId, socketIdUsuarioA, socketIdUsuarioB){
        if (socketId === socketIdUsuarioA){
            this.player1FinishedUpgradePhase = true
        }
        if(socketId === socketIdUsuarioB){
            this.player2FinishedUpgradePhase = true
        }
    }

    toUpgradePhase(){
        this.estadoDeLaRonda = EstadosDeLaPartida.UPGRADE_PHASE
    }
}

module.exports = Game