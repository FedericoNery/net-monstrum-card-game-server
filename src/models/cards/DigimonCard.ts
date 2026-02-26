import Card from "./Card";

class DigimonCard extends Card {
    attackPoints: number;
    color: string;
    energyCount: number;
    evolution: string;
    healthPoints: number;

    constructor(
        id: string,
        name: string,
        type: string,
        attackPoints: number,
        color: string,
        energyCount: number,
        evolution: string,
        healthPoints: number
    ) {
        super(id, name, type);
        this.attackPoints = attackPoints;
        this.color = color;
        this.energyCount = energyCount;
        this.evolution = evolution;
        this.healthPoints = healthPoints;
    }
}

export default DigimonCard;
