import {Schema, model} from 'mongoose'

const recipeIngredientSchema = new Schema(
    {
        ingredient: {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient',
            required: true
        },
        measurementUnit: {
            type: String,
            required: true
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
        //collection: 'recipeIngredients',
        timestamps: true
    }
)

//const RecipeIngredient = model('RecipeIngredient', recipeIngredientSchema)
export default recipeIngredientSchema