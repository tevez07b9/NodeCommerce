// init project
var express = require("express");
const MongoClient = require("mongodb").MongoClient;
var db;
var app = express();
// var bodyParser = require("body-parser");

// Add MONGODB_URL and DB_NAME environment variables
// In MongoDB Atlas (https://cloud.mongodb.com/), from Clusters > Connect > Connect Your Application, copy the URL in 'Connection String Only'
// Add it and the database name to the environment variables under "Secret Keys' from the server control panel to the left of the editor.
const client = new MongoClient(process.env.MONGODB_URL, {
  useNewUrlParser: true
});

// Using `public` for static files: http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// Initial set of users to populate the database with
var defaultUsers = ["Brad Pitt", "Ed Norton", "Denzel Washington"];
var users = defaultUsers.slice();

// Use bodyParser to parse application/x-www-form-urlencoded form data
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Connect to database and insert default users into users collection
client.connect((err) => {
  var dbUsers = [];
  console.log("Connected successfully to database");

  db = client.db(process.env.DB_NAME);

  // Removes any existing entries in the users collection
  db.collection("users").deleteMany({ name: { $exists: true } }, function (
    err,
    r
  ) {
    for (var i = 0; i < users.length; i++) {
      // loop through all default users
      dbUsers.push({ name: users[i] });
    }
    // add them to users collection
    db.collection("users").insertMany(dbUsers, function (err, r) {
      console.log("Inserted initial users");
    });
  });
});

// Send user data - used by client.js
app.get("/users", function (request, response) {
  db.collection("users")
    .find()
    .toArray(function (err, users) {
      // finds all entries in the users collection
      response.send(users); // sends users back to the page
    });
});

// Create a new entry in the users collection
app.post("/new", urlencodedParser, function (request, response) {
  db.collection("users").insert([{ name: request.body.user }], function (
    err,
    r
  ) {
    console.log("Added a user");
    response.redirect("/");
  });
});

// Removes users from users collection and re-populates with the default users
app.get("/reset", function (request, response) {
  var dbUsers = [];
  db.collection("users").deleteMany({ name: { $exists: true } }, function (
    err,
    r
  ) {
    for (var i = 0; i < users.length; i++) {
      // loop through all users
      dbUsers.push({ name: users[i] });
    }
    // add them to users collection
    db.collection("users").insertMany(dbUsers, function (err, r) {
      console.log("Inserted initial users");
      response.redirect("/");
    });
  });
});

// Serve the root url: http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile("/sandbox/views/index.html");
});

// Listen on port 8080
var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
