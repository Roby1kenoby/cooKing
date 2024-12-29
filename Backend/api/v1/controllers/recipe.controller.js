import Recipe from '../../../models/v1/recipeSchema.js'
import * as RecipeService from '../services/recipe.service.js'

/* -------------- GET --------------*/

export const getSpecificRecipe = async function(req, res){
    const userId = req.loggedUser._id
    console.log('userId', userId)
    const recipeId = req.params.id

    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }
        // this function gets me the populated recipe
        const foundRecipe = await RecipeService.getSpecificRecipe(recipeId, userId)

        res.status(200).send(foundRecipe)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}



/* -------------- POST --------------*/

export const getPublicRecipes = async function(req, res){
    const data = req.body
    
    const searchParams = []
    
    // if ther's a searchString, i include it in my searchparams
    data.searchString && searchParams.push({title: {$regex: data.searchString ,$options: "i"}})
    
    // if ther's some tags, i include them in the search, but only if i've got the same number of
    // tags and they all match.
    if(data.tagsIds && data.tagsIds.length > 0){
        searchParams.push({tagsIds: {$all: data.tagsIds}})
        searchParams.push({$expr: { $eq: [ { $size: "$tagsIds" }, data.tagsIds.length ] }})
    }
    // including only public recipes
    searchParams.push({privateRecipe: false})
    
    try {
        
        const recipeListQuery = Recipe.find({$and: searchParams}).sort({title: 1})
                    
        const recipeList = await recipeListQuery
        
        res.send(recipeList)

    } catch (error) {
        res.status(500).send('Recipe not found')
    }
}

export const getPrivateRecipes = async function(req, res){
    const userId = req.loggedUser._id
    const data = req.body
    
    const searchParams = []
    
    // if ther's a searchString, i include it in my searchparams
    data.searchString && searchParams.push({title: {$regex: data.searchString ,$options: "i"}})
    
    // if ther's some tags, i include them in the search, but only if i've got the same number of
    // tags and they all match.
    if(data.tagsIds && data.tagsIds.length > 0){
        searchParams.push({tagsIds: {$all: data.tagsIds}})
        searchParams.push({$expr: { $eq: [ { $size: "$tagsIds" }, data.tagsIds.length ] }})
    }
    // including only private recipes of the specific user
    searchParams.push({privateRecipe: true})
    searchParams.push({userId: userId})
    
    try {
        
        const recipeListQuery = Recipe.find({$and: searchParams}).sort({title: 1})
                    
        const recipeList = await recipeListQuery
        
        res.send(recipeList)

    } catch (error) {
        res.status(500).send('Recipe not found')
    }
}

export const getAllRecipes = async function(req, res){
    const userId = req.loggedUser._id
    const data = req.body
    
    const searchParams = []
    
    // if ther's a searchString, i include it in my searchparams
    data.searchString && searchParams.push({title: {$regex: data.searchString ,$options: "i"}})
    
    // if ther's some tags, i include them in the search, but only if i've got the same number of
    // tags and they all match.
    if(data.tagsIds && data.tagsIds.length > 0){
        searchParams.push({tagsIds: {$all: data.tagsIds}})
        searchParams.push({$expr: { $eq: [ { $size: "$tagsIds" }, data.tagsIds.length ] }})
    }
    searchParams.push({$or: [{privateRecipe: false},{userId: userId}]})
    
    try {
        
        const recipeListQuery = Recipe.find({$and: searchParams}).sort({title: 1})
                    
        const recipeList = await recipeListQuery
        
        res.send(recipeList)

    } catch (error) {
        res.status(500).send('Recipe not found')
    }
}

export const createNewRecipeHeader = async function(req, res){
    const userId = req.loggedUser._id
    const data = req.body
    
    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const createdRecipe = await RecipeService.createRecipeHeader(data, userId)

        res.status(201).send(createdRecipe)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }

}

export const saveRecipe = async function(req, res){
    const userId = req.loggedUser._id
    const data = req.body

    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const savedRecipe = await RecipeService.saveRecipe(data, userId)
        res.status(201).send(savedRecipe)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}

/* -------------- PUT --------------*/

export const editRecipe = async function(req, res){
    const userId = req.loggedUser._id
    const recipeId = req.params.id
    const data = req.body
    console.log(data)

    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const updatedRecipe = await RecipeService.updateRecipe(data, recipeId, userId)
        
        res.status(202).send(updatedRecipe)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}

/* -------------- DELETE --------------*/

export const deleteRecipe = async function(req, res){
    const userId = req.loggedUser._id
    const recipeId = req.params.id

    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const recipeExists = await Recipe.exists({_id: recipeId})

        if(!recipeExists){
            const error = new Error('Recipe not found')
            error.status = 404
            throw error
        }

        const deletedRecipe = RecipeService.deleteRecipe(recipeId)
        res.status(202).send(deletedRecipe)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}
