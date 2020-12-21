const playerModel = require("../models/player.model");
const characterModel = require("../models/character.model");
const sql = require("../models/db.js");

let Player = playerModel.Player;
let Character = characterModel.Character;


//Render Master view
exports.render_master = (req, res) => {
    res.render("master");
}

//Display all players
exports.players_list = (req, res) => {
    //get players from DB 
    let SQLSTRING = "SELECT * FROM view_players_characters"

    sql.query(SQLSTRING, (err, results, fields) => {
        if(err) {
            console.log("An error occurred in the SQL on insert.");
            throw err;
        }
        else{
            
            let playerArray = [];
            let playerObj;

            for(let i=0; i < results.length; i++){

                playerObj = {
                    id: results[i].playerId,
                    name: results[i].playerName,
                    initiative: results[i].playerInitiative,
                    condition: results[i].playerCondition,
                    combatEffects: results[i].playerCombatEffects,
                    characterId: results[i].characterId,
                    characterName: results[i].characterName,
                    characterAC: results[i].characterAC,
                    characterMaxHP: results[i].characterMaxHP,
                    characterHP: results[i].characterHP
                };

                playerArray[i] = new Player(playerObj);
            }

            res.render("master", { players : playerArray });
        }
    });


}

// //Show Player
// exports.players_single = () => {
//     //code to get details of a single player
// }

//Create form
exports.players_create_get = (req, res) => {
    //code to display create player form

    //get characters from the DB for the character selector
    let SQLSTRING = "SELECT * FROM Characters"

    sql.query(SQLSTRING, (err, results, fields) => {
        if(err) {
            console.log("An error occurred in the SQL on SELECT.");
            throw err;
        }
        else{
            
            let charactersArray = [];
            let characterObj;

            for(let i=0; i < results.length; i++){

                characterObj = {
                    id: results[i].characterId,
                    name: results[i].characterName,
                    ac: results[i].characterAC,
                    maxHP: results[i].characterMaxHP,
                    hp: results[i].characterHP
                };

                console.log(`CharacterID: ${characterObj.id}`);
                console.log(`CharacterName: ${characterObj.name}`);
                console.log(`CharacterAC: ${characterObj.ac}`);
                console.log(`CharacterMaxHP: ${characterObj.maxHP}`);
                console.log(`CharacterHP: ${characterObj.hp}`);
                console.log(`----------------------------------------`);

                charactersArray[i] = new Character(characterObj);
            }
            
            //renders the add player form with the character selector filled by the characters in the db
            res.render("addPlayer", { characters : charactersArray });
        }
    });
}

//Create a player
exports.players_create_post = (req, res) => {
    //code to create and insert player into database

    //model a player with the data from the form

    let playerObj = {
        characterId: req.body.characterSelector,
        name: req.body.playerName,
        initiative: req.body.playerInitiative,
        condition: req.body.playerCondition,
        combatEffects: req.body.playerCombatEffects
    }

    //create a new player
    let player = new Player(playerObj);

    //save the new player into the database
    let SQLSTRING = "INSERT INTO Players (characterId, playerName, playerInitiative, playerCondition, playerCombatEffects) VALUES (?, ?, ?, ?, ?)"

    sql.query(SQLSTRING, [player.characterId, player.name, player.initiative, player.condition, player.combatEffects], (err, results) => {
        if(err) {
            console.log("An error occurred in the SQL on insert.");
            throw err;
        }
        else{
            console.log(`Player ${player.name} was inserted into the database with id = ${results.insertId}`);
        }
    });

    //reroute back to the master page
    res.redirect('/master');
}

//Delete a player
exports.players_delete_post = (req, res) => {
    //code to delete a player from the database

    //retrieve player data from the db
    let playerId = req.params.id;

    let SQLSTRING = "SELECT * FROM Players WHERE playerId = ?";

    sql.query(SQLSTRING, [playerId], (err, results) => {
        if(err) {
            console.log("An error occurred in the SQL on SELECT.");
            throw err;
        }
        else{
            sql.query("DELETE FROM Players WHERE playerId = ?", [playerId], (err, results) => {
                if(err){
                    console.log("An error occurred in the SQL on DELETE.");
                    throw err;
                }
                else{
                    console.log(`Player Deleted: ID=${playerId}`);
                    res.redirect("/master");
                }
            });
        }
    });

}

//Update form
exports.players_update_get = (req, res) => {
    //code to show update player form

    //retrieve player data from the db
    let playerId = req.params.id;

    let SQLSTRING = "SELECT * FROM Players WHERE playerId = ?";

    sql.query(SQLSTRING, [playerId], (err, results) => {
        if(err) {
            console.log("An error occurred in the SQL on SELECT.");
            throw err;
        }
        else{
            let playerObj = {
                id: results[0].playerId,
                name: results[0].playerName,
                initiative: results[0].playerInitiative,
                condition: results[0].playerCondition,
                combatEffects: results[0].playerCombatEffects,
                characterId: results[0].characterId,
                characterHP: 0
            };

            //Need to get the character HP from the Characters table
            sql.query("SELECT characterHP FROM Characters WHERE characterId = ?", [playerObj.characterId], (err, results) => {
                if(err){
                    console.log("An error occurred in the SQL on SELECT.");
                    throw err;
                }
                else{
                    playerObj.characterHP = results[0].characterHP;

                    console.log(`Player retrieved: ID=${playerObj.id} Name=${playerObj.name}`);
                    res.render('editPlayer', { player: playerObj });
                }
            });
        }
    });
}

//Update an edited player
exports.players_update_post = (req, res) => {
    //code to update a player

    //get the data from the form 
    let playerObj = {
        id: req.params.id,
        name: req.body.playerName,
        initiative: req.body.playerInitiative,
        condition: req.body.playerCondition,
        combatEffects: req.body.playerCombatEffects,
        characterHP: req.body.characterHP,
        characterId: req.body.characterId
    }

    //create a new player object with updated data
    let updatedPlayer = new Player(playerObj);

    //sql to update the players table
    let SQLSTRING = "UPDATE Players SET playerName = ?, playerInitiative = ?, playerCondition = ?, playerCombatEffects = ? WHERE playerId = ?";

    sql.query(SQLSTRING, 
        [updatedPlayer.name, updatedPlayer.initiative, updatedPlayer.condition, updatedPlayer.combatEffects, updatedPlayer.id], 
        (err, results) => {
        if(err) {
            console.log("An error occurred in the SQL on UPDATE.");
            throw err;
        }
        else{

            console.log(`Player updated: ID=${updatedPlayer.id} Name=${updatedPlayer.name}`);

        }
    });

    let SQLSTRING2 = "UPDATE Characters SET characterHP = ? WHERE characterId = ?";

    sql.query(SQLSTRING2, 
        [updatedPlayer.characterHP, updatedPlayer.characterId], 
        (err, results) => {
        if(err) {
            console.log("An error occurred in the SQL on UPDATE.");
            throw err;
        }
        else{
            
            console.log(`Character updated: ID=${updatedPlayer.characterId}`);

            res.redirect("/master");

        }
    });


}