const errorHandler = require("../helpers/errorHandler.helper")
const likesModel = require("../models/likes.model")
const articleModel = require("../models/article.model")
const requestModel = require("../models/request.model")

exports.createLikes = async (req, res) => {
    try{
        const {id} = req.user
        const data ={
            ...req.body
        }
        const checkArticle = await articleModel.findOne(req.body.articleId)
        const checkMaxLikes = await likesModel.findByUserIdAndArticleId(id, req.body.articleId)
        if(checkMaxLikes.length >= 5){
            throw Error("maximum_like")
        }
        const likes = await likesModel.insertByUser(data, id)

        const message = " just liked your post"
        const type = "like_article"
        const status =  1
        const recipientId = checkArticle.authorId
        const article = checkArticle.id

        const recipientData = {
            articleId: article,
            senderId: id,
            message: message,
            typeRequest: type,
            statusRequest: status,
            recipientId: recipientId
        }
        await requestModel.insertNotification(recipientData)
        return res.json({
            success: true,
            message: "Like an Article Success",
            return: likes
        }) 
    }catch(err){
        return errorHandler(res, err)
    }
}

exports.checkLike = async(req, res) => {
    try {
        const {id} = req.user
        const articleId = req.params.id

        const checkLike = await likesModel.findOneByUserIdAndArticleId(id, articleId)
        if(!checkLike){
            return res.json({
                success: false,
                message: `like event ${articleId} by for user ${id} not found`,
                results: false
            })
        }
        return res.json({
            success: true,
            message: `like event ${articleId} by for user ${id} found`,
            results: true
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.deleteLikes = async (req, res) => {
    try{
        const {id} = req.user
        const data = {
            ...req.params
        }
        const likesId = parseInt(data.id)
        const deleteLikes = await likesModel.destroyArticleByUser(id, likesId)
        if(!deleteLikes){
            throw Error("delete_likes_failed")
        }
        

    }catch(err){
        return errorHandler(res, err)
    }
}
