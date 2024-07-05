const {Router} = require("express");

const moviesController = require("../controllers/moviesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const moviesRoutes = Router();

const MoviesController = new moviesController();

moviesRoutes.use(ensureAuthenticated);

moviesRoutes.post("", MoviesController.create);
moviesRoutes.delete("/:id", MoviesController.delete);
moviesRoutes.get("/:id", MoviesController.show);
moviesRoutes.get("/", MoviesController.index);

module.exports = moviesRoutes;