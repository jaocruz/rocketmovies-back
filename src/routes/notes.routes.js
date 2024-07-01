const {Router} = require("express");

const notesController = require("../controllers/notesController");

const notesRoutes = Router();

const NotesController = new notesController();

notesRoutes.get("/", NotesController.index);
notesRoutes.post("/:user_id", NotesController.create);
notesRoutes.get("/:id", NotesController.show);
notesRoutes.delete("/:id", NotesController.delete);

module.exports = notesRoutes;