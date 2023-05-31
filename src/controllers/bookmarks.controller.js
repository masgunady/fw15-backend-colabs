const errorHandler = require("../helpers/errorHandler.helper")
// const profileModel = require("../models/profile.model")
const bookmarksModel = require("../models/bookmarks.model")
const articleModel = require("../models/article.model")


exports.getBookmarksByUser = async (request, response) => {
    try {
        const {id} = request.user
        
        const bookmark = await bookmarksModel.findByUserId(id)

        if(!bookmark){
            throw Error("data_not_found")
        }

        return response.json({
            success: true,
            message: "list our bookmark",
            results: bookmark
        })

    } catch (err) {
        return errorHandler(response, err)
    }
}


exports.checkBookmark = async(req, res) => {
    try {
        const {id} = req.user
        const articleId = req.params.id

        const checkBookmarks = await bookmarksModel.findOneByUserIdAndArticleId(id, articleId)
        if(!checkBookmarks){
            return res.json({
                success: false,
                message: `bookmark event ${articleId} by for user ${id} not found`,
                results: false
            })
        }
        return res.json({
            success: true,
            message: `bookmark event ${articleId} by for user ${id} found`,
            results: true
        })
    

    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.createBookmarkedArticle = async (req, res) => {
    try {
        const {id} = req.user
        const data = {
            userId:id,
            articleId: req.body.articleId        }
        const articleId = data.articleId
        const checkArticle = await articleModel.findOne(articleId)
        if(!checkArticle){
            console.log("test")
            throw Error("data_not_found")
        }


        const checkDuplicate = await bookmarksModel.findOneByUserIdAndArticleId(id, articleId)
        if(checkDuplicate){
            const deleteBookmark = await bookmarksModel.deleteByUserIdAndArticleId(id, articleId)
            return res.json({
                success: true,
                message: "remove bookmarks success",
                results: deleteBookmark
            })
        }
        const bookmarks = await bookmarksModel.insert(data)
        if(!bookmarks){
            throw Error("create_bookmarks_failed")
        }

        return res.json({
            success: true,
            message: "add bookmarks success",
            results: bookmarks
        })
    } catch (err) {
        return errorHandler(res, err)
    }

}
