USE combatTrackerDB;

CREATE VIEW `view_players_characters` AS
SELECT Players.playerId, Players.playerName, Players.playerInitiative, Players.playerCondition, 
Players.playerCombatEffects, Characters.characterId, Characters.characterName, Characters.characterAC, 
Characters.characterMaxHP, Characters.characterHP 
FROM 
Players INNER JOIN Characters 
ON Players.characterId = Characters.characterId;