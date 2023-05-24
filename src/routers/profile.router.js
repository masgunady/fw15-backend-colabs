const profileRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middlewares")
// const authMiddleware = require("../middlewares/auth.middleware")
const profileController = require("../controllers/profile.controller")

profileRouter.get("/", profileController.getProfile)
profileRouter.patch("/", uploadMiddleware("picture"), profileController.updateProfile)

module.exports = profileRouter

