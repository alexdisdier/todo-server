const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

/////////////////////////
// DATABASE CONNECTION //
/////////////////////////

// BACKUP AND RESTORE SOURCE:
// https://www.digitalocean.com/community/tutorials/how-to-create-and-use-mongodb-backups-on-ubuntu-14-04
// the everything store
// We either connect through Heroku or localhost
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/todo-list`, {
  useNewUrlParser: true
});

////////////////////////
// MODEL DECLARATION //
////////////////////////
// Initialize the collections
// Mongoose will take into account these collections
require("./models/todo");

////////////////////////
// ROUTES DECLARATION //
////////////////////////

// HOMEPAGE
app.get("/", (req, res) => {
  res.send("homepage ok");
});

const todoRoutes = require("./routes/todo");

// Activate the routes
app.use(todoRoutes);

/////////////////////
// STARTING SERVER //
/////////////////////

// Manage pages not found
app.all("*", function(req, res) {
  res.status(400).send("Page not found");
});

// Choosing the ports to listen depending if we are in production using Heroku or in Development mode
app.listen(process.env.PORT || 3001, () => {
  console.log("Server started");
});
