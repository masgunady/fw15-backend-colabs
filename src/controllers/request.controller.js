
const errorHandler = require("../helpers/errorHandler.helper")
const requestModel = require("../models/request.model")
const userModel = require("../models/user.model")
const articleModel = require("../models/article.model")


exports.getAllRequestForAdmin = async(req, res) => {
    try {
        const { role} = req.user
        if(role !== "superadmin"){
            throw Error("please_sign_in_to_admin_for_read_notif_admin")
        }
        const params = {...req.user, ...req.query}
        const requestArticle = await requestModel.findAll(params)
        return res.json({
            success: true,
            message: "list all request post article",
            results: requestArticle
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}
exports.getAllRequestForUser = async(req, res) => {
    try {
        const {id} = req.user
        if(!id){
            throw Error("please_sign_in_for_read_notif")
        }
        const params = {...req.user, ...req.query}
        const requestArticle = await requestModel.findAllNotifUser(params)
        return res.json({
            success: true,
            message: "list all request post article",
            results: requestArticle
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.insertRequestAuthor = async(req,res) => {
    try {
        const {id} = req.user
        const message = "sent you request to be an author"
        const type = "author"
        const status = 1
        const recipientRole = "superadmin"
        const data = {
            senderId:id,
            message:message,
            typeRequest: type,
            statusRequest:status,
            recipientId:null,
            recipientRole:recipientRole
        }
        const checkDuplicateRequest = await requestModel.checkDuplicate(data)
        if(checkDuplicateRequest){
            throw Error("request_author_is_being_processed")
        }
        const requestAuthor = await requestModel.insertRequestAuthor(data)
        return res.json({
            success:true,
            message: "success to request author",
            results: requestAuthor
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.accRequestArticle = async(req, res) => {
    try {
        const {id, role} = req.user
        if(role !== "superadmin"){
            throw Error("please_sign_in")
        }
        const {articleId, requestId} = req.body
        const accRequestArticle = await articleModel.accRequestArticle(articleId)
        // return console.log(accRequestArticle)
        await requestModel.changeStatusRequest(requestId)

        const message = "your article has been published"
        const type = "acc_article"
        const status =  1
        const recipientId = accRequestArticle.createdBy
        const article = accRequestArticle.id

        const recipientData = {
            articleId: article,
            senderId: id,
            message: message,
            typeRequest: type,
            statusRequest: status,
            recipientId: recipientId
        }
        await requestModel.insertRequestArticle(recipientData)

        return res.json({
            success: true,
            message: "request accepted",
            results: accRequestArticle
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.rejectRequestArticle = async(req, res) => {
    try {
        const {id, role} = req.user
        if(role !== "superadmin"){
            throw Error("please_sign_in")
        }
        const {articleId, requestId} = req.body
        const rejectRequestArticle = await articleModel.rejectRequestArticle(articleId)
        await requestModel.changeStatusRequest(requestId)

        const message = "your article has been rejected"
        const type = "reject_article"
        const status =  1
        const recipientId = rejectRequestArticle.createdBy
        const article = rejectRequestArticle.id

        const recipientData = {
            articleId:article,
            senderId: id,
            message: message,
            typeRequest: type,
            statusRequest: status,
            recipientId: recipientId
        }
        await requestModel.insertRequestArticle(recipientData)

        return res.json({
            success: true,
            message: "request rejected",
            results: rejectRequestArticle
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.accRequestAuthor = async(req, res) => {
    try {
        const {id, role} = req.user
        if(role !== "superadmin"){
            throw Error("please_sign_in")
        }
        const {senderId, requestId} = req.body

        const accRequestAuthor = await userModel.accRequestAuthor(senderId)
        await requestModel.changeStatusRequest(requestId)

        const message = "accept you to be the author"
        const type = "acc_author"
        const status =  1

        const recipientData = {
            senderId: id,
            message: message,
            typeRequest: type,
            statusRequest: status,
            recipientId: senderId
        }
        await requestModel.insertRequestAuthor(recipientData)

        const results = {
            id: accRequestAuthor.id,
            email: accRequestAuthor.email,
            roleId: accRequestAuthor.roleId,
        }

        return res.json({
            success: true,
            message: "request accepted",
            results
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.rejectRequestAuthor = async(req, res) => {
    try {
        const {id, role} = req.user
        if(role !== "superadmin"){
            throw Error("please_sign_in")
        }
        const {senderId, requestId} = req.body
        const rejectRequestAuthor = await userModel.rejectRequestAuthor(senderId)
        await requestModel.changeStatusRequest(requestId)

        const message = "reject you to become an author"
        const type = "acc_author"
        const status =  1

        const recipientData = {
            senderId: id,
            message: message,
            typeRequest: type,
            statusRequest: status,
            recipientId: senderId
        }
        await requestModel.insertRequestAuthor(recipientData)
        const results = {
            id: rejectRequestAuthor.id,
            email: rejectRequestAuthor.email,
            roleId: rejectRequestAuthor.roleId
        }
        return res.json({
            success: true,
            message: "request rejected",
            results
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}
