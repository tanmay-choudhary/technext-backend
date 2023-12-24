const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables from a .env file

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // default PostgreSQL port
  ssl: {
    rejectUnauthorized: false, // Set to true to verify SSL certificate
  },
});

pool.on("error", (err) => {
  console.error("Error occurred during PostgreSQL connection:", err);
});

// Log database connection status on application startup
pool
  .connect()
  .then(() => {
    console.log("Database pool is ready and connected.");
  })
  .catch((err) => {
    console.error("Error connecting to the database!");
  });

exports.connection = pool;
