import {Schema, model} from 'mongoose'
import phases from './phaseSchema.js'
import recipeIngredients from './recipeIngredientSchema.js'
const recipeSchema = new Schema(
    {
        version: {
            type: String
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        tags: [
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
            type: String
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
        },
        phases: [
            {
                type: phases
            }
        ],
        recipeIngredients:[
            {
                type: recipeIngredients
            }
        ]
    },
    {
        collection: 'recipes',
        timestamps: true
    }
)

const Recipe = model('Recipe', recipeSchema)
export default Recipe