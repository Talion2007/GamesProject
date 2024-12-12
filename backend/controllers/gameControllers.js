const jogosModel = require('../models/gameModels'); // Importa o model para interagir com o banco

// GET ALL - Listar todos os jogos
exports.getAllJogos = (req, res) => {
    jogosModel.getAll((err, jogos) => {
        if (err) {
            res.status(500).send('Erro ao buscar jogos');
        } else {
            res.json(jogos);
        }
    });
};

// GET Gênero - Listar jogos por gênero
exports.getJogosByGenero = (req, res) => {
    const { genero } = req.params;
    jogosModel.getByGenero(genero, (err, jogos) => {
        if (err) {
            res.status(500).send('Erro ao buscar jogos por gênero');
        } else {
            res.json(jogos);
        }
    });
};

// GET Plataforma - Listar jogos por plataforma
exports.getJogosByPlataforma = (req, res) => {
    const { plataforma } = req.params;
    jogosModel.getByPlataforma(plataforma, (err, jogos) => {
        if (err) {
            res.status(500).send('Erro ao buscar jogos por plataforma');
        } else {
            res.json(jogos);
        }
    });
};

// POST - Incluir jogo
exports.addJogo = (req, res) => {
    const novoJogo = req.body;
    jogosModel.create(novoJogo, (err) => {
        if (err) {
            res.status(500).send('Erro ao adicionar jogo :(');
        } else {
            res.status(201).send('Jogo adicionado com sucesso :)');
        }
    });
};

// PUT - Atualizar jogo
exports.updateJogo = (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    jogosModel.update(id, dadosAtualizados, (err) => {
        if (err) {
            res.status(500).send('Erro ao atualizar jogo :(');
        } else {
            res.send('Jogo atualizado com sucesso :)');
        }
    });
};

// DELETE - Deletar jogo
exports.deleteJogo = (req, res) => {
    const { id } = req.params;
    jogosModel.delete(id, (err) => {
        if (err) {
            res.status(500).send('Erro ao deletar jogo :(');
        } else {
            res.send('Jogo deletado com sucesso :)');
        }
    });

};



//------Lista de desejos------//



//GET ALL - listar os desejos
exports.getAllDesejos = (req, res) => {
    DesejosModel.getAll((err, DEsejos) => {
        if (err) {
            res.status(500).send('Erro ao buscar jogos');
        } else {
            res.json(jogos);
        }
    });
};


// POST - Incluir desejo na lista
exports.addDesejo = (req, res) => {
    const novoDesejo = req.body;
    DesejoModel.create(novoDesejo, (err) => {
        if (err) {
            res.status(500).send('Erro ao adicionar jogo :(');
        } else {
            res.status(201).send('Jogo adicionado com sucesso :)');
        }
    });
};

// PUT - Atualizar lista
exports.updateDesejo = (req, res) => {
    const { id } = req.params;
    const DsejosAtualizados = req.body;
    DsejoModel.update(id, DsejosAtualizados, (err) => {
        if (err) {
            res.status(500).send('Erro ao atualizar jogo :(');
        } else {
            res.send('Jogo atualizado com sucesso :)');
        }
    });
};