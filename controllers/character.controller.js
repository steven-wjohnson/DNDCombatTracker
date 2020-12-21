const characterModel = require("../models/character.model");
const sql = require("../models/db.js");

let Character = characterModel.Character;

//Display all characters
exports.character_list = (req, res) => {
    res.render("characters");
}

//Create form
exports.character_create_get = (req, res) => {
    res.render("addCharacter");
}

//Create a character
exports.character_create_post = (req, res) => {

     //model a character with the data from the form
     //hp is same as max on new character because you want to start at full health
     let charObj = {
        name: req.body.characterName,
        ac: req.body.characterAC,
        maxHP: req.body.characterMaxHP,
        hp: req.body.characterMaxHP
    }

    //create a new player
    let newCharacter = new Character(charObj);

    //save the new player into the database
    let SQLSTRING = "INSERT INTO Characters (characterName, characterAC, characterMaxHP, characterHP) VALUES (?, ?, ?, ?)"

    sql.query(SQLSTRING, [newCharacter.name, newCharacter.ac, newCharacter.maxHP, newCharacter.hp], (err, results) => {
        if(err) {
            console.log("An error occurred in the SQL on insert.");
            throw err;
        }
        else{
            console.log(`Character ${newCharacter.name} was inserted into the database with id = ${results.insertId}`);
        }
    });

    //reroute back to the master page
    res.redirect('/master');

}

