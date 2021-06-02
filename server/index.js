const { request, response } = require("express");
const express = require("express");
const app = express();
// These lines are always at the top

const myMiddleware = (request, response, next) => {
  // do something with request and/or response
  console.log(request.method, request.path);
  next(); // tell express to move to the next middleware function
};

// Convert string JSON to JavaScript Object
app.use(express.json());
app.use(myMiddleware);

app.route("/")
  .get((request, response) => {
    response.send("HELLO WORLD");
  })
  .post((request, response) => {
    response.json(request.body);
  });

app.route("/pizzas/:id").get((request, response) => {
  // express adds a "params" Object to requests
  const id = request.params.id;
  // handle GET request for post with an id of "id"
  response.status(418).json({
    id: id
  });
});

app.route("/**").get((request, response) => {
  response.status(404).send("NOT FOUND");
});

// This line is always LAST
app.listen(4040, () => console.log("Listening on port 4040"));
