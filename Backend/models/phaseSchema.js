import {Schema, model} from 'mongoose'

const phaseSchema = new Schema(
    {
        // a phase is tyied to a recipe by it's id.
        recipeId: {
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true
        },
        // a phase can use one or more RecipeIngredients
        recipeIngredientsIds : [
            {
                type: Schema.Types.ObjectId,
                ref: 'RecipeIngredient'
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
        collation: 'phases',
        timestamps: true
    }
)

const Phase = model('Phase', phaseSchema)
export default Phase