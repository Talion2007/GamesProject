//Model
const createConnection = require("../db/db");
const { Request, TYPES } = require("tedious");

// Buscar todos os jogos
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
        Plataforma: columns[3].value,
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

//Buscar pelo Genero
exports.getJogosByGenero = (genero, callback) => {
  const connection = createConnection();

  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Handle connection error
    }

    const query = `SELECT * FROM Jogos WHERE Genero = @genero`;
    const request = new Request(query, (err) => {
      if (err) {
        return callback(err, null); // Handle query execution error
      }
    });

    request.addParameter("genero", TYPES.NVarChar, genero); // Use NVarChar for string types

    const results = []; // Array to store results
    request.on("row", (columns) => {
      results.push({
        ID: columns[0].value,
        Nome_Do_Jogo: columns[1].value,
        Genero: columns[2].value,
        Plataforma: columns[3].value,
        Data_lancamento: columns[4].value,
      });
    });

    request.on("requestCompleted", () => {
      callback(null, results); // Call callback with results after all rows are processed
    });

    connection.execSql(request);
  });

  connection.connect(); // Semicolon added here
};

//Buscar por Plataforma
exports.getJogosByPlataforma = (plataforma, callback) => {
  const connection = createConnection();

  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Handle connection error
    }

    const query = `SELECT * FROM Jogos WHERE Plataforma = @plataforma`;
    const request = new Request(query, (err) => {
      if (err) {
        return callback(err, null); // Handle query execution error
      }
    });

    request.addParameter("plataforma", TYPES.NVarChar, plataforma); // Use NVarChar for string types

    const results = []; // Array to store results
    request.on("row", (columns) => {
      results.push({
        ID: columns[0].value,
        Nome_Do_Jogo: columns[1].value,
        Genero: columns[2].value,
        Plataforma: columns[3].value,
        Data_lancamento: columns[4].value,
      });
    });

    request.on("requestCompleted", () => {
      callback(null, results); // Call callback with results after all rows are processed
    });

    connection.execSql(request);
  });

  connection.connect(); // Semicolon added here
};

//Incluir um novo jogo
exports.addJogos = (data, callback) => {
  const connection = createConnection();

  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Handle connection error
    }

    const query = `INSERT INTO Jogos (Nome_Do_Jogo, Genero, Plataforma, Data_lancamento) VALUES (@Nome_Do_Jogo, @Genero, @Plataforma, @Data_lancamento)`;
    const request = new Request(query, (err) => {
      if (err) {
        callback(err, null); // Handle query execution error
      } else {
        callback(null, { message: "Jogo inserido com sucesso!" }); // Success message
      }
    });

    request.addParameter("Nome_Do_Jogo", TYPES.NVarChar, data.Nome_Do_Jogo);
    request.addParameter("Genero", TYPES.NVarChar, data.Genero);
    request.addParameter("Plataforma", TYPES.NVarChar, data.Plataforma);
    request.addParameter("Data_lancamento", TYPES.Date, data.Data_lancamento);

    connection.execSql(request, (err) => {
      // Handle additional errors during execution
      if (err) {
        callback(err, null);
      } else {
        // Close the connection after successful execution
        connection.close();
      }
    });
  });

  connection.connect();
};

//Atualizar jogos
exports.updateJogos = (id, data, callback) => {
  const connection = createConnection();
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null);
    }
    const query = `UPDATE Jogos SET  Nome_Do_Jogo = '@Nome_Do_Jogo ' , Genero ='@Genero',Plataforma ='@Plataforma' , Data_lancamento ='@Data_lancamento'
WHERE ID = @id;`;
    const request = new Request(query, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { message: "Lista atualizada com sucesso!" });
      }
    });
    request.addParameter("id", TYPES.VarChar, id);
    request.addParameter("Nome_Do_Jogo", TYPES.NVarChar, data.Nome_Do_Jogo);
    request.addParameter("Genero", TYPES.VarChar, data.Genero);
    request.addParameter("Plataforma", TYPES.NVarChar, data.Plataforma);
    request.addParameter("Data_lancamento", TYPES.Date, data.Data_lancamento);

    connection.execSql(request);
  });
  connection.connect();
};

//Deletar um jogo
exports.deleteJogos = (id, callback) => {
  const connection = createConnection();
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null);
    }
    const query = `DELETE FROM Jogos WHERE ID = ${id}`;
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





//Lista
exports.getAllDesejos = (callback) => {
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
        ID_Lista: columns[0].value,
        ID_Jogo: columns[1].value,
        Email_interessado: columns[2].value,
      });
    });

    request.on("requestCompleted", () => {
      callback(null, result);
    });
    connection.execSql(request);
  });
  connection.connect();
};
