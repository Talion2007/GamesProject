const express = require("express");
const router = express.Router();
const gameController = require ("../controllers/gameControllers")

router.get('/jogos', gameController.getAllJogos); 

router.get('/jogos/generos/:genero', gameController.getJogosByGenero); 

router.get('/jogos/plataformas/:plataforma', gameController.getJogosByPlataforma); 

router.post('/jogos', gameController.addJogo);

router.put('/jogos/:id', gameController.updateJogo);

router.delete('/jogo/:id', gameController.deleteJogo);

module.exports = router;
