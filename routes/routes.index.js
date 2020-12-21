const express = require('express');
const router = express.Router();
const indexControl = require('../controllers/index.controller');

router.get("/", indexControl.render_home);


module.exports = router;