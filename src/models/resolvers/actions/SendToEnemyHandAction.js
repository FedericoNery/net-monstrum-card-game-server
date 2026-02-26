import { RuleAction } from "../RuleAction";


class SendToEnemyHandAction extends RuleAction {
	constructor(rule, game) {
        super(rule, game)
        this.rule = rule
        this.game = game
    }

    execute() {
        
    }
}

module.exports = SendToEnemyHandAction;
