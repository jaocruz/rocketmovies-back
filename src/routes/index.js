const { Router } = require("express");

const usersRouter = require("./users.routes");
const moviesRouter = require("./movies.routes");
const markersRoutes = require("./markers.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRoutes);
routes.use("/movies", moviesRouter);
routes.use("/markers", markersRoutes);

module.exports = routes;