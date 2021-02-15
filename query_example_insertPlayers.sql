USE combatTrackerDB;

INSERT INTO Players (playerName, playerInitiative, playerCondition, playerCombatEffects, characterId)
VALUES ("Steven", 15, "None", "None", 1);

INSERT INTO Players (playerName, playerInitiative, playerCondition, playerCombatEffects, characterId)
VALUES ("Richard", 21, "None", "None", 2);

INSERT INTO Players (playerName, playerInitiative, playerCondition, playerCombatEffects, characterId)
VALUES ("Randy", 18, "None", "None", 3);

SELECT * FROM Players;
