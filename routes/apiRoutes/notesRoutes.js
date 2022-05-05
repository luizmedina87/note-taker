const router = require("express").Router();
const { findById, createNewNote, deleteNoteById } = require("../../lib/notes");
let { notes } = require("../../db/db");


// get all notes
router.get("/notes", (req, res) => {
  const result = notes;
  res.json(result);
});

// filter notes by their id
router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// save new note
router.post("/notes", (req, res) => {
  // creating and id that is equal to the last id used plus one
  let lastInt = 0;
  if (notes.length) {
    lastInt = parseInt(notes[notes.length - 1].id);
  } else {
    lastInt = 0;
  }
  const newId = (lastInt + 1).toString();
  req.body.id = newId;
  // saving
  const note = createNewNote(req.body, notes);
  res.json(note);
});

// delete note
router.delete("/notes/:id", (req, res) => {
  const result = deleteNoteById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

module.exports = router;
