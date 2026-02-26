import { RuleAction } from "../RuleAction";


class SendToEnemyFieldAction extends RuleAction {
	constructor(rule, game) {
        super(rule, game)
        this.rule = rule
        this.game = game
    }

    execute() {
        
    }
}

module.exports = SendToEnemyFieldAction;
