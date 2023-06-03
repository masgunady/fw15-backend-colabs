const requestRouter = require("express").Router()

const requestController = require ("../controllers/request.controller")

requestRouter.get("/", requestController.getAllRequestForAdmin)
requestRouter.get("/user", requestController.getAllRequestForUser)
requestRouter.post("/", requestController.insertRequestAuthor)
requestRouter.post("/acc-author", requestController.accRequestAuthor)
requestRouter.post("/acc-article", requestController.accRequestArticle)
requestRouter.post("/reject-article", requestController.rejectRequestArticle)
requestRouter.post("/reject-author", requestController.rejectRequestAuthor)

requestRouter.post("/acc-all-article", requestController.accAllRequestArticle)
requestRouter.post("/reject-all-article", requestController.rejectAllRequestArticle)

module.exports = requestRouter
