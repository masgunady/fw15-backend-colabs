const categoriesRouter = require("express").Router()

const categoriesController = require ("../controllers/category.controller")

categoriesRouter.get("/", categoriesController.getAllCategories)
categoriesRouter.get("/:id", categoriesController.getOneCategories)
categoriesRouter.post("/", categoriesController.createCategories)
categoriesRouter.patch("/:id", categoriesController.updateCategories)
categoriesRouter.delete("/:id", categoriesController.deleteCategories)

module.exports = categoriesRouter
