import mongoose from 'mongoose'
const Schema = mongoose.Schema

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
})

export const Contact = mongoose.model('Contact', contactSchema)
