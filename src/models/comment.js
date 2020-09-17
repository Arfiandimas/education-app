const mongoose = require('mongoose')
const validator = require('validator')

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    education: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Education'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment