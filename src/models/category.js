const mongoose = require('mongoose')
const validator = require('validator')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

categorySchema.virtual('educations', {
    ref: 'Education',
    localField: '_id',
    foreignField: 'category'
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category