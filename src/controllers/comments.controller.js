const errorHandler = require("../helpers/errorHandler.helper")
const commentsModel = require("../models/comments.model")
const profileModel = require("../models/profile.model")


exports.getCommentByArticle = async (req, res) => {
    try {
        // return console.log(req.query)
        // console.log(req.query)
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
        
        const dataComment = {
            ...req.body,
            userId: id
        }
        
        await commentsModel.insert(dataComment)
        const results = {
            userPicture: profile.picture,
            username: profile.fullName,
            comment: dataComment.content
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
