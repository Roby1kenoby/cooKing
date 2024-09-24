import Tag from '../models/tagSchema.js'

/* -------------- GET --------------*/

export const getAllTags = async function(req, res){
    const searchString = req.query.searchString
    const userId = req.loggedUser._id
    
    try {

        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }
        // if ther's a searchString, i filter the Tag list (including private one).
        const tagsListQuery = Tag.find(
                searchString ? 
                    {$and:[{tagName: {$regex: searchString ,$options: "i"}}, {$or:[{userId: userId}, {userId: null}]}]}
                    : {$or: [{userId: userId}, {userId: null}]})

            tagsListQuery.sort({tagName: 1})
            const TagsList = await tagsListQuery
        res.send(TagsList)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }

}

export const getPrivateTags = async function(req, res){
    const searchString = req.query.searchString
    const userId = req.loggedUser._id

    try {

        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }
        // if ther's a searchString, i filter the Tag list.
        // i get only the Tags that has userId = userId of logged user
        const tagsList = await Tag.find(
                searchString ? 
                    {$and:[{tagName: {$regex: searchString ,$options: "i"}}, {userId: userId}]}
                    : {userId: userId})
        
        res.send(tagsList)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}

export const getPublicTags = async function(req, res){
    const searchString = req.query.searchString
    try {
        // if ther's a searchString, i filter the Tag list.
        // i get only the Tags that has no userId
        const tagsListQuery = Tag.find(
                searchString ? 
                    {$and:[{tagName: {$regex: searchString ,$options: "i"}}, {userId: null}]}
                    : {userId: null})
                tagsListQuery.sort({tagName: 1})
        const TagsList = await tagsListQuery
        
        res.send(TagsList)

    } catch (error) {
        res.status(500).send('Tags not found')
    }
}

/* -------------- POST --------------*/

export const createNewPrivateTag = async function(req, res){
    const userId = req.loggedUser._id
    const data = req.body
    
    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const tagExists = await Tag.findOne({$or: [{$and: [{tagName: data.tagName},{userId: null}]},{$and: [{tagName: data.tagName},{userId: userId}]}]})
        if (tagExists){
            const error = new Error('Tag already exists')
            error.status = 409
            throw error
        }

        const newPrivateTag = new Tag({
            tagName: data.tagName,
            userId: userId
        })

        const createdPrivateTag = await newPrivateTag.save()

        if(!createdPrivateTag){
            const error = new Error('Failed to create private Tag')
            error.status = 500
            throw error
        }

        res.status(201).send(createdPrivateTag)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }

}

/* -------------- PUT --------------*/

export const editPrivateTag = async function(req, res){
    const userId = req.loggedUser._id
    const privateTagId = req.params.id
    const data = req.body

    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const privateTagExists = await Tag.exists({_id: privateTagId})

        if(!privateTagExists){
            const error = new Error('Tag Not Found')
            error.status = 404
            throw error
        }

        const newPrivateTagAlreadyExists = await Tag.exists({tagName: data.tagName})

        if (newPrivateTagAlreadyExists) {
            const error = new Error('Edited Tag Already Exists')
            error.status = 409
            throw error
        }

        const editedPrivateTag = {
            tagName: data.tagName,
            userId: userId
        }

        const updatedPrivateTag = await Tag.findByIdAndUpdate(privateTagId, editedPrivateTag, {new: true})
        await updatedPrivateTag.save()
        res.status(202).send(updatedPrivateTag)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}

/* -------------- DELETE --------------*/

export const deletePrivateTag = async function(req, res){
    const userId = req.loggedUser._id
    const privateTagId = req.params.id

    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const privateTagExists = await Tag.exists({_id: privateTagId})

        if(!privateTagExists){
            const error = new Error('Tag Not Found')
            error.status = 404
            throw error
        }

        const deletedPrivateTag = await Tag.findByIdAndDelete(privateTagId, {new: true})
        res.status(202).send(deletedPrivateTag)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}
