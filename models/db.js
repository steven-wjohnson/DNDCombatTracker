//This file defines the model for connection to the database

const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

//create a connection the the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//open the connection
connection.connect(err => {
    if(err) {
        throw err;
    }
    else{
        console.log(`Successfully connected to database: ${dbConfig.DB}`);
    }
    
});

module.exports = connection;