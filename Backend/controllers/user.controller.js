import User from '../models/userSchema.js'
import Recipe from '../models/recipeSchema.js'
import Ingredient from '../models/ingredientSchema.js'
import Tag from '../models/tagSchema.js'

import bcrypt from 'bcrypt'

/* -------------- GET --------------*/
export const getAllUsers = function(req,res){
    console.log('ciao')
}

export const getSpecificUser = function(req,res){
    console.log('ciao')
    res.send()
}

export const getSpecificUserRecipes = function(req,res){
    console.log('ciao')
    res.send()
}

export const getSpecificUserPrivateIngredients = function (req,res){
    console.log('ciao')
    res.send()
}

export const getSpecificUserPrivateTags = function(req,res){
    console.log('ciao')
    res.send()
}

/* -------------- POST --------------*/
export const createNewUser = async function(req,res){
    const data = req.body
    const avatarPath = 
        // req.file.path ? req.file.path : 
        'https://picsum.photos/200/300' 
    
    try {
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
            username: data.username,
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
export const editSpecificUser = function(req,res){
    console.log('ciao')
    res.send()
}

export const editSpecificUserAvatar = function(req,res){
    console.log('ciao')
    res.send()
}

/* -------------- DELETE --------------*/
export const deleteSpecificUser = function(req,res){
    console.log('ciao')
    res.send() 
}