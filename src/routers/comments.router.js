const commentsRouter = require("express").Router()

const commentsController = require("../controllers/comments.controller")

commentsRouter.post("/", commentsController.createComments)
commentsRouter.get("/", commentsController.getAllComments)
commentsRouter.get("/:id", commentsController.getOneComments)
commentsRouter.delete("/:id", commentsController.deleteComments)

module.exports= commentsRouter
