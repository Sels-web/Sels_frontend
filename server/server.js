const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("./database")();

const connection = mysql.init();

mysql.db_open(connection);

app.use("", express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  return response.sendFile("main.html", { root: "." });
});

app.post("/api/events/add", (request, response) => {
  console.log(request.body);
  response.send(request.body);
  const { eventId, title, start, end, color } = request.body;
  const query =
    "INSERT INTO Schedule (eventId, title, start, end, color) VALUES";

  connection.query(
    query,
    (eventId, title, start, end, color),
    function (error, results, fields) {
      if (error) {
        console.log(error);
      }
      console.log(results);
    }
  );

  //이 사이에 이제 DB랑 BACK에 넘겨준 response랑 비교해서 회원이 되있으면 redirect
  // return response.redirect("http://localhost:3000");
});

app.get("/api/events", (request, response) => {});

const port = "8080";
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
