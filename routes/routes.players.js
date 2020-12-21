const express = require('express');
const router = express.Router();
const playerControl = require('../controllers/player.controller');

router.get("/players", playerControl.players_list);

module.exports = router;