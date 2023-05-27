const errorHandler = require("../helpers/errorHandler.helper")
const caterogyModels = require("../models/category.model")
const fileRemover = require("../helpers/fileRemover.helper")


exports.getAllCategories = async (req, res) => {
    try {
        const sortWhaitlist = ["name"]
        if (req.query.sort && !sortWhaitlist.includes(req.query.sort)) {
            return res.status(400).json({
                success: false,
                message: `Please choose one of the following sorting options: ${sortWhaitlist.join(",")}`
            })
        }

        const sortByWhaitlist = ["asc", "desc"]
        if (req.query.sortBy && !sortByWhaitlist.includes(req.query.sortBy.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: `Please choose one of the following sorting options:  ${sortByWhaitlist.join(",")}`
            })
        }

        const data = await caterogyModels.findAllCategories(req.query.page,
            req.query.limit,
            req.query.search,
            req.query.sort,
            req.query.sortBy)
        return res.json({
            success: true,
            message: "List off all categories",
            results: data
        })

    }
    catch (error) {
        return errorHandler(res, error)

    }
}

exports.getOneCategories = async (req, res) => {
    try {
        if (isNaN(req.params.id) && parseInt(req.params.id) !== req.params.id) {
            return res.status(400).json({
                success: false,
                message: "Parameter id must be number!"
            })
        }
        const data = await caterogyModels.findOne(req.params.id)
        
        if (data) {
   
            return res.json({
                success: true,
                message: "Detail categories",
                results: data
            })
        }
        else {
   
            return res.status(404).json({
                success: false,
                message: "Error : Data not found",
                results: data
            })
        }

    } catch (error) {
        
        return errorHandler(res, error)

    }
}

exports.createCategories = async (req, res) => {
    try {
        if (
            !req.file ||
            !req.body.name) {
            return res.status(404).json({
                succes: false,
                message: "Data cannot be empty!",
                results: ""
            })
        }
        // const { id } = req.user
        // console.log(id)
        // const user = await caterogyModels.findOneByUserId(id)
        
        const data = {
            ...req.body
        }
        if(req.file){
            // if (user.picture) {
            //     fileRemover({ filename: user.picture })
            // }
            data.picture = req.file.path
        }
        const categories = await caterogyModels.insert(data)
        return res.json({
            success: true,
            message: "Create categories success",
            results: categories
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}


exports.updateCategories = async (req, res) => {
    try {
        if (!req.params.id || isNaN(req.params.id)) {
            return res.status(404).json({
                succes: false,
                message: "Id cannot be empty!",
                results: ""
            })
        }
        const id = req.params.id
        const user = await caterogyModels.findOne(id)
        
        const data = {
            ...req.body
        }
        if(req.file){
            if(user.picture){
                fileRemover({filename: user.picture})
            }
            data.picture = req.file.path
        }
        const resultsUpdate = await caterogyModels.update(req.params.id, data)
        if (resultsUpdate) {
            return res.json({
                succes: true,
                message: "Update Categories Succesfully",
                results: resultsUpdate
            })
        } else {
            return res.status(404).json({
                succes: false,
                message: "Error: Data not found",
                results: ""
            })
        }
    } catch (err) {
        return errorHandler(res, err)
    }
}


exports.deleteCategories = async (req, res) => {
    try {
        const resultsCategories = await caterogyModels.findOne(req.params.id)
        if (!resultsCategories) {
            return res.status(404).json({
                succes: false,
                message: "Error: Data Categories not found",
                results: ""
            })
        }
        await caterogyModels.destroy(req.params.id)
        return res.json({
            succes: true,
            message: "Delete Categories Succesfully",
            results: ""
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
