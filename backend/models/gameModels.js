//Model
const createConnection = require("../db");
const { Request, TYPES } = require("tedious");

// Buscar todos os Users
exports.getAllJogos = (callback) => {
  const connection = createConnection();
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null);
    }
    const query = `SELECT * FROM Jogos`;
    const request = new Request(query, (err, rowCount) => {
      if (err) {
        return callback(err, null);
      }
      if (rowCount === 0) {
        return callback(null, []);
      }
    });
    const result = [];
    request.on("row", (columns) => {
      result.push({
        ID: columns[0].value,
        Nome_Do_Jogo: columns[1].value,
        Genero: columns[2].value,
        Plataforma : columns[3].value,
        Data_lancamento: columns[4].value,
      });
    });   

    request.on("requestCompleted", () => {
      callback(null, result);
    });
    connection.execSql(request);
  });
  connection.connect();
};

//...........//

exports.getAllLista = (callback) => {
    const connection = createConnection();
    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null);
      }
      const query = `SELECT * FROM Lista_Desejos`;
      const request = new Request(query, (err, rowCount) => {
        if (err) {
          return callback(err, null);
        }
        if (rowCount === 0) {
          return callback(null, []);
        }
      });
      const result = [];
      request.on("row", (columns) => {
        result.push({
          ID_Lista : columns[0].value,
          ID_Jogo: columns[1].value,
          Email_interessado: columns[2].value
        });
      });   
  
      request.on("requestCompleted", () => {
        callback(null, result);
      });
      connection.execSql(request);
    });
    connection.connect();
  };

// Função buscar user pelo Id
exports.getJogosByID = (ID, callback) => {
  const connection = createConnection();
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null);
    }
    const query = `SELECT * FROM Jogos WHERE ID = @ID`;
    const request = new Request(query, (err) => {
      if (err) return callback(err, null);
    });

    request.addParameter("ID", TYPES.Int, ID);

    let Jogos = null;
    request.on("row", (columns) => {
      Jogos = {
        ID: columns[0].value,
        Nome_Do_Jogo: columns[1].value,
        Genero: columns[2].value,
        Plataforma: columns[3].value,
        Data_lancamento: columns[4].value,
      };
    });

    request.on("requestCompleted", () => callback(null, Jogos));
    connection.execSql(request);
  });
  connection.connect();
};

//.......//
exports.getListaByID = (ID, callback) => {
    const connection = createConnection();
    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null);
      }
      const query = `SELECT * FROM Lista_Desejos WHERE ID_Jogos = @ID_Jogos`;
      const request = new Request(query, (err) => {
        if (err) return callback(err, null);
      });
  
      request.addParameter("ID", TYPES.Int, ID_Lista);
  
      let Lista = null;
      request.on("row", (columns) => {
        Lista = {
            ID_Lista : columns[0].value,
            ID_Jogo: columns[1].value,
            Email_interessado: columns[2].value
        };
      });
  
      request.on("requestCompleted", () => callback(null, Lista));
      connection.execSql(request);
    });
    connection.connect();
  };

// Função buscar users pelo Nome
exports.getJogosByNome = (Nome_Do_Jogo, callback) => {
  const connection = createConnection();
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null);
    }
    const query = `SELECT * FROM Jogos WHERE Nome_Do_jogo = @Nome_Do_Jogo`;
    const request = new Request(query, (err) => {
      if (err) return callback(err, null);
    });

    request.addParameter("Nome", TYPES.VarChar, Nome_Do_Jogo);

    let Jogos = null;
    request.on("row", (columns) => {
      Jogos = {
        ID: columns[0].value,
        Nome_Do_Jogo: columns[1].value,
        Genero: columns[2].value,
        Plataforma: columns[3].value,
        Data_lancamento: columns[4].value,
      };
    });

    request.on("requestCompleted", () => callback(null, Jogos));
    connection.execSql(request);
  });
  connection.connect();
};

//......//
exports.getListaByNome = (ID_Jogo, callback) => {
    const connection = createConnection();
    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null);
      }
      const query = `SELECT * FROM Lista_Desejos WHERE ID_Jogo = @ID_Jogo`;
      const request = new Request(query, (err) => {
        if (err) return callback(err, null);
      });
  
      request.addParameter("Nome", TYPES.VarChar, ID_Jogo);
  
      let Lista = null;
      request.on("row", (columns) => {
        Lista = {
          ID: columns[0].value,
          Nome_Do_Jogo: columns[1].value,
          Genero: columns[2].value,
          Plataforma: columns[3].value,
          Data_lancamento: columns[4].value,
        };
      });
  
      request.on("requestCompleted", () => callback(null, Lista));
      connection.execSql(request);
    });
    connection.connect();
  };

