const articleModel = require("../models/article.model")
const categoryModel = require("../models/category.model")
const articleStatusModel = require("../models/statusArticle.model")
const profileModel = require("../models/profile.model")
const requestArticleModel = require("../models/request.model")
// const fileremover = require("../helpers/fileRemover.helper")
const erorrHandler = require("../helpers/errorHandler.helper")


exports.getAllArticle = async (request, response) => {
    try {
        const {rows: results, pageInfo} = await articleModel.findAll(request.query)
        // return console.log(request.query)
        return response.json({
            success: true,
            message: "List of all article",
            pageInfo,
            results
        })
    } catch (err) {
        return erorrHandler(response, err)
    }
}

exports.getAllArticlePending = async (request, response) => {
    try {
        const {rows: results, pageInfo} = await articleModel.findAllWait(request.query)
        // return console.log(request.query)
        return response.json({
            success: true,
            message: "List of all waiting list article",
            pageInfo,
            results
        })
    } catch (err) {
        return erorrHandler(response, err)
    }
}

exports.getAllArticleByUser = async (request, response) => {
    try {
        const id = request.params.id
        const data = await articleModel.findOneByUser(id, request.query)
        return response.json({
            success: true,
            message: "List of article",
            results: data
        })
    } catch (err) {
        return erorrHandler(response, err)
    }
}

exports.getArticle = async (request, response) => {
    try {
        const id = request.params.id
        const data = await articleModel.findOne(id)
        return response.json({
            success: true,
            message: "List of article",
            results: data
        })
    } catch (err) {
        return erorrHandler(response, err)
    }
}


exports.getManageAllArticle = async (request, response) => {
    try {
        const {rows: results, pageInfo} = await articleModel.findAllManageArticle(request.query)
        return response.json({
            success: true,
            message: "List of all Manage Article",
            pageInfo,
            results
        })
    } catch (err) {
        return erorrHandler(response, err)
    }
}

exports.getManageDetailArticle = async (request, response) => {
    try {
        const { id } = request.user
        const data = await articleModel.findDetailManageArticle(request.params.id, id)
        return response.json({
            success: true,
            message: "List of Detail article",
            results: data
        })
    } catch (err) {
        return erorrHandler(response, err)
    }
}

exports.createManageArticle = async (request, response) => {
    try {

        const {role} = request.user
        if(role === "standard"){
            throw Error("please_sign_in")
        }
        const {categoryId} = request.body
        const checkCategory = await categoryModel.findOne(categoryId)
        if(!checkCategory){
            throw Error("category_not_found")
        }
        
        
        const {id} = request.user
        const data = {
            ...request.body,
            createdBy: id,
            statusId:1
        }
        if (request.file) {
            // data.picture = request.file.filename
            data.picture = request.file.path
        }
        const dataArticle = await articleModel.createManageArticle(data)
        if (!dataArticle) {
            throw Error("failed_create_article")
        }
        const articleId = dataArticle.id
        const textMessage = "sent you request to publish article"
        const recipientRole = "superadmin"
        const dataRequest = {
            articleId: articleId,
            senderId: id,
            message: textMessage,
            typeRequest:"article",
            statusRequest:1,
            recipientRole: recipientRole
        }
        await requestArticleModel.insertRequestArticle(dataRequest)

        const status = await articleStatusModel.findOne(dataArticle.statusId)
        const userCreated = await profileModel.findOneByUserId(id)
        const category = await categoryModel.findOne(dataArticle.categoryId)
        
        // return console.log(status.status, userCreated.name, category.name)

        const results = {
            id:dataArticle.id,
            picture:dataArticle.picture,
            title: dataArticle.title,
            content: dataArticle.content,
            category: category.name,
            createdBy: userCreated.name,
            status: status.status,
            createdAt: dataArticle.createdAt,
            updatedAt: dataArticle.updatedAt
        }
        
        return response.json({
            success: true,
            message: "Create article Successfully!",
            results: results
        })
    } catch (err) {
        return erorrHandler(response, err)
    }
}

exports.updateManageArticle = async (request, response) => {
    try {
        const data = {
            ...request.body
        }

        if (request.file) {
            // data.picture = request.file.filename
            data.picture = request.file.path

        }
        const article = await articleModel.updateManageArticle(request.params.id, data)
        if (article) {
            return response.json({
                succes: true,
                message: "Update article succesfully",
                results: article
            })
        }
        throw Error("update_Article_failed")
    } catch (err) {
        // fileremover(request.file)
        // return erorrHandler(response, err)
        return erorrHandler(response, err)
    }
}

exports.deleteManageArticle = async (request, response) => {
    try {
        const { id } = request.user
        const data = await articleModel.destroyByIdAndUserId(request.params.id, id)
        if (!data) {
            return erorrHandler(response, undefined)
        }
        return response.json({
            success: true,
            message: "Delete article successfully",
            results: data
        })
    } catch (err) {
        return erorrHandler(response, err)
    }
}

exports.createCountVisitor = async (req, res) => {
    try {
        const createCount = await articleModel.insertCountVisitor(req.body)
        return res.json({
            success: true,
            message: "Create comments succesfully",
            results: createCount
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "FAIL"
        })
    }
}
