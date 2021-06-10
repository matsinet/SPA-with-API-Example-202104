require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");
const pizzas = require("./controllers/pizzas");
const orders = require("./controllers/orders");


const dbConnect = process.env.DB_CONNECT || "mongodb://localhost/pizzas";
mongoose.connect(dbConnect);
const app = express();
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', console.log.bind(console, 'Successfully opened connection to Mongo!'));
// These lines are always at the top

const myMiddleware = (request, response, next) => {
  // do something with request and/or response
  console.log(request.method, request.path);
  next(); // tell express to move to the next middleware function
};

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};


// Convert string JSON to JavaScript Object
app.use(express.json());
app.use(myMiddleware);
app.use(cors);

app.route("/")
  .get((request, response) => {
    response.send("HELLO WORLD");
  })
  .post((request, response) => {
    response.json(request.body);
  });

// app.route("/pizzas/:id").get((request, response) => {
//   // express adds a "params" Object to requests
//   const id = request.params.id;
//   // handle GET request for post with an id of "id"
//   response.status(418).json({
//     id: id
//   });
// });

app.use("/pizzas", pizzas);
app.use("/orders", orders);

app.route("/**").get((request, response) => {
  response.status(404).send("NOT FOUND");
});

// This line is always LAST
const PORT = process.env.PORT || 4040; 
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
