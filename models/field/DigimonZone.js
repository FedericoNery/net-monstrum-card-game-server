class DigimonZone {
    constructor(cartas = []) {
      this.cartas = cartas;
    }

    setCartas(cartas){
        this.cartas = cartas
    }

    getCartas(){
      return this.cartas
    }

    getLength(){
      return this.cartas.length
    }

    getAtaque(){
      if(this.getLength() > 0)
      {
        const ataques = this.cartas.map(x => x.currentAttackPoints)
        return ataques.reduce((x,y) => x + y, 0)
      }
      return 0      
    }

    getDefensa(){
      if(this.getLength() > 0){
        const defensas = this.cartas.map(x => x.currentHealthPoints)
        return defensas.reduce((x,y) => x + y, 0)
      }
      return 0  
    }

    invocarCarta(carta){
      this.cartas = [...this.cartas, carta]
    }
    
    clear(){
      this.cartas = []
    }
    
    getCardById(cardId){
      const card = this.cartas.filter(x => x.uniqueIdInGame === cardId)[0]
      return card
    }

    applyEquipmentEffectTo(cardDigimonId, effect){
      const uniqueIds = this.cartas.map(x => x.uniqueIdInGame)
      const indexCard = uniqueIds.indexOf(cardDigimonId)
      this.cartas[indexCard].currentAttackPoints += effect.attackPoints 
      this.cartas[indexCard].currentHealthPoints += effect.healthPoints
      //TODO VER COMO IMPLEMENTAR CARTAS QUE REBAJAN PUNTOS DE ATAQUE Y VIDA 
    }
}

export default DigimonZone