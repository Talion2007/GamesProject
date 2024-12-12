const express = require("express");
const router = express.Router();
const gameController = require ("../controllers/gameControllers")

router.get('/historias/palavrachave/:palavrachave', gameController.getHistory); 

router.get('/mensagem', gameController.getMessage); 

router.post('/mensagem', gameController.createMessage); 

module.exports = router;
