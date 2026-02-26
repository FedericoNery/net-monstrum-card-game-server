import Card from "./Card";

class EquipmentCard extends Card {
    attackPoints: number;
    healthPoints: number;
    quantityOfTargets: number;
    targetScope: string;

    constructor(
        id: string,
        name: string,
        type: string,
        attackPoints: number,
        healthPoints: number,
        quantityOfTargets: number,
        targetScope: string
    ) {
        super(id, name, type);
        this.attackPoints = attackPoints;
        this.healthPoints = healthPoints;
        this.quantityOfTargets = quantityOfTargets;
        this.targetScope = targetScope;
    }
}

export default EquipmentCard;
