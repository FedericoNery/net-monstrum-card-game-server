import Card from "./Card"

class EquipmentCard extends Card {
    constructor(id, name, type, attackPoints, healthPoints, quantityOfTargets, targetScope) {
      super(id, name, type,);
      this.attackPoints = attackPoints;
      this.healthPoints = healthPoints;
      this.quantityOfTargets = quantityOfTargets;
      this.targetScope = targetScope;
    }
  }

export default EquipmentCard