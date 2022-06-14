var mysql = require("mysql");
var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3309;

var getConection = require("./getConection");
var conection = getConection(mysql);

conection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.post("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/showTables", function (req, res) {
  conection.query("SHOW TABLES", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/crearUsuario", function (req, res) {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const email = req.body.email;
  const contra = req.body.contra;
  const day = req.body.day;
  const month = req.body.month;
  const year = req.body.year;
  const query =
    "INSERT INTO clientes (nombre, apellido, email, contra, day, month, year) VALUES ('" +
    nombre +
    "', '" +
    apellido +
    "', '" +
    email +
    "', '" +
    contra +
    "', '" +
    day +
    "', '" +
    month +
    "', '" +
    year +
    "')";
  conection.query(query, function (err, result) {
    if (err) {
      res.send(false);
      throw err;
    } else {
      res.send(true);
    }
  });
});

app.post("/getUsuarios", function (req, res) {
  conection.query("SELECT * FROM clientes", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/getusuario", function (req, res) {
  const email = req.body.email;
  const contra = req.body.contra;
  const query =
    "SELECT * FROM clientes WHERE email = '" +
    email +
    "' AND contra = '" +
    contra +
    "'";
  conection.query(query, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/crearReceta", function (req, res) {
  const idCliente = req.body.idCliente;
  const texto = req.body.texto;
  const file = req.body?.file ?? null;
  let query = ""
  if (file) {
    query =
    "INSERT INTO recetas (idCliente, texto, file) VALUES ('" +
    idCliente +
    "', '" +
    texto +
    "', '" +
    file +
    "')";
  }
  else {
    query =
    "INSERT INTO recetas (idCliente, texto) VALUES ('" +
    idCliente +
    "', '" +
    texto +
    "')";
  }
  conection.query(query, function (err, result) {
    if (err) {
      res.send(false);
      throw err;
    } else {
      res.send(true);
    }
  });
});

app.post("/agregarIngrediente", function (req, res) {
  const idReceta = req.body.idReceta;
  const ingrediente = req.body.ingrediente;
  const query =
    "INSERT INTO ingredientes (idReceta, ingrediente) VALUES ('" +
    idReceta +
    "', '" +
    ingrediente +
    "')";
  conection.query(query, function (err, result) {
    if (err) {
      res.send(false);
      throw err;
    } else {
      res.send(true);
    }
  });
});

app.post("/getRecetas", function (req, res) {
  conection.query("SELECT * FROM recetas ORDER BY time DESC", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/getIngredientes", function (req, res) {
  conection.query("SELECT * FROM ingredientes", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/getRecetasIngrediente", function (req, res) {
  const ingrediente = req.body.ingrediente;
  const query =
    'SELECT * FROM recetas WHERE idReceta IN (SELECT idReceta FROM ingredientes WHERE ingrediente LIKE "' +
    ingrediente +
    '") ORDER BY time DESC;';
  conection.query(query, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/seguir", function (req, res) {
  const idCliente = req.body.idCliente;
  const idFollowed = req.body.idFollowed;
  const query =
    "INSERT INTO follows (idFollower, idFollowed) VALUES ('" +
    idCliente +
    "', '" +
    idFollowed +
    "')";
  conection.query(query, function (err, result) {
    if (err) {
      res.send(false);
      throw err;
    } else {
      res.send(true);
    }
  });
});

app.post("/getFollows", function (req, res) {
  conection.query("SELECT * FROM follows", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/getFollowsCliente", function (req, res) {
  const idCliente = req.body.idCliente;
  const query = 'SELECT * FROM follows WHERE idFollower = "' + idCliente + '"';
  conection.query(query, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/getRecetas/2", function (req, res) {
  console.log(req)
  console.log(req.query)
  const idCliente = req.body.idCliente;
  const ingrediente = req.body.ingrediente;
  const query =
    'SELECT * FROM recetas WHERE idReceta IN (SELECT idReceta FROM ingredientes WHERE ingrediente LIKE "' +
    ingrediente +
    '") AND idCliente IN (SELECT idFollowed FROM follows WHERE idFollower = ' +
    idCliente +
    ") ORDER BY time DESC;";
  conection.query(query, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

