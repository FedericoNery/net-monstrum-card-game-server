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
        const ataques = this.cartas.map(x => x.attackPoints)
        return ataques.reduce((x,y) => x + y, 0)
      }
      return 0      
    }

    getDefensa(){
      if(this.getLength() > 0){
        const defensas = this.cartas.map(x => x.healthPoints)
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
}

module.exports = DigimonZone