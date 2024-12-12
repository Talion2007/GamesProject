//Tabela de Jogos//

//GET ALL - JOGOS 
const userModel = require("../models/userModel");
//função p/ lidar com a requisição de usuários (listagem)
exports.getUsers = (req, res) => {
  userModel.getUsers((err, users) => {
    if (err) {
      Response.status(500).send("Erro a buscar usuários");
    } else {
      res.json(user);
    }
  });
};


// Get de gênero
exports.createUser = (req, res) => {
  const data = req.body; // Extrai o nome do corpo da requisição
  userModel.createUser(data, (err) => {
    if (err) {
      res.status(500).send("Erro ao criar usuário"); // Retorna um erro 500 se algo deu errado
    } else {
      res.status(201).send("Usuário criado com sucesso"); // Retorna status 201 (criado) se bem sucedido
    }
  });
};


//GET lista de desejos 
// Função para lidar com a requisição de atualização de usuário
exports.updateUser = (req, res) => {
  const { id } = req.params; // Extrai o ID dos parâmetros da URL
  const { name } = req.body; // Extrai o nome do corpo da requisição
  userModel.updateUser(id, name, (err) => {
    if (err) {
      res.status(500).send("Erro ao atualizar usuário"); // Retorna um erro 500 se algo deu errado
    } else {
      res.send("Usuário atualizado com sucesso"); // Retorna uma mensagem de sucesso
    }
  });
};

// Função para lidar com a requisição de remoção de usuário
exports.deleteUser = (req, res) => {
  const { id } = req.params; // Extrai o ID dos parâmetros da URL
  userModel.deleteUser(id, (err) => {
    if (err) {
      res.status(500).send("Erro ao deletar usuário"); // Retorna um erro 500 se algo deu errado
    } else {
      res.send("Usuário deletado com sucesso"); // Retorna uma mensagem de sucesso
    }
  });
};
