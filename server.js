// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var todoList = ["Going to market", "Cooking", "Learning"];
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.render("index");
});

app.get("/todos", (request, response) => {
  response.render("todo-list/index", {
    todos: todoList
  });
});

app.get("/todos/search", (req, res) => {
  var q = req.query.q;
  var matchedList = todoList.filter(item => {
    return item.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("todo-list/index", {
    todos: matchedList
  });
});

// create
app.post("/todos/create", (req, res) => {
  todoList.push(req.body.todo);
  res.redirect("back");
});
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
