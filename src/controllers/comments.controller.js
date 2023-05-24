const errorHandler = require("../helpers/errorHandler.helper")
const commentsModel = require("../models/comments.model")

exports.getAllComments = async (req, res) => {
    try { 
        const sortWhaitlist = ["name"]
        if(req.query.sort && !sortWhaitlist.includes(req.query.sort)){
            return res.status(400).json({
                success: false,
                message:`Please choose one of the following sorting options: ${sortWhaitlist.join(",")}`
            })
        }

        const sortByWhaitlist = ["asc", "desc"]
        if(req.query.sortBy && !sortByWhaitlist.includes(req.query.sortBy.toLowerCase())){
            return res.status(400).json({
                success: false,
                message:`Please choose one of the following sorting options:  ${sortByWhaitlist.join(",")}`
            })
        }

        const data = await commentsModel.findAllComments(req.query.page, 
            req.query.limit, 
            req.query.search,
            req.query.sort,
            req.query.sortBy)
        return res.json({
            success: true,
            message: "List off all Comments",
            results: data
        })
  
    } 
    catch (error) {
        console.log(error)
        return errorHandler(res, error)
  
    }
}

exports.getOneComments = async (req, res)=>{
    try {
        if(isNaN(req.params.id) && parseInt(req.params.id) !== req.params.id){
            return res.status(400).json({
                success:false,
                message: "Parameter id must be number!"
            })
        }
        const data = await commentsModel.findOne(req.params.id)
        if(data){
            console.log(data)
            return res.json({
                success: true,
                message: "Detail Comments",
                results: data
            })
        }
        else{
            return res.status(404).json({
                success: false,
                message: "Error : Data not found",
                results: data
            })
        }
  
    } catch (error) {
        console.log(error)
        return errorHandler(res, error)
  
    }
}



exports.createComments = async (req, res) => {
    try {
        if (!req.body.name ||
            !req.body.email ||
            (!req.body.articleId || isNaN(req.body.articleId))) {
            return res.status(404).json({
                success:false,
                message:"Error: Data cannot be empty",
                results:""
            })
        }
        const data = {
            ...req.body
        }
        const comments = await commentsModel.insert(data)
        return res.json({
            success: true,
            message: "Creat comments succesfully",
            results: comments
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}


exports.deleteComments = async (req, res)=>{
    try{
        if(isNaN(req.params.id) && parseInt(req.params.id) !== req.params.id){
            return res.status(400).json({
                success:false,
                message: "Parameter id must be number!"
            })
        }
        const resultsCategories = await commentsModel.findOne(req.params.id)
        if(!resultsCategories){
            return res.status(404).json({
                succes:false,
                message:"Error: Data comments not found",
                results:""
            })
        }
        await commentsModel.destroy(req.params.id)
        return res.json({
            succes:true,
            message:"Delete Comments Succesfully",
            results:""
        })
    }catch(err){
        return errorHandler(res, err)
    }
}
