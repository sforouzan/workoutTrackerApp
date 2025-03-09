const express = require("express");
const { Pool } = require("pg");
const app = express();

// Middleware
// ** necessary for esj and serving static files
app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(express.json());

// PostgreSQL connection using the Pool class from the pg module
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "myapp",
  password: "your_password", // IMPORTANT: Replace with your postgres password
  port: 5432,
});

// Logging the connection status for postgres
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to Postgres:", err.stack);
  } else {
    console.log("Connected to PostgreSQL");
  }
  release();
});

// Passing data to the index page using EJS
app.get("/", async (req, res) => {
  // Test data
  const testArr = [
    { name: "Vancouver" },
    { name: "Coquitlam" },
    { name: "Burnaby" },
  ];
  const tagline = "Favourite Cities test:";

  // Fetch messages from the database
  try {
    const result = await pool.query(
      "SELECT * FROM messages ORDER BY created_at DESC"
    );
    // Render the index page with the messages
    res.render("pages/index", {
      testArr: testArr,
      tagline: tagline,
      messages: result.rows,
    });
  } catch (err) {
    console.error("Error fetching messages:", err.stack);
    // Render the index page with an empty messages array
    res.render("pages/index", {
      testArr: testArr,
      tagline: tagline,
      messages: [],
    });
  }
});

// About page route using EJS
app.get("/about", function (req, res) {
  res.render("pages/about");
});

// POST route to save a message
app.post("/api/message", async (req, res) => {
  const { content } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO messages (content) VALUES ($1) RETURNING *",
      [content]
    );
    res.status(201).json({ message: "Message saved", data: result.rows[0] });
  } catch (err) {
    console.error("Database error:", err.stack);
    res.status(500).json({ error: "Failed to save message" });
  }
});

// Start the express server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
