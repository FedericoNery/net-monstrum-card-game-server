import Card from "./Card";

class ProgrammingCard extends Card {
    name: string;
    color: string;
    rules: Rule[];
    type: string;

    constructor(id: string, name: string, color: string, rules: Rule[] = []) {
        super(id);
        this.name = name;
        this.color = color;
        this.rules = rules;
        this.type = "Programming";
    }
}

export class Rule {
    action: string;
    targetZone: string;
    formOfAction: string;
    targetColors: string[];
    targetTypeCard: string[];
    quantity: number;
    damage: number | null;

    constructor(
        action: string,
        targetZone: string,
        formOfAction: string,
        targetColors: string[] = [],
        targetTypeCard: string[] = [],
        quantity: number,
        damage: number | null = null
    ) {
        this.action = action;
        this.targetZone = targetZone;
        this.formOfAction = formOfAction;
        this.targetColors = targetColors;
        this.targetTypeCard = targetTypeCard;
        this.quantity = quantity;
        this.damage = damage;
    }
}

export default ProgrammingCard;
