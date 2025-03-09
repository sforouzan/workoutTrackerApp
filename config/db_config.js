const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables from .env

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Log connection status
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to Postgres:", err.stack);
  } else {
    console.log("Connected to PostgreSQL");
  }
  release();
});

module.exports = pool;
