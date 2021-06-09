const mongoose = require("mongoose");

// Contract of the data
const pizzaSchema = new mongoose.Schema({
  crust: {type: String, default: "thin"},
  cheese: String,
  sauce: String,
  toppings: [String]
});

// Convert Schema a Model with CRUD operators
const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = {
  model: Pizza,
  schema: pizzaSchema
};
