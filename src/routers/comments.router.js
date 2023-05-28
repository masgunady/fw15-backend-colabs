const commentsRouter = require("express").Router()
const authMiddleware = require("../middlewares/auth.middlewares")
const commentsController = require("../controllers/comments.controller")

commentsRouter.get("/", commentsController.getCommentByArticle)
commentsRouter.post("/", authMiddleware, commentsController.createComments)

module.exports= commentsRouter
