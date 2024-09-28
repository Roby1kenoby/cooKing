import User from '../models/userSchema.js'
import Recipe from '../models/recipeSchema.js'
import Ingredient from '../models/ingredientSchema.js'
import Tag from '../models/tagSchema.js'

import bcrypt from 'bcrypt'

/* -------------- GET --------------*/
export const getAllUsers = async function(req,res){
    try {
        const users = await User.find({})
        if(!users){
            const error = new Error('Cannot find users')
            error.status = 404
            throw error
        }
        res.status(200).send(users)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}

export const getSpecificUser = async function(req,res){
    const userId = req.params.id
    try {
        const foundUser = await User.findById(userId)
        if(!foundUser){
            const error = new Error('Cannot find user')
            error.status = 404
            throw error
        }

        res.status(200).send(foundUser)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}

export const getSpecificUserRecipes = async function(req,res){
    const userId = req.params.id

    try {
        const foundUser = await User.findById(userId)
        if(!foundUser){
            const error = new Error('Cannot find user')
            error.status = 404
            throw error
        }

        const userRecipes = await Recipe.find({$and: [{userId: userId},{privateRecipe:false}]})

        if(!userRecipes){
            const error = new Error('Cannot find user recipes')
            error.status = 404
            throw error
        }

        res.status(200).send(userRecipes)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}

export const getSpecificUserPrivateIngredients = async function(req,res){
    const loggedUserId = req.loggedUser._id
    const userId = req.params.id

    try {
        if (!loggedUserId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const foundUser = await User.findById(userId)
        if(!foundUser){
            const error = new Error('Cannot find user')
            error.status = 404
            throw error
        }

        const foundIngredients = await Ingredient.find({userId: userId})
        if(!foundIngredients){
            const error = new Error('Cannot find user ingredients')
            error.status = 404
            throw error
        }

        res.status(200).send(foundIngredients)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}

export const getSpecificUserPrivateTags = async function(req, res){
    const loggedUserId = req.loggedUser._id
    const userId = req.params.id

    try {
        if (!loggedUserId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const foundUser = await User.findById(userId)
        if(!foundUser){
            const error = new Error('Cannot find user')
            error.status = 404
            throw error
        }

        const foundTags = await Tag.find({userId: userId})
        if(!foundTags){
            const error = new Error('Cannot find user tags')
            error.status = 404
            throw error
        }

        res.status(200).send(foundTags)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}

/* -------------- POST --------------*/
export const createNewUser = async function(req,res){
    try {
        const data = req.body
        const avatarPath =  req.file ? req.file.path : 'https://picsum.photos/200/300' 

        if(!data.email || !data.password){
            const error = new Error('Missing data from form')
            error.status = 400
            throw error
        }

        // search for already existing user
        const userExists = await User.exists({email: data.email})
        
        // user already existing
        if(userExists) {
            const error = new Error('Cannot register this user')
            error.status = 409
            throw error
        }

        // creating new user
        const newUser = new User({
            email: data.email,
            password: await bcrypt.hash(data.password, 10),
            userName: data.userName,
            avatarUrl: avatarPath,
            name: data.name,
            surname: data.surname,
            preferredMu: data.preferredMu,
        })
        const createdUser = await newUser.save()

        // if failed
        if(!createdUser){
            const error = new Error('Failed to create user')
            error.status = 400
            throw error
        }

        res.status(201).send(createdUser)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
    
}

/* -------------- PUT --------------*/
export const editSpecificUser = async function(req,res){
    const userId = req.params.id
    const data = req.body
    const loggedUserId = req.loggedUser._id

    try {

        if (!loggedUserId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const foundUser = await User.findById(userId)
        if(!foundUser){
            const error = new Error('Cannot find user')
            error.status = 404
            throw error
        }

        const editUser = {
            userName: data.userName,
            avatarUrl: data.avatarUrl,
            name: data.name,
            surname: data.surname,
            preferredMu: data.preferredMu,
        }

        const updatedUser = await User.findByIdAndUpdate(userId, editUser, {new: true})
        if(!updatedUser){
            const error = new Error('Cannot update user')
            error.status = 500
            throw error
        }
        await updatedUser.save()
        res.status(202).send(updatedUser)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}

export const editSpecificUserAvatar = function(req,res){
    console.log('ciao')
    res.send()
}

/* -------------- DELETE --------------*/
export const deleteSpecificUser = async function(req,res){
    const userId = req.params.id
    const loggedUserId = req.loggedUser._id

    try {

        if (!loggedUserId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const foundUser = await User.findById(userId)
        if(!foundUser){
            const error = new Error('Cannot find user')
            error.status = 404
            throw error
        }

        const deletedUser = await User.findByIdAndDelete(userId, {new: true})
        if(!deletedUser){
            const error = new Error('Cannot delete user')
            error.status = 500
            throw error
        }
        
        res.status(202).send(deletedUser)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}