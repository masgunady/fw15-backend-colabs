
const bookmarksRouter = require("express").Router()
const authMiddleware = require("../middlewares/auth.middlewares")
const bookmarksController = require("../controllers/bookmarks.controller")

bookmarksRouter.get("/", authMiddleware, bookmarksController.getBookmarksByUser)
bookmarksRouter.get("/check/:id", authMiddleware, bookmarksController.checkBookmark)
bookmarksRouter.post("/manage", authMiddleware, bookmarksController.createBookmarkedArticle)

module.exports= bookmarksRouter
