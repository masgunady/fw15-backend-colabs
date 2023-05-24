const articleRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")
const authMiddleware = require("../middlewares/auth.middleware")


const articleController = require("../controllers/articles.controller")

articleRouter.get("/manage", authMiddleware, articleController.getManageAllarticle)
articleRouter.get("/manage/:id", authMiddleware, articleController.getManageDetailarticle)
articleRouter.post("/manage", authMiddleware, uploadMiddleware("picture"), articleController.createManagearticle)
articleRouter.patch("/manage/:id", uploadMiddleware("picture"), articleController.updateManagearticle)


articleRouter.get("/", articleController.getAllarticle)
articleRouter.get("/:id", articleController.getarticle)

articleRouter.delete("/manage/:id", authMiddleware.apply, articleController.deleteManagearticle)

module.exports = articleRouter
