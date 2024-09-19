import {Schema, model} from 'mongoose'

const recipeIngredientSchema = new Schema(
    {
        recipeId: {
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true
        },
        igredientId: {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient',
            required: true
        },
        measurementUnit: {
            type: String,
            // type: Schema.Types.ObjectId,
            // ref: 'MeasurementUnit',
            required: true
        },
        // if a recipeIngredient has a phase, it means it's used inside a specific phase.
        // otherwise it's used in the forntespiece of the recipe, as a total amount of that ingredient.
        phaseId: {
            type: Schema.Types.ObjectId,
            ref: 'Phase'
        },
        quantity: {
            type: String,
            required: true
        },
        additionalInfos: {
            type: String
        }
    },
    {
        collection: 'RecipeIngredients',
        timestamps: true
    }
)

const RecipeIngredient = model('RecipeIngredient', recipeIngredientSchema)
export default RecipeIngredient