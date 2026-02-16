const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// ✅ Create connection pool (best practice)
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "testdb",
  connectionLimit: 10
});

// ================= INSERT =================
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const sql = "INSERT INTO Users (name, email) VALUES (?, ?)";

  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.log("Insert Error:", err);
      return res.status(500).json({ error: err.message });
    }

    console.log("Inserted:", result);
    res.json({ message: "User added", id: result.insertId });
  });
});
// GET /users → Get all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM Users", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// ================= UPDATE =================
app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;

  const sql = "UPDATE Users SET name=?, email=? WHERE id=?";

  db.query(sql, [name, email, id], (err, result) => {
    if (err) {
      console.log("Update Error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated:", result);
    res.json({ message: "User updated" });
  });
});

// ================= DELETE =================
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM Users WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Delete Error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Deleted:", result);
    res.json({ message: "User deleted" });
  });
});
// POST /buses → Add bus
app.post("/buses", (req, res) => {
  const { busNumber, totalSeats, availableSeats } = req.body;

  const sql =
    "INSERT INTO Buses (busNumber, totalSeats, availableSeats) VALUES (?, ?, ?)";

  db.query(sql, [busNumber, totalSeats, availableSeats], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Bus added!");
  });
});


// GET /buses/available/:seats
app.get("/buses/available/:seats", (req, res) => {
  const seats = req.params.seats;

  const sql = "SELECT * FROM Buses WHERE availableSeats > ?";

  db.query(sql, [seats], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});
app.listen(3000, () => console.log("Server running on port 3000"));
