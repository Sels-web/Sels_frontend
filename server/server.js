const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();

app.use("", express.static(path.join(__dirname, "public")));
app.use(cors());

app.get("/", (request, response) => {
  return response.sendFile("main.html", { root: "." });
});

app.post("/api/events/add", (request, response) => {
  console.log(request.body);
  response.send(request.body);
  // const { color, end, eventId, start, title, name } = request.body;
  //이 사이에 이제 DB랑 BACK에 넘겨준 response랑 비교해서 회원이 되있으면 redirect
  // return response.redirect("http://localhost:3000");
});

const port = "8080";
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
