const likesRouter = require("express").Router()

const likesController = require ("../controllers/likes.controller")
likesRouter.get("/check/:id", likesController.checkLike)
likesRouter.post("/", likesController.createLikes)
likesRouter.delete("/:id", likesController.deleteLikes)

module.exports = likesRouter
