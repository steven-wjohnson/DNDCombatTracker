//constructor
class Character { 
    constructor(character) { 
        this.id = character.id;
        this.name = character.name;
        this.ac = character.ac;
        this.maxHP = character.maxHP;
        this.hp = character.hp;
    }

};

module.exports = {
    Character: Character
}