const router = require("express").Router();
const { createNewNote, deleteNoteById } = require("../../lib/notes");
const fs = require("fs");
const path = require("path");

// get all notes
router.get("/notes", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../../db/db.json"),
    "utf8",
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        let { notes } = JSON.parse(data);
        res.json(notes);
      }
    }
  );
});

// save new note
router.post("/notes", (req, res) => {
  // getting the data
  data = fs.readFileSync(path.join(__dirname, "../../db/db.json"));
  let { notes } = JSON.parse(data);
  console.log(notes);
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
  const result = deleteNoteById(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

module.exports = router;
