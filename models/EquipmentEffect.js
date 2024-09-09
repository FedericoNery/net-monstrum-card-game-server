
  class EquipmentEffect{
    constructor(attackPoints, healthPoints){
        this.attackPoints = attackPoints
        this.healthPoints = healthPoints
    }
  
    applyTo(cardDigimon){
      cardDigimon.attackPoints += attackPoints;
      cardDigimon.healthPoints += healthPoints;
    }
  }

  class EquipmentCard{
    constructor(name, attackPoints, healthPoints, quantityOfTargets, targetScope){
        this.name = name
        this.attackPoints = attackPoints
        this.healthPoints = healthPoints
        this.quantityOfTargets = quantityOfTargets
        this.targetScope = targetScope
    }

    getEffects(digimonZoneQuantityCards) {
        const effects = [];
        if (this.targetScope == "UNIQUE") {
          effects.push(new EquipmentEffect(this.attackPoints, this.healthPoints));
        }
    
        if (this.targetScope == "PARTIAL") {
          for (var i = 0; i < this.quantityOfTargets; i++) {
            effects.push(new EquipmentEffect(this.attackPoints, this.healthPoints));
          }
        }
    
        if (this.targetScope == "ALL") {
          for (var i = 0; i < digimonZoneQuantityCards; i++) {
            effects.push(new EquipmentEffect(this.attackPoints, this.healthPoints));
          }
        }
    
        return effects;
      }

      applyTo(cardDigimonIds, digimonZone){
        const effects = this.getEffects(digimonZone.cards.length)

        if (this.targetScope == "UNIQUE"){
            const cardDigimonId = cardDigimonIds[0]
            const effect = effects[0]
            digimonZone.applyEquipmentEffectTo(cardDigimonId, effect)
        }

        if (this.targetScope == "ALL") {
            for (var i = 0; i < digimonZone.cards.length; i++) {
                const cardDigimonId = digimonZone.cards[i].uniqueIdInGame
                const effect = effects[i]
                digimonZone.applyEquipmentEffectTo(cardDigimonId, effect);
            }
        }

      }
  }


module.exports = {
  EquipmentCard,
  EquipmentEffect
}