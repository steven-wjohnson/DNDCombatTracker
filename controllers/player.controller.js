const playerModel = require("../models/player.model");
const sql = require("../models/db.js");

let Player = playerModel.Player;


//Display all players
exports.players_list = (req, res) => {
    //code to get players from db and display
    //get players from DB 
    let SQLSTRING = "SELECT * FROM Players"

    sql.query(SQLSTRING, (err, results, fields) => {
        if(err) {
            console.log("An error occurred in the SQL on select.");
            throw err;
        }
        else{
            
            let playerArray = [];
            let playerObj;

            for(let i=0; i < results.length; i++){

                playerObj = {
                    name: results[i].playerName,
                    initiative: results[i].playerInitiative,
                    condition: results[i].playerCondition,
                    combatEffects: results[i].playerCombatEffects
                };

                playerArray[i] = new Player(playerObj);
            }

            res.render("players", { players : playerArray });
        }
    });
}

//Show Player
exports.players_single = () => {
    //code to get details of a single player
}

