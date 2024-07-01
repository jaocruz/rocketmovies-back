const {Router} = require("express");

const tagsController = require("../controllers/tagsController");

const tagsRoutes = Router();

const TagsController = new tagsController();

tagsRoutes.get("/:user_id", TagsController.index);

module.exports = tagsRoutes;