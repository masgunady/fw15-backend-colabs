const requestRouter = require("express").Router()

const requestController = require ("../controllers/request.controller")

requestRouter.get("/", requestController.getAllRequestArticle)
requestRouter.post("/", requestController.insertRequestAuthor)
requestRouter.post("/acc-author", requestController.accRequestAuthor)
requestRouter.post("/acc-article", requestController.accRequestArticle)
requestRouter.post("/reject-article", requestController.rejectRequestArticle)
requestRouter.post("/reject-author", requestController.rejectRequestAuthor)
// requestRouter.delete("/:id", requestController.deleteLikes)

module.exports = requestRouter
