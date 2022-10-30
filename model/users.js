//importing the mongoose database ORM
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//modelling the leader schema
const UserSchema = new Schema({
    password: {
        type: String,
        // default: '',
        required: true,
        select: false
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone_number: {
        type: String,
        default: '',
        required: false
    }
}, {
    timestamps: true
})






const userModel = mongoose.model("User", UserSchema)

module.exports = { userModel }