import {Schema, model} from 'mongoose'

const tagSchema = new Schema(
    {
        name: {
            type: String,
            minLength: 4,
            maxLength: 20,
            required: true,
            unique: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        collection: 'tags',
        timestamps: true
    }
)

const Tag = model('Tag', tagSchema)

export default Tag