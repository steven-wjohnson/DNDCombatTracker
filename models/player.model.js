//constructor
class Player { 
    constructor(player) { 
        this.id = player.id;
        this.name = player.name;
        this.initiative = player.initiative;
        this.condition = player.condition;
        this.combatEffects = player.combatEffects;
        this.characterId = player.characterId;
        this.characterName = player.characterName;
        this.characterAC = player.characterAC;
        this.characterMaxHP = player.characterMaxHP;
        this.characterHP = player.characterHP;
    }

};

module.exports = {
    Player: Player
}