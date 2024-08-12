const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./config/database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get All Flashcards
app.get("/api/flashcards", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM Flashcards");
  res.json(rows);
});

// Get Flashcard by ID
app.get("/api/flashcards/:id", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM Flashcards WHERE id = ?", [req.params.id]);
  res.json(rows[0]);
});

// Create New Flashcard
app.post("/api/flashcards", async (req, res) => {
  const { question, answer } = req.body;
  const [result] = await pool.query("INSERT INTO Flashcards (question, answer) VALUES (?, ?)", [question, answer]);
  const newFlashcard = {
    id: result.insertId,
    question,
    answer
  };
  res.json(newFlashcard);
});

// Update Flashcard
app.put("/api/flashcards/:id", async (req, res) => {
  const { question, answer } = req.body;
  await pool.query("UPDATE Flashcards SET question = ?, answer = ? WHERE id = ?", [question, answer, req.params.id]);
  res.json({ message: "Flashcard updated" });
});

// Delete Flashcard
app.delete("/api/flashcards/:id", async (req, res) => {
  await pool.query("DELETE FROM Flashcards WHERE id = ?", [req.params.id]);
  res.json({ message: "Flashcard deleted" });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
