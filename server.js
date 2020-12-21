//Setup
const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/routes.index');
const charactersRouter = require('./routes/routes.characters');
const masterRouter = require('./routes/routes.master');
const playerRouter = require('./routes/routes.players');

//sets the view engine to ejs
app.set("view engine", "ejs");

//gets the absolute path of app.js and finds views folder from there
app.set('views', path.join(__dirname, '/views'));

//serves static files like css from the public directory so our references will work across all templates
app.use(express.static(path.join(__dirname, 'public')));

//tells express how to parse requests with json data
app.use(bodyParser.json());

//tells express how to parse requests with url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

//Routers

app.use(indexRouter);

app.use(masterRouter);

app.use(charactersRouter);

app.use(playerRouter);


app.listen(PORT, () => {
    console.log(`DnD Combat Tracker running on port: ${PORT}`);
});
