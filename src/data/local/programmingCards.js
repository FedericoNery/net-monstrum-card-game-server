// Instancias de cartas
const cards = [
    new CardProgramming("104", "Sacred Spear", "WHITE", [
        new Rule(
            "SEND_TO_TRASH",
            "ENEMY_FIELD",
            "NOT_APPLY",
            ["BLACK", "BLUE", "RED", "GREEN"],
            ["DIGIMON"],
            "ALL",
            null
        )
    ]),
    new CardProgramming("105", "Tidal Wave", "BLUE", [
        new Rule(
            "SEND_TO_TRASH",
            "ENEMY_FIELD",
            "NOT_APPLY",
            ["BLACK", "WHITE", "RED", "GREEN"],
            ["DIGIMON"],
            "ALL",
            null
        )
    ]),
    new CardProgramming("106", "Control Parts", "BLUE", [
        new Rule(
            "SEND_TO_FIELD",
            "ENEMY_FIELD",
            "SELECTED",
            [],
            ["DIGIMON"],
            "ONE",
            null
        )
    ]),
    new CardProgramming("107", "Freeze Bug", "BLUE", [
        new Rule(
            "SEND_TO_TRASH", //INSTANT_SEND_TO_TRASH //que sea un comportamiento unico
            "ENEMY_SUMMON_PROGRAMMING_ZONE",
            "NOT_APPLY",
            [],
            ["PROGRAMMING", "EQUIPMENT", "ENERGY"],
            "ONE",
            null
        )
    ]),
    new CardProgramming("108", "Eclipse Undo", "BLUE", [
        new Rule(
            "SEND_TO_ENEMY_HAND",
            "ENEMY_FIELD",
            "NOT_APPLY",
            [],
            ["DIGIMON"],
            "ONE",
            null
        )
    ]),
    new CardProgramming("109", "Ecoly Cycle", "BLUE", [
        new Rule(
            "SEND_TO_HAND",
            "TRASH",
            "NOT_APPLY",
            [],
            ["DIGIMON"],
            "ONE",
            null
        )
    ]),
    new CardProgramming("110", "Volcanic Gatlin", "RED", [
        new Rule(
            "DEAL_DAMAGE_TO_ENEMY_FIELD",
            "ENEMY_FIELD",
            "NOT_APPLY",
            ["BLACK", "WHITE", "BLUE", "GREEN"],
            ["DIGIMON"],
            "ALL",
            60
        )
    ]),
    new CardProgramming("111", "Flame Gatlin", "RED", [
        new Rule(
            "DEAL_DAMAGE_TO_ENEMY_FIELD",
            "ENEMY_FIELD",
            "NOT_APPLY",
            ["BLACK", "WHITE", "BLUE", "GREEN"],
            ["DIGIMON"],
            "ALL",
            15
        )
    ]),
    new CardProgramming("112", "Fire Cannon", "RED", [
        new Rule(
            "DEAL_DAMAGE_TO_ENEMY_FIELD",
            "ENEMY_FIELD",
            "NOT_APPLY",
            [],
            ["DIGIMON"],
            "ONE",
            30
        )
    ]),
    new CardProgramming("113", "Darkness Gale", "BLACK", [
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_FIELD",
            "NOT_APPLY",
            ["WHITE", "BLUE", "GREEN", "RED"],
            ["DIGIMON"],
            "ALL",
            null
        )
    ]),
    new CardProgramming("114", "Deceive Clock", "BLACK", [
        new Rule(
            "SEND_TO_HAND",
            "DECK",
            "NOT_APPLY",
            [],
            [],
            "ONE",
            null
        )
    ]),
    new CardProgramming("115", "Chaos Virus", "BLACK", [
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_SUMMON_PROGRAMMING_ZONE",
            "NOT_APPLY",
            ["WHITE", "BLUE", "GREEN", "RED"],
            ["PROGRAMMING"],
            "ONE",
            null
        )
    ]),
    new CardProgramming("116", "Vicious Hacking", "BLACK", [
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_HAND",
            "SELECTED",
            [],
            [],
            "ONE",
            null
        )
    ]),
    new CardProgramming("117", "Delete Matrix", "BLACK", [
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_FIELD",
            "NOT_APPLY",
            [],
            ["DIGIMON"],
            "ALL",
            null
        )
    ]),
    new CardProgramming("118", "Misery Gate", "BLACK", [
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_DECK",
            "NOT_APPLY",
            [],
            [],
            "ONE",
            null
        ),
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_DECK",
            "NOT_APPLY",
            [],
            [],
            "ONE",
            null
        ),
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_DECK",
            "NOT_APPLY",
            [],
            [],
            "ONE",
            null
        )
    ]),
    new CardProgramming("119", "Desire Access", "BLACK", [
        new Rule(
            "SEND_TO_TRASH",
            "HAND",
            "NOT_APPLY",
            [],
            [],
            "ALL",
            null
        ),
        new Rule(
            "SEND_TO_HAND",
            "DECK",
            "NOT_APPLY",
            [],
            [],
            "ONE",
            null
        ),
        new Rule(
            "SEND_TO_HAND",
            "DECK",
            "NOT_APPLY",
            [],
            [],
            "ONE",
            null
        ),
        new Rule(
            "SEND_TO_HAND",
            "DECK",
            "NOT_APPLY",
            [],
            [],
            "ONE",
            null
        ),
        new Rule(
            "SEND_TO_HAND",
            "DECK",
            "NOT_APPLY",
            [],
            [],
            "ONE",
            null
        ),
        new Rule(
            "SEND_TO_HAND",
            "DECK",
            "NOT_APPLY",
            [],
            [],
            "ONE",
            null
        ),
        new Rule(
            "SEND_TO_HAND",
            "DECK",
            "NOT_APPLY",
            [],
            [],
            "ONE",
            null
        )
    ]),
    new CardProgramming("120", "Revival Charge", "BLACK", [
        new Rule(
            "SEND_TO_DECK",
            "TRASH",
            "NOT_APPLY",
            [],
            [],
            "ALL",
            null
        )
    ]),
    new CardProgramming("121", "Chrono Balance", "BLACK", [
        new Rule(
            "SEND_TO_TRASH",
            "HAND",
            "RANDOM",
            [],
            [],
            "ONE",
            1
        ),
        new Rule(
            "SEND_TO_TRASH",
            "HAND",
            "RANDOM",
            [],
            [],
            "ONE",
            1
        ),
        new Rule(
            "SEND_TO_TRASH",
            "HAND",
            "RANDOM",
            [],
            [],
            "ONE",
            1
        ),
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_HAND",
            "RANDOM",
            [],
            [],
            "ONE",
            1
        ),
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_HAND",
            "RANDOM",
            [],
            [],
            "ONE",
            1
        ),
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_HAND",
            "RANDOM",
            [],
            [],
            "ONE",
            1
        )
    ]),
    new CardProgramming("122", "Security Hall", "BLACK", [
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_DECK",
            "RANDOM",
            [],
            [],
            "ONE",
            null
        ),
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_DECK",
            "RANDOM",
            [],
            [],
            "ONE",
            null
        ),
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_DECK",
            "RANDOM",
            [],
            [],
            "ONE",
            null
        ),
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_DECK",
            "RANDOM",
            [],
            [],
            "ONE",
            null
        ),
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_DECK",
            "RANDOM",
            [],
            [],
            "ONE",
            null
        )
    ]),
    new CardProgramming("123", "Revival Charge", "BLACK", [
        new Rule(
            "SEND_TO_DECK",
            "TRASH",
            "NOT_APPLY",
            [],
            [],
            "ALL",
            null
        )
    ]),
    new CardProgramming("124", "Scramble Up", "BLACK", [
        new Rule(
            "SEND_TO_FIELD",
            "HAND",
            "SELECTED",
            [],
            [],
            "ONE",
            null
        )
    ]),
    new CardProgramming("125", "Charge Terminal", "BLACK", [
        new Rule(
            "SEND_TO_HAND",
            "HAND",
            "NOT_APPLY",
            [],
            [],
            "ONE",
            null
        ),
        new Rule(
            "SEND_TO_HAND",
            "HAND",
            "NOT_APPLY",
            [],
            [],
            "ONE",
            null
        )
    ]),
    new CardProgramming("126", "Digimon Charge", "BLACK", [
        new Rule(
            "SEND_TO_HAND",
            "DECK",
            "SELECTED",
            [],
            ["DIGIMON"],
            "ONE",
            null
        )
    ]),
    new CardProgramming("127", "Program Charge", "BLACK", [
        new Rule(
            "SEND_TO_HAND",
            "DECK",
            "SELECTED",
            [],
            ["PROGRAMMING", "EQUIPMENT", "ENERGY", "SUMMON"],
            "ONE",
            null
        )
    ]),
    new CardProgramming("128", "Trade Charge", "BLACK", [
        new Rule(
            "SEND_TO_HAND",
            "DECK",
            "RANDOM",
            [],
            [],
            "ONE",
            null
        ),
        new Rule(
            "SEND_TO_TRASH",
            "HAND",
            "SELECTED",
            [],
            [],
            "ONE",
            null
        )
    ]),
    new CardProgramming("129", "Illegal Access", "BLACK", [
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_DECK",
            "SELECTED",
            [],
            [],
            "ONE",
            null
        ),
        new Rule(
            "SEND_TO_ENEMY_TRASH",
            "ENEMY_DECK",
            "SELECTED",
            [],
            [],
            "ONE",
            null
        )
    ])
]
