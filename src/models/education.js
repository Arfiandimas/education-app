const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const educationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    education: {
        type: String,
        required: true
    },
    video: {
        type: Buffer
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
}, {
    timestamps: true
})

educationSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'education'
})

const Education = mongoose.model('Education', educationSchema)

module.exports = Education