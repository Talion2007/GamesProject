const express = require("express");
const router = express.Router();
const gameController = require ("../controllers/gameControllers")

router.get('/jogos', gameController.getAllJogos); 

router.get('/jogos/generos/:genero', gameController.getJogosByGenero); 

router.get('/jogos/plataformas/:plataforma', gameController.getJogosByPlataforma); 

router.post('/jogos', gameController.addJogos);

router.put('/jogos/:id', gameController.updateJogos);

router.delete('/jogos/:id', gameController.deleteJogos);

router.get('/lista', gameController.getAllDesejos); 

module.exports = router;
