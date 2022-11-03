//importing the mongoose database ORM
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: 'draft'
    },
    read_count: {
        type: Number,
        default: 0,
    },
    reading_time: {
        type: Number,

    },
    tags: {
        type: Array,
        default: []
    },
    body: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})






const blogModel = mongoose.model("Blog", blogSchema)

module.exports = { blogModel }