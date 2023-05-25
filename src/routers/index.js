const router = require("express").Router()
const authMiddleware = require("../middlewares/auth.middlewares")

router.get("/", (request, response) => {
    return response.json({
        success: true,
        message: "Backend is running well"
    })
})

router.use("/auth", require("./auth.router"))
router.use("/categories", require("./category.router"))
router.use("/tags", require("./tags.router"))
router.use("/comments", require("./comments.router"))
// router.use("/admin", authMiddleware, require("./admin/admin.router"))
router.use("/profile", authMiddleware, require("./profile.router"))
// router.use("/edit-profile", require("./editProfile.router"))

// router.use("/saved-article", require("./editProfile.router"))

// router.use("/saved-article", require("./savedProfile.router"))

router.use("/article", require("./article.router"))
// router.use("/category", require("./category.router"))
// router.use("/notifications", require("./notifications.router"))
// router.use("/write-article", require("./write-article.router"))








router.use("*", (request, response) => {
    return response.status(404).json({
        success: false,
        message: "Resource not found"
    })
})

module.exports = router
