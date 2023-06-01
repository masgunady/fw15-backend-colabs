const errorHandler = require("../helpers/errorHandler.helper")
const commentsModel = require("../models/comments.model")
const profileModel = require("../models/profile.model")
const articleModel = require("../models/article.model")
const requestModel = require("../models/request.model")


exports.getCommentByArticle = async (req, res) => {
    try {
        const articleId =  req.params.id
        const comment = await commentsModel.findByArticle(articleId, req.query)
        if (!comment){
            throw Error("no_comment_written_here")
        }
        return res.json({
            success: true,
            message: "All Comments on the selected Article",
            results: comment
        })
    } catch (err) {
        return errorHandler(res, err)
    }

}


exports.createComments = async (req, res) => {
    try {

        const {id} = req.user
        const profile = await profileModel.findOneByUserId(id)
        const article = await articleModel.findOne(req.body.articleId)
        const dataComment = {
            ...req.body,
            userId: id
        }
        const message = "sent you a comment"
        const type = "comment_article"
        const status =  1
        const recipientId = article.authorId
        const articleId = article.id

        const recipientData = {
            articleId: articleId,
            senderId: id,
            message: message,
            typeRequest: type,
            statusRequest: status,
            recipientId: recipientId
        }
        
        const comment = await commentsModel.insert(dataComment)
        await requestModel.insertNotification(recipientData)
        const results = {
            userPicture: profile.picture,
            username: profile.fullName,
            comment: dataComment.content,
            createdAt: comment.createdAt
        }

        return res.json({
            success: true,
            message: "Create comments succesfully",
            results
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Can't write this comment, Same comment with before"
        })
    }
}
