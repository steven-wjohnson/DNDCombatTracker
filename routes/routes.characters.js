const express = require('express');
const characterControl = require('../controllers/character.controller');
const router = express.Router();

router.get('/master/characters/add', characterControl.character_create_get);

router.post('/characters/add', characterControl.character_create_post);


module.exports = router;