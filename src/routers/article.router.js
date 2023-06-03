const articleRouter = require("express").Router()
// const validate = require("../middlewares/validator.middlewares")
const uploadMiddleware = require("../middlewares/upload.middlewares")
const authMiddleware = require("../middlewares/auth.middlewares")


const articleController = require("../controllers/article.controller")

articleRouter.get("/manage", authMiddleware, articleController.getManageAllArticle)
articleRouter.get("/manage/:id", authMiddleware, articleController.getManageDetailArticle)
articleRouter.post("/manage", authMiddleware, uploadMiddleware("picture"), articleController.createManageArticle)
articleRouter.patch("/manage/:id", uploadMiddleware("picture"), articleController.updateManageArticle)


articleRouter.get("/", articleController.getAllArticle)
articleRouter.get("/waiting-list", articleController.getAllArticlePending)
articleRouter.get("/by-user/:id", articleController.getAllArticleByUser)
articleRouter.get("/:id", articleController.getArticle)
articleRouter.post("/count-data-visitor", articleController.createCountVisitor)

articleRouter.delete("/manage/:id", authMiddleware.apply, articleController.deleteManageArticle)

module.exports = articleRouter
