const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        min: 8,
        max: 255,
        required: true,
    },

    first_name: {
        type: String
    },

    last_name: {
        type: String
    },

    phoneNumber: {
        type: String
    },

    isVerified: {
        type: Boolean,
        default: false
    }

}, { timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User