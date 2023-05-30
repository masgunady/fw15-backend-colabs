const errorHandler = require("../helpers/errorHandler.helper")
const profileModel = require("../models/profile.model")
const bookmarksModel = require("../models/bookmarks.model")


exports.getThisUserBookmarks = async (req, res) => {
    try {
<<<<<<< HEAD
        // return console.log(req.query)
        const {id} = req.user
        const bookmarked = await bookmarksModel.findByUser(id, req.query)
        console.log(bookmarked)
=======
>>>>>>> e8e6210d09fe1d1258e61bc8305569d1df509396
        
        // return console.log(req.query)
        const { id } = req.user
        const data = await bookmarksModel.findByUser(id,
            req.query.page,
            req.query.limit,
            req.query.search,
            req.query.sort,
            req.query.sortBy)

        return res.json({
            success: true,
            message: "All Bookmarked Article by this user",
            results: data
        })
    } catch (err) {
        return errorHandler(res, err)
    }

}
exports.getOtherUserBookmarks = async (req, res) => {
    try {
        // return console.log(req.query)
        const bookmarked = await bookmarksModel.findByUser(
            req.query.userId,
            req.query.page,
            req.query.limit,
            req.query.search,
            req.query.sort,
            req.query.sortBy)

        if (!bookmarked) {
            return res.json({
                success: false,
                message: "No Bookmarked in this Article"
            })
        }

        return res.json({
            success: true,
            message: "All Bookmarked Article by other user",
            results: bookmarked
        })
    } catch (err) {
        return errorHandler(res, err)
    }

}


exports.createBookmarkedArticle = async (req, res) => {
    try {

        const { id } = req.user
        const profile = await profileModel.findOneByUserId(id)

        const dataBookmarks = {
            ...req.body,
            userId: profile.id
        }
        console.log(dataBookmarks)
        const bookmark = await bookmarksModel.insertBookmarkedArticle(dataBookmarks)
        const results = {
            userId: dataBookmarks.userId,
            articleId: dataBookmarks.articleId,
            createdAt: bookmark.createdAt
        }

        return res.json({
            success: true,
            message: "Create bookmarks succesfully",
            results
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Create Bookmark failed"
        })
    }
}
