const fs = require("fs");
const path = require("path");

function findById(id, notes) {
  const result = notes.filter((note) => note.id === id);
  return result;
}

function createNewNote(body, notes) {
  const note = body;
  notes.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({ notes }, null, 2)
  );
  return note;
}

function deleteNoteById(id, notes) {
  notes = fs.readFile(
    "../db/db.json",
    "utf8",
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        let { notes } = JSON.parse(data);
        notes = notes.filter((note) => note.id !== id);
        fs.writeFile(
          path.join(__dirname, "../db/db.json"),
          JSON.stringify({ notes }, null, 2),
          function (err) {
            if (err) throw err;
            console.log("Saved!");
          }
        );
      }
    }
  );
  return 200;
}

module.exports = { findById, createNewNote, deleteNoteById };
