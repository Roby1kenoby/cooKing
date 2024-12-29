import {Schema, model} from 'mongoose'
import recipeIngredients from './recipeIngredientSchema.js'

const phaseSchema = new Schema(
    {
        // a phase can use one or more RecipeIngredients
        phaseIngredients : [
            {
                type: recipeIngredients
            }
        ],
        phaseNumber : {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        phaseImageUrl: {
            type: String
        }
    },
    {
        //collection: 'phases',
        timestamps: true
    }
)

//const Phase = model('Phase', phaseSchema)
export default phaseSchema