const {Router} = require("express");

const usersController = require("../controllers/usersController");

const usersRoutes = Router();

const UserController = new usersController();

usersRoutes.post("/", UserController.create);
usersRoutes.put("/:id", UserController.update);

module.exports = usersRoutes;