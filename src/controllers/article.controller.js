const articleModel = require("../models/article.model")
const fileremover = require("../helpers/fileRemover.helper")
const erorrHandler = require("../helpers/errorHandler.helper")


exports.getAllArticle = async (request, response) => {
    try {
        const {rows: results, pageInfo} = await articleModel.findAll(request.query)
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
        const { id } = request.user
        console.log(id)
        const data = await articleModel.findAllManageArticle(id)
        return response.json({
            success: true,
            message: "List of all Manage Article",
            results: data
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
        const {id} = request.user
        const data = {
            ...request.body,
            createdBy: id
        }
        if (request.file) {
            data.picture = request.file.filename
        }
        console.log(data.picture)
        const dataArticle = await articleModel.createManageArticle(data)
        if (!data) {
            throw Error("failed_create_article")
        }
        return response.json({
            success: true,
            message: "Create article Successfully!",
            results: dataArticle
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
            data.picture = request.file.filename
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
        fileremover(request.file)
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
