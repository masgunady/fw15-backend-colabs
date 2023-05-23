const router = require("express").Router()
// const authMiddleware = require("../middlewares/auth.middlewares")

router.get("/", (request, response) => {
    return response.json({
        success: true,
        message: "Backend is running well"
    })
})

router.use("/auth", require("./auth.router"))
// router.use("/admin", authMiddleware, require("./admin/admin.router"))
// router.use("/profile", authMiddleware, require("./profile.router"))
// router.use("/edit-profile", require("./editProfile.router"))
<<<<<<< HEAD
// router.use("/saved-article", require("./editProfile.router"))
=======
// router.use("/saved-article", require("./savedProfile.router"))

// router.use("/article", require("./article.router"))




>>>>>>> af0844f47c17cccc84d9dbaf8fffd1601317e794


router.use("*", (request, response) => {
    return response.status(404).json({
        success: false,
        message: "Resource not found"
    })
})

module.exports = router
