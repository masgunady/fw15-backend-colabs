const errorHandler = require ("../helpers/errorHandler.helper")
const tagsModels =  require("../models/tags.model")


exports.getAllTags = async (req, res) => {
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

        const data = await tagsModels.findAllTags(req.query.page, 
            req.query.limit, 
            req.query.search,
            req.query.sort,
            req.query.sortBy)
        return res.json({
            success: true,
            message: "List off all Tags",
            results: data
        })
  
    } 
    catch (error) {
        console.log(error)
        return errorHandler(res, error)
  
    }
}

exports.getOneTags = async (req, res)=>{
    try {
        if(isNaN(req.params.id) && parseInt(req.params.id) !== req.params.id){
            return res.status(400).json({
                success:false,
                message: "Parameter id must be number!"
            })
        }
        const data = await tagsModels.findOne(req.params.id)
        console.log(data)
        if(data){
            console.log(data)
            return res.json({
                success: true,
                message: "Detail Tags",
                results: data
            })
        }
        else{
            console.log(data)
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


exports.createTags = async (req, res) =>{
    try{
        if(!req?.body?.name){
            return res.status(404).json({
                succes:false,
                message:"Data cannot be empty!",
                results:""
            })
        }
    
        const tags = await tagsModels.insert(req.body)
        return res.json({
            succes:true,
            message:"Create Tags Succesfully",
            results: tags
        })
    }catch(err){
        return errorHandler(res, err)
    }
}


exports.updateTags = async (req,res) =>{
    try{
        if(!req.params.id || isNaN(req.params.id)){
            return res.status(404).json({
                succes:false,
                message:"Id cannot be empty!",
                results:""
            })    
        }
        const resultsUpdate = await tagsModels.update(req.params.id, req.body)
        if(resultsUpdate){
            return res.json({
                succes:true,
                message:"Update Tags Succesfully",
                results:resultsUpdate
            })
        }else{
            return res.status(404).json({
                succes:false,
                message: "Error: Data not found",
                results:""
            })
        }
    }catch(err){
        return errorHandler(res, err)
    }
}

exports.deleteTags = async (req, res)=>{
    try{
        const resultsCategories = await tagsModels.findOne(req.params.id)
        if(!resultsCategories){
            return res.status(404).json({
                succes:false,
                message:"Error: Data Tags not found",
                results:""
            })
        }
        await tagsModels.destroy(req.params.id)
        return res.json({
            succes:true,
            message:"Delete Tags Succesfully",
            results:""
        })
    }catch(err){
        return errorHandler(res, err)
    }
}
