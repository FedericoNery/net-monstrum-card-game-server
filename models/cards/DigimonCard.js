import Card from "./Card";

class DigimonCard extends Card {
  
    constructor(id, name, type, attackPoints, color, energyCount, evolution, healthPoints) {
        super(id, name, type,);
        this.attackPoints = attackPoints;
        this.color = color;
        this.energyCount = energyCount;
        this.evolution = evolution;
        this.healthPoints = healthPoints;
    }

}

export default DigimonCard