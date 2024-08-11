// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const Flashcard = require("./models/Flashcard.model");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Sync Database
sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

// Get All Flashcards
app.get("/api/flashcards", async (req, res) => {
  const flashcards = await Flashcard.findAll();
  res.json(flashcards);
});

// Get Flashcard by ID
app.get("/api/flashcards/:id", async (req, res) => {
  const flashcard = await Flashcard.findByPk(req.params.id);
  res.json(flashcard);
});

// Create New Flashcard
app.post("/api/flashcards", async (req, res) => {
  const { question, answer } = req.body;
  const newFlashcard = await Flashcard.create({ question, answer });
  res.json(newFlashcard);
});

// Update Flashcard
app.put("/api/flashcards/:id", async (req, res) => {
  const { question, answer } = req.body;
  await Flashcard.update(
    { question, answer },
    { where: { id: req.params.id } }
  );
  res.json({ message: "Flashcard updated" });
});

// Delete Flashcard
app.delete("/api/flashcards/:id", async (req, res) => {
  await Flashcard.destroy({ where: { id: req.params.id } });
  res.json({ message: "Flashcard deleted" });
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
