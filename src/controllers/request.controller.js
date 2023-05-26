
const errorHandler = require("../helpers/errorHandler.helper")
const requestModel = require("../models/request.model")
const userModel = require("../models/user.model")
const articleModel = require("../models/article.model")


exports.getAllRequestArticle = async(req, res) => {
    try {
        const {role} = req.user
        console.log(req.user)
        if(role !== "superadmin"){
            throw Error("please_sign_in")
        }
        const requestArticle = await requestModel.findAll(req.query)
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
        const message = "request to be an author"
        const type = "author"
        const status = 1

        const data = {
            userId:id,
            message:message,
            typeRequest: type,
            statusRequest:status
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
        const {role} = req.user
        console.log(req.user)
        if(role !== "superadmin"){
            throw Error("please_sign_in")
        }
        const {articleId, requestId} = req.body
        const accRequestArticle = await articleModel.accRequestArticle(articleId)
        await requestModel.changeStatusRequest(requestId)
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
        const {role} = req.user
        console.log(req.user)
        if(role !== "superadmin"){
            throw Error("please_sign_in")
        }
        const {articleId, requestId} = req.body
        const rejectRequestArticle = await articleModel.rejectRequestArticle(articleId)
        await requestModel.changeStatusRequest(requestId)
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
        const {role} = req.user
        console.log(req.user)
        if(role !== "superadmin"){
            throw Error("please_sign_in")
        }
        const {userId, requestId} = req.body
        const accRequestAuthor = await userModel.accRequestAuthor(userId)
        await requestModel.changeStatusRequest(requestId)
        return res.json({
            success: true,
            message: "request accepted",
            results: accRequestAuthor
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.rejectRequestAuthor = async(req, res) => {
    try {
        const {role} = req.user
        console.log(req.user)
        if(role !== "superadmin"){
            throw Error("please_sign_in")
        }
        const {userId, requestId} = req.body
        const rejectRequestAuthor = await userModel.rejectRequestAuthor(userId)
        await requestModel.changeStatusRequest(requestId)
        return res.json({
            success: true,
            message: "request accepted",
            results: rejectRequestAuthor
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}
