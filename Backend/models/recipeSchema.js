import {Schema, model} from 'mongoose'

const recipeSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        tagsIds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Tag'
            }
        ],
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            maxLength: 150
        },
        portions: {
            type: Number
        },
        preparationTime: {
            type: Number
        },
        recipeImageUrl: {
            type: String
        },
        recipeVideoUrl: {
            type: String
        },
        privateRecipe: {
            type: Boolean,
            required: true
        }
    },
    {
        collection: 'recipes',
        timestamps: true
    }
)

const Recipe = model('Recipe', recipeSchema)
export default Recipe