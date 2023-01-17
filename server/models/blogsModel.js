const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    canShare : {
        type: String,
        require: Boolean
    },
    canComment : {
        type: String,
        require: Boolean
    },
    canLike : {
        type: String,
        require: Boolean
    },
    likesCount: {
        type: Number,
        require: false,
        default: 0
    },
    commentsCount: {
        type: Number,
        require: false,
        default: 0
    },
    sharesCount: {
        type: Number,
        require: false,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('blogs', blogSchema);