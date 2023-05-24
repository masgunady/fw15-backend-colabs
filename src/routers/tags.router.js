const tagsRouters = require("express").Router()

const tagsController = require ("../controllers/tags.controller")

tagsRouters.get("/", tagsController.getAllTags)
tagsRouters.get("/:id", tagsController.getOneTags)
tagsRouters.post("/", tagsController.createTags)
tagsRouters.patch("/:id", tagsController.updateTags)
tagsRouters.delete("/:id", tagsController.deleteTags)

module.exports = tagsRouters
