const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/usersdb',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);


//mongodb+srv://admin99:<password>@cluster0.hpowu.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://admin99:PopoAwadaaaa@cluster0.hpowu.mongodb.net/test

const username = "admin99";
const password = "PopoAwadaaaa";
const cluster = "Cluster0";
const dbname = "Usuario";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
  console.log("Connected successfully");
});


app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});


