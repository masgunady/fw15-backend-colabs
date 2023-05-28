const commentsRouter = require("express").Router()
const authMiddleware = require("../middlewares/auth.middlewares")
const commentsController = require("../controllers/comments.controller")

commentsRouter.get("/", commentsController.getAllComments)
commentsRouter.get("/:articleId", commentsController.getCommentByArticle)
commentsRouter.get("/:id", commentsController.getOneComments)
commentsRouter.post("/", authMiddleware, commentsController.createComments)
commentsRouter.delete("/:id", commentsController.deleteComments)

module.exports= commentsRouter
