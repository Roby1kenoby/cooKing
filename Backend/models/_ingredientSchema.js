import {Schema, model} from 'mongoose'

const ingredientSchema = new Schema(
    {
        category1: {
            type: String,
            minLength: 3,
            maxLength: 50
        },
        category2: {
            type: String,
            minLength: 3,
            maxLength: 50
        },
        name: {
            type: String,
            required: true,
            unique: true,
            minLength: 3,
            maxLength: 50
        },
        measurementCategory:{
            type: String,
            enum: ['Solid','Liquid','Other'],
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        collection: 'ingredients',
        timestamps: true
    }
)

const Ingredient = model('Ingredient', ingredientSchema)
export default Ingredient