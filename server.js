const express = require("express");
const mysql = require("mysql2");

const app = express();

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "testdb"
});

// Connect to DB
db.connect(err => {
  if (err) {
    console.error("Connection failed:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

// Simple route
app.get("/", (req, res) => {
  res.send("MySQL Connected!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
