const categoriesRouter = require("express").Router()
const uploadMiddleware = require("../../src/middlewares/upload.middlewares")


const categoriesController = require ("../controllers/category.controller")

categoriesRouter.get("/", categoriesController.getAllCategories)
categoriesRouter.get("/:id", categoriesController.getOneCategories)
categoriesRouter.post("/",uploadMiddleware("picture"),categoriesController.createCategories)
categoriesRouter.patch("/:id",uploadMiddleware("picture"),categoriesController.updateCategories)
categoriesRouter.delete("/:id", categoriesController.deleteCategories)

module.exports = categoriesRouter
