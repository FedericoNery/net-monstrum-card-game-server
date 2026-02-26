import { RuleAction } from "../RuleAction";


class DealDamageToEnemyFieldAction extends RuleAction {
	constructor(rule, game) {
        super(rule, game)
        this.rule = rule
        this.game = game
    }

    execute() {
        
    }
}

module.exports = DealDamageToEnemyFieldAction;
