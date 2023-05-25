const errorHandler = require("../helpers/errorHandler.helper")
const likesModel = require("../models/likes.model")

exports.createLikes = async (req, res) => {
    try{
        const {id} = req.user
        const data ={
            ...req.body
        } 
        const likes = await likesModel.insertByUser(data, id)
        return res.json({
            success: true,
            message: "Like an Article Success",
            return: likes
        }) 
    }catch(err){
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