// Função para criar um novo user
exports.createJogos = (data, callback) => {
  const connection = createConnection();
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null);
    }
    const query = `INSERT INTO Jogos (ID, Nome_Do_Jogo, Genero, Plataforma, Data_lancamento) VALUES (@ID, @Nome_Do_Jogo, @Genero, @Plataforma, @Data_lancamento)`;
    const request = new Request(query, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { message: "Jogos inserido com sucesso!" });
      }
    });
    request.addParameter("ID", TYPES.VarChar, data.id);
    request.addParameter("Nome_Do_Jogo", TYPES.VarChar, data.Nome_Do_Jogo);
    request.addParameter("Genero", TYPES.Int, data.Genero);
    request.addParameter("Plataforma", TYPES.VarChar, data.Plataforma);
    request.addParameter("Data_lancamento", TYPES.VarChar, data.Data_lancamento);
    connection.execSql(request);
    // connection.close();
  });
  connection.connect();
};

//...............//

exports.createLista = (data, callback) => {
    const connection = createConnection();
    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null);
      }
      const query = `INSERT INTO Lista (ID_Lista, ID_Jogo, Email_Interessado) VALUES (@ID_Lista, @ID_Jogo, @Email_Interessado)`;
      const request = new Request(query, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, { message: "Lista inserido com sucesso!" });
        }
      });
      request.addParameter("ID_Lista", TYPES.VarChar, data.ID_Lista);
      request.addParameter("ID_Jogo", TYPES.VarChar, data.ID_Jogo);
      request.addParameter("Email_interessado", TYPES.Int, data.Email_interessado);
      connection.execSql(request);
      connection.close();
    });
    connection.connect();
  };

  // Função para atualizar um user existente
  exports.updateJogos = (ID, data, callback) => {
    const connection = createConnection();
    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null);
      }
      const query = `UPDATE Jogos SET Nome_Do_Jogo = @Nome_Do_Jogo, Genero = @Genero, Plataforma = @Plataforma , Data_lancamento = @Data_lancamento WHERE ID = @ID`;
      const request = new Request(query, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, { message: `Jogo atualizado com sucesso!  ${ID}`});
        }
      });
      request.addParameter("ID", TYPES.VarChar, data.ID);
      request.addParameter("Nome_Do_Jogo", TYPES.VarChar, data.Nome_Do_Jogo);
      request.addParameter("Genero", TYPES.Int, data.Genero);
      request.addParameter("Plataforma", TYPES.VarChar, data.Plataforma);
      request.addParameter("Data_lancamento", TYPES.VarChar, data.Data_lancamento);
      connection.execSql(request);
    });
    connection.connect();
  };

  //......................//

  exports.updateLista = (ID_Jogo, data, callback) => {
    const connection = createConnection();
    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null);
      }
      const query = `UPDATE Lista_Desejos SET ID_Lista = @ID_Lista, Email_Interessado = @Email_Interessado, WHERE ID = @ID`;
      const request = new Request(query, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, { message: "Lista atualizada com sucesso!" });
        }
      });
      request.addParameter("ID_Lista", TYPES.VarChar, data.ID_Lista);
      request.addParameter("ID_Jogo", TYPES.VarChar, data.ID_Jogo);
      request.addParameter("Email_interessado", TYPES.Int, data.Email_interessado);
      connection.execSql(request);
    });
    connection.connect();
  };

  // Função para deletar um aluno existente
  exports.deleteJogos = (ID, callback) => {
    const connection = createConnection();
    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null);
      }
      const query = `DELETE FROM Jogos WHERE ID = ${ID}`;
      const request = new Request(query, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, { message: "Jogos deletado com sucesso!" });
        }
      });
      connection.execSql(request);
    });
    connection.connect();
  };

  //..............//

  exports.deleteLista = (ID_Jogo, callback) => {
    const connection = createConnection();
    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null);
      }
      const query = `DELETE FROM Lista_Desejos WHERE ID = ${ID_Jogo}`;
      const request = new Request(query, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, { message: "Jogo deletado com sucesso!" });
        }
      });
      connection.execSql(request);
    });
    connection.connect();
  };