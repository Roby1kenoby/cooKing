import {Schema, model} from 'mongoose'

const ingredientSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minLength: 3,
            maxLength: 50
        },
        supportedMeasurementUnits: [{
            type: Schema.Types.ObjectId,
            ref: 'MeasurementUnit'
        }],
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        collection: 'Ingredients',
        timestamps: true
    }
)

const Ingredient = model('Ingredient', ingredientSchema)
export default Ingredient