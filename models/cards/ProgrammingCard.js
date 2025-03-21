import Card from "./Card";

class ProgrammingCard extends Card {
    constructor(id, name, color, rules) {
        super(id);
        this.name = name;
        this.color = color;
        this.rules = rules || [];
        this.type = "Programming";
    }
}

export class Rule {
    constructor(action, targetZone, formOfAction, targetColors = [], targetTypeCard = [], quantity, damage = null) {
        this.action = action;
        this.targetZone = targetZone;
        this.formOfAction = formOfAction;
        this.targetColors = targetColors; 
        this.targetTypeCard = targetTypeCard; 
        this.quantity = quantity;
        this.damage = damage;
    }
}

export default ProgrammingCard