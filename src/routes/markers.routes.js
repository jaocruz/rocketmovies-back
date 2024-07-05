const {Router} = require("express");

const markersController = require("../controllers/markersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const markersRoutes = Router();

const MarkersController = new markersController();

markersRoutes.get("/", ensureAuthenticated, MarkersController.index);

module.exports = markersRoutes;