const express = require("express");
const mysql = require("./database")();

const connection = mysql.init();

mysql.db_open(connection);

connection.query("SELECT * FROM  USERS", function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

const app = express();
const port = 8080;

app.get("/", (req, res) => res.send("Server Start"));

app.listen(port, () => console.log(`Server Start. Port : ${port}`));
