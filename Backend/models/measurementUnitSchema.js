import {Schema, model} from 'mongoose'

const measurementUnitSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minLength: 1,
            maxLength: 10
        },
        // I'll be saving ums on the db in a small set of base measurement units, all wights in grams,
        // all liquids in milliliters. The frontend will then convert them to the desired measurement units
        conversionRateFromStdMu:{
            type: Number,
            required: true
        },
        measurementCategory:{
            type: String,
            enum: ['Solid','Liquid','Other'],
            required: true
        }
    },
    {
        collection: 'MeasurementUnits',
        timestamps: true
    }
)

const MeasurementUnit = model('MeasurementUnit', measurementUnitSchema)
export default MeasurementUnit