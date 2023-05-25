const likesRouter = require("express").Router()

const likesController = require ("../controllers/likes.controller")

// likesRouter.get("/", likesController.getAllTags)
// likesRouter.get("/:id", likesController.getOneTags)
likesRouter.post("/", likesController.createLikes)
// likesRouter.patch("/:id", likesController.updateTags)
likesRouter.delete("/:id", likesController.deleteLikes)

module.exports = likesRouter
