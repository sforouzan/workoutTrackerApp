const express = require("express");
const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(express.json());

// Routes
const indexRoute = require("./routes/index");
const aboutRoute = require("./routes/about");
const apiRoute = require("./routes/api");
const workoutLogRoute = require("./routes/workout-log");

app.get("/", indexRoute);
app.get("/about", aboutRoute);
app.post("/api/message", apiRoute);
app.get("/workout-log", workoutLogRoute);

// Start the server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
