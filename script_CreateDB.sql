CREATE DATABASE combatTrackerDB;

USE combatTrackerDB;

CREATE TABLE Characters (
characterId int NOT NULL UNIQUE AUTO_INCREMENT,
characterName varchar(128) NOT NULL,
characterAC int NOT NULL,
characterMaxHP int NOT NULL,
characterHP int NOT NULL,
PRIMARY KEY (characterId)
);

CREATE TABLE Players (
playerId int NOT NULL UNIQUE AUTO_INCREMENT,
characterId int NOT NULL, 
playerName varchar(128) NOT NULL, 
playerInitiative int NOT NULL, 
playerCondition varchar(255) NOT NULL,
playerCombatEffects varchar(255) NOT NULL,
PRIMARY KEY (playerId), 
FOREIGN KEY (characterId) REFERENCES Characters(characterId)
);


