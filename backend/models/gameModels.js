//Model
const createConnection = require("../db");
const { Request, TYPES } = require("tedious");

// Buscar todos os Users
exports.getAllUsers = (callback) => {
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

// Função buscar user pelo Id
exports.getUsersById = (ID, callback) => {
  const connection = createConnection();
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null);
    }
    const query = `SELECT * FROM users1 WHERE id = @id`;
    const request = new Request(query, (err) => {
      if (err) return callback(err, null);
    });

    request.addParameter("id", TYPES.Int, id);

    let users = null;
    request.on("row", (columns) => {
      users = {
        id: columns[0].value,
        name: columns[1].value,
        age: columns[2].value,
        email: columns[3].value,
        contact: columns[4].value,
      };
    });

    request.on("requestCompleted", () => callback(null, users));
    connection.execSql(request);
  });
  connection.connect();
};

// Função buscar users pelo Nome
exports.getUsersByNome = (name, callback) => {
  const connection = createConnection();
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null);
    }
    const query = `SELECT * FROM users1 WHERE name = @name`;
    const request = new Request(query, (err) => {
      if (err) return callback(err, null);
    });

    request.addParameter("name", TYPES.VarChar, name);

    let users = null;
    request.on("row", (columns) => {
      users = {
        id: columns[0].value,
        name: columns[1].value,
        age: columns[2].value,
        email: columns[3].value,
        contact: columns[4].value,
      };
    });

    request.on("requestCompleted", () => callback(null, users));
    connection.execSql(request);
  });
  connection.connect();
};

// Função para criar um novo user
exports.createUsers = (data, callback) => {
  const connection = createConnection();
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null);
    }
    const query = `INSERT INTO users1 (name, age, email, contact) VALUES (@name, @age, @email, @contact)`;
    const request = new Request(query, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { message: "User inserido com sucesso!" });
      }
    });
    request.addParameter("name", TYPES.VarChar, data.name);
    request.addParameter("age", TYPES.Int, data.age);
    request.addParameter("email", TYPES.VarChar, data.email);
    request.addParameter("contact", TYPES.VarChar, data.contact);
    connection.execSql(request);
    // connection.close();
  });
  connection.connect();
};




  // Função para atualizar um user existente
  exports.updateUsers = (id, data, callback) => {
    const connection = createConnection();
    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null);
      }
      const query = `UPDATE users1 SET name = @name, age = @age, email = @email, contact = @contact WHERE id = @id`;
      const request = new Request(query, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, { message: "User atualizado com sucesso!" });
        }
      });
      request.addParameter("id", TYPES.Int, id);
      request.addParameter("name", TYPES.VarChar, data.name);
      request.addParameter("age", TYPES.Int, data.age);
      request.addParameter("email", TYPES.VarChar, data.email);
      request.addParameter("contact", TYPES.VarChar, data.contact);
      connection.execSql(request);
    });
    connection.connect();
  };






  // Função para deletar um aluno existente
  exports.deleteUsers = (id, callback) => {
    const connection = createConnection();
    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null);
      }
      const query = `DELETE FROM users1 WHERE id = ${id}`;
      const request = new Request(query, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, { message: "User deletado com sucesso!" });
        }
      });
      connection.execSql(request);
    });
    connection.connect();
  };