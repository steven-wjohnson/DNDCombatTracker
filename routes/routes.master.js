const express = require('express');
const router = express.Router();
const masterControl = require('../controllers/master.controller');

router.get("/master/players/add", masterControl.players_create_get);

router.post("/master/players/add", masterControl.players_create_post);

router.get("/master/players/:id/update", masterControl.players_update_get);

router.post("/master/players/:id/update", masterControl.players_update_post);

router.post("/master/players/:id/delete", masterControl.players_delete_post);

router.get("/master", masterControl.players_list);


module.exports = router;